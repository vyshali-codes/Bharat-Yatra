import React, { useState, useEffect } from 'react';
import { HardwareConnectionPanel } from '../components/HardwareConnectionPanel';
import { OLED13Display } from '../components/OLED13Display';
import { ESP32SimulatorWidget } from '../components/ESP32SimulatorWidget';
import { useGame } from '../context/GameContext';
import { mqttService } from '../services/mqttService';
import { MqttGameEvent, MqttConnectionState } from '../types/mqtt';
import {
  Cpu,
  Radio,
  ArrowRight,
  Layers,
  Smartphone,
  Tv,
  CheckCircle2,
  Code2,
  Wifi,
  Sparkles
} from 'lucide-react';

export const ESP32SimulatorPage: React.FC = () => {
  const { setActiveScreen } = useGame();

  const [activeTab, setActiveTab] = useState<'MQTT_BRIDGE' | 'OLED_VIEW' | 'INTERACTIVE_SIM' | 'CIRCUIT'>(
    'MQTT_BRIDGE'
  );

  const [currentMqttEvent, setCurrentMqttEvent] = useState<MqttGameEvent | null>(
    (mqttService.getLastMessageSent()?.payload as MqttGameEvent) || null
  );
  const [mqttStatus, setMqttStatus] = useState<MqttConnectionState>(mqttService.getStatus());
  const [roomId, setRoomId] = useState<string>(mqttService.getRoomId());

  useEffect(() => {
    const unsubMsg = mqttService.onMessage((evt) => {
      setCurrentMqttEvent(evt);
    });
    const unsubStatus = mqttService.onStatusChange((st) => {
      setMqttStatus(st);
      setRoomId(mqttService.getRoomId());
    });
    const unsubLogs = mqttService.onLogUpdate((sent) => {
      if (sent?.payload) {
        setCurrentMqttEvent(sent.payload);
      }
    });

    return () => {
      unsubMsg();
      unsubStatus();
      unsubLogs();
    };
  }, []);

  const gpioPinout = [
    { pin: 'GPIO 21', function: 'I2C SDA (OLED Serial Data)', type: 'I2C Bus (SH1106 / SSD1306)' },
    { pin: 'GPIO 22', function: 'I2C SCL (OLED Serial Clock)', type: 'I2C Bus (SH1106 / SSD1306)' },
    { pin: '3V3', function: '3.3V DC Power to 1.3" OLED VCC', type: 'Power Rail' },
    { pin: 'GND', function: 'Common Ground to 1.3" OLED GND', type: 'Ground Rail' },
    { pin: 'Wi-Fi 802.11 b/g/n', function: 'Subscribes to MQTT Broker topic over WSS', type: 'Wireless Network' },
    { pin: 'Hardware Buttons', function: 'NONE REQUIRED (Phone/Browser is the controller)', type: 'Zero-Switch Design' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 text-emerald-700" />
            <span>ESP32 + 1.3" OLED Wireless Secondary Display</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            ESP32 Hardware & MQTT Ecosystem
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Real-time telemetry bridge between Bharat Yatra and physical ESP32 over MQTT WebSockets.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('GAME_DASHBOARD')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-center shadow-xs cursor-pointer"
        >
          <span>Return to Game Board</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Architecture Philosophy Banner */}
      <div className="bg-linear-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-300/80 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-800 border border-amber-400/30 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm">
                Phone is the Sole Controller
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                NO BUTTONS ON HARDWARE
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Roll dice, choose A/B/C/D answers, and select players on the phone screen. The ESP32 with 1.3" OLED functions as an elegant, wireless secondary scoreboard and question viewer.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-center font-mono text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-slate-700 flex items-center gap-1.5 shadow-xs">
            <Tv className="w-3.5 h-3.5 text-amber-600" />
            1.3" OLED (SH1106 / SSD1306)
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-200/80 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('MQTT_BRIDGE')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'MQTT_BRIDGE'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50 border border-amber-200/60'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>MQTT Connection & Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('OLED_VIEW')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'OLED_VIEW'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50 border border-amber-200/60'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>1.3" OLED Virtual Display</span>
        </button>

        <button
          onClick={() => setActiveTab('INTERACTIVE_SIM')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'INTERACTIVE_SIM'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50 border border-amber-200/60'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Interactive Board Tester</span>
        </button>

        <button
          onClick={() => setActiveTab('CIRCUIT')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'CIRCUIT'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50 border border-amber-200/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Circuit & Wiring (I2C)</span>
        </button>
      </div>

      {/* Tab 1: MQTT Connection & Telemetry */}
      {activeTab === 'MQTT_BRIDGE' && (
        <div className="space-y-6">
          <HardwareConnectionPanel />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-serif-heritage font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-amber-600" />
                  Live 1.3" OLED Secondary Screen Mirror
                </span>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  MQTT LIVE
                </span>
              </div>
              <OLED13Display
                currentEvent={currentMqttEvent}
                connectionStatus={mqttStatus}
                roomId={roomId}
              />
            </div>

            <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-serif-heritage font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-amber-600" />
                  18 Supported Telemetry Events
                </span>
                <span className="text-[10px] font-mono text-slate-500">Website ➔ ESP32</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                The website acts as the <strong>single source of truth</strong>. All actions occurring on the phone/browser dispatch JSON telemetry to the MQTT broker:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                {[
                  'GAME_START',
                  'PLAYER',
                  'DICE_RESULT',
                  'POSITION',
                  'LOCATION',
                  'QUESTION',
                  'OPTIONS',
                  'TIMER',
                  'SCORE',
                  'CORRECT',
                  'WRONG',
                  'TIMEOUT',
                  'SPECIAL_BLOCK',
                  'HERITAGE_HUNT',
                  'HERITAGE_RESULT',
                  'GAME_STATE',
                  'TURN_COMPLETE',
                  'GAME_END'
                ].map((evt) => (
                  <div
                    key={evt}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-center font-bold text-[10px]"
                  >
                    {evt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Full 1.3" OLED Virtual Display */}
      {activeTab === 'OLED_VIEW' && (
        <div className="space-y-6">
          <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif-heritage text-lg font-bold text-slate-900">
                  Physical 1.3-inch OLED (128x64) Screen Simulator
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Demonstrates how the SH1106 / SSD1306 monochrome screen renders game data with word wrapping and paging.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold self-start sm:self-center">
                Room: {roomId}
              </span>
            </div>

            <div className="max-w-xl mx-auto py-4">
              <OLED13Display
                currentEvent={currentMqttEvent}
                connectionStatus={mqttStatus}
                roomId={roomId}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Board Tester */}
      {activeTab === 'INTERACTIVE_SIM' && (
        <div className="space-y-6">
          <div className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-xs text-xs text-slate-600 flex items-center justify-between">
            <span>
              Use this widget to trigger test events or simulate hardware actions directly in the browser.
            </span>
            <span className="font-mono text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Debug Environment
            </span>
          </div>

          <ESP32SimulatorWidget fullScreen={true} />
        </div>
      )}

      {/* Tab 4: Circuit & Wiring */}
      {activeTab === 'CIRCUIT' && (
        <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-serif-heritage text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              ESP32 Circuit Pinout & Hardware Architecture
            </h3>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
              I2C Bus: SDA 21, SCL 22
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong className="block font-bold text-sm mb-1">
              Minimalist Display-Only Hardware Bill of Materials (BOM):
            </strong>
            1× ESP32-WROOM-32 development board, 1× 1.3-inch OLED display (SH1106 or SSD1306, I2C 128×64), and 4× jumper wires (VCC, GND, SDA, SCL).
            No tactile push buttons, resistors, or debounce capacitors are required because players interact exclusively through their mobile phones or browser.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {gpioPinout.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded text-[11px]">
                    {item.pin}
                  </span>
                  <span className="font-medium text-slate-800">{item.function}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono text-right">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
