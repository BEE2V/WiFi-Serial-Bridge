#include <Arduino.h>
#include <SoftwareSerial.h>

// Define software serial pins for ESP32 communication
#define ESP_RX 10  // Arduino receives on this pin (connect to ESP32 TX)
#define ESP_TX 11  // Arduino transmits on this pin (connect to ESP32 RX)

SoftwareSerial espSerial(ESP_RX, ESP_TX);  // RX, TX

void setup() {
  // Initialize communication with ESP32
  espSerial.begin(9600);

  // Optional: Initialize Serial Monitor for debugging
  Serial.begin(115200);
  while (!Serial);
  Serial.println("Arduino ready.");
}

void loop() {
  // === Simulated sensor data generation ===
  int sensor1 = analogRead(A0);
  int sensor2 = random(0, 100);
  float temperature = 25.0 + (millis() % 100) * 0.1;

  // === Create formatted data string ===
  String data = "sensor1:" + String(sensor1) + "|";
  data += "sensor2:" + String(sensor2) + "|";
  data += "temp:" + String(temperature, 1) + "|";
  data += "status:" + String(millis() % 2 ? "OK" : "WARN") + "|";
  data += "timestamp:" + String(millis() / 1000);

  // Send to ESP32
  espSerial.println(data);

  // === Read full string sent from ESP32 ===
  if (espSerial.available()) {
    String incoming = espSerial.readStringUntil('\n');  // Read full line
    Serial.print("⬅ Received from ESP32: ");
    Serial.println(incoming);
  }

  delay(500);  // Loop rate
}
