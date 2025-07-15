import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "./websocket";

export default function RobotStatus() {
  const [data, setData] = useState({});

  useEffect(() => {
    connectWebSocket(setData);
    return () => disconnectWebSocket();
  }, []);

  return (
    <div>
      <h1>Robot Status</h1>
      <div>Battery: {data.robot_battery}</div>
      <div>Speed: {data.robot_speed}</div>
    </div>
  );
}
