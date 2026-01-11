from fastapi import APIRouter
from app.schemas import PredictionInput, PredictionOutput

router = APIRouter()

@router.post("/predict", response_model=PredictionOutput)
def predict(data: PredictionInput):

    # Simple risk logic (can be replaced by ML later)
    high_risk = (
        data.rainfall > 50 or
        data.vibration > 0.7 or
        data.slope_angle > 45
    )

    if high_risk:
        explanation = f"""
High rockfall risk detected.

Primary factors:
• Rainfall: {data.rainfall} mm increased pore pressure in rock joints
• Vibration: {data.vibration} caused micro‑fractures and instability
• Slope Angle: {data.slope_angle}° exceeds stability threshold

Failure timeline:
• Expected failure window: 4–6 hours after peak rainfall
• Highest probability during night-time cooling and saturation

Risk mechanism:
• Water infiltration reduced friction
• Vibrations weakened rock bonds
• Gravity dominates on steep slopes

Recommended actions:
• Issue evacuation warning immediately
• Restrict heavy vehicle movement
• Deploy slope displacement & vibration sensors
"""

        return {
            "risk_level": "HIGH",
            "confidence": 0.88,
            "lead_time_hours": 6,
            "explanation": explanation.strip()
        }

    return {
        "risk_level": "LOW",
        "confidence": 0.65,
        "lead_time_hours": 24,
        "explanation": "Slope conditions are currently stable. No immediate rockfall indicators detected."
    }
