from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import get_connection
from groq_client import generate_sql, explain_sql
from utils.query_validator import safe_sql

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"]
)

def get_schema():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()

    schema = ""
    for t in tables:
        cursor.execute(f"DESCRIBE {t[0]}")
        cols = cursor.fetchall()
        schema += f"\nTable: {t[0]} -> {cols}"
    conn.close()
    return schema

@app.post("/generate-sql")
def generate_sql_endpoint(payload: dict):
    prompt = payload["prompt"]
    schema = get_schema()

    query = generate_sql(prompt, schema)
    safe_sql(query)
    query = query.replace("\n    ","")
    query = query.replace("\n","")
    return {"query": query}

@app.post("/run-sql")
def run_sql(payload: dict):
    query = payload["query"]
    conn = get_connection()
    cursor = conn.cursor()
    results = []

    # Split multiple statements by semicolon
    statements = [stmt.strip() for stmt in query.split(";") if stmt.strip()]

    for stmt in statements:
        try:
            cursor.execute(stmt)
            if stmt.lower().startswith("select"):
                columns = [desc[0] for desc in cursor.description]
                rows = cursor.fetchall()
                results.append({"statement": stmt, "rows": [dict(zip(columns, row)) for row in rows]})
            else:
                results.append({"statement": stmt, "status": "executed"})
        except Exception as e:
            results.append({"statement": stmt, "error": str(e)})

    conn.commit()
    conn.close()
    return {"result": results}


@app.post("/explain")
def explain(payload: dict):
    query = payload["query"]

    explanation = explain_sql(query)  # LLM now returns a JSON array string
    # Convert string to Python list for proper JSON response
    import json
    explanation_list = json.loads(explanation)

    return {"explanation": explanation_list}

