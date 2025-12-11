from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def generate_sql(prompt, schema):
    system_prompt = f"""
    You are a MySQL query generator.
    Convert natural language instructions into a valid MySQL query.
    Return only SQL query. No explanation.
    Tables:
    {schema}
    """

    response = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message["content"].strip()

def explain_sql(query):
    response = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[
            {"role": "system", "content": "Explain the following SQL query in simple English."},
            {"role": "user", "content": query}
        ]
    )
    return response.choices[0].message["content"]
