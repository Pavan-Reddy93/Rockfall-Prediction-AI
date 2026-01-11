import { useState } from "react";

export default function SensorUpload({ onPredict }) {
  const [file, setFile] = useState(null);

  const parseCSV = async () => {
    if (!file) return;

    const text = await file.text();
    const rows = text.split("\n").map(r => r.split(","));

    // Assume CSV format:
    // rainfall,vibration,slope,wind,soil,lat,lon
    const data = rows[1];

    const weatherData = {
      rainfall: Number(data[0]),
      vibration: Number(data[1]),
      slope_angle: Number(data[2]),
      wind_speed: Number(data[3]),
      soil_moisture: Number(data[4]),
    };

    const location = {
      lat: Number(data[5]),
      lng: Number(data[6]),
    };

    // Example AI result (later from backend / model)
    const riskData = {
      risk_level: weatherData.rainfall > 30 ? "HIGH" : "MODERATE",
      confidence: weatherData.rainfall > 30 ? 0.85 : 0.55,
      lead_time_hours: weatherData.rainfall > 30 ? 6 : 12,
      explanation: `
High rockfall risk detected.

Primary contributing factors:
• Rainfall: ${weatherData.rainfall} mm increased pore pressure
• Slope angle: ${weatherData.slope_angle}° exceeds stability threshold
• Vibration: ${weatherData.vibration} caused micro‑fractures

Expected failure window:
• 4–6 hours after peak rainfall
• Highest risk during night cooling phase

Recommended actions:
• Issue evacuation warning
• Restrict heavy vehicle movement
• Deploy slope monitoring sensors
      `,
    };

    onPredict(weatherData, riskData, location);
  };

  return (
    <div className="card">
      <h3>Upload Sensor CSV</h3>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={parseCSV} style={{ marginTop: 10 }}>
        Analyze & Predict
      </button>

      <p style={{ fontSize: 12, marginTop: 8 }}>
        CSV format: rainfall, vibration, slope, wind, soil, latitude, longitude
      </p>
    </div>
  );
}
