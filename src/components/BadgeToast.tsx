import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, X } from 'lucide-react';
import { Badge } from '../types/game';
import { BADGES_DATA } from '../data/badges';

export const BadgeToast: React.FC = () => {
  const { players } = useGame();
  const [toastBadge, setToastBadge] = useState<{ badge: Badge; playerName: string } | null>(null);

  // Keep track of badge count to trigger toast when a new badge is unlocked
  const [prevBadgeCount, setPrevBadgeCount] = useState<number>(0);

  useEffect(() => {
    const totalBadges = players.reduce((sum, p) => sum + p.badges.length, 0);

    if (totalBadges > prevBadgeCount && prevBadgeCount > 0) {
      // Find the most recently unlocked badge
      for (const p of players) {
        if (p.badges.length > 0) {
          const latestId = p.badges[p.badges.length - 1];
          const found = BADGES_DATA.find((b) => b.id === latestId);
          if (found) {
            setToastBadge({ badge: found, playerName: p.name });
            const timer = setTimeout(() => {
              setToastBadge(null);
            }, 4500);
            break;
          }
        }
      }
    }
    setPrevBadgeCount(totalBadges);
  }, [players, prevBadgeCount]);

  if (!toastBadge) return null;

  return (
    <div
      id="badge-unlock-toast"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 border-2 border-amber-400 text-white rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400 flex items-center justify-center text-xl shrink-0">
          {toastBadge.badge.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              BADGE UNLOCKED!
            </span>
            <button
              onClick={() => setToastBadge(null)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="font-serif-heritage text-sm font-bold text-slate-100 mt-0.5">
            {toastBadge.badge.name}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Earned by <strong className="text-amber-300">{toastBadge.playerName}</strong>: {toastBadge.badge.description}
          </p>
        </div>
      </div>
    </div>
  );
};
