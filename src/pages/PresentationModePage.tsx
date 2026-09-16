import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { IndiaMapBoard } from '../components/IndiaMapBoard';
import { DiceRoller } from '../components/DiceRoller';
import { QuestionCard } from '../components/QuestionCard';
import { ESP32SimulatorWidget } from '../components/ESP32SimulatorWidget';
import { SpecialBlockBadge } from '../components/SpecialBlockBadge';
import {
  Presentation,
  X,
  Trophy,
  Camera,
  Cpu,
  MapPin,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const PresentationModePage: React.FC = () => {
  const {
    currentPlayer,
    currentLocation,
    round,
    players,
    setActiveScreen
  } = useGame();

  const [activeTab, setActiveTab] = useState<'game' | 'hardware'>('game');

  return (
    <div
      id="presentation-mode-root"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-3 sm:p-6"
    >
      {/* Top Presentation Bar */}
      <header className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xl">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-heritage text-lg sm:text-xl font-black text-amber-400 tracking-wide">
                BHARAT YATRA
              </h1>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase border border-amber-500/30">
                BHARAT YATRA PRESENTATION MODE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Round {round} • Active Stop: <span className="text-white font-bold">{currentLocation.city}</span> (#{currentLocation.id})
            </p>
          </div>
        </div>

        {/* Center Live Standings Strip */}
        <div className="hidden md:flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 font-mono text-xs">
          {players.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
                p.id === currentPlayer.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400'
              }`}
            >
              <span>{p.tokenSymbol}</span>
              <span>{p.name}:</span>
              <span className="text-white">{p.score} pts</span>
            </div>
          ))}
        </div>

        {/* Exit Mode Button */}
        <button
          id="exit-presentation-mode-btn"
          onClick={() => setActiveScreen('GAME_DASHBOARD')}
          className="px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Exit Presentation</span>
        </button>
      </header>

      {/* Main Presentation Layout: 3 Columns for Big Screen Projection */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Column (5 Cols): Large Board with High Visibility */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              80-Milestone National Route
            </span>
            <span className="text-amber-400 font-mono">
              Player {currentPlayer.name} at Stop #{currentPlayer.position}
            </span>
          </div>

          <div className="flex-1 min-h-[400px]">
            <IndiaMapBoard interactive={true} highlightCurrentPlayer={true} />
          </div>
        </div>

        {/* Middle Column (4 Cols): Active Gameplay (Dice & Questions) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* High-visibility active turn card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
            <DiceRoller />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex-1">
            <QuestionCard />
          </div>
        </div>

        {/* Right Column (3 Cols): Live ESP32 Hardware Unit + Quick Links */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center justify-between px-2 pb-2 text-xs text-emerald-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Live ESP32 + OLED
              </span>
              <span className="animate-pulse">● SYNCED</span>
            </div>

            <ESP32SimulatorWidget />
          </div>

          {/* Quick Heritage Hunt Trigger for Evaluator Demo */}
          <button
            id="presentation-trigger-hunt-btn"
            onClick={() => setActiveScreen('HERITAGE_HUNT')}
            className="p-3.5 rounded-2xl bg-linear-to-r from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>Launch Demo Heritage Hunt (+50 pts)</span>
          </button>
        </div>
      </main>
    </div>
  );
};
