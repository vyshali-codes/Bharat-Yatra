import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { deviceService, browserDeviceAdapter } from '../services/deviceService';
import { Cpu, Wifi, Radio, Zap } from 'lucide-react';

interface Props {
  fullScreen?: boolean;
}

export const ESP32SimulatorWidget: React.FC<Props> = ({ fullScreen = false }) => {
  const {
    currentPlayer,
    currentPlayerIndex,
    currentLocation,
    phase,
    diceValue,
    timerSeconds,
    currentQuestion,
    lastAnswerResult,
    specialBlockModal,
    rollDice,
    submitAnswer,
    nextTurn,
    triggerHeritageHunt
  } = useGame();

  const [oledBlink, setOledBlink] = useState(false);
  const [deviceLog, setDeviceLog] = useState<string[]>(['[BOOT] ESP32-WROOM-32 initialized', '[OLED] SSD1306 128x64 ready']);

  // Log incoming events to internal mini console
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const unsub = browserDeviceAdapter.onStateUpdate((evt) => {
      setDeviceLog((prev) => [`[TX:${evt.type}] ${JSON.stringify(evt.payload).slice(0, 40)}`, ...prev.slice(0, 6)]);
      setOledBlink(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setOledBlink(false), 200);
    });
    return () => {
      clearTimeout(timeoutId);
      unsub();
    };
  }, []);

  // Hardware button click handlers - emit through device service abstraction
  const handleHardwarePress = (btn: 'ROLL' | 'A' | 'B' | 'C' | 'D' | 'NEXT' | 'HERITAGE') => {
    setDeviceLog((prev) => [`[RX:GPIO_BTN] ${btn} pressed`, ...prev.slice(0, 6)]);

    if (btn === 'ROLL') {
      browserDeviceAdapter.emitFromDevice({ type: 'ROLL' });
    } else if (btn === 'NEXT') {
      browserDeviceAdapter.emitFromDevice({ type: 'NEXT' });
    } else if (btn === 'HERITAGE') {
      browserDeviceAdapter.emitFromDevice({ type: 'HERITAGE_REQUEST' });
    } else {
      browserDeviceAdapter.emitFromDevice({ type: 'ANSWER', answer: btn });
    }
  };

  return (
    <div
      id="esp32-hardware-simulator"
      className={`flex flex-col bg-slate-900 border-4 border-slate-700 rounded-3xl p-5 shadow-2xl text-slate-100 ${
        fullScreen ? 'max-w-2xl mx-auto w-full my-6' : 'w-full'
      }`}
    >
      {/* ESP32 Microcontroller PCB Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400">
                ESP32-DEVKIT V1
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                BHARAT YATRA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Dual-Core Xtensa LX6 • I2C OLED (SSD1306)
            </p>
          </div>
        </div>

        {/* Status Indicators & TX/RX LED */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                oledBlink ? 'bg-amber-400 shadow-amber-400/50 shadow-md' : 'bg-emerald-500 shadow-emerald-500/50 shadow-md animate-pulse'
              }`}
            />
            <span className="text-slate-400">TX/RX</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
            <Radio className="w-3 h-3" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      {/* OLED Display Bezel */}
      <div className="relative bg-slate-950 p-3 rounded-2xl border-2 border-slate-800 shadow-inner">
        {/* OLED Screen (SSD1306 128x64 Emulation) */}
        <div className="oled-screen rounded-xl p-4 text-emerald-400 min-h-[170px] flex flex-col justify-between border border-emerald-900/50 relative overflow-hidden">
          {/* Subtle CRT scanline effect */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none opacity-30"></div>

          {/* OLED Top status bar */}
          <div className="flex items-center justify-between border-b border-emerald-800/50 pb-1 text-[11px] uppercase tracking-wider font-mono">
            <span>● BHARAT YATRA</span>
            <span>ROUND {useGame().round}</span>
            <span>{timerSeconds}s</span>
          </div>

          {/* OLED Dynamic Screen Content */}
          <div className="py-2 text-center my-auto">
            {specialBlockModal ? (
              <div className="font-mono text-center">
                {specialBlockModal.blockType === 'Golden Heritage' ? (
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-amber-300 uppercase">GOLDEN</p>
                    <p className="text-xs font-bold text-amber-300 uppercase">HERITAGE</p>
                    <p className="text-[11px] font-bold text-emerald-300 uppercase">DOUBLE POINTS</p>
                    <p className="text-[11px] text-amber-400 animate-pulse mt-1 font-bold">CHECK PHONE</p>
                  </div>
                ) : specialBlockModal.blockType === 'Knowledge Ladder' ? (
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-emerald-300 uppercase">KNOWLEDGE</p>
                    <p className="text-xs font-bold text-emerald-300 uppercase">LADDER</p>
                    <p className="text-[11px] font-bold text-amber-300 uppercase">+20 / +3</p>
                    <p className="text-[11px] text-amber-400 animate-pulse mt-1 font-bold">CHECK PHONE</p>
                  </div>
                ) : specialBlockModal.blockType === 'Myth/Misinformation Trap' ? (
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-rose-400 uppercase">MYTH TRAP</p>
                    <p className="text-xs font-bold text-amber-300 uppercase">TRUE OR FALSE?</p>
                    <p className="text-[10px] text-slate-500 font-mono">&nbsp;</p>
                    <p className="text-[11px] text-amber-400 animate-pulse mt-1 font-bold">CHECK PHONE</p>
                  </div>
                ) : specialBlockModal.blockType === 'Heritage Hunt' ? (
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-rose-400 uppercase">HERITAGE HUNT</p>
                    <p className="text-xs font-bold text-amber-300 uppercase">{specialBlockModal.city.toUpperCase()}</p>
                    <p className="text-[11px] font-bold text-emerald-300 uppercase">SOLVE CLUE</p>
                    <p className="text-[11px] text-amber-400 animate-pulse mt-1 font-bold">CHECK PHONE</p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-amber-300 uppercase">
                      {specialBlockModal.blockType.toUpperCase().replace(' CHALLENGE', '')}
                    </p>
                    <p className="text-xs font-bold text-amber-300 uppercase">CHALLENGE</p>
                    <p className="text-[11px] font-bold text-emerald-300 uppercase">{specialBlockModal.difficulty}</p>
                    <p className="text-[11px] text-amber-400 animate-pulse mt-1 font-bold">CHECK PHONE</p>
                  </div>
                )}
              </div>
            ) : phase === 'READY_TO_ROLL' ? (
              <div>
                <p className="text-xs font-mono text-emerald-300 uppercase tracking-widest">
                  PLAYER {currentPlayerIndex + 1}: {currentPlayer.name.toUpperCase()}
                </p>
                <p className="text-sm font-mono font-bold text-amber-300 mt-1">
                  POS: {currentPlayer.position}/80 [{currentLocation.city.toUpperCase()}]
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-emerald-950 border border-emerald-500/50 rounded font-mono text-xs font-bold text-emerald-200 animate-pulse">
                  &gt;&gt; PRESS [ROLL] &lt;&lt;
                </div>
              </div>
            ) : phase === 'ROLLING' ? (
              <div className="animate-pulse">
                <p className="text-xs font-mono text-amber-300 uppercase">
                  ROLLING ELECTRONIC DICE...
                </p>
                <p className="text-2xl font-mono font-bold text-emerald-300 mt-1">
                  [ {diceValue || '?'} ]
                </p>
              </div>
            ) : phase === 'MOVING' ? (
              <div>
                <p className="text-xs font-mono text-emerald-300">
                  ADVANCING {diceValue} BLOCKS
                </p>
                <p className="text-sm font-mono font-bold text-amber-300 mt-1">
                  &gt; ARRIVED AT {currentLocation.city.toUpperCase()}
                </p>
              </div>
            ) : phase === 'QUESTION' && currentQuestion ? (
              <div className="text-left font-mono">
                <div className="flex justify-between items-center text-[10px] text-amber-300 border-b border-emerald-900/40 pb-0.5 mb-1">
                  <span className="truncate max-w-[90px]">#{currentLocation.id} {currentLocation.city.toUpperCase()}</span>
                  <span>CAT: {currentQuestion.category.toUpperCase().slice(0, 7)}</span>
                  <span className={timerSeconds <= 10 ? 'text-rose-400 font-bold animate-pulse' : 'text-emerald-300 font-bold'}>
                    T:{timerSeconds}s
                  </span>
                </div>
                <p className="text-[11px] leading-tight text-emerald-200 line-clamp-2">
                  {currentQuestion.question}
                </p>
                <div className="grid grid-cols-2 gap-1 text-[10px] mt-1 text-emerald-400">
                  <span className="truncate">A: {currentQuestion.options.A}</span>
                  <span className="truncate">B: {currentQuestion.options.B}</span>
                  <span className="truncate">C: {currentQuestion.options.C}</span>
                  <span className="truncate">D: {currentQuestion.options.D}</span>
                </div>
                <p className="text-[10px] text-amber-400 mt-1 text-center animate-pulse">
                  PRESS A / B / C / D [45s TIMER]
                </p>
              </div>
            ) : phase === 'ANSWER_REVIEW' && lastAnswerResult ? (
              <div>
                <p
                  className={`text-sm font-mono font-bold uppercase ${
                    lastAnswerResult.isCorrect
                      ? 'text-emerald-300'
                      : lastAnswerResult.isTimeout
                      ? 'text-amber-300'
                      : 'text-rose-400'
                  }`}
                >
                  {lastAnswerResult.isCorrect
                    ? 'CORRECT'
                    : lastAnswerResult.isTimeout
                    ? 'TIME UP'
                    : 'WRONG ANSWER'}
                </p>
                <p className="text-xs font-mono font-bold text-amber-300 mt-0.5">
                  {lastAnswerResult.isCorrect
                    ? `+${lastAnswerResult.pointsAwarded} POINTS`
                    : '+0 POINTS'}
                </p>
                {!lastAnswerResult.isCorrect && (
                  <p className="text-[10px] font-mono text-emerald-300 mt-0.5">
                    CORRECT: {lastAnswerResult.correctAnswer}
                  </p>
                )}
                <div className="mt-1 inline-block px-2.5 py-0.5 bg-slate-900 border border-emerald-500/40 rounded font-mono text-[10px] text-emerald-200 animate-pulse">
                  PRESS [RETURN TO GAME]
                </div>
              </div>
            ) : phase === 'HERITAGE_HUNT' ? (
              <div className="font-mono text-center space-y-0.5">
                <p className="text-xs font-bold text-rose-400 uppercase">HERITAGE HUNT</p>
                <p className="text-xs font-bold text-amber-300 uppercase">{currentLocation.city.toUpperCase()}</p>
                <p className="text-[11px] font-bold text-emerald-300 uppercase">SOLVE CLUE</p>
                <p className="text-[11px] text-amber-400 animate-pulse mt-1 font-bold">CHECK PHONE</p>
              </div>
            ) : phase === 'GAME_OVER' ? (
              <div>
                <p className="text-sm font-mono font-bold text-amber-300">
                  🎉 YATRA COMPLETED!
                </p>
                <p className="text-xs font-mono text-emerald-300 mt-1">
                  ALL 80 MILESTONES TRAVERSED
                </p>
              </div>
            ) : null}
          </div>

          {/* OLED Bottom info bar */}
          <div className="flex items-center justify-between border-t border-emerald-800/50 pt-1 text-[10px] font-mono text-emerald-500">
            <span>SCORE: {currentPlayer.score}</span>
            <span>{currentLocation.specialBlock.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Physical Hardware Pushbuttons Array */}
      <div className="mt-4">
        <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Physical Microswitch Tactile Controls (GPIO Inputs)
        </p>

        {/* Primary Controls Row */}
        <div className="grid grid-cols-3 gap-2.5 mb-2.5">
          <button
            id="esp32-btn-roll"
            onClick={() => handleHardwarePress('ROLL')}
            disabled={phase !== 'READY_TO_ROLL'}
            className="p-3 rounded-xl bg-linear-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:translate-y-0.5 text-slate-950 font-mono font-bold text-xs shadow-md border-b-4 border-amber-800 disabled:opacity-40 cursor-pointer"
          >
            [ ROLL ]
          </button>

          <button
            id="esp32-btn-next"
            onClick={() => handleHardwarePress('NEXT')}
            disabled={phase !== 'ANSWER_REVIEW'}
            className="p-3 rounded-xl bg-linear-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:translate-y-0.5 text-white font-mono font-bold text-xs shadow-md border-b-4 border-emerald-900 disabled:opacity-40 cursor-pointer"
          >
            [ RETURN ]
          </button>

          <button
            id="esp32-btn-heritage"
            onClick={() => handleHardwarePress('HERITAGE')}
            className="p-3 rounded-xl bg-linear-to-b from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:translate-y-0.5 text-white font-mono font-bold text-xs shadow-md border-b-4 border-rose-900 cursor-pointer"
          >
            [ HERITAGE ]
          </button>
        </div>

        {/* A / B / C / D Hardware Keys */}
        <div className="grid grid-cols-4 gap-2">
          {(['A', 'B', 'C', 'D'] as const).map((opt) => (
            <button
              key={`hw-opt-${opt}`}
              id={`esp32-btn-${opt.toLowerCase()}`}
              onClick={() => handleHardwarePress(opt)}
              disabled={phase !== 'QUESTION'}
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:translate-y-0.5 text-amber-400 font-mono font-bold text-sm border-2 border-slate-700 shadow-md border-b-4 border-b-slate-950 disabled:opacity-40 cursor-pointer transition"
            >
              KEY {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Serial Console Output Preview */}
      <div className="mt-4 p-2.5 bg-black/80 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400">
        <div className="flex items-center justify-between text-slate-500 mb-1 border-b border-slate-800/80 pb-0.5">
          <span>SERIAL MONITOR (115200 BAUD)</span>
          <span className="text-emerald-500">READY</span>
        </div>
        <div className="space-y-0.5 overflow-hidden">
          {deviceLog.map((log, i) => (
            <p key={i} className="truncate text-slate-300">
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
