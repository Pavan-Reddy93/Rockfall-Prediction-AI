import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function TimelineGraph({ risk }) {
  if (!risk) return null;

  // Time window (hours)
  const hours = [0, 2, 4, 6, 8, 10, 12];

  // Failure probability logic (government‑style assumption curve)
  const probability = hours.map((h) => {
    if (h < risk.lead_time_hours - 2) return 0.2;
    if (h < risk.lead_time_hours) return 0.5;
    if (h <= risk.lead_time_hours + 2) return 0.9;
    return 0.6;
  });

  return (
    <div style={{ height: "300px", marginTop: 20 }}>
      <h3>Failure Probability vs Time</h3>

      <Line
        data={{
          labels: hours.map((h) => `${h} hrs`),
          datasets: [
            {
              label: "Failure Probability",
              data: probability,
              borderColor: "#dc2626",
              backgroundColor: "rgba(220,38,38,0.2)",
              tension: 0.4,
              pointRadius: 5,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
              max: 1,
              ticks: {
                callback: (v) => `${v * 100}%`,
              },
              title: {
                display: true,
                text: "Probability of Failure",
              },
            },
            x: {
              title: {
                display: true,
                text: "Time After Observation",
              },
            },
          },
        }}
      />
    </div>
  );
}
