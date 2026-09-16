import React from 'react';
import { SpecialBlockType, DifficultyLevel } from '../types/game';
import {
  Sparkles,
  MapPin,
  Camera,
  Crown,
  Layers,
  AlertTriangle,
  Compass,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface SpecialBlockModalProps {
  isOpen: boolean;
  blockType: SpecialBlockType;
  city: string;
  state: string;
  difficulty: DifficultyLevel;
  onStart: () => void;
  onClose?: () => void;
}

export const SpecialBlockModal: React.FC<SpecialBlockModalProps> = ({
  isOpen,
  blockType,
  city,
  state,
  difficulty,
  onStart,
  onClose
}) => {
  if (!isOpen) return null;

  const isHeritageHunt = blockType === 'Heritage Hunt';
  const isGoldenHeritage = blockType === 'Golden Heritage';
  const isKnowledgeLadder = blockType === 'Knowledge Ladder';
  const isMythTrap = blockType === 'Myth/Misinformation Trap';

  // Choose styling themes based on special block type
  const getThemeConfig = () => {
    if (isHeritageHunt) {
      return {
        badgeIcon: <Camera className="w-4 h-4 text-rose-300" />,
        badgeText: '🏛 HERITAGE HUNT UNLOCKED!',
        badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
        cardBorder: 'border-rose-500/50 shadow-rose-950/50',
        glowBg: 'from-rose-950/40 via-slate-900 to-slate-950',
        teaser: '🔎 A heritage mystery awaits... Identify the landmark from cryptic clues!',
        buttonText: 'START HUNT',
        buttonClass: 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-rose-600/30'
      };
    }
    if (isGoldenHeritage) {
      return {
        badgeIcon: <Crown className="w-4 h-4 text-amber-300" />,
        badgeText: '👑 GOLDEN HERITAGE UNLOCKED!',
        badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
        cardBorder: 'border-amber-500/60 shadow-amber-950/50',
        glowBg: 'from-amber-950/40 via-slate-900 to-slate-950',
        teaser: '👑 High-stakes challenge ahead! Earn DOUBLE challenge points!',
        buttonText: 'START CHALLENGE',
        buttonClass: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black shadow-amber-500/30'
      };
    }
    if (isKnowledgeLadder) {
      return {
        badgeIcon: <Layers className="w-4 h-4 text-blue-300" />,
        badgeText: '🪜 KNOWLEDGE LADDER UNLOCKED!',
        badgeClass: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
        cardBorder: 'border-blue-500/50 shadow-blue-950/50',
        glowBg: 'from-blue-950/40 via-slate-900 to-slate-950',
        teaser: '🪜 Correct answer unlocks +20 points and leaps +3 blocks forward!',
        buttonText: 'START CHALLENGE',
        buttonClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
      };
    }
    if (isMythTrap) {
      return {
        badgeIcon: <AlertTriangle className="w-4 h-4 text-red-300" />,
        badgeText: '⚠️ MYTH TRAP UNLOCKED!',
        badgeClass: 'bg-red-950/80 text-red-300 border-red-500/40',
        cardBorder: 'border-red-500/50 shadow-red-950/50',
        glowBg: 'from-red-950/40 via-slate-900 to-slate-950',
        teaser: '⚠️ Separate fact from fiction! Incorrect answers cause -2 blocks penalty!',
        buttonText: 'START CHALLENGE',
        buttonClass: 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-red-600/30'
      };
    }
    return {
      badgeIcon: <Sparkles className="w-4 h-4 text-amber-300" />,
      badgeText: '✨ SPECIAL BLOCK UNLOCKED!',
      badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      cardBorder: 'border-amber-500/40 shadow-amber-950/40',
      glowBg: 'from-slate-900 via-slate-900 to-slate-950',
      teaser: 'YOUR CHALLENGE IS READY.',
      buttonText: 'START CHALLENGE',
      buttonClass: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-600/30'
    };
  };

  const theme = getThemeConfig();

  // Difficulty badge colors
  const getDifficultyBadge = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'EASY':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'MEDIUM':
        return 'bg-sky-950/80 text-sky-300 border-sky-500/40';
      case 'HARD':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'EXPERT':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div
      id="special-block-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        id="special-block-modal-content"
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${theme.glowBg} border-2 ${theme.cardBorder} shadow-2xl text-center text-white space-y-5 animate-in zoom-in-95 duration-300`}
      >
        {/* Top Floating Badge */}
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-black tracking-wider uppercase shadow-inner ${theme.badgeClass}`}
          >
            {theme.badgeIcon}
            <span>{theme.badgeText}</span>
          </div>
        </div>

        {/* Challenge Block Title */}
        <div className="space-y-1">
          <h2 className="font-serif-heritage text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
            {blockType.toUpperCase()}
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-slate-300 text-sm font-medium">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              {city}, <span className="text-slate-400">{state}</span>
            </span>
          </div>
        </div>

        {/* Subtle Difficulty Level Pill */}
        <div className="flex items-center justify-center gap-3">
          <span
            id="modal-difficulty-tag"
            className={`px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-widest uppercase ${getDifficultyBadge(
              difficulty
            )}`}
          >
            DIFFICULTY: {difficulty}
          </span>
        </div>

        {/* Mystery/Challenge Teaser */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed">
          <p className="font-medium text-amber-200/90">{theme.teaser}</p>
        </div>

        {/* Start Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="start-challenge-modal-btn"
            onClick={onStart}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-black tracking-wider uppercase transition transform active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer ${theme.buttonClass}`}
          >
            <span>{theme.buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-300 underline transition cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};
