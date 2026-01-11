from pydantic import BaseModel

class PredictionInput(BaseModel):
    rainfall: float
    vibration: float
    slope_angle: float
    wind_speed: float
    soil_moisture: float


class PredictionOutput(BaseModel):
    risk_level: str
    confidence: float
    lead_time_hours: int
    explanation: str
