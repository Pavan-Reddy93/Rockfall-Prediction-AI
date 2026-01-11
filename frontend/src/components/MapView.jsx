import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function MapView({ onPredict, onBack }) {
  const [location, setLocation] = useState(null);

  // Dummy AI logic (replace later with backend)
  const predictFromLocation = () => {
    const weather = {
      rainfall: 45,
      wind_speed: 6,
      humidity: 70,
    };

    const risk = {
      risk_level: "HIGH",
      confidence: 0.85,
      lead_time_hours: 6,
      explanation: `
High rockfall risk detected.

Primary factors:
• Heavy rainfall increased pore pressure
• Slope instability at selected coordinates
• Weather‑induced stress accumulation

Expected failure window:
• 4–6 hours after rainfall peak
• Elevated risk during night cooling phase
      `,
    };

    onPredict(weather, risk, location);
  };

  // Color logic
  const getColor = (confidence) => {
    if (confidence >= 0.75) return "red";
    if (confidence >= 0.4) return "orange";
    return "green";
  };

  return (
    <div style={{ height: "520px", width: "100%" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%", cursor: "crosshair" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationPicker onSelect={setLocation} />

        {location && (
          <>
            <Marker position={location}>
              <Popup>
                Selected Location <br />
                Lat: {location.lat.toFixed(4)} <br />
                Lon: {location.lng.toFixed(4)}
              </Popup>
            </Marker>

            {/* HEATMAP CIRCLE */}
            <Circle
              center={location}
              radius={2000}
              pathOptions={{
                color: getColor(0.85),
                fillColor: getColor(0.85),
                fillOpacity: 0.4,
              }}
            >
              <Popup>
                <strong>Risk Level:</strong> HIGH <br />
                <strong>Confidence:</strong> 85% <br />
                <strong>Zone:</strong> Red (High Risk)
              </Popup>
            </Circle>
          </>
        )}
      </MapContainer>

      <div style={{ marginTop: 12 }}>
        {location && (
          <button onClick={predictFromLocation}>
            Predict Risk for Selected Location
          </button>
        )}
        <button style={{ marginLeft: 10 }} onClick={onBack}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
