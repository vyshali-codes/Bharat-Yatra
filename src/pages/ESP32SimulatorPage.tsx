import React from 'react';
import { ESP32SimulatorWidget } from '../components/ESP32SimulatorWidget';
import { useGame } from '../context/GameContext';
import { Cpu, Wifi, HelpCircle, ArrowRight, Layers, Terminal } from 'lucide-react';

export const ESP32SimulatorPage: React.FC = () => {
  const { setActiveScreen, connectionStatus } = useGame();

  const gpioPinout = [
    { pin: 'GPIO 21', function: 'I2C SDA (OLED Data line)', type: 'I2C Bus' },
    { pin: 'GPIO 22', function: 'I2C SCL (OLED Clock line)', type: 'I2C Bus' },
    { pin: 'GPIO 15', function: 'ROLL Pushbutton (Pull-up)', type: 'Tactile Switch' },
    { pin: 'GPIO 4', function: 'Option [A] Key Switch', type: 'Tactile Switch' },
    { pin: 'GPIO 16', function: 'Option [B] Key Switch', type: 'Tactile Switch' },
    { pin: 'GPIO 17', function: 'Option [C] Key Switch', type: 'Tactile Switch' },
    { pin: 'GPIO 5', function: 'Option [D] Key Switch', type: 'Tactile Switch' },
    { pin: 'GPIO 18', function: 'NEXT Player Button', type: 'Tactile Switch' },
    { pin: 'GPIO 19', function: 'HERITAGE Hunt Trigger Button', type: 'Tactile Switch' },
    { pin: 'GPIO 25', function: 'Piezo Buzzer (Audio alerts)', type: 'PWM Audio' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-700" />
            <span>Hardware Emulation Layer</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            Browser ESP32 Microcontroller Simulator
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Simulates physical ESP32-WROOM-32 with 0.96" SSD1306 OLED and hardware tactile switches.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('GAME_DASHBOARD')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-center shadow-xs cursor-pointer"
        >
          <span>View Game Board</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Hardware Simulator Unit */}
      <ESP32SimulatorWidget fullScreen={true} />

      {/* BHARAT YATRA Hardware Architecture & GPIO Pinout Documentation */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-serif-heritage text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            ESP32 Circuit Pinout & Hardware Architecture
          </h3>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
            Status: {connectionStatus.mode === 'simulator' ? 'Browser Emulated (Active)' : 'WebSocket Connected'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          For classroom, exhibition, and live demonstrations, the system is designed
          with clean adapter abstraction. The web UI seamlessly listens to either this in-browser simulator
          or a physical ESP32 streaming JSON packets over WebSocket or Serial.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {gpioPinout.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                  {item.pin}
                </span>
                <span className="font-medium text-slate-800">{item.function}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
