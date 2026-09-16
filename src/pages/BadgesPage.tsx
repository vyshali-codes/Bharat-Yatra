import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BADGES_DATA } from '../data/badges';
import { Badge } from '../types/game';
import { Award, Lock, CheckCircle, Users } from 'lucide-react';

export const BadgesPage: React.FC = () => {
  const { players } = useGame();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number>(players[0]?.id || 1);

  const selectedPlayer = players.find((p) => p.id === selectedPlayerId) || players[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>Achievements & Milestone Unlocks</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            Heritage Badges & Trophies
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Track unlocked badges across historical trivia, speed responses, and monument discoveries.
          </p>
        </div>

        {/* Player Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {players.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlayerId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedPlayerId === p.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{p.tokenSymbol}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BADGES_DATA.map((badge) => {
          const isUnlocked = selectedPlayer?.badges?.includes(badge.id);

          return (
            <div
              key={badge.id}
              id={`badge-card-${badge.id}`}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-linear-to-br from-amber-50 via-white to-amber-100/50 border-amber-400 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs ${
                      isUnlocked
                        ? 'bg-amber-100 border border-amber-300'
                        : 'bg-slate-200 border border-slate-300 text-slate-400'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isUnlocked
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>UNLOCKED</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-slate-500" />
                        <span>LOCKED</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="font-serif-heritage text-base font-bold text-slate-900">
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{badge.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Category: {badge.category}</span>
                <span className="font-bold text-amber-800">
                  {isUnlocked ? 'Earned' : 'In Progress'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
