# 🔗 ESP32 + Arduino UNO + WebSocket Dashboard

This project bridges an **Arduino UNO** (sending sensor data) to a **React Web Dashboard** via **ESP32** and a **Node.js WebSocket/UDP server**. It enables real-time, bi-directional communication:

* UNO sends sensor data → ESP32 → Laptop (UDP)
* Laptop WebSocket server → React client
* React client sends commands/page info → WebSocket → Laptop → UDP → ESP32 → UNO

---

## 📡 Components

| Device         | Role                                 |
| -------------- | ------------------------------------ |
| Arduino UNO    | Sensor reading and control target    |
| ESP32          | Wi-Fi bridge between UNO and PC      |
| Node.js Server | UDP <-> WebSocket bridge             |
| React App      | Real-time dashboard and UI interface |

---

## ⚙️ Setup Instructions

### 1. 🟦 Arduino UNO

* Connect sensors as needed.
* Use `Serial2` (via ESP32) for communication.

### 2. 🟩 ESP32 Code (Arduino)

```cpp
// Refer to esp32.ino file
// Listens on Serial2 for data from UNO
// Forwards data via UDP to laptop
// Listens for UDP from laptop, forwards to UNO
```

### 3. 🟨 Node.js WebSocket + UDP Server

```bash
npm install ws dgram
node server.js
```

* Listens for UDP from ESP32 on port `4210`
* Forwards to WebSocket clients
* Listens for WebSocket messages from clients and sends to ESP32

### 4. 🟦 React App

* Run with `npm run dev` (or `vite`)
* Connects via WebSocket on port `6789`
* Sends the `window.location.pathname` (e.g., `/robotStatus`) to the server

---

## 🧪 Data Flow

```
Arduino UNO <===> Serial2 <===> ESP32 <==UDP==> Node.js Server <==WS==> React App
```

* UNO sends sensor string: `temp:24|hum:60`
* ESP32 forwards it via UDP to laptop
* Node.js server broadcasts it via WebSocket
* React app receives and displays
* React sends a message like `PAGE:/status`
* Node.js server relays it to ESP32 via UDP
* ESP32 can then forward that info to UNO

---

## 📂 File Structure

```
project-root/
├── esp32/               # Arduino sketch
├── server.js            # Node.js bridge (WebSocket + UDP)
├── client-react/        # React frontend
│   └── src/
│       └── websocket.js # Handles WS connection
└── README.md
```

---

## ✅ Example Output

**ESP32 Serial Monitor:**

```
✅ Connected to Wi-Fi
ESP IP address: 192.168.1.100
📥 From UNO: temp:25|hum:65
📤 Sent to Laptop via UDP.
📥 From Laptop: PAGE:/status
🌐 URL Part received: /status
```

**Server Console:**

```
✅ WebSocket server running on ws://localhost:6789
✅ UDP server listening on 0.0.0.0:4210
📡 UDP received from ESP32: temp:25|hum:65
💬 Received from client: PAGE:/status
📤 Sent to ESP32: PAGE:/status
```

---

## 🛠️ Customization Ideas

* Add command buttons to React (`start`, `stop`, `reset`)
* Use `Chart.js` or `Recharts` to plot sensor data
* Filter or route data based on page info
* Use JSON instead of delimited strings for structure


