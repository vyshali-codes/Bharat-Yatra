import React, { useState, useEffect } from 'react';
import {
  mqttService,
  MqttStatusListener,
  MqttLogListener
} from '../services/mqttService';
import {
  generateRoomId,
  DEFAULT_MQTT_CONFIG,
  HIVEMQ_CLOUD_CONFIG,
  buildGameTopic
} from '../config/mqttConfig';
import { MqttConnectionState, MqttMessageLog } from '../types/mqtt';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Copy,
  Check,
  Send,
  Code,
  ShieldAlert,
  Radio,
  Server,
  Terminal,
  Cpu,
  Lock,
  User,
  Eye,
  EyeOff,
  Cloud
} from 'lucide-react';

interface Props {
  className?: string;
  onSelectTab?: (tab: string) => void;
}

export const HardwareConnectionPanel: React.FC<Props> = ({ className = '' }) => {
  const [status, setStatus] = useState<MqttConnectionState>(mqttService.getStatus());
  const [errorMessage, setErrorMessage] = useState<string | null>(mqttService.getErrorMessage());
  const [roomId, setRoomId] = useState<string>(mqttService.getRoomId());
  const [brokerHost] = useState<string>(HIVEMQ_CLOUD_CONFIG.host);
  const [brokerPort] = useState<number>(HIVEMQ_CLOUD_CONFIG.port);
  const [brokerUrl] = useState<string>(HIVEMQ_CLOUD_CONFIG.brokerUrl);
  const [username, setUsername] = useState<string>(mqttService.getUsername());
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [lastSent, setLastSent] = useState<MqttMessageLog | null>(mqttService.getLastMessageSent());
  const [lastReceived, setLastReceived] = useState<MqttMessageLog | null>(mqttService.getLastMessageReceived());
  const [isCopiedRoom, setIsCopiedRoom] = useState(false);
  const [isCopiedTopic, setIsCopiedTopic] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [showFirmwareModal, setShowFirmwareModal] = useState(false);
  const [testPingSent, setTestPingSent] = useState(false);

  useEffect(() => {
    const unsubStatus: MqttStatusListener = (newStatus, err) => {
      setStatus(newStatus);
      setErrorMessage(err || null);
    };
    const unsubLogs: MqttLogListener = (sent, recv) => {
      setLastSent(sent);
      setLastReceived(recv);
    };

    const cleanupStatus = mqttService.onStatusChange(unsubStatus);
    const cleanupLogs = mqttService.onLogUpdate(unsubLogs);

    return () => {
      cleanupStatus();
      cleanupLogs();
    };
  }, []);

  const handleGenerateRoomId = () => {
    const freshRoom = generateRoomId();
    setRoomId(freshRoom);
    mqttService.setRoomId(freshRoom);
  };

  const handleCopyRoom = () => {
    navigator.clipboard?.writeText(roomId);
    setIsCopiedRoom(true);
    setTimeout(() => setIsCopiedRoom(false), 2000);
  };

  const handleCopyTopic = () => {
    navigator.clipboard?.writeText(mqttService.getTopic());
    setIsCopiedTopic(true);
    setTimeout(() => setIsCopiedTopic(false), 2000);
  };

  const handleToggleConnect = () => {
    if (status === 'Connected') {
      mqttService.disconnect();
    } else {
      mqttService.connect({
        username,
        password
      });
    }
  };

  const handleSendTestPing = () => {
    mqttService.publish({
      type: 'TEST',
      message: 'HELLO BHARAT YATRA'
    });
    setTestPingSent(true);
    setTimeout(() => setTestPingSent(false), 2000);
  };

  const currentTopic = buildGameTopic(roomId);

  const arduinoCode = `/*
 * BHARAT YATRA - ESP32 + 1.3" OLED Wireless Secondary Display
 * Target: ESP32 + 1.3" I2C OLED (SH1106 / SSD1306 128x64)
 * Broker: HiveMQ Cloud Serverless (MQTTS Port 8883 / WSS Port 8884)
 *
 * Required Libraries (Install via Arduino IDE Library Manager):
 * 1. PubSubClient by Nick O'Leary
 * 2. ArduinoJson by Benoit Blanchon (v6 or v7)
 * 3. U8g2 by oliver (or Adafruit_SSD1306)
 */

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <U8g2lib.h>
#include <Wire.h>

// Initialize 1.3" I2C OLED (SH1106 128x64 or SSD1306)
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);

// Network Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* wifi_password = "YOUR_WIFI_PASSWORD";

// HiveMQ Cloud Serverless Broker
const char* mqtt_server = "${HIVEMQ_CLOUD_CONFIG.host}";
const int mqtt_port = 8883; // Standard MQTTS TLS port for ESP32

// HiveMQ Cloud Credentials
const char* mqtt_user = "${username || 'bharat_yatra_app'}";
const char* mqtt_pass = "YOUR_HIVEMQ_PASSWORD"; // Enter your runtime password

// Game Room Topic (bharat-yatra/<ROOM_ID>/game)
const char* mqtt_topic = "${currentTopic}";

WiFiClientSecure espClient;
PubSubClient client(espClient);

// Display state buffer
String line1 = "BHARAT YATRA";
String line2 = "HIVEMQ CLOUD";
String line3 = "ROOM: ${roomId}";
String line4 = "ROLL ON PHONE";

void renderOLED() {
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_6x12_tr);
  
  // Header bar
  u8g2.drawBox(0, 0, 128, 11);
  u8g2.setDrawColor(0);
  u8g2.setCursor(4, 9);
  u8g2.print("BHARAT YATRA - OLED");
  
  u8g2.setDrawColor(1);
  u8g2.setCursor(2, 25);
  u8g2.print(line1);
  
  u8g2.setCursor(2, 38);
  u8g2.print(line2);
  
  u8g2.setCursor(2, 50);
  u8g2.print(line3);
  
  u8g2.setCursor(2, 62);
  u8g2.print(line4);
  
  u8g2.sendBuffer();
}

void callback(char* topic, byte* payload, unsigned int length) {
  StaticJsonDocument<1024> doc;
  deserializeJson(doc, payload, length);
  
  const char* type = doc["type"];
  if (!type) return;

  if (strcmp(type, "TEST") == 0) {
    line1 = "TEST RECEIVED";
    line2 = doc["message"] | "HELLO BHARAT YATRA";
    line3 = "HIVEMQ CLOUD OK";
    line4 = "READY FOR GAME";
  } else if (strcmp(type, "PLAYER") == 0 || strcmp(type, "READY_TO_ROLL") == 0) {
    line1 = String("PLAYER ") + doc["player"].as<int>();
    line2 = "YOUR TURN";
    line3 = String("SCORE: ") + doc["score"].as<int>();
    line4 = "ROLL ON PHONE";
  } else if (strcmp(type, "DICE_RESULT") == 0 || strcmp(type, "DICE_ROLL") == 0) {
    line1 = "DICE RESULT";
    line2 = String("ROLLED: [ ") + doc["value"].as<int>() + " ]";
    line3 = String("PLAYER: ") + doc["player"].as<int>();
    line4 = "MOVING ON MAP...";
  } else if (strcmp(type, "LOCATION") == 0 || strcmp(type, "MOVEMENT") == 0) {
    line1 = "LOCATION";
    line2 = doc["city"] | "INDIA";
    line3 = String("BLOCK ") + (doc["block"] | doc["toPosition"] | 1);
    line4 = "ON BOARD";
  } else if (strcmp(type, "QUESTION") == 0) {
    line1 = String("Q: ") + doc["category"].as<const char*>();
    line2 = doc["question"].as<const char*>();
    line3 = "OPTIONS ON PHONE";
    line4 = "ANSWER A/B/C/D";
  } else if (strcmp(type, "CORRECT") == 0) {
    line1 = "CORRECT!";
    line2 = String("+") + doc["points"].as<int>() + " POINTS";
    line3 = String("TOTAL: ") + doc["score"].as<int>();
    line4 = "NEXT TURN READY";
  } else if (strcmp(type, "WRONG") == 0) {
    line1 = "WRONG ANSWER";
    line2 = "0 POINTS";
    line3 = String("SCORE: ") + doc["score"].as<int>();
    line4 = "NEXT TURN READY";
  } else if (strcmp(type, "SPECIAL_BLOCK") == 0 || strcmp(type, "SPECIAL_CHALLENGE") == 0) {
    line1 = "SPECIAL CHALLENGE";
    line2 = doc["blockType"].as<const char*>();
    line3 = doc["city"].as<const char*>();
    line4 = "CHECK PHONE";
  } else if (strcmp(type, "HERITAGE_HUNT") == 0) {
    line1 = "HERITAGE HUNT";
    line2 = doc["city"].as<const char*>();
    line3 = "SOLVE & UPLOAD";
    line4 = "CHECK PHONE";
  }

  renderOLED();
}

void reconnect() {
  while (!client.connected()) {
    String clientId = "ESP32-BY-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass)) {
      client.subscribe(mqtt_topic);
      line1 = "CONNECTED TO MQTT";
      line2 = "SUBSCRIBED TO:";
      line3 = "${roomId}";
      line4 = "WAITING FOR MOVE";
      renderOLED();
    } else {
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  u8g2.begin();
  renderOLED();

  WiFi.begin(ssid, wifi_password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  // HiveMQ Cloud requires TLS/SSL
  espClient.setInsecure(); // Or load HiveMQ Root CA
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
`;

  const handleCopyArduinoCode = () => {
    navigator.clipboard?.writeText(arduinoCode);
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2000);
  };

  return (
    <div
      className={`bg-[#FFFDF9] rounded-2xl border border-amber-200 shadow-sm p-5 sm:p-6 space-y-6 ${className}`}
      id="hardware-connection-panel"
    >
      {/* Header with Title and Live Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-800">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black tracking-wide text-slate-900 uppercase">
                ESP32 HARDWARE
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white uppercase tracking-wider">
                1.3" OLED
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
                HiveMQ Cloud
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Wireless secondary display via MQTT over Secure WebSockets (WSS)
            </p>
          </div>
        </div>

        {/* Live Status Badge and Connect/Disconnect Button */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border ${
              status === 'Connected'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : status === 'Connecting'
                ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'Connected'
                  ? 'bg-emerald-500'
                  : status === 'Connecting'
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
            />
            <span>● {status}</span>
          </div>

          <button
            onClick={handleToggleConnect}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              status === 'Connected'
                ? 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-200'
                : status === 'Connecting'
                ? 'bg-amber-100 text-amber-800 cursor-not-allowed opacity-80'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
            }`}
            title={status === 'Connected' ? 'Disconnect MQTT' : 'Connect MQTT'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${status === 'Connecting' ? 'animate-spin' : ''}`} />
            <span>{status === 'Connected' ? 'Disconnect' : status === 'Connecting' ? 'Connecting...' : 'Connect'}</span>
          </button>
        </div>
      </div>

      {/* Connection Diagnostic Message */}
      <div
        className={`px-3.5 py-2.5 rounded-xl text-xs border flex items-center justify-between gap-2 ${
          status === 'Connected'
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : status === 'Connecting'
            ? 'bg-amber-50/80 border-amber-200 text-amber-900 animate-pulse'
            : errorMessage
            ? 'bg-rose-50/90 border-rose-200 text-rose-900'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2">
          {status === 'Connected' ? (
            <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : status === 'Connecting' ? (
            <RefreshCw className="w-4 h-4 text-amber-600 shrink-0 animate-spin" />
          ) : errorMessage ? (
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          ) : (
            <WifiOff className="w-4 h-4 text-slate-400 shrink-0" />
          )}
          <span className="font-medium">
            {status === 'Connected'
              ? 'Connected to HiveMQ Cloud Serverless Broker'
              : status === 'Connecting'
              ? 'Connecting to HiveMQ Cloud over Secure WebSocket...'
              : errorMessage
              ? `MQTT connection failed: ${errorMessage}`
              : 'Click Connect to connect to HiveMQ Cloud broker'}
          </span>
        </div>

        {status === 'Disconnected' && !errorMessage && (
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            Zero Auto-Connect
          </span>
        )}
      </div>

      {/* Connection Mode & Hardware Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Connection Mode */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-600" />
              Connection Mode:
            </span>
          </div>
          <p className="text-xs font-bold text-amber-900">
            MQTT over Secure WebSocket
          </p>
          <p className="text-[11px] text-slate-500">
            Secure WSS connection on Port 8884
          </p>
        </div>

        {/* Controller */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Controller:</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
              INPUT
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900">
            Phone / Web Browser
          </p>
          <p className="text-[11px] text-slate-500">
            Rolls dice, picks answers, controls game state
          </p>
        </div>

        {/* Display */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Display:</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 text-[10px] font-mono font-bold">
              OUTPUT
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900">
            ESP32 + 1.3" OLED
          </p>
          <p className="text-[11px] text-slate-500">
            Wireless secondary scoreboard and question viewer
          </p>
        </div>
      </div>

      {/* Broker Host & WebSocket Port */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Broker Host */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5 text-amber-600" />
              Broker Host (HiveMQ Cloud):
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
              WSS
            </span>
          </div>
          <p className="font-mono text-xs text-slate-800 font-semibold break-all" title={brokerHost}>
            {brokerHost}
          </p>
        </div>

        {/* WebSocket Port & Path */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-slate-400" />
            WebSocket Port:
          </span>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-800 font-semibold">
            <span>Port: <strong className="text-amber-700">{brokerPort}</strong></span>
            <span className="text-slate-300">|</span>
            <span>Path: <strong className="text-slate-700">/mqtt</strong></span>
          </div>
        </div>
      </div>

      {/* Authentication Inputs (Username & Runtime Password) */}
      <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            HiveMQ Cloud Authentication
          </span>
          <span className="text-[10px] text-amber-800 font-medium">
            Runtime only — never stored or logged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Username Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <User className="w-3 h-3 text-slate-500" />
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                const val = e.target.value;
                setUsername(val);
                mqttService.setUsername(val);
              }}
              placeholder="e.g. bharat_yatra_app"
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-amber-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-500" />
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  mqttService.setPassword(val);
                }}
                placeholder="Enter your HiveMQ Cloud password"
                className="w-full pl-3 pr-9 py-1.5 rounded-lg bg-white border border-amber-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Room ID & Subscribed Topic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Room ID with Generator */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Room ID:</span>
            <button
              onClick={handleGenerateRoomId}
              className="text-[11px] font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 hover:underline cursor-pointer"
              title="Generate fresh unique room ID"
            >
              <RefreshCw className="w-3 h-3" />
              <span>GENERATE ROOM ID</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={roomId}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                setRoomId(val);
                mqttService.setRoomId(val);
              }}
              className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-amber-300 font-mono text-sm font-bold text-slate-900 tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. BHARAT-7F3A92"
            />
            <button
              onClick={handleCopyRoom}
              className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="Copy Room ID"
            >
              {isCopiedRoom ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopiedRoom ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* MQTT Topic */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              MQTT Topic:
            </span>
            <button
              onClick={handleCopyTopic}
              className="text-[10px] text-amber-700 hover:text-amber-900 font-bold flex items-center gap-0.5 cursor-pointer"
            >
              {isCopiedTopic ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <p className="font-mono text-xs text-amber-800 font-bold truncate p-2 rounded bg-amber-50/80 border border-amber-200" title={currentTopic}>
            {currentTopic}
          </p>
        </div>
      </div>

      {/* Telemetry: Last Message Sent & Last Message Received */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Last Message Sent */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1 text-cyan-400 font-bold">
              <Send className="w-3 h-3" /> LAST MESSAGE SENT
            </span>
            <span>{lastSent?.timestamp || 'None yet'}</span>
          </div>
          {lastSent ? (
            <pre className="max-h-28 overflow-y-auto text-[11px] text-emerald-300 p-2 rounded bg-black/40 whitespace-pre-wrap break-words">
              {JSON.stringify(lastSent.payload, null, 2)}
            </pre>
          ) : (
            <p className="text-[11px] text-slate-500 italic py-3 text-center">
              No message published yet this session
            </p>
          )}
        </div>

        {/* Last Message Received */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Radio className="w-3 h-3" /> LAST MESSAGE RECEIVED
            </span>
            <span>{lastReceived?.timestamp || 'None yet'}</span>
          </div>
          {lastReceived ? (
            <pre className="max-h-28 overflow-y-auto text-[11px] text-cyan-300 p-2 rounded bg-black/40 whitespace-pre-wrap break-words">
              {JSON.stringify(lastReceived.payload, null, 2)}
            </pre>
          ) : (
            <p className="text-[11px] text-slate-500 italic py-3 text-center">
              Waiting for incoming messages on topic...
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons: Send Test MQTT Event & ESP32 Arduino C++ Firmware */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSendTestPing}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testPingSent ? 'Test Ping Dispatched!' : 'Send Test MQTT Event'}</span>
          </button>
        </div>

        <button
          onClick={() => setShowFirmwareModal(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Code className="w-3.5 h-3.5 text-amber-400" />
          <span>View ESP32 Arduino C++ Firmware</span>
        </button>
      </div>

      {/* Firmware Modal */}
      {showFirmwareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-amber-200 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  ESP32 + 1.3" OLED Firmware Sketch (HiveMQ Cloud)
                </h3>
                <p className="text-xs text-slate-500">
                  Ready to flash in Arduino IDE. Configured for Room: <strong>{roomId}</strong>
                </p>
              </div>
              <button
                onClick={() => setShowFirmwareModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col bg-slate-950 rounded-xl p-3 border border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-mono">BharatYatra_ESP32_OLED_HiveMQ.ino</span>
                <button
                  onClick={handleCopyArduinoCode}
                  className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {isCopiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopiedCode ? 'Copied Code' : 'Copy All'}</span>
                </button>
              </div>
              <pre className="flex-1 overflow-y-auto font-mono text-[11px] text-emerald-300 p-2 whitespace-pre">
                {arduinoCode}
              </pre>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowFirmwareModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
