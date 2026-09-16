import React from 'react';
import { useGame } from '../context/GameContext';
import {
  Compass,
  Play,
  Camera,
  Presentation,
  BookOpen,
  MapPin,
  Sparkles,
  Award,
  Cpu,
  Dices,
  Layers,
  ArrowRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveScreen } = useGame();

  const featureCards = [
    {
      title: '80 Heritage Locations',
      desc: 'From Vivekananda Rock in Kanyakumari to high mountain passes in Ladakh.',
      icon: MapPin,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Indian Culture & Lore',
      desc: 'Discover classical arts, ancient dynasties, traditions, architecture, and languages.',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-600',
      bg: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Interactive Quiz Engine',
      desc: '15-second timed questions across 9 categories with speed bonuses and special blocks.',
      icon: Layers,
      color: 'from-sky-500 to-blue-600',
      bg: 'bg-sky-50 border-sky-200'
    },
    {
      title: 'Heritage Hunt (Computer Vision)',
      desc: 'Upload monument photos to trigger demo AI visual classification and earn +50 points.',
      icon: Camera,
      color: 'from-rose-500 to-pink-600',
      bg: 'bg-rose-50 border-rose-200'
    },
    {
      title: 'Electronic Dice System',
      desc: 'Simulated ESP32 microcontroller with tactile buttons and OLED feedback.',
      icon: Dices,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Learn Through Play',
      desc: 'Engaging turn-based board game gameplay designed specifically for students and exhibitions.',
      icon: Award,
      color: 'from-yellow-500 to-amber-600',
      bg: 'bg-yellow-50 border-yellow-200'
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-heritage-pattern pb-12">
      {/* Hero Showcase Section */}
      <section className="relative px-4 pt-8 pb-12 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Subtle Heritage Crest Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide uppercase shadow-xs mb-6">
          <span className="text-sm">🇮🇳</span>
          <span>National Heritage Board Game</span>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="font-display-heritage text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          BHARAT YATRA
        </h1>

        <p className="font-serif-heritage text-lg sm:text-xl md:text-2xl text-amber-800 font-bold mt-2 tracking-wide">
          Travel India • Discover Heritage • Learn Through Play
        </p>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
          An interactive educational board game that takes players on a journey across India's
          history, culture, monuments, festivals, and traditions across 80 iconic milestones.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <button
            id="home-start-game-btn"
            onClick={() => setActiveScreen('GAME_SETUP')}
            className="px-6 py-3.5 rounded-xl bg-linear-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>START GAME</span>
          </button>

          <button
            id="home-heritage-hunt-btn"
            onClick={() => setActiveScreen('HERITAGE_HUNT')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-rose-50 border-2 border-rose-300 text-rose-700 font-bold text-base shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Camera className="w-5 h-5 text-rose-600" />
            <span>HERITAGE HUNT</span>
          </button>

          <button
            id="home-presentation-mode-btn"
            onClick={() => setActiveScreen('PRESENTATION')}
            className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Presentation className="w-4 h-4 text-amber-400" />
            <span>PRESENTATION MODE</span>
          </button>

          <button
            id="home-how-to-play-btn"
            onClick={() => setActiveScreen('ABOUT')}
            className="px-5 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>HOW TO PLAY</span>
          </button>
        </div>

        {/* Quick Demo Flow Banner */}
        <div className="mt-8 p-3 bg-amber-100/70 border border-amber-300/80 rounded-2xl max-w-3xl mx-auto flex items-center justify-between gap-2 text-xs text-amber-950 font-medium">
          <span className="font-bold flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-amber-800" />
            ESP32 Microcontroller Simulator Ready
          </span>
          <button
            id="home-esp32-quicklink"
            onClick={() => setActiveScreen('ESP32_SIMULATOR')}
            className="text-amber-900 hover:text-amber-950 font-bold underline flex items-center gap-1 cursor-pointer"
          >
            Launch Hardware Simulator <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Feature Cards Grid (Specified in User Prompt) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-4 w-full">
        <div className="text-center mb-6">
          <h2 className="font-serif-heritage text-xl sm:text-2xl font-bold text-slate-900">
            Interactive Heritage Board Game Elements
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Built for national competitions, college exhibitions, and digital classrooms
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                id={`feature-card-${idx}`}
                className={`p-5 rounded-2xl border shadow-xs transition hover:shadow-md ${feat.bg} flex flex-col justify-between`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl bg-linear-to-br ${feat.color} text-white flex items-center justify-center mb-3 shadow-xs`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-heritage text-base font-bold text-slate-900">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Summary Strip */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-10 w-full">
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-serif-heritage text-lg font-bold text-slate-900">
              Ready to embark on the journey across India?
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Assemble 2 to 4 players, pick your favorite cultural categories, and roll the dice!
            </p>
          </div>
          <button
            id="home-play-now-cta"
            onClick={() => setActiveScreen('GAME_SETUP')}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>START NEW VOYAGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
