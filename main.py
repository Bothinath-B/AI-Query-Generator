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
    return {"query": query}

@app.post("/run-sql")
def run_sql(payload: dict):
    query = payload["query"]
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]
    result = [dict(zip(columns, row)) for row in rows]

    conn.close()
    return {"result": result}

@app.post("/explain")
def explain(payload: dict):
    query = payload["query"]
    explanation = explain_sql(query)
    return {"explanation": explanation}
