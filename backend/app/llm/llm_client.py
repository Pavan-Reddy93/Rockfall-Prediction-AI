import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def explain_risk(weather, prediction):
    prompt = f"""
    Weather data: {weather}
    Prediction: {prediction}

    Explain in simple engineering terms why the risk is {prediction['risk_level']}.
    """

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}],
    )

    return response.choices[0].message.content
