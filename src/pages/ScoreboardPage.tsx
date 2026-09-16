import React from 'react';
import { useGame } from '../context/GameContext';
import { BADGES_DATA } from '../data/badges';
import { Trophy, Award, CheckCircle2, XCircle, Camera, MapPin, ArrowRight, Timer, Zap } from 'lucide-react';

export const ScoreboardPage: React.FC = () => {
  const { players, currentPlayer, round, setActiveScreen } = useGame();

  // Sort players by score descending to derive dynamic ranks
  const rankedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getBadgeById = (id: string) => {
    return BADGES_DATA.find((b) => b.id === id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Scoreboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Leaderboard & Analytics</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            Live Bharat Yatra Scoreboard
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Dynamic player standings, response speed metrics, accuracy, and achievement badges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-[10px] uppercase text-slate-500 block font-bold">Round</span>
            <span className="font-bold text-amber-900 text-base">{round}</span>
          </div>
          <button
            id="scoreboard-back-to-game-btn"
            onClick={() => setActiveScreen('GAME_DASHBOARD')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Resume Game</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ranks Cards (Mobile-friendly and Desktop responsive) */}
      <div className="space-y-3">
        {rankedPlayers.map((player, idx) => {
          const rank = idx + 1;
          const isCurrent = player.id === currentPlayer.id;
          const totalAnswered = player.questionsAnsweredCount || (player.correctAnswers + player.wrongAnswers);
          const accuracy = totalAnswered > 0 ? Math.round((player.correctAnswers / totalAnswered) * 100) : 0;

          // Response Time Metrics (Requirement 17)
          const avgResponseTime =
            totalAnswered > 0 && player.totalResponseTimeSec
              ? (player.totalResponseTimeSec / totalAnswered).toFixed(1)
              : null;
          const fastestResponse =
            player.fastestResponseTimeSec !== undefined
              ? player.fastestResponseTimeSec.toFixed(1)
              : null;

          return (
            <div
              key={player.id}
              id={`scoreboard-row-${player.id}`}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Rank, Avatar, Name, Location */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center text-lg shrink-0 shadow-xs">
                    {getRankMedal(rank)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{player.tokenSymbol}</span>
                      <h3 className="font-serif-heritage text-base sm:text-lg font-bold text-slate-900">
                        {player.name}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold uppercase">
                          Current Turn
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        Milestone #{player.position} / 80
                      </span>
                      <span>•</span>
                      <span>Accuracy: {accuracy}%</span>
                    </div>
                  </div>
                </div>

                {/* Right: Detailed Speed Metrics & Score */}
                <div className="flex items-center justify-between lg:justify-end gap-2.5 sm:gap-4 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 text-xs">
                  {/* Correct / Wrong */}
                  <div className="flex items-center gap-1.5">
                    <span
                      title="Correct Answers"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {player.correctAnswers}
                    </span>
                    <span
                      title="Wrong Answers"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-800 font-semibold border border-red-200"
                    >
                      <XCircle className="w-3.5 h-3.5 text-red-600" />
                      {player.wrongAnswers}
                    </span>
                  </div>

                  {/* Avg Response Time (Requirement 17) */}
                  <div
                    title="Average Response Time"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-semibold border border-blue-200 font-mono"
                  >
                    <Timer className="w-3.5 h-3.5 text-blue-600" />
                    <span>Avg: {avgResponseTime ? `${avgResponseTime}s` : '—'}</span>
                  </div>

                  {/* Fastest Answer (Requirement 17) */}
                  <div
                    title="Fastest Correct Answer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold border border-amber-200 font-mono"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Fastest: {fastestResponse ? `${fastestResponse}s` : '—'}</span>
                  </div>

                  {/* Heritage Hunts */}
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 text-rose-800 font-semibold border border-rose-200">
                    <Camera className="w-3.5 h-3.5 text-rose-600" />
                    <span>{player.heritageHuntsCompleted}</span>
                  </div>

                  {/* Badges count */}
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                    <Award className="w-3.5 h-3.5 text-purple-600" />
                    <span>{player.badges.length}</span>
                  </div>

                  {/* Total Score */}
                  <div className="text-right pl-2 shrink-0">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">
                      Points
                    </span>
                    <span className="font-mono font-black text-amber-900 text-xl sm:text-2xl">
                      {player.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Badges Unlock Preview */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif-heritage text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            Active Badges Unlocked in this Session
          </h3>
          <button
            onClick={() => setActiveScreen('BADGES')}
            className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
          >
            View All Badges &rarr;
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {players.flatMap((p) => p.badges).length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              No badges unlocked yet. Answer questions rapidly, visit special blocks, and scan monuments in Heritage Hunt to unlock!
            </p>
          ) : (
            players.flatMap((p) =>
              p.badges.map((bId) => {
                const b = getBadgeById(bId);
                if (!b) return null;
                return (
                  <span
                    key={`${p.id}-${b.id}`}
                    className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1 border border-amber-300"
                  >
                    <span>{b.icon}</span>
                    <span>{b.name}</span>
                    <span className="text-[10px] opacity-75">({p.name})</span>
                  </span>
                );
              })
            )
          )}
        </div>
      </div>
    </div>
  );
};
