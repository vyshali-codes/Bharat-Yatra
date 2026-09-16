import React from 'react';
import { useGame } from '../context/GameContext';
import { Compass, Cpu, BookOpen, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveScreen, connectionStatus } = useGame();

  return (
    <footer className="mt-auto border-t border-amber-200/80 bg-white/70 backdrop-blur-xs py-6 px-4 sm:px-6 lg:px-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs">
            🇮🇳
          </div>
          <span className="font-serif-heritage font-bold text-slate-900">
            BHARAT YATRA
          </span>
          <span>•</span>
          <span className="text-slate-500">
            Travel India • Discover Heritage • Learn Through Play
          </span>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center text-[11px] font-semibold">
          <button
            onClick={() => setActiveScreen('ABOUT')}
            className="hover:text-amber-800 transition cursor-pointer flex items-center gap-1"
          >
            <BookOpen className="w-3 h-3" />
            <span>How to Play & Rules</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setActiveScreen('ESP32_SIMULATOR')}
            className="hover:text-amber-800 transition cursor-pointer flex items-center gap-1"
          >
            <Cpu className="w-3 h-3" />
            <span>ESP32 Hardware Circuit</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setActiveScreen('PRESENTATION')}
            className="hover:text-amber-800 transition cursor-pointer flex items-center gap-1 text-amber-700 font-bold"
          >
            <span>Presentation Mode</span>
          </button>
        </div>

        <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Offline-First • Zero Paid APIs Required</span>
        </div>
      </div>
    </footer>
  );
};
