import React from 'react';
import { useGame } from '../context/GameContext';
import {
  Settings as SettingsIcon,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  Presentation,
  RotateCcw,
  Trash2,
  Radio,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetCurrentGame,
    clearHistory,
    connectionStatus,
    setConnectionMode,
    setActiveScreen
  } = useGame();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Game Preferences</span>
        </div>
        <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
          Settings & Configurations
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Customize timers, animations, sound effects, presentation layout, and hardware bridging.
        </p>
      </div>

      {/* Main Settings Switches */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-serif-heritage text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Gameplay Preferences
        </h3>

        {/* Sound FX Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-amber-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
            <div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm block">
                Sound Effects & Audio Beeps
              </span>
              <span className="text-[11px] text-slate-500">
                Play sound on dice rolls, correct answers, and speed bonuses
              </span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              settings.soundEnabled
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {settings.soundEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Animations Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm block">
                Visual Animations & Confetti
              </span>
              <span className="text-[11px] text-slate-500">
                Token smooth transitions, spinning dice, and celebratory fireworks
              </span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ animationsEnabled: !settings.animationsEnabled })}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              settings.animationsEnabled
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {settings.animationsEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Timer Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm block">
                15-Second Question Timer
              </span>
              <span className="text-[11px] text-slate-500">
                Enables speed countdown and +5 point bonus (turn off for leisurely study mode)
              </span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ timerEnabled: !settings.timerEnabled })}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              settings.timerEnabled
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {settings.timerEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Presentation Mode Quick Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <Presentation className="w-5 h-5 text-amber-600" />
            <div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm block">
                Presentation / Projector Layout
              </span>
              <span className="text-[11px] text-slate-500">
                Optimized high-visibility layout for classrooms, auditoriums, and projectors
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveScreen('PRESENTATION')}
            className="px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold transition hover:bg-slate-800 cursor-pointer"
          >
            Launch Mode
          </button>
        </div>
      </div>

      {/* Hardware & Device Bridge Section */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-serif-heritage text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
          <span>ESP32 Microcontroller Bridge</span>
          <span className="text-xs font-mono font-normal text-slate-500">
            Adapter Mode: {connectionStatus.mode}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Browser Simulator status */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950 font-bold block">
                Browser ESP32 Simulator: CONNECTED
              </strong>
              <p className="text-emerald-800 text-[11px] mt-0.5 leading-snug">
                The virtual SSD1306 OLED screen and tactile GPIO buttons are active and responsive.
              </p>
            </div>
          </div>

          {/* Real Physical ESP32 status */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Radio className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 font-bold block">
                Physical ESP32 WebSocket: READY (IDLE)
              </strong>
              <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">
                Adapter architecture accepts WebSocket endpoint (e.g., ws://192.168.4.1:81) for physical hardware.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => setConnectionMode('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              connectionStatus.mode === 'simulator'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Use Browser Simulator
          </button>
          <button
            onClick={() => setConnectionMode('websocket')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              connectionStatus.mode === 'websocket'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Use WebSocket Adapter
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset & Clear */}
      <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-xs space-y-3">
        <h3 className="font-serif-heritage text-base font-bold text-red-900 border-b border-red-100 pb-2">
          Data Management
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div>
            <span className="font-bold text-slate-800 text-xs sm:text-sm block">
              Reset Current Match
            </span>
            <span className="text-[11px] text-slate-500">
              Resets player positions to milestone #1 and scores to 0.
            </span>
          </div>

          <button
            id="reset-current-game-btn"
            onClick={resetCurrentGame}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Active Game</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div>
            <span className="font-bold text-slate-800 text-xs sm:text-sm block">
              Clear All Game History
            </span>
            <span className="text-[11px] text-slate-500">
              Wipes all saved past session scoreboards from local storage.
            </span>
          </div>

          <button
            id="clear-all-history-btn"
            onClick={clearHistory}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>
    </div>
  );
};
