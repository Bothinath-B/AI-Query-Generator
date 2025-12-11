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
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )

    # return response.choices[0].message["content"].strip()
    return response.choices[0].message.content.strip()


def explain_sql(query):
    system_prompt = """
    You are a SQL explainer.
    Explain the following SQL query in simple English.
    STRICT RULES:
    1. Do not use markdown, asterisks, or quotes.
    2. Do not include code blocks or formatting.
    3. Return explanation as plain text, one sentence per point.
    4. Each point should be a separate item in a JSON array.
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]
    )

    # Parse JSON directly from LLM output
    explanation = response.choices[0].message.content.strip()

    return explanation  # Already in JSON-friendly array format

