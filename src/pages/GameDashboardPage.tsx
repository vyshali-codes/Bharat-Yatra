import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { IndiaMapBoard } from '../components/IndiaMapBoard';
import { DiceRoller } from '../components/DiceRoller';
import { QuestionCard } from '../components/QuestionCard';
import { ESP32SimulatorWidget } from '../components/ESP32SimulatorWidget';
import { SpecialBlockBadge } from '../components/SpecialBlockBadge';
import {
  Trophy,
  MapPin,
  Cpu,
  RefreshCw,
  Camera,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const GameDashboardPage: React.FC = () => {
  const {
    currentPlayer,
    currentLocation,
    round,
    players,
    setActiveScreen,
    resetCurrentGame
  } = useGame();

  const [showHardwareSimulator, setShowHardwareSimulator] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      {/* Top Banner: Game Title, Round, Current Player, Score */}
      <div
        id="dashboard-top-bar"
        className="bg-white border border-amber-200/90 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-heritage text-base sm:text-lg font-bold text-slate-900 leading-tight">
                BHARAT YATRA
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                Round {round}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Milestone #{currentLocation.id}: <span className="font-semibold text-slate-700">{currentLocation.city}</span> ({currentLocation.heritageSite})
            </p>
          </div>
        </div>

        {/* Current Player Pill & Quick Score */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
            <span className="text-base">{currentPlayer.tokenSymbol}</span>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase leading-none">Turn</span>
              <span className="font-bold text-slate-800">{currentPlayer.name}</span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-right">
            <span className="text-[10px] text-emerald-700 block uppercase leading-none">Score</span>
            <span className="font-black text-emerald-800 text-sm">{currentPlayer.score} pts</span>
          </div>

          <SpecialBlockBadge type={currentLocation.specialBlock} size="sm" />
        </div>

        {/* Dashboard Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Toggle ESP32 Simulator Widget */}
          <button
            id="toggle-esp32-drawer-btn"
            onClick={() => setShowHardwareSimulator(!showHardwareSimulator)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
            title="Toggle ESP32 Hardware Simulator"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">ESP32 Device</span>
            {showHardwareSimulator ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>

          {/* Heritage Hunt Quick Link */}
          <button
            id="dash-heritage-hunt-link"
            onClick={() => setActiveScreen('HERITAGE_HUNT')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Heritage Hunt</span>
          </button>

          {/* Scoreboard Link */}
          <button
            id="dash-scoreboard-link"
            onClick={() => setActiveScreen('SCOREBOARD')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="View Live Scoreboard"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      </div>

      {/* Embedded Hardware ESP32 Drawer (if toggled open) */}
      {showHardwareSimulator && (
        <div className="p-4 bg-slate-950/90 rounded-3xl border-2 border-emerald-500/50 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between mb-3 text-xs text-emerald-400 font-mono px-2">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE BROWSER ESP32 + OLED SIMULATOR (Synchronized with game board)
            </span>
            <button
              onClick={() => setShowHardwareSimulator(false)}
              className="text-slate-400 hover:text-white"
            >
              Close Simulator ✕
            </button>
          </div>
          <ESP32SimulatorWidget />
        </div>
      )}

      {/* Main Responsive Layout: Map on left (desktop), Dice & Question on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (Desktop 7 cols): Interactive India Board */}
        <div className="lg:col-span-7 flex flex-col">
          <IndiaMapBoard />
        </div>

        {/* Right Column (Desktop 5 cols): Dice, Question, Live Mini Score */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Animated Dice Roller */}
          <DiceRoller />

          {/* 15s Timer & Question Card */}
          <QuestionCard />

          {/* Multi-Player Mini Standings */}
          <div className="bg-white border border-amber-200/80 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                Player Standings
              </span>
              <button
                onClick={() => setActiveScreen('SCOREBOARD')}
                className="text-amber-800 hover:underline font-semibold"
              >
                Full Board &rarr;
              </button>
            </div>

            <div className="space-y-1.5">
              {players.map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs transition ${
                    p.id === currentPlayer.id
                      ? 'bg-amber-100/70 border border-amber-300/80 font-bold text-amber-950'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{p.tokenSymbol}</span>
                    <span>{p.name}</span>
                    {p.id === currentPlayer.id && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500 text-white">
                        Turn
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">Stop #{p.position}</span>
                    <span className="font-mono font-bold text-slate-900">{p.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
