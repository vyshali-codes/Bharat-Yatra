import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Compass,
  Map,
  Play,
  Camera,
  Trophy,
  Award,
  History,
  Cpu,
  Settings as SettingsIcon,
  Presentation,
  Info,
  Menu,
  X,
  BookOpen
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeScreen, setActiveScreen, currentPlayer } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'HOME', label: 'Home', icon: Compass },
    { id: 'GAME_DASHBOARD', label: 'Play Game', icon: Play },
    { id: 'INDIA_MAP', label: '80 Map', icon: Map },
    { id: 'HERITAGE_HUNT', label: 'Heritage Hunt', icon: Camera },
    { id: 'SCOREBOARD', label: 'Scoreboard', icon: Trophy },
    { id: 'BADGES', label: 'Badges', icon: Award },
    { id: 'MONUMENTS', label: 'Monuments', icon: BookOpen },
    { id: 'ESP32_SIMULATOR', label: 'ESP32 Hardware', icon: Cpu },
    { id: 'HISTORY', label: 'History', icon: History },
    { id: 'SETTINGS', label: 'Settings', icon: SettingsIcon },
    { id: 'PRESENTATION', label: 'Presentation Mode', icon: Presentation },
    { id: 'ABOUT', label: 'About', icon: Info }
  ];

  const handleSelect = (id: string) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleSelect('HOME')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            id="nav-brand"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-600 via-orange-500 to-amber-400 p-0.5 shadow-sm group-hover:shadow-md transition">
              <div className="w-full h-full bg-[#FFFDF9] rounded-[10px] flex items-center justify-center text-xl">
                🇮🇳
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-heritage text-lg font-black tracking-wider text-slate-900 group-hover:text-amber-700 transition">
                  BHARAT YATRA
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300/60 uppercase">
                  HERITAGE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 tracking-tight font-medium hidden sm:block">
                Travel India • Discover Heritage • Learn Through Play
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 8).map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id.toLowerCase()}`}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs font-bold'
                      : 'text-slate-700 hover:text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Presentation Mode / Hardware Indicator & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              id="presentation-quick-btn"
              onClick={() => handleSelect('PRESENTATION')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-400" />
              <span>Presentation Mode</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-amber-800 hover:bg-amber-100/60 lg:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-[#FFFDF9] border-b border-amber-200 px-4 pt-2 pb-6 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={`mob-${item.id}`}
                  id={`mob-nav-${item.id.toLowerCase()}`}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition ${
                    isActive
                      ? 'bg-amber-500 text-white font-bold'
                      : 'text-slate-700 bg-amber-50/50 hover:bg-amber-100/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-600">
            <span>
              Active: <strong className="text-amber-800">{currentPlayer.name}</strong> (Milestone #{currentPlayer.position})
            </span>
            <span className="text-emerald-700 font-semibold">● ESP32 SIMULATOR ON</span>
          </div>
        </div>
      )}
    </header>
  );
};
