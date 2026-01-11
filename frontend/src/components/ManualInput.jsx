import { useState } from "react";

export default function ManualInput({ onPredict }) {
  const [data, setData] = useState({
    rainfall: "",
    vibration: "",
    slope: "",
    wind: "",
    soil: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const computeRisk = () => {
    // ❌ BLOCK EMPTY INPUTS
    if (
      !data.rainfall ||
      !data.vibration ||
      !data.slope ||
      !data.wind ||
      !data.soil
    ) {
      alert("Please enter all input values before computing risk.");
      return;
    }

    // ✅ CALCULATED SCORE (NO HARD-CODED VALUES)
    const score =
      Number(data.rainfall) * 0.4 +
      Number(data.slope) * 0.3 +
      Number(data.vibration) * 0.2 +
      Number(data.soil) * 0.1;

    let risk_level = "LOW";
    if (score > 70) risk_level = "HIGH";
    else if (score > 40) risk_level = "MEDIUM";

    const confidence = Math.min(score / 100, 1);

    const risk = {
      risk_level,
      confidence,
      lead_time_hours: risk_level === "HIGH" ? 6 : 12,
      explanation: `
${risk_level} rockfall risk detected.

Primary contributing factors:
• Rainfall (${data.rainfall} mm)
• Slope angle (${data.slope}°)
• Ground vibration (${data.vibration})

Expected failure window:
• ${risk_level === "HIGH" ? "4–6" : "8–12"} hours
• Risk increases during night cooling phase
      `,
    };

    onPredict(data, risk);
  };

  return (
    <div>
      <h3 className="section-title">Initial Rockfall Inputs</h3>

      <div className="input-table-wrapper">
        <table className="input-table">
          <thead>
            <tr>
              <th>Rainfall (mm)</th>
              <th>Vibration</th>
              <th>Slope (°)</th>
              <th>Wind (m/s)</th>
              <th>Soil Moisture</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input name="rainfall" onChange={handleChange} /></td>
              <td><input name="vibration" onChange={handleChange} /></td>
              <td><input name="slope" onChange={handleChange} /></td>
              <td><input name="wind" onChange={handleChange} /></td>
              <td><input name="soil" onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={computeRisk}>Compute Risk</button>
        <input type="file" accept=".csv" style={{ marginLeft: 15 }} />
      </div>
    </div>
  );
}
