import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { SpecialBlockBadge } from './SpecialBlockBadge';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  MapPin,
  Tag,
  Timer,
  AlertTriangle,
  Dices
} from 'lucide-react';
import { CategoryType } from '../types/game';

export const QuestionCard: React.FC = () => {
  const {
    currentQuestion,
    currentLocation,
    currentPlayer,
    currentPlayerIndex,
    timerSeconds,
    phase,
    submitAnswer,
    lastAnswerResult,
    nextTurn,
    rollDice,
    isRolling,
    activeCategory,
    selectedCategories,
    selectCategoryForQuestion
  } = useGame();

  const [isLocked, setIsLocked] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  // Reset answer locking and return guard when phase changes
  useEffect(() => {
    if (phase === 'QUESTION') {
      setIsLocked(false);
      setIsReturning(false);
    } else if (phase === 'READY_TO_ROLL') {
      setIsLocked(false);
      setIsReturning(false);
    }
  }, [phase, currentQuestion?.id]);

  const handleReturnToGame = () => {
    if (isReturning) return;
    setIsReturning(true);
    nextTurn();
  };

  // 1. DASHBOARD TURN CARD: Rendered when not in question or review phase
  if (phase !== 'QUESTION' && phase !== 'ANSWER_REVIEW') {
    return (
      <div
        id="player-turn-dashboard-card"
        className="flex flex-col bg-white border border-amber-200/90 rounded-2xl p-5 shadow-xs text-center"
      >
        <div className="flex items-center justify-center gap-1.5 mb-2 text-[11px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 py-1 px-3 rounded-full border border-amber-200 mx-auto">
          <span>🇮🇳 BHARAT YATRA</span>
        </div>

        <div className="my-2">
          <div className="flex items-center justify-center gap-2 text-xl font-black text-slate-900">
            <span className="text-2xl">{currentPlayer.tokenSymbol}</span>
            <span>PLAYER {currentPlayerIndex + 1}&apos;S TURN</span>
          </div>
          <p className="text-xs font-bold text-amber-900 mt-0.5">{currentPlayer.name}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 my-3 text-left space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Position:</span>
            <span className="font-bold text-slate-900 text-sm">
              Block {currentPlayer.position}, {currentLocation.city}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Heritage Site:</span>
            <span className="font-medium text-slate-700 truncate max-w-[200px]" title={currentLocation.heritageSite}>
              {currentLocation.heritageSite}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Score:</span>
            <span className="font-mono font-black text-amber-800 text-sm">
              {currentPlayer.score} pts
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-3 font-medium">
          Ready for your turn? Roll the dice to advance to your next milestone!
        </p>

        <button
          id="dashboard-roll-dice-btn"
          onClick={rollDice}
          disabled={isRolling || phase !== 'READY_TO_ROLL'}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Dices className="w-5 h-5" />
          <span>ROLL DICE</span>
        </button>
      </div>
    );
  }

  // 2. PROMINENT RESULT OVERLAY / POP-UP (phase === 'ANSWER_REVIEW')
  if (phase === 'ANSWER_REVIEW' && lastAnswerResult) {
    const isCorrect = lastAnswerResult.isCorrect;
    const isTimeout = lastAnswerResult.isTimeout;
    const q = currentQuestion;

    return (
      <div
        id="result-screen-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      >
        <div
          id="result-popup-panel"
          className={`w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 my-auto text-center animate-in zoom-in-95 duration-200 ${
            isCorrect
              ? 'border-emerald-400'
              : isTimeout
              ? 'border-amber-400'
              : 'border-rose-400'
          }`}
        >
          {/* Outcome Visual Icon */}
          <div className="flex justify-center mb-3">
            {isCorrect ? (
              <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center ring-8 ring-emerald-50 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            ) : isTimeout ? (
              <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center ring-8 ring-amber-50 shadow-inner">
                <Clock className="w-12 h-12" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center ring-8 ring-rose-50 shadow-inner">
                <XCircle className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Large Outcome Title */}
          <h2
            id="result-outcome-heading"
            className={`font-serif-heritage text-3xl sm:text-4xl font-black tracking-tight ${
              isCorrect
                ? 'text-emerald-950'
                : isTimeout
                ? 'text-amber-950'
                : 'text-rose-950'
            }`}
          >
            {isCorrect ? 'CORRECT!' : isTimeout ? "TIME'S UP!" : 'WRONG ANSWER'}
          </h2>

          {/* Points Callout with Short Entrance Animation */}
          <div className="my-4 flex items-center justify-center">
            {isCorrect ? (
              <div
                id="result-points-badge"
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-mono font-black text-3xl sm:text-4xl shadow-xl ring-4 ring-emerald-200/80 inline-flex items-center justify-center gap-2.5 animate-in zoom-in-75 duration-300"
              >
                <Zap className="w-7 h-7 text-amber-300 animate-bounce" />
                <span>+{lastAnswerResult.pointsAwarded} POINTS</span>
              </div>
            ) : (
              <div
                id="result-points-badge"
                className={`py-3 px-8 rounded-2xl bg-slate-900 font-mono font-black text-3xl sm:text-4xl shadow-xl inline-flex items-center justify-center gap-2.5 animate-in zoom-in-75 duration-300 ${
                  isTimeout
                    ? 'text-amber-400 ring-4 ring-amber-200/80'
                    : 'text-rose-400 ring-4 ring-rose-200/80'
                }`}
              >
                <span>+0 POINTS</span>
              </div>
            )}
          </div>

          {/* Response Time & Speed Tier Information */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600 mb-4 font-semibold">
            {isCorrect && lastAnswerResult.responseTimeSec !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
                <Timer className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lastAnswerResult.responseTimeSec.toFixed(1)}s</span>
                <span>•</span>
                <span>{lastAnswerResult.speedTier}</span>
              </span>
            )}
            {isTimeout && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>45-second timer expired</span>
              </span>
            )}
          </div>

          {/* Special Challenge Bonus / Penalty Notification */}
          {lastAnswerResult.specialEffectNote && (
            <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
              {lastAnswerResult.specialEffectNote}
            </div>
          )}

          {/* Explicit Answer Overview Box */}
          <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 space-y-2 text-xs sm:text-sm">
            {!isCorrect && !isTimeout && (
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wider">
                  Option selected:
                </span>
                <span className="font-bold text-rose-700">
                  {lastAnswerResult.selectedOption}:{' '}
                  {lastAnswerResult.selectedOptionText ||
                    q?.options[lastAnswerResult.selectedOption!] ||
                    ''}
                </span>
              </div>
            )}

            <div>
              <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wider">
                {isCorrect ? 'Answer:' : 'Correct Answer:'}
              </span>
              <span className="font-bold text-emerald-800">
                {lastAnswerResult.correctAnswer || q?.correctAnswer}:{' '}
                {lastAnswerResult.correctAnswerText ||
                  (q ? q.options[q.correctAnswer] : '') ||
                  ''}
              </span>
            </div>

            {lastAnswerResult.explanation && (
              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                  Heritage Insight:
                </span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  {lastAnswerResult.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Exactly ONE Clear Button: [ RETURN TO GAME ] */}
          <button
            id="return-to-game-btn"
            onClick={handleReturnToGame}
            disabled={isReturning}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <span>RETURN TO GAME</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // 3. QUESTION SCREEN MODAL OVERLAY (phase === 'QUESTION')
  const q = currentQuestion;
  const optionsKeys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  const timerPercentage = Math.max(0, Math.min(100, (timerSeconds / 45) * 100));
  const elapsedEstimate = Math.max(0, 45 - timerSeconds);

  const getSpeedTierPreview = () => {
    if (elapsedEstimate <= 5) return { text: '20 pts tier', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (elapsedEstimate <= 10) return { text: '18 pts tier', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (elapsedEstimate <= 15) return { text: '16 pts tier', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (elapsedEstimate <= 20) return { text: '14 pts tier', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    if (elapsedEstimate <= 25) return { text: '12 pts tier', color: 'bg-orange-50 text-orange-700 border-orange-200' };
    if (elapsedEstimate <= 30) return { text: '10 pts tier', color: 'bg-orange-100 text-orange-800 border-orange-300' };
    if (elapsedEstimate <= 35) return { text: '8 pts tier', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    if (elapsedEstimate <= 40) return { text: '6 pts tier', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    return { text: '5 pts tier', color: 'bg-red-100 text-red-800 border-red-300' };
  };

  const currentTier = getSpeedTierPreview();

  const handleOptionClick = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isLocked || phase !== 'QUESTION') return;
    setIsLocked(true);
    submitAnswer(key);
  };

  return (
    <div
      id="question-screen-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
    >
      <div
        id="question-panel"
        className="w-full max-w-2xl bg-white border-2 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-2xl transition-all my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Context Header: Location and Category */}
        <div
          id="question-context-banner"
          className="bg-linear-to-r from-amber-50 via-orange-50/60 to-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-4 shadow-2xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Location Context */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
                  Milestone #{currentLocation.id} • {currentLocation.state}
                </span>
                <h4 className="font-serif-heritage text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {currentLocation.city} ({currentLocation.heritageSite})
                </h4>
              </div>
            </div>

            {/* Special Block or Category Badge */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {currentLocation.specialBlock !== 'Normal' ? (
                <SpecialBlockBadge blockType={currentLocation.specialBlock} size="sm" />
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 border border-amber-300 text-amber-900">
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  {activeCategory || q?.category || 'General Heritage'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Category Selector Switcher */}
        {selectedCategories.length > 1 && (
          <div className="mb-4 p-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3 text-amber-600" />
                Change Category for this Question:
              </span>
              <span className="text-[10px] text-amber-700 font-semibold">Live Switch</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => selectCategoryForQuestion(cat)}
                    disabled={isLocked}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50 ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-xs font-bold'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50 hover:text-amber-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 45s Countdown Timer Bar */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Clock
                className={`w-4 h-4 ${
                  timerSeconds <= 10
                    ? 'text-red-500 animate-bounce'
                    : timerSeconds <= 20
                    ? 'text-amber-500'
                    : 'text-emerald-600'
                }`}
              />
              <span className="font-mono text-sm font-black">
                {timerSeconds}s
              </span>
              <span className="text-slate-400 font-normal">/ 45s remaining</span>
            </div>

            {/* Current speed tier badge */}
            <div className="flex items-center gap-1.5">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border transition-colors ${currentTier.color}`}
              >
                {currentTier.text}
              </span>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              style={{ width: `${timerPercentage}%` }}
              className={`h-full transition-all duration-300 rounded-full ${
                timerSeconds <= 10
                  ? 'bg-red-500 animate-pulse'
                  : timerSeconds <= 20
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="my-3">
          <h3 className="font-serif-heritage text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            {q?.question}
          </h3>
        </div>

        {/* A / B / C / D Interactive Option Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
          {optionsKeys.map((key) => {
            const optionText = q?.options[key] || '';
            const btnStyle = isLocked
              ? 'bg-slate-100 border-slate-200 opacity-60 text-slate-600'
              : 'bg-slate-50 hover:bg-amber-50/80 border-slate-200 text-slate-800';

            return (
              <button
                key={key}
                id={`answer-btn-${key.toLowerCase()}`}
                onClick={() => handleOptionClick(key)}
                disabled={isLocked}
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-150 cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <span className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-900 font-black flex items-center justify-center shrink-0 text-xs border border-amber-500/20">
                  {key}
                </span>
                <span className="font-medium leading-snug flex-1 pt-0.5">{optionText}</span>
              </button>
            );
          })}
        </div>

        {/* Development Debug Panel */}
        {process.env.NODE_ENV !== 'production' && (
          <details className="mt-3 text-[10px] bg-slate-100 text-slate-700 p-2.5 rounded-xl border border-slate-300">
            <summary className="font-mono font-bold cursor-pointer select-none text-slate-600 hover:text-slate-900 flex items-center gap-1.5">
              <span>🛠 Dev Debug Info (Filtering & Randomization Inspector)</span>
            </summary>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-200 font-mono">
              <div>Location: <strong>{q?.locationName || currentLocation.city}</strong></div>
              <div>Position: <strong>{q?.locationId || currentLocation.id}</strong></div>
              <div>Selected Theme: <strong>{activeCategory || selectedCategories.join(', ')}</strong></div>
              <div>Question Category: <strong>{q?.category}</strong></div>
              <div>Block Type: <strong>{q?.blockType || currentLocation.specialBlock}</strong></div>
              <div>Correct Displayed Option: <strong className="text-emerald-700 font-bold">{q?.correctAnswer}</strong></div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};
