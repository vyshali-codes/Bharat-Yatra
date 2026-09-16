import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CATEGORIES_LIST } from '../data/questions';
import { CategoryType } from '../types/game';
import { Users, CheckSquare, Square, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const GameSetupPage: React.FC = () => {
  const { setActiveScreen, setupNewGame } = useGame();

  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>([
    'Arjun',
    'Ananya',
    'Vikram',
    'Meera'
  ]);
  const [selectedCats, setSelectedCats] = useState<CategoryType[]>([...CATEGORIES_LIST]);

  const handleNameChange = (index: number, val: string) => {
    setPlayerNames((prev) => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  const toggleCategory = (cat: CategoryType) => {
    setSelectedCats((prev) => {
      if (prev.includes(cat)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((c) => c !== cat);
      } else {
        return [...prev, cat];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedCats.length === CATEGORIES_LIST.length) {
      // Unselect all except first
      setSelectedCats([CATEGORIES_LIST[0]]);
    } else {
      setSelectedCats([...CATEGORIES_LIST]);
    }
  };

  const handleStartGame = () => {
    setupNewGame(playerCount, playerNames.slice(0, playerCount), selectedCats);
  };

  const tokens = ['🦚', '🐘', '🐅', '🪷'];
  const colorBorders = ['border-orange-400', 'border-emerald-400', 'border-blue-400', 'border-rose-400'];
  const colorBadges = ['bg-orange-100 text-orange-900', 'bg-emerald-100 text-emerald-900', 'bg-blue-100 text-blue-900', 'bg-rose-100 text-rose-900'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
      <div className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Voyage Configuration</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            Game & Player Setup
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Choose your travelers and quiz categories for the 80-milestone journey.
          </p>
        </div>

        {/* 1. Player Count Selection */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            Number of Players
          </label>

          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                id={`player-count-${count}-btn`}
                type="button"
                onClick={() => setPlayerCount(count)}
                className={`py-3 rounded-2xl border-2 font-bold text-sm sm:text-base flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  playerCount === count
                    ? 'border-amber-500 bg-amber-500 text-white shadow-md'
                    : 'border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-700'
                }`}
              >
                <span>{count} Players</span>
                <span className="text-xs opacity-80">
                  {count === 2 ? 'Duel' : count === 3 ? 'Trio' : 'Party'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Player Custom Names */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Player Names & Tokens
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: playerCount }).map((_, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border-2 ${colorBorders[idx]} bg-slate-50/60 flex items-center gap-3`}
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shrink-0 shadow-xs">
                  {tokens[idx]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${colorBadges[idx]}`}>
                      Player {idx + 1}
                    </span>
                  </div>
                  <input
                    id={`player-name-input-${idx + 1}`}
                    type="text"
                    value={playerNames[idx]}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    placeholder={`Enter Player ${idx + 1} name`}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Category Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Quiz Categories ({selectedCats.length} Selected)
            </label>

            <button
              id="select-all-categories-btn"
              type="button"
              onClick={handleSelectAll}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
            >
              {selectedCats.length === CATEGORIES_LIST.length ? (
                <>
                  <CheckSquare className="w-4 h-4 text-amber-600" />
                  <span>Deselect All</span>
                </>
              ) : (
                <>
                  <Square className="w-4 h-4 text-slate-400" />
                  <span>Select All</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = selectedCats.includes(cat);
              return (
                <button
                  key={cat}
                  id={`cat-checkbox-${cat.toLowerCase()}`}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100/70 border-amber-400 text-amber-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: BACK & CONTINUE */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 gap-4">
          <button
            id="setup-back-btn"
            type="button"
            onClick={() => setActiveScreen('HOME')}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>

          <button
            id="setup-continue-btn"
            type="button"
            onClick={handleStartGame}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <span>CONTINUE TO DASHBOARD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
