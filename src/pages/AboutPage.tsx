import React from 'react';
import { useGame } from '../context/GameContext';
import { SPECIAL_BLOCK_CONFIG } from '../data/locations';
import { SpecialBlockType } from '../types/game';
import {
  BookOpen,
  HelpCircle,
  Cpu,
  Layers,
  Award,
  Play,
  Presentation,
  CheckCircle2,
  Code2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveScreen } = useGame();

  const specialBlockKeys: SpecialBlockType[] = [
    'Golden Heritage',
    'Heritage Hunt',
    'Culture Challenge',
    'Heritage Challenge',
    'Festival Challenge',
    'Knowledge Ladder',
    'Myth/Misinformation Trap',
    'Final'
  ];

  const demoSteps = [
    { step: 1, title: 'Home Landing Screen', desc: 'Overview of Indian heritage journey with 80 milestones.' },
    { step: 2, title: 'Game Setup & Categories', desc: 'Configure 2 to 4 travelers, names, and 9 trivia categories.' },
    { step: 3, title: 'Game Dashboard', desc: 'Interactive map, animated dice, 45-second countdown timer.' },
    { step: 4, title: 'ESP32 Device Simulator', desc: 'Demonstrate synchronous OLED feedback and tactile GPIO buttons.' },
    { step: 5, title: 'Heritage Hunt (Computer Vision)', desc: 'Scan and identify monuments for +50 point bonuses.' },
    { step: 6, title: 'Scoreboard & Badges', desc: 'Review dynamic rankings, accuracy rates, and unlocked achievements.' },
    { step: 7, title: 'Presentation Mode', desc: 'Full-screen projector layout tailored for live demonstration and evaluation panels.' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Game Manual & Documentation</span>
        </div>
        <h1 className="font-serif-heritage text-3xl sm:text-4xl font-black text-slate-900">
          About Bharat Yatra
        </h1>
        <p className="font-serif-heritage text-base text-amber-800 font-bold mt-1">
          Travel India • Discover Heritage • Learn Through Play
        </p>
        <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-3xl leading-relaxed">
          Bharat Yatra is an educational board game that merges physical board gameplay and embedded microcontrollers
          (ESP32 + OLED) with responsive digital web interfaces and computer vision monument classification across 80 iconic Indian milestones.
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => setActiveScreen('GAME_SETUP')}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Game Now</span>
          </button>
          <button
            onClick={() => setActiveScreen('PRESENTATION')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Presentation className="w-4 h-4 text-amber-400" />
            <span>Open Presentation Mode</span>
          </button>
        </div>
      </div>

      {/* Rules of the Game */}
      <section className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-serif-heritage text-xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          Rules of Play
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">1</span>
              Turn-Based Movement
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Players start at Kanyakumari (Milestone 1) and roll the digital/ESP32 electronic dice (1–6)
              to advance across the 80 designated historical milestones of India.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">2</span>
              Timed Trivia Challenges
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Each milestone triggers a cultural, historical, or architectural question. Players have
              15 seconds to answer. Answering within the first 5 seconds awards a +5 point speed bonus!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">3</span>
              Special Block Mechanics
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Encounter Golden Heritage milestones, Knowledge Ladders, Myth Traps, and Festival
              blocks that modify point scores, jump forward, or challenge player wisdom.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">4</span>
              Winning the Game
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              The game culminates at milestone 80 (Ladakh). The winner is decided by accumulated
              cultural knowledge points, accuracy rate, and Heritage Hunt bonus points!
            </p>
          </div>
        </div>
      </section>

      {/* Special Blocks Guide */}
      <section className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-serif-heritage text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" />
          Special Block Guide
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {specialBlockKeys.map((type) => {
            const config = SPECIAL_BLOCK_CONFIG[type];
            return (
              <div
                key={type}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3"
              >
                <div
                  style={{ backgroundColor: config.color }}
                  className="w-9 h-9 rounded-xl text-white flex items-center justify-center text-base shrink-0 shadow-xs"
                >
                  {config.badge}
                </div>
                <div>
                  <h3 className="font-serif-heritage text-xs sm:text-sm font-bold text-slate-900">
                    {config.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {config.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Presentation Walkthrough */}
      <section className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-serif-heritage text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          Recommended Demonstration & Presentation Flow
        </h2>

        <div className="space-y-2">
          {demoSteps.map((s) => (
            <div
              key={s.step}
              className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/50 flex items-center gap-3 text-xs sm:text-sm"
            >
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                {s.step}
              </span>
              <div>
                <strong className="text-slate-900 font-bold">{s.title}: </strong>
                <span className="text-slate-600">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-3">
        <h2 className="font-serif-heritage text-lg font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-slate-700" />
          Technical Architecture & Design Discipline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block mb-1">Frontend Core</strong>
            React 18, TypeScript, Tailwind CSS, Vite, SVG procedural path map engine, Lucide icons.
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block mb-1">Device Bridge</strong>
            Pluggable <code className="font-mono">DeviceAdapter</code> architecture supporting both in-browser ESP32 OLED simulator and real WebSocket hardware.
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block mb-1">Offline-First & Zero Paid APIs</strong>
            Built strictly without paid APIs, Firebase, or external databases. Fully functional in any browser environment.
          </div>
        </div>
      </section>
    </div>
  );
};
