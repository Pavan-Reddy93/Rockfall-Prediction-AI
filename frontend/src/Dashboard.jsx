import { useState } from "react";
import ManualInput from "./components/ManualInput";
import MapView from "./components/MapView";
import Charts from "./components/Charts";
import ChatBot from "./components/ChatBot";
import Tools from "./components/Tools";
import { generateGovtPDF } from "./utils/pdfReport";
import "./Dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(null);
  const [location, setLocation] = useState(null);

  // ✅ Called from ManualInput / Map
  const handlePrediction = (weatherData, riskData, loc = null) => {
    setWeather(weatherData);
    setRisk(riskData);
    if (loc) setLocation(loc);
    setActiveTab("graphs");
  };

  // ✅ OFFICIAL GOVERNMENT PDF DOWNLOAD
  const downloadGovtPDF = () => {
    if (!risk) {
      alert("Please generate a prediction first.");
      return;
    }

    generateGovtPDF({
      risk,
      location,
      weather,
    });
  };

  return (
    <div className="dashboard">
      {/* ================= HEADER ================= */}
      <header className="top-header">
        Rockfall Prediction & Early Warning System
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main-panel">
        {/* HOME */}
        {activeTab === "home" && (
          <ManualInput onPredict={handlePrediction} />
        )}

        {/* MAP */}
        {activeTab === "map" && (
          <MapView
            onPredict={(weatherData, riskData, loc) =>
              handlePrediction(weatherData, riskData, loc)
            }
          />
        )}

        {/* GRAPHS */}
        {activeTab === "graphs" && (
          <>
            <Charts weather={weather} risk={risk} />

            {risk && (
              <div className="report-box">
                <h3>Forensic Risk Assessment</h3>
                <pre>{risk.explanation}</pre>

                <button onClick={downloadGovtPDF}>
                  Download Official PDF Report
                </button>
              </div>
            )}
          </>
        )}

        {/* TOOLS */}
        {activeTab === "tools" && <Tools />}
      </main>

      {/* ================= FOOTER NAV ================= */}
      <footer className="bottom-nav">
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("map")}>Map</button>
        <button onClick={() => setActiveTab("graphs")}>Graphs</button>
        <button onClick={() => setActiveTab("tools")}>Tools</button>
        <button onClick={downloadGovtPDF}>Download</button>
      </footer>

      {/* ================= CHATBOT ================= */}
      <ChatBot />

      {/* ================= COPYRIGHT ================= */}
      <div className="copyright">
        © 2026 Rockfall‑AI System | Presidency University, Bengaluru  
        <br />
        Developed by Kasara Pavan Sai Reddy & Likhitha Bhavana Chitturi
      </div>
    </div>
  );
}
