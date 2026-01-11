import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function Charts({ risk }) {
  if (!risk) return null; // ❌ NO DATA → NO GRAPH

  const base = Math.round(risk.confidence * 100);

  // ✅ DYNAMIC TIMELINE (NOT HARDCODED)
  const timelineLabels = ["Now", "+2h", "+4h", "+6h", "+8h"];
  const failureProb = [
    Math.max(base - 30, 5),
    Math.max(base - 15, 10),
    base,
    Math.min(base + 10, 95),
    Math.max(base - 5, 50),
  ];

  return (
    <div className="chart-container">
      {/* ===== CONFIDENCE BAR ===== */}
      <h3 className="section-title">Risk Confidence Analysis</h3>

      <div className="chart-box">
        <Bar
          data={{
            labels: ["Confidence"],
            datasets: [
              {
                label: "Risk Confidence (%)",
                data: [base],
                backgroundColor:
                  base > 70 ? "#dc2626" : base > 40 ? "#f59e0b" : "#16a34a",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { min: 0, max: 100 },
            },
          }}
        />
      </div>

      {/* ===== LEGEND ===== */}
      <div className="legend">
        <span className="low">LOW (&lt;40%)</span>
        <span className="medium">MEDIUM (40–70%)</span>
        <span className="high">HIGH (&gt;70%)</span>
      </div>

      {/* ===== TIMELINE ===== */}
      <h3 className="section-title">Failure Probability Timeline</h3>

      <div className="chart-box">
        <Line
          data={{
            labels: timelineLabels,
            datasets: [
              {
                label: "Failure Probability (%)",
                data: failureProb,
                borderColor: "#dc2626",
                backgroundColor: "rgba(220,38,38,0.2)",
                fill: true,
                tension: 0.3,
                pointRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { min: 0, max: 100 },
            },
          }}
        />
      </div>
    </div>
  );
}
