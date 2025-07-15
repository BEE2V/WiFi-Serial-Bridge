let socket;

export const connectWebSocket = (onData) => {
  socket = new WebSocket(`ws://${window.location.hostname}:6789`);

  socket.onopen = () => {
    console.log("✅ WebSocket connected");

    // Small delay to ensure WebSocket is fully ready
    setTimeout(() => {
      if (socket?.readyState === WebSocket.OPEN) {
        const page = window.location.pathname;
        socket.send(page);
        console.log("📤 Sent page info:", page);
      }
    }, 10);
  };

  socket.onmessage = (event) => {
    const items = event.data.split("|");
    const parsed = {};
    for (const item of items) {
      const [key, value] = item.split(":");
      if (key && value) parsed[key.trim()] = value.trim();
    }
    onData(parsed);
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  socket.onclose = () => {
    console.warn("WebSocket closed");
  };
};

export const sendCommand = (msg) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(msg);
    console.log("📤 Sent to server:", msg);
  } else {
    console.warn("Socket not ready");
  }
};

export const disconnectWebSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
};

//npm run dev in cmd
