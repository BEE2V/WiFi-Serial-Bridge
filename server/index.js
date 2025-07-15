const WebSocket = require("ws");
const dgram = require("dgram");

const UDP_PORT = 4210;
const WS_PORT = 6789;

const ESP32_IP = "192.168.8.103"; // ✅ Must match IP printed by ESP32
const ESP32_PORT = 4210;

let latestData = "";
const clients = new Set();

const wss = new WebSocket.Server({ port: WS_PORT }, () => {
    console.log(`✅ WebSocket server running on ws://localhost:${WS_PORT}`);
});

const udpServer = dgram.createSocket("udp4");

wss.on("connection", (ws) => {
    console.log("🔌 New WebSocket client connected.");
    clients.add(ws);

    ws.on("message", (msg) => {
        const message = msg.toString().trim();
        console.log(`💬 Received from client: ${message}`);

        udpServer.send(message, ESP32_PORT, ESP32_IP, (err) => {
            if (err) console.error("❌ Failed to send UDP to ESP32:", err);
            else console.log(`📤 Sent to ESP32: ${message}`);
        });
    });

    ws.on("close", () => {
        clients.delete(ws);
        console.log("❌ WebSocket client disconnected.");
    });

    ws.onerror = (err) => {
        console.error("WebSocket error:", err);
    };
});

udpServer.on("message", (msg, rinfo) => {
    latestData = msg.toString().trim();
    console.log(`📡 UDP received from ESP32: ${latestData}`);

    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(latestData);
        }
    }
});

udpServer.on("listening", () => {
    const address = udpServer.address();
    console.log(`✅ UDP server listening on ${address.address}:${address.port}`);
});

udpServer.bind(UDP_PORT);

// node index.js