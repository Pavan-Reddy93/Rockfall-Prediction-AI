from app.models.tft_model import predict_risk

def run_prediction(input_data: dict):
    prediction = predict_risk(input_data)

    return {
        "risk_level": prediction["risk_level"],
        "confidence": prediction["confidence"],
        "lead_time_hours": prediction["lead_time"],
        "explanation": "High risk due to recent rainfall and vibration trends"
    }
