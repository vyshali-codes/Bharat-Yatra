import React from 'react';
import { useGame } from '../context/GameContext';
import { Dices, ArrowRight } from 'lucide-react';

export const DiceRoller: React.FC = () => {
  const {
    currentPlayer,
    currentPlayerIndex,
    diceValue,
    isRolling,
    phase,
    rollDice,
    nextTurn,
    currentLocation
  } = useGame();

  const canRoll = phase === 'READY_TO_ROLL' && !isRolling;

  // Dice dot configurations
  const renderDiceDots = (value: number | null) => {
    if (!value) return null;
    const dotPositions: Record<number, number[][]> = {
      1: [[50, 50]],
      2: [
        [28, 28],
        [72, 72]
      ],
      3: [
        [28, 28],
        [50, 50],
        [72, 72]
      ],
      4: [
        [28, 28],
        [72, 28],
        [28, 72],
        [72, 72]
      ],
      5: [
        [28, 28],
        [72, 28],
        [50, 50],
        [28, 72],
        [72, 72]
      ],
      6: [
        [28, 28],
        [72, 28],
        [28, 50],
        [72, 50],
        [28, 72],
        [72, 72]
      ]
    };

    const dots = dotPositions[value] || [[50, 50]];

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2">
        {dots.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="8.5"
            fill="#ea580c"
            className="drop-shadow-xs"
          />
        ))}
      </svg>
    );
  };

  return (
    <div
      id="dice-roller-widget"
      className="flex flex-col bg-white border border-amber-200/90 rounded-2xl p-4 shadow-sm"
    >
      {/* Current Turn Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl p-1.5 rounded-xl bg-amber-50 border border-amber-200">
            {currentPlayer.tokenSymbol}
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                PLAYER {currentPlayerIndex + 1}&apos;S TURN
              </span>
              <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-500"></span>
            </div>
            <h4 className="font-serif-heritage text-base font-bold text-slate-900 leading-tight">
              {currentPlayer.name}
            </h4>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500">Milestone</span>
          <p className="font-bold text-slate-900 text-sm">
            #{currentPlayer.position} / 80
          </p>
        </div>
      </div>

      {/* Center Dice Display Box */}
      <div className="flex items-center justify-center gap-4 py-2">
        {/* Animated 3D Dice Face */}
        <div
          className={`relative w-20 h-20 md:w-22 md:h-22 rounded-2xl bg-linear-to-br from-white via-amber-50 to-orange-100 border-2 border-amber-300 shadow-md flex items-center justify-center transition-all duration-300 ${
            isRolling ? 'rotate-180 scale-105 animate-spin' : 'hover:scale-105'
          }`}
        >
          {isRolling ? (
            <div className="flex flex-col items-center justify-center text-amber-700">
              <Dices className="w-8 h-8 animate-bounce" />
            </div>
          ) : diceValue ? (
            renderDiceDots(diceValue)
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <Dices className="w-8 h-8 text-amber-600/70" />
              <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                Roll
              </span>
            </div>
          )}
        </div>

        {/* Dice Outcome Announcement */}
        <div className="flex-1">
          {isRolling ? (
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest animate-pulse">
                {currentPlayer.name.toUpperCase()}
              </p>
              <h3 className="font-serif-heritage text-xl font-extrabold text-slate-800">
                ROLLING...
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Simulating electronic dice...</p>
            </div>
          ) : diceValue ? (
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                ROLLED {diceValue}
              </div>
              <h3 className="font-serif-heritage text-lg font-bold text-slate-900 leading-snug">
                MOVE {diceValue} {diceValue === 1 ? 'BLOCK' : 'BLOCKS'}
              </h3>
              <p className="text-xs text-slate-600">
                Reached: <span className="font-semibold text-amber-800">{currentLocation.city}</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500 font-medium">Ready for turn</p>
              <h3 className="font-serif-heritage text-base font-bold text-slate-800">
                Roll the Heritage Dice
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Advance across the 80 historical milestones
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Score and Position Mini Strip */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-amber-100 text-center text-xs">
        <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-200/50">
          <span className="text-slate-500 block">Total Score</span>
          <span className="font-bold text-amber-900 text-sm">{currentPlayer.score} pts</span>
        </div>
        <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/50">
          <span className="text-slate-500 block">Current City</span>
          <span className="font-bold text-emerald-900 text-sm truncate block">
            {currentLocation.city}
          </span>
        </div>
      </div>

      {/* Big Touch-Friendly Action Button */}
      <div className="mt-3">
        {phase === 'READY_TO_ROLL' && (
          <button
            id="roll-dice-btn"
            onClick={rollDice}
            disabled={!canRoll}
            className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Dices className="w-5 h-5" />
            <span>ROLL DICE</span>
          </button>
        )}

        {phase === 'ANSWER_REVIEW' && (
          <div className="w-full py-3 px-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium text-xs sm:text-sm text-center">
            Question result active. Click <strong className="font-bold text-slate-900">[ RETURN TO GAME ]</strong> to continue.
          </div>
        )}

        {phase === 'MOVING' && (
          <div className="w-full py-3 px-4 rounded-xl bg-amber-100 text-amber-900 font-semibold text-sm text-center animate-pulse">
            Advancing token to {currentLocation.city}...
          </div>
        )}

        {phase === 'HERITAGE_HUNT' && (
          <div className="w-full py-2.5 px-4 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 font-semibold text-xs text-center flex items-center justify-center gap-2">
            <span>🔍 Special Heritage Hunt milestone unlocked!</span>
          </div>
        )}
      </div>
    </div>
  );
};
