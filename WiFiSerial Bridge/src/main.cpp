#include <Arduino.h>
#include <WiFi.h>
#include <WiFiUdp.h>

// === CONFIGURATION ===
const char* ssid = "Dialog 4G";
const char* password = "Q06YLA0QED3";
const char* udpAddress = "192.168.8.100"; // 💡 Your LAPTOP IP (NOT ESP IP)
const int udpPort = 4210;

WiFiUDP udp;
char incomingPacket[255];

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("ESP32 Starting...");

  Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n✅ Connected to Wi-Fi");
  Serial.print("ESP IP address: ");
  Serial.println(WiFi.localIP());

  udp.begin(udpPort);
  Serial.println("✅ UDP ready");
}

void loop() {
  // 1. Send sensor data from UNO to Laptop
  if (Serial2.available()) {
    String data = Serial2.readStringUntil('\n');
    data.trim();
    if (data.length() > 0) {
      Serial.print("📥 From UNO: ");
      Serial.println(data);

      udp.beginPacket(udpAddress, udpPort);
      udp.print(data);
      if (udp.endPacket() == 1)
        Serial.println("📤 Sent to Laptop via UDP.");
      else
        Serial.println("❌ Failed to send UDP to Laptop.");
    }
  }

  // 2. Receive UDP from Laptop and send to UNO
  int packetSize = udp.parsePacket();
  if (packetSize) {
    Serial.printf("📦 Packet received: %d bytes\n", packetSize);

    int len = udp.read(incomingPacket, sizeof(incomingPacket) - 1);
    if (len > 0) {
      incomingPacket[len] = '\0';
      String command = String(incomingPacket);
      command.trim();

      Serial.print("📥 From Laptop: ");
      Serial.println(command);

      if (command.startsWith("PAGE:")) {
        String page = command.substring(5);
        Serial.print("🌐 URL Part received: ");
        Serial.println(page);
      } else {
        Serial2.println(command);
        Serial.println("📤 Sent to UNO via Serial2.");
      }
    }
  }
}
