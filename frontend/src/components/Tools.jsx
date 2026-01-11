export default function Tools() {
  const rainfall = 45;
  const slope = 52;

  const rainfallIndex = rainfall > 40 ? "High" : "Normal";
  const slopeIndex = slope > 45 ? "Unstable" : "Stable";

  return (
    <div>
      <h3>Rockfall Risk Calculation Tools</h3>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Computed Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rainfall Threshold Index</td>
            <td>{rainfallIndex}</td>
          </tr>
          <tr>
            <td>Slope Stability Index</td>
            <td>{slopeIndex}</td>
          </tr>
          <tr>
            <td>Early Warning Status</td>
            <td>
              {rainfallIndex === "High" && slopeIndex === "Unstable"
                ? "ALERT"
                : "Normal"}
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: 10 }}>
        These tools follow internationally adopted rainfall‑threshold and
        slope‑stability principles .
      </p>
    </div>
  );
}
