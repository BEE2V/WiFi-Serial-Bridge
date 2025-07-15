import { useEffect, useState } from "react";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendCommand,
} from "./websocket";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    // Connect to the WebSocket when the component mounts
    connectWebSocket(setData);

    // Clean up on unmount
    return () => disconnectWebSocket();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sensor Dashboard</h1>

      <div className="control-grid">
        <button
          className="control-button start-button"
          onClick={() => sendCommand("start")}
        >
          <span className="button-icon">▶️</span>
          <span className="button-text">Start</span>
        </button>
        <button
          className="control-button stop-button"
          onClick={() => sendCommand("stop")}
        >
          <span className="button-icon">⏹️</span>
          <span className="button-text">Stop</span>
        </button>
        <button
          className="control-button pause-button"
          onClick={() => sendCommand("pause")}
        >
          <span className="button-icon">⏸️</span>
          <span className="button-text">Pause</span>
        </button>
        <button
          className="control-button reset-button"
          onClick={() => sendCommand("reset")}
        >
          <span className="button-icon">🔄</span>
          <span className="button-text">Reset</span>
        </button>
      </div>

      <div className="sensors-grid">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="sensor-card">
            <div className="sensor-name">{key}</div>
            <div className="sensor-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
