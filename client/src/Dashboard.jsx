import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket, sendCommand } from "./websocket";

export default function Dashboard() {
    const [data, setData] = useState({});

    useEffect(() => {
        // Connect to the WebSocket when the component mounts
        connectWebSocket(setData);

        // Clean up on unmount
        return () => disconnectWebSocket();
    }, []);

    return (
        <div>
            <h1>Sensor Dashboard</h1>
            <button onClick={() => sendCommand("start")}>Start</button>
            <button onClick={() => sendCommand("stop")}>Stop</button>

            {Object.entries(data).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
            ))}
        </div>
    );
}
