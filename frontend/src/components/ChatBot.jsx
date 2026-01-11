import { useState } from "react";
import "../styles/chatbot.css";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "👋 Welcome to Rockfall AI Assistant.\n\n" +
        "I can help you with:\n" +
        "• Understanding risk results\n" +
        "• Interpreting graphs\n" +
        "• Using map & inputs\n" +
        "• Downloading reports",
    },
  ]);

  const getBotReply = (question) => {
    const q = question.toLowerCase();
    if (q.includes("hi") || q.includes("hello")) return "Hello 👋 How can I assist you with rockfall analysis?";
    if (q.includes("how")) return "You can start by entering values on the Home tab or selecting a location from the Map.";
    if (q.includes("risk")) return "Rockfall risk is calculated using rainfall, slope angle, vibration, soil moisture, and wind conditions.";
    if (q.includes("graph")) return "The confidence bar shows overall risk level, while the timeline graph predicts failure probability over time.";
    if (q.includes("map")) return "Use the Map tab to select a location. Weather and coordinates are captured automatically.";
    if (q.includes("download") || q.includes("report")) return "After prediction, go to Graphs and click 'Download Official PDF Report'.";
    return "I can help with risk, graphs, map usage, or reports. Please ask something related.";
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotReply(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Action Button */}
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)}>
          🤖
        </button>
      )}

      {/* Main Chat Window */}
      {open && (
        <div className="chatbot">
          <div className="chat-header">
            Rockfall Assistant
            <span className="close" onClick={() => setOpen(false)} style={{cursor: 'pointer'}}>×</span>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={m.from}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about risk, map..."
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}