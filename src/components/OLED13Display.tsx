import React, { useState, useEffect, useMemo } from 'react';
import { MqttGameEvent } from '../types/mqtt';
import { Wifi, WifiOff, Clock, Smartphone, Radio } from 'lucide-react';

interface Props {
  currentEvent: MqttGameEvent | null;
  connectionStatus: 'Connected' | 'Connecting' | 'Disconnected';
  roomId: string;
  className?: string;
}

/**
 * Word wraps a string to fit within a given character width per line
 */
function wrapText(text: string, maxCharsPerLine: number = 21): string[] {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      if (word.length > maxCharsPerLine) {
        // Break very long words
        let remaining = word;
        while (remaining.length > maxCharsPerLine) {
          lines.push(remaining.slice(0, maxCharsPerLine));
          remaining = remaining.slice(maxCharsPerLine);
        }
        currentLine = remaining;
      } else {
        currentLine = word;
      }
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Emulates the physical 1.3-inch (128x64) I2C OLED display driven by ESP32 over MQTT.
 * Features 12 compact display screens with word wrapping, automatic scrolling, and paging.
 */
export const OLED13Display: React.FC<Props> = ({
  currentEvent,
  connectionStatus,
  roomId,
  className = ''
}) => {
  // Paging / scrolling state for long text content
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [optionsPage, setOptionsPage] = useState<number>(0); // 0 = A&B, 1 = C&D
  const [questionSubScreen, setQuestionSubScreen] = useState<'QUESTION' | 'OPTIONS' | 'ANSWER_PROMPT'>('QUESTION');

  // Reset page indices whenever the event changes
  useEffect(() => {
    setScrollIndex(0);
    setOptionsPage(0);
    if (currentEvent?.type === 'QUESTION') {
      setQuestionSubScreen('QUESTION');
    }
  }, [currentEvent]);

  // Automatic question cycle: cycles between Question text -> Options -> Answer on Phone
  useEffect(() => {
    if (!currentEvent || currentEvent.type !== 'QUESTION') return;

    const interval = setInterval(() => {
      setQuestionSubScreen((prev) => {
        if (prev === 'QUESTION') return 'OPTIONS';
        if (prev === 'OPTIONS') return 'ANSWER_PROMPT';
        return 'QUESTION';
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [currentEvent]);

  // Options paging loop: if in OPTIONS mode, alternate between A-B and C-D every 2.5s
  useEffect(() => {
    if (!currentEvent || currentEvent.type !== 'QUESTION' || questionSubScreen !== 'OPTIONS') return;

    const interval = setInterval(() => {
      setOptionsPage((prev) => (prev === 0 ? 1 : 0));
    }, 2500);

    return () => clearInterval(interval);
  }, [currentEvent, questionSubScreen]);

  // Scroll ticker for long questions or special challenges
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => prev + 1);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Determine current active screen (Screens 1 through 12)
  const screenContent = useMemo(() => {
    if (!currentEvent) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-1">
          <p className="text-xs font-bold tracking-widest text-cyan-300 uppercase">BHARAT YATRA</p>
          <p className="text-[11px] text-cyan-400 font-mono">1.3" OLED ACTIVE</p>
          <p className="text-[10px] text-amber-300 font-mono animate-pulse">ROLL ON PHONE</p>
        </div>
      );
    }

    switch (currentEvent.type) {
      // SCREEN 1 & SCREEN 12: Player turn & roll instruction
      case 'PLAYER': {
        const isNextPlayer = currentEvent.status === 'READY_TO_ROLL' || currentEvent.status === 'NEXT';
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-1 font-mono">
            <p className="text-[11px] font-bold text-amber-300 tracking-wider">BHARAT YATRA</p>
            <p className="text-xs font-black text-white uppercase">PLAYER {currentEvent.player}</p>
            <p className="text-[11px] font-bold text-cyan-300 tracking-wide">
              {isNextPlayer ? 'YOUR TURN' : 'ACTIVE'}
            </p>
            <div className="mt-0.5 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] text-cyan-200 font-bold animate-pulse">
              ROLL ON PHONE
            </div>
          </div>
        );
      }

      // SCREEN 2: Dice roll result
      case 'DICE_RESULT': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-0.5">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">DICE</p>
            <div className="w-12 h-12 rounded-lg border-2 border-cyan-400 bg-cyan-950/60 flex items-center justify-center shadow-inner my-0.5">
              <span className="text-2xl font-black text-white">{currentEvent.value}</span>
            </div>
            <p className="text-[10px] text-cyan-300 tracking-wider">PLAYER {currentEvent.player}</p>
          </div>
        );
      }

      // SCREEN 3: Location / Block arrived
      case 'LOCATION':
      case 'POSITION': {
        const city = (currentEvent as any).city || 'INDIA';
        const block = (currentEvent as any).block || (currentEvent as any).position || 1;
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">LOCATION</p>
            <p className="text-sm font-black text-white uppercase tracking-wider line-clamp-1">
              {city}
            </p>
            <p className="text-xs font-bold text-cyan-300">BLOCK {block}</p>
          </div>
        );
      }

      // SCREEN 4, 5, 6: QUESTION, OPTIONS & ANSWER ON PHONE
      case 'QUESTION': {
        const qLines = wrapText(currentEvent.question, 22);
        const maxLinesPerPage = 3;
        const totalQPages = Math.max(1, Math.ceil(qLines.length / maxLinesPerPage));
        const currentQPage = scrollIndex % totalQPages;
        const visibleQLines = qLines.slice(
          currentQPage * maxLinesPerPage,
          currentQPage * maxLinesPerPage + maxLinesPerPage
        );

        if (questionSubScreen === 'QUESTION') {
          // SCREEN 4: QUESTION with text wrapping & scrolling
          return (
            <div className="flex flex-col justify-between h-full font-mono text-left">
              <div className="flex items-center justify-between border-b border-cyan-900/60 pb-0.5 text-[9px] text-amber-300">
                <span className="truncate max-w-[80px]">#{currentEvent.locationId} {currentEvent.locationName.toUpperCase()}</span>
                <span>CAT: {currentEvent.category.slice(0, 6).toUpperCase()}</span>
              </div>
              <div className="py-1 min-h-[38px] flex flex-col justify-center">
                {visibleQLines.map((line, idx) => (
                  <p key={idx} className="text-[11px] leading-[13px] text-white font-medium">
                    {line}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-between text-[9px] text-cyan-400 border-t border-cyan-900/60 pt-0.5">
                <span>QUESTION ({currentQPage + 1}/{totalQPages})</span>
                <span className="text-amber-300 animate-pulse">CYCLING...</span>
              </div>
            </div>
          );
        } else if (questionSubScreen === 'OPTIONS') {
          // SCREEN 5: OPTIONS (paged: A&B then C&D)
          const opts = currentEvent.options || [];
          const currentPair = optionsPage === 0 ? [0, 1] : [2, 3];
          const letters = ['A', 'B', 'C', 'D'];

          return (
            <div className="flex flex-col justify-between h-full font-mono text-left">
              <div className="flex items-center justify-between border-b border-cyan-900/60 pb-0.5 text-[9px] text-amber-300">
                <span>OPTIONS ({optionsPage === 0 ? 'A - B' : 'C - D'})</span>
                <span className="text-cyan-400">PAGE {optionsPage + 1}/2</span>
              </div>
              <div className="py-1 space-y-1">
                {currentPair.map((idx) => {
                  const letter = letters[idx];
                  const optText = opts[idx] || '';
                  return (
                    <div key={letter} className="text-[11px] leading-tight text-white flex items-start gap-1">
                      <span className="font-bold text-cyan-300 shrink-0">{letter}.</span>
                      <span className="truncate">{optText}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[9px] text-amber-300 text-center animate-pulse border-t border-cyan-900/60 pt-0.5">
                SELECT ON PHONE
              </p>
            </div>
          );
        } else {
          // SCREEN 6: ANSWER ON PHONE
          return (
            <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
              <div className="p-1 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300">
                <Smartphone className="w-5 h-5 animate-bounce" />
              </div>
              <p className="text-xs font-black text-white tracking-wider">ANSWER ON PHONE</p>
              <p className="text-[10px] text-amber-300 font-bold">TAP A / B / C / D</p>
            </div>
          );
        }
      }

      // SCREEN 7: CORRECT answer result
      case 'CORRECT': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-sm font-black text-emerald-300 uppercase tracking-widest animate-pulse">
              CORRECT!
            </p>
            <p className="text-lg font-black text-white">+{currentEvent.points}</p>
            <p className="text-[11px] font-bold text-amber-300">SCORE {currentEvent.score}</p>
          </div>
        );
      }

      // SCREEN 8: WRONG answer result
      case 'WRONG': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-sm font-black text-rose-400 uppercase tracking-widest">
              WRONG
            </p>
            <p className="text-xs font-bold text-white">0 POINTS</p>
            {currentEvent.correctAnswer && (
              <p className="text-[10px] text-cyan-300 truncate max-w-[120px]">
                ANS: {currentEvent.correctAnswer}
              </p>
            )}
          </div>
        );
      }

      // SCREEN 9: TIME UP
      case 'TIMEOUT': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-sm font-black text-amber-400 uppercase tracking-widest">
              TIME UP
            </p>
            <p className="text-xs font-bold text-white">0 POINTS</p>
            {currentEvent.correctAnswer && (
              <p className="text-[10px] text-cyan-300 truncate max-w-[120px]">
                ANS: {currentEvent.correctAnswer}
              </p>
            )}
          </div>
        );
      }

      // SCREEN 10: SPECIAL CHALLENGE
      case 'SPECIAL_BLOCK': {
        const challengeLines = wrapText(currentEvent.challenge || 'Challenge Awaits', 22);
        const visibleLines = challengeLines.slice(0, 2);
        return (
          <div className="flex flex-col justify-between h-full font-mono text-center">
            <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider border-b border-cyan-900/60 pb-0.5">
              SPECIAL CHALLENGE
            </p>
            <div className="py-1">
              <p className="text-xs font-black text-white uppercase">{currentEvent.blockType}</p>
              {visibleLines.map((line, i) => (
                <p key={i} className="text-[10px] text-cyan-300 leading-tight truncate">
                  {line}
                </p>
              ))}
            </div>
            <p className="text-[10px] text-amber-400 font-bold animate-pulse border-t border-cyan-900/60 pt-0.5">
              CHECK PHONE
            </p>
          </div>
        );
      }

      // SCREEN 11: HERITAGE HUNT
      case 'HERITAGE_HUNT': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-xs font-black text-rose-400 uppercase tracking-widest">
              HERITAGE HUNT
            </p>
            <p className="text-xs font-bold text-white uppercase">{currentEvent.city}</p>
            <p className="text-[10px] text-cyan-300">SOLVE CLUE & UPLOAD</p>
            <p className="text-[10px] text-amber-300 font-bold animate-pulse">CHECK PHONE</p>
          </div>
        );
      }

      // Heritage Hunt result
      case 'HERITAGE_RESULT': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-xs font-black text-emerald-300 uppercase tracking-widest">
              {currentEvent.isCorrect ? 'HERITAGE VERIFIED!' : 'NOT MATCHED'}
            </p>
            <p className="text-sm font-bold text-white">+{currentEvent.points} POINTS</p>
            <p className="text-[10px] text-amber-300">SCORE {currentEvent.score}</p>
          </div>
        );
      }

      // Game start or game over
      case 'GAME_START': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-xs font-black text-amber-300 uppercase tracking-widest">
              BHARAT YATRA
            </p>
            <p className="text-[11px] text-white">YATRA COMMENCED</p>
            <p className="text-[10px] text-cyan-300">ROUND {currentEvent.round}</p>
            <p className="text-[10px] text-amber-400 font-bold animate-pulse">ROLL ON PHONE</p>
          </div>
        );
      }

      case 'GAME_END': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-xs font-black text-amber-300 uppercase tracking-widest">
              🎉 YATRA COMPLETED
            </p>
            <p className="text-sm font-black text-white uppercase">{currentEvent.winner}</p>
            <p className="text-[11px] text-cyan-300 font-bold">SCORE: {currentEvent.score}</p>
          </div>
        );
      }

      case 'TIMER': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-xs font-bold text-amber-300 uppercase">TIMER RUNNING</p>
            <p className="text-2xl font-black text-white">{currentEvent.remaining}s</p>
            <p className="text-[10px] text-cyan-300">ANSWER ON PHONE</p>
          </div>
        );
      }

      // TEST event display
      case 'TEST': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <div className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-400/40 text-[9px] text-emerald-300 font-bold uppercase">
              MQTT TEST PING
            </div>
            <p className="text-xs font-black text-amber-300 tracking-wider">
              {currentEvent.message || 'HELLO BHARAT YATRA'}
            </p>
            <p className="text-[10px] text-cyan-300">HIVEMQ CLOUD OK</p>
          </div>
        );
      }

      case 'READY_TO_ROLL': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-1 font-mono">
            <p className="text-[11px] font-bold text-amber-300 tracking-wider">BHARAT YATRA</p>
            <p className="text-xs font-black text-white uppercase">PLAYER {currentEvent.player}</p>
            <p className="text-[11px] font-bold text-cyan-300 tracking-wide">YOUR TURN</p>
            <div className="mt-0.5 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] text-cyan-200 font-bold animate-pulse">
              ROLL ON PHONE
            </div>
          </div>
        );
      }

      case 'DICE_ROLL': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-0.5">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">DICE</p>
            <div className="w-12 h-12 rounded-lg border-2 border-cyan-400 bg-cyan-950/60 flex items-center justify-center shadow-inner my-0.5">
              <span className="text-2xl font-black text-white">{currentEvent.value}</span>
            </div>
            <p className="text-[10px] text-cyan-300 tracking-wider">PLAYER {currentEvent.player}</p>
          </div>
        );
      }

      case 'MOVEMENT': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">MOVING</p>
            <p className="text-sm font-black text-white uppercase tracking-wider">
              {currentEvent.city || 'ON BOARD'}
            </p>
            <p className="text-xs font-bold text-cyan-300">BLOCK {currentEvent.toPosition}</p>
          </div>
        );
      }

      case 'ANSWER_RESULT': {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className={`text-sm font-black uppercase tracking-widest ${currentEvent.isCorrect ? 'text-emerald-300 animate-pulse' : 'text-rose-400'}`}>
              {currentEvent.isCorrect ? 'CORRECT!' : 'WRONG'}
            </p>
            <p className="text-sm font-black text-white">
              {currentEvent.isCorrect ? `+${currentEvent.points}` : '0'} POINTS
            </p>
            <p className="text-[11px] font-bold text-amber-300">SCORE {currentEvent.score}</p>
          </div>
        );
      }

      case 'SPECIAL_CHALLENGE': {
        return (
          <div className="flex flex-col justify-between h-full font-mono text-center">
            <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider border-b border-cyan-900/60 pb-0.5">
              SPECIAL CHALLENGE
            </p>
            <div className="py-1">
              <p className="text-xs font-black text-white uppercase">{currentEvent.blockType}</p>
              <p className="text-[10px] text-cyan-300 leading-tight truncate">{currentEvent.challenge}</p>
            </div>
            <p className="text-[10px] text-amber-400 font-bold animate-pulse border-t border-cyan-900/60 pt-0.5">
              CHECK PHONE
            </p>
          </div>
        );
      }

      default: {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center font-mono space-y-1">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              BHARAT YATRA
            </p>
            <p className="text-[11px] text-white uppercase">{(currentEvent as any).type}</p>
            <p className="text-[10px] text-cyan-300">CHECK PHONE</p>
          </div>
        );
      }
    }
  }, [currentEvent, questionSubScreen, scrollIndex, optionsPage]);

  return (
    <div
      className={`relative bg-slate-950 p-3 rounded-2xl border-4 border-slate-800 shadow-2xl ${className}`}
      id="esp32-13-oled-display-unit"
    >
      {/* Physical 1.3" OLED Panel Glass (128x64 aspect ratio) */}
      <div className="relative w-full aspect-[2/1] max-w-[340px] mx-auto bg-black rounded-lg border-2 border-slate-900 shadow-inner overflow-hidden flex flex-col justify-between p-2.5">
        {/* Subtle OLED Pixel Grid & Phosphor Scanline Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.1) 100%)',
            backgroundSize: '100% 2px, 3px 100%'
          }}
        />

        {/* OLED Top Dual-Color Header (Simulating typical 1.3" I2C yellow/cyan OLED status line) */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-500/30 pb-1 text-[10px] font-mono text-amber-400">
          <div className="flex items-center gap-1.5 font-bold">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                connectionStatus === 'Connected'
                  ? 'bg-emerald-400 shadow-emerald-400/80 shadow-xs'
                  : connectionStatus === 'Connecting'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-rose-500'
              }`}
            />
            <span className="truncate max-w-[85px] tracking-tight">{roomId}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px]">
            {connectionStatus === 'Connected' ? (
              <span className="text-emerald-400 flex items-center gap-0.5">
                <Wifi className="w-2.5 h-2.5" />
                <span>MQTT</span>
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-0.5">
                <WifiOff className="w-2.5 h-2.5" />
                <span>OFFLINE</span>
              </span>
            )}
          </div>
        </div>

        {/* Main 128x64 Active Monochromatic Phosphor Area */}
        <div className="relative z-10 flex-1 my-auto overflow-hidden py-1 text-cyan-200">
          {screenContent}
        </div>

        {/* OLED Bottom Micro Status Bar */}
        <div className="relative z-10 flex items-center justify-between border-t border-cyan-900/40 pt-1 text-[9px] font-mono text-cyan-500">
          <span>1.3" I2C OLED (128x64)</span>
          <span className="text-amber-400 font-bold uppercase">PHONE CONTROLLER</span>
        </div>
      </div>
    </div>
  );
};
