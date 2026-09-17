import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  Player,
  Question,
  CategoryType,
  GamePhase,
  GameSettings,
  LocationData,
  MoveRecord,
  SavedGameHistory,
  DifficultyLevel,
  SpecialChallengeModalData,
  HeritageHuntTarget
} from '../types/game';
import { LOCATIONS_DATA } from '../data/locations';
import { QUESTIONS_BANK, CATEGORIES_LIST, getQuestionForLocation } from '../data/questions';
import { getChallenge, getDefaultDifficultyForBlock } from '../data/specialChallenges';
import { getHeritageHuntChallenge } from '../data/heritageHuntTargets';
import { getUniversalQuestion } from '../utils/questionEngine';
import { calculateTimeBasedScore } from '../utils/scoring';
import { storageService, DEFAULT_SETTINGS } from '../services/storageService';
import { deviceService, HardwareStatus } from '../services/deviceService';
import { mqttService } from '../services/mqttService';
import confetti from 'canvas-confetti';

interface GameContextType {
  // Navigation / screen routing
  activeScreen: string;
  setActiveScreen: (screen: string) => void;

  // Game state
  players: Player[];
  currentPlayerIndex: number;
  currentPlayer: Player;
  currentLocation: LocationData;
  round: number;
  phase: GamePhase;
  diceValue: number | null;
  isRolling: boolean;
  selectedCategories: CategoryType[];
  activeCategory: CategoryType;
  selectCategoryForQuestion: (cat: CategoryType) => void;
  currentQuestion: Question | null;
  timerSeconds: number;
  isTimerRunning: boolean;
  lastAnswerResult: {
    selectedOption: 'A' | 'B' | 'C' | 'D' | null;
    selectedOptionText?: string;
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    correctAnswerText: string;
    isCorrect: boolean;
    pointsAwarded: number;
    explanation: string;
    isTimeout: boolean;
    speedBonus: boolean;
    responseTimeSec?: number;
    speedTier?: string;
    specialEffectNote?: string;
  } | null;

  // Special Challenge & Dynamic Heritage Hunt State
  specialBlockModal: SpecialChallengeModalData | null;
  closeSpecialBlockModal: () => void;
  startSpecialChallenge: () => void;
  activeHuntTarget: HeritageHuntTarget | null;
  activeHuntClue: string | null;
  activeHuntClueIndex: number;
  isHuntCompletedThisTurn: boolean;
  generateHuntChallengeForLocation: (
    locId: number,
    cityName?: string
  ) => { target: HeritageHuntTarget; clue: string; clueIndex: number };

  // History & Badges
  unlockedBadges: string[];
  historyLog: MoveRecord[];
  gameHistory: SavedGameHistory[];
  settings: GameSettings;

  // Hardware status
  connectionStatus: HardwareStatus;
  setConnectionMode: (mode: 'simulator' | 'websocket' | 'mqtt') => void;

  // Actions
  setupNewGame: (playerCount: number, customNames: string[], categories: CategoryType[]) => void;
  rollDice: () => void;
  submitAnswer: (option: 'A' | 'B' | 'C' | 'D') => void;
  nextTurn: () => void;
  triggerHeritageHunt: () => void;
  completeHeritageHunt: (points?: number) => void;
  updateSettings: (partial: Partial<GameSettings>) => void;
  clearAllHistory: () => void;
  clearHistory: () => void;
  resetCurrentGame: () => void;
}

const DEFAULT_PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Arjun',
    color: 'Saffron',
    bgHex: '#f97316',
    tokenSymbol: '🦚',
    position: 1,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    heritageHuntsCompleted: 0,
    badges: []
  },
  {
    id: 2,
    name: 'Ananya',
    color: 'Teal',
    bgHex: '#0d9488',
    tokenSymbol: '🐘',
    position: 1,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    heritageHuntsCompleted: 0,
    badges: []
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<string>('HOME');
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [phase, setPhase] = useState<GamePhase>('READY_TO_ROLL');
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([...CATEGORIES_LIST]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('History');
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [lastAnswerResult, setLastAnswerResult] = useState<GameContextType['lastAnswerResult']>(null);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [historyLog, setHistoryLog] = useState<MoveRecord[]>([]);
  const [gameHistory, setGameHistory] = useState<SavedGameHistory[]>([]);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  // Special Challenge Modal & Dynamic Heritage Hunt State
  const [specialBlockModal, setSpecialBlockModal] = useState<SpecialChallengeModalData | null>(null);
  const [activeHuntTarget, setActiveHuntTarget] = useState<HeritageHuntTarget | null>(null);
  const [activeHuntClue, setActiveHuntClue] = useState<string | null>(null);
  const [activeHuntClueIndex, setActiveHuntClueIndex] = useState<number>(0);
  const [isHuntCompletedThisTurn, setIsHuntCompletedThisTurn] = useState<boolean>(false);
  const [completedHuntChallengeIds, setCompletedHuntChallengeIds] = useState<string[]>([]);
  const [usedHuntTargetIds, setUsedHuntTargetIds] = useState<string[]>([]);
  const [usedHuntClueIndices, setUsedHuntClueIndices] = useState<Record<string, number>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(0);
  const isAnsweringRef = useRef<boolean>(false);

  // Dynamic Heritage Hunt Generator helper
  const generateHuntChallengeForLocation = useCallback(
    (locId: number, cityName?: string) => {
      const challenge = getHeritageHuntChallenge(
        locId,
        cityName,
        usedHuntTargetIds,
        usedHuntClueIndices
      );
      setActiveHuntTarget(challenge.target);
      setActiveHuntClue(challenge.clue);
      setActiveHuntClueIndex(challenge.clueIndex);
      setUsedHuntTargetIds((prev) => [...prev, challenge.target.id]);
      setUsedHuntClueIndices((prev) => ({
        ...prev,
        [challenge.target.id]: challenge.clueIndex
      }));
      setIsHuntCompletedThisTurn(false);
      return challenge;
    },
    [usedHuntTargetIds, usedHuntClueIndices]
  );

  // Special Challenge modal actions
  const closeSpecialBlockModal = useCallback(() => {
    setSpecialBlockModal(null);
  }, []);

  const startSpecialChallenge = useCallback(() => {
    if (!specialBlockModal) return;
    const isHunt = specialBlockModal.isHeritageHunt;
    setSpecialBlockModal(null);
    if (isHunt) {
      setPhase('HERITAGE_HUNT');
      setActiveScreen('HERITAGE_HUNT');
    } else {
      isAnsweringRef.current = false;
      setTimerSeconds(45);
      setIsTimerRunning(settings.timerEnabled);
      questionStartTimeRef.current = Date.now();
      setPhase('QUESTION');
      if (currentQuestion) {
        deviceService.send({
          type: 'QUESTION',
          payload: {
            category: currentQuestion.category,
            question: currentQuestion.question,
            options: currentQuestion.options
          }
        });
      }
    }
  }, [specialBlockModal, settings.timerEnabled, currentQuestion]);

  // Initialize storage & badges
  useEffect(() => {
    const loadedSettings = storageService.loadSettings();
    setSettings(loadedSettings);

    const loadedHistory = storageService.loadHistory();
    setGameHistory(loadedHistory);

    const loadedBadges = storageService.loadUnlockedBadges();
    setUnlockedBadges(loadedBadges);

    const savedGame = storageService.loadActiveGame();
    if (savedGame && savedGame.players?.length >= 2) {
      setPlayers(savedGame.players);
      setCurrentPlayerIndex(savedGame.currentPlayerIndex || 0);
      setRound(savedGame.round || 1);
      if (savedGame.selectedCategories) {
        setSelectedCategories(savedGame.selectedCategories as CategoryType[]);
      }
      if (savedGame.historyLog) {
        setHistoryLog(savedGame.historyLog);
      }
    }
  }, []);

  const currentPlayer = players[currentPlayerIndex] || players[0];
  const currentLocation =
    LOCATIONS_DATA.find((l) => l.id === currentPlayer.position) || LOCATIONS_DATA[0];

  // Sync to ESP32 Device Service whenever relevant state updates
  useEffect(() => {
    deviceService.send({
      type: 'PLAYER',
      payload: {
        playerIndex: currentPlayerIndex + 1,
        name: currentPlayer.name,
        color: currentPlayer.color,
        position: currentPlayer.position,
        score: currentPlayer.score
      }
    });

    deviceService.send({
      type: 'POSITION',
      payload: {
        position: currentPlayer.position,
        city: currentLocation.city,
        heritageSite: currentLocation.heritageSite,
        specialBlock: currentLocation.specialBlock
      }
    });

    deviceService.send({
      type: 'GAME_STATE',
      payload: {
        phase,
        round,
        diceValue
      }
    });
  }, [currentPlayerIndex, currentPlayer, currentLocation, phase, round, diceValue]);

  // Audio effect helper
  const playSoundEffect = useCallback(
    (type: 'roll' | 'correct' | 'wrong' | 'fanfare' | 'click' | 'step') => {
      if (!settings.soundEnabled) return;
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'correct') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
          osc.start(now);
          osc.stop(now + 0.45);
        } else if (type === 'wrong') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(164.81, now + 0.15);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
        } else if (type === 'roll') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
        } else if (type === 'fanfare') {
          osc.type = 'triangle';
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          });
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
          osc.start(now);
          osc.stop(now + 0.65);
        }
      } catch {
        // audio context not permitted or suspended
      }
    },
    [settings.soundEnabled]
  );

  // Check and unlock badges
  const checkBadgeUnlocks = useCallback(
    (player: Player, specialBlock: string, isCorrect: boolean, isKnowledgeClimb?: boolean) => {
      const newBadges: string[] = [];

      const unlock = (badgeId: string) => {
        if (!unlockedBadges.includes(badgeId) && !newBadges.includes(badgeId)) {
          newBadges.push(badgeId);
        }
      };

      if (player.position >= 10) unlock('heritage-explorer');
      if (player.position >= 40) unlock('india-traveler');
      if (player.position >= 80) unlock('bharat-yatra-champion');
      if (player.correctAnswers >= 5) unlock('history-scholar');
      if (player.heritageHuntsCompleted >= 1) unlock('monument-hunter');
      if (player.heritageHuntsCompleted >= 3) unlock('heritage-hunt-champion');

      if (isCorrect && specialBlock === 'Culture Challenge') unlock('culture-master');
      if (isCorrect && specialBlock === 'Festival Challenge') unlock('festival-expert');
      if (isCorrect && specialBlock === 'Golden Heritage') unlock('golden-heritage');
      if (isKnowledgeClimb) unlock('knowledge-ladder');

      if (newBadges.length > 0) {
        const updated = [...unlockedBadges, ...newBadges];
        setUnlockedBadges(updated);
        storageService.saveUnlockedBadges(updated);
        playSoundEffect('fanfare');
        try {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        } catch {
          // confetti fallback
        }
      }
    },
    [unlockedBadges, playSoundEffect]
  );

  // Setup New Game
  const setupNewGame = useCallback(
    (playerCount: number, customNames: string[], categories: CategoryType[]) => {
      const playerColors = [
        { name: 'Saffron', hex: '#ea580c', symbol: '🦚' },
        { name: 'Emerald', hex: '#16a34a', symbol: '🐘' },
        { name: 'Navy', hex: '#2563eb', symbol: '🐅' },
        { name: 'Maroon', hex: '#be123c', symbol: '🪷' }
      ];

      const newPlayers: Player[] = [];
      for (let i = 0; i < playerCount; i++) {
        const c = playerColors[i % playerColors.length];
        newPlayers.push({
          id: i + 1,
          name: customNames[i]?.trim() || `Player ${i + 1}`,
          color: c.name,
          bgHex: c.hex,
          tokenSymbol: c.symbol,
          position: 1,
          score: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          heritageHuntsCompleted: 0,
          badges: []
        });
      }

      setPlayers(newPlayers);
      setCurrentPlayerIndex(0);
      setRound(1);
      setPhase('READY_TO_ROLL');
      setDiceValue(null);
      setSelectedCategories(categories.length > 0 ? categories : [...CATEGORIES_LIST]);
      setCurrentQuestion(null);
      setLastAnswerResult(null);
      setHistoryLog([]);

      // Reset dynamic challenge states
      setSpecialBlockModal(null);
      setActiveHuntTarget(null);
      setActiveHuntClue(null);
      setActiveHuntClueIndex(0);
      setIsHuntCompletedThisTurn(false);
      setCompletedHuntChallengeIds([]);
      setUsedQuestionIds([]);
      setUsedHuntTargetIds([]);
      setUsedHuntClueIndices({});

      storageService.saveActiveGame({
        players: newPlayers,
        currentPlayerIndex: 0,
        round: 1,
        selectedCategories: categories,
        historyLog: []
      });

      deviceService.send({
        type: 'GAME_START',
        payload: { playerCount, players: newPlayers }
      });

      setActiveScreen('GAME_DASHBOARD');
    },
    []
  );

  // Roll dice action
  const rollDice = useCallback(() => {
    if (phase !== 'READY_TO_ROLL' || isRolling) return;

    setIsRolling(true);
    setPhase('ROLLING');
    playSoundEffect('roll');

    let rollCount = 0;
    const interval = setInterval(() => {
      rollCount++;
      const randomFace = Math.floor(Math.random() * 6) + 1;
      setDiceValue(randomFace);
      if (rollCount > 8) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalDice);
        setIsRolling(false);

        deviceService.send({
          type: 'DICE_RESULT',
          payload: { roll: finalDice }
        });

        // Calculate new position
        const currentP = players[currentPlayerIndex];
        const newPos = Math.min(80, currentP.position + finalDice);

        setPhase('MOVING');

        setTimeout(() => {
          setPlayers((prev) => {
            const updated = [...prev];
            updated[currentPlayerIndex] = {
              ...updated[currentPlayerIndex],
              position: newPos
            };
            return updated;
          });

          // Check if reached block 80 (Final)
          if (newPos === 80) {
            playSoundEffect('fanfare');
            try {
              confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
            } catch {
              // fallback
            }
          }

          const targetLocation = LOCATIONS_DATA.find((l) => l.id === newPos) || LOCATIONS_DATA[0];

          // 1. Heritage Hunt special block (Blocks 13, 16, 21, 23, 34, 38, 42, 44, 54, 77 etc.)
          if (targetLocation.specialBlock === 'Heritage Hunt') {
            const challenge = generateHuntChallengeForLocation(newPos, targetLocation.city);
            deviceService.send({
              type: 'SPECIAL_BLOCK',
              payload: {
                name: 'Heritage Hunt',
                city: targetLocation.city,
                oledLines: [
                  'HERITAGE HUNT',
                  targetLocation.city.toUpperCase(),
                  'SOLVE CLUE',
                  'CHECK PHONE'
                ]
              }
            });

            setSpecialBlockModal({
              isOpen: true,
              blockType: 'Heritage Hunt',
              locationId: newPos,
              locationName: targetLocation.heritageSite,
              city: targetLocation.city,
              state: targetLocation.state,
              difficulty: 'HARD',
              challengeTitle: 'HERITAGE HUNT',
              challengeSubtitle: 'A heritage mystery awaits...',
              isHeritageHunt: true
            });
            return;
          }

          // 2. Special Challenge Blocks (Golden, Knowledge Ladder, Myth Trap, Culture, Heritage, Festival)
          if (targetLocation.specialBlock !== 'Normal' && targetLocation.specialBlock !== 'Final') {
            const diff = getDefaultDifficultyForBlock(targetLocation.specialBlock, newPos);

            const challengeQuestion = getUniversalQuestion({
              locationId: newPos,
              selectedCategories,
              activeCategory: selectedCategories.includes(activeCategory) ? activeCategory : undefined,
              blockType: targetLocation.specialBlock,
              difficulty: diff,
              previouslyUsedIds: usedQuestionIds
            });
            setActiveCategory(challengeQuestion.category);
            setUsedQuestionIds((prev) => [...prev, challengeQuestion.id]);
            setCurrentQuestion(challengeQuestion);

            // Configure OLED lines strictly adhering to requirement 17
            let oledLines = [
              targetLocation.specialBlock.toUpperCase().replace(' CHALLENGE', ''),
              'CHALLENGE',
              diff,
              'CHECK PHONE'
            ];
            if (targetLocation.specialBlock === 'Golden Heritage') {
              oledLines = ['GOLDEN', 'HERITAGE', 'DOUBLE POINTS', 'CHECK PHONE'];
            } else if (targetLocation.specialBlock === 'Knowledge Ladder') {
              oledLines = ['KNOWLEDGE', 'LADDER', '+20 / +3', 'CHECK PHONE'];
            } else if (targetLocation.specialBlock === 'Myth/Misinformation Trap') {
              oledLines = ['MYTH TRAP', 'TRUE OR FALSE?', '', 'CHECK PHONE'];
            } else if (targetLocation.specialBlock === 'Heritage Challenge') {
              oledLines = ['HERITAGE', 'CHALLENGE', diff, 'CHECK PHONE'];
            }

            deviceService.send({
              type: 'SPECIAL_BLOCK',
              payload: {
                name: targetLocation.specialBlock,
                difficulty: diff,
                oledLines
              }
            });

            setSpecialBlockModal({
              isOpen: true,
              blockType: targetLocation.specialBlock,
              locationId: newPos,
              locationName: targetLocation.heritageSite,
              city: targetLocation.city,
              state: targetLocation.state,
              difficulty: diff,
              challengeTitle: targetLocation.specialBlock,
              challengeSubtitle: 'YOUR CHALLENGE IS READY.',
              isHeritageHunt: false
            });
            return;
          }

          // 3. Normal Heritage Blocks
          const chosenQuestion = getUniversalQuestion({
            locationId: newPos,
            selectedCategories,
            activeCategory: selectedCategories.includes(activeCategory) ? activeCategory : undefined,
            blockType: 'Normal',
            difficulty: 'EASY',
            previouslyUsedIds: usedQuestionIds
          });
          setActiveCategory(chosenQuestion.category);
          setUsedQuestionIds((prev) => [...prev, chosenQuestion.id]);

          setCurrentQuestion(chosenQuestion);
          setTimerSeconds(45);
          setIsTimerRunning(settings.timerEnabled);
          questionStartTimeRef.current = Date.now();
          isAnsweringRef.current = false;
          setPhase('QUESTION');

          deviceService.send({
            type: 'QUESTION',
            payload: {
              category: chosenQuestion.category,
              question: chosenQuestion.question,
              options: chosenQuestion.options
            }
          });
        }, 800);
      }
    }, 90);
  }, [
    phase,
    isRolling,
    players,
    currentPlayerIndex,
    playSoundEffect,
    selectedCategories,
    activeCategory,
    usedQuestionIds,
    settings.timerEnabled,
    generateHuntChallengeForLocation
  ]);

  // Handle Timeout (45 seconds expired)
  const handleTimeout = useCallback(() => {
    if (!currentQuestion || isAnsweringRef.current) return;
    isAnsweringRef.current = true;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerRunning(false);

    playSoundEffect('wrong');

    const p = players[currentPlayerIndex];
    const targetLocation = LOCATIONS_DATA.find((l) => l.id === p.position) || LOCATIONS_DATA[0];

    let penaltyMove = 0;
    let specialNote = 'TIME UP! 0 points awarded.';

    if (targetLocation.specialBlock === 'Myth/Misinformation Trap') {
      penaltyMove = -2;
      specialNote = 'Myth Trap: Timeout! Moved back 2 blocks.';
    }

    const updatedPos = Math.max(1, p.position + penaltyMove);

    setPlayers((prev) => {
      const updated = [...prev];
      const current = updated[currentPlayerIndex];
      const prevTotal = current.totalResponseTimeSec || 0;
      const prevCount = current.questionsAnsweredCount || 0;
      updated[currentPlayerIndex] = {
        ...current,
        position: updatedPos,
        wrongAnswers: current.wrongAnswers + 1,
        totalResponseTimeSec: prevTotal + 45.0,
        questionsAnsweredCount: prevCount + 1
      };
      return updated;
    });

    const correctKey = currentQuestion.correctAnswer;
    const correctText = currentQuestion.options[correctKey] || '';

    setLastAnswerResult({
      selectedOption: null,
      selectedOptionText: 'No answer submitted (45-second timer expired)',
      correctAnswer: correctKey,
      correctAnswerText: correctText,
      isCorrect: false,
      pointsAwarded: 0,
      explanation: currentQuestion.explanation,
      isTimeout: true,
      speedBonus: false,
      responseTimeSec: 45.0,
      speedTier: 'Timeout (>45s)',
      specialEffectNote: specialNote
    });

    setPhase('ANSWER_REVIEW');

    deviceService.send({
      type: 'ANSWER_RESULT',
      payload: {
        isCorrect: false,
        isTimeout: true,
        pointsAwarded: 0,
        correctAnswer: correctKey,
        oledLines: ['TIME UP', '+0 POINTS', `CORRECT: ${correctKey}`, 'PRESS [RETURN]']
      }
    });
  }, [currentQuestion, currentPlayerIndex, players, playSoundEffect]);

  // Question Timer Effect
  useEffect(() => {
    if (phase === 'QUESTION' && isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isTimerRunning]);

  // When timer reaches 0 during QUESTION phase, handle timeout
  useEffect(() => {
    if (phase === 'QUESTION' && isTimerRunning && timerSeconds === 0) {
      setIsTimerRunning(false);
      handleTimeout();
    }
  }, [phase, isTimerRunning, timerSeconds, handleTimeout]);

  // Synchronize timer countdown to ESP32 device
  useEffect(() => {
    if (phase === 'QUESTION') {
      deviceService.send({
        type: 'TIMER',
        payload: { remaining: timerSeconds }
      });
    }
  }, [phase, timerSeconds]);

  // Submit Answer
  const submitAnswer = useCallback(
    (option: 'A' | 'B' | 'C' | 'D') => {
      if (phase !== 'QUESTION' || !currentQuestion || isAnsweringRef.current) return;
      isAnsweringRef.current = true;

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsTimerRunning(false);

      const rawElapsed = (Date.now() - questionStartTimeRef.current) / 1000;
      const elapsedSec = Math.max(0.1, Number(rawElapsed.toFixed(1)));
      const isCorrect = option === currentQuestion.correctAnswer;

      const p = players[currentPlayerIndex];
      const targetLocation = LOCATIONS_DATA.find((l) => l.id === p.position) || LOCATIONS_DATA[0];
      const special = targetLocation.specialBlock;

      // Calculate time-based scoring
      const scoring = calculateTimeBasedScore(elapsedSec, isCorrect, special);
      const pointsAwarded = scoring.pointsAwarded;

      let posChange = 0;
      if (isCorrect) {
        playSoundEffect('correct');
        if (special === 'Knowledge Ladder') {
          posChange = 3;
        }
      } else {
        playSoundEffect('wrong');
        if (special === 'Myth/Misinformation Trap') {
          posChange = -2;
        }
      }

      const updatedPos = Math.min(80, Math.max(1, p.position + posChange));

      // Update player
      setPlayers((prev) => {
        const updated = [...prev];
        const current = updated[currentPlayerIndex];
        const prevTotal = current.totalResponseTimeSec || 0;
        const prevCount = current.questionsAnsweredCount || 0;
        const prevFastest = current.fastestResponseTimeSec !== undefined ? current.fastestResponseTimeSec : 999;
        const newFastest = isCorrect ? Math.min(prevFastest, elapsedSec) : prevFastest;

        updated[currentPlayerIndex] = {
          ...current,
          position: updatedPos,
          score: current.score + pointsAwarded,
          correctAnswers: current.correctAnswers + (isCorrect ? 1 : 0),
          wrongAnswers: current.wrongAnswers + (isCorrect ? 0 : 1),
          totalResponseTimeSec: prevTotal + elapsedSec,
          questionsAnsweredCount: prevCount + 1,
          fastestResponseTimeSec: newFastest < 999 ? newFastest : undefined
        };
        return updated;
      });

      // Check badges
      checkBadgeUnlocks(
        {
          ...p,
          position: updatedPos,
          score: p.score + pointsAwarded,
          correctAnswers: p.correctAnswers + (isCorrect ? 1 : 0)
        },
        special,
        isCorrect,
        posChange > 0
      );

      // Add to move record
      const moveRecord: MoveRecord = {
        round,
        playerId: p.id,
        playerName: p.name,
        fromPosition: p.position - (diceValue || 0),
        toPosition: updatedPos,
        diceRoll: diceValue || 0,
        locationName: `${targetLocation.city} (${targetLocation.heritageSite})`,
        specialBlock: special,
        questionAnswered: currentQuestion.question,
        isCorrect,
        pointsAwarded,
        timeTakenSec: Math.round(elapsedSec),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setHistoryLog((prev) => [moveRecord, ...prev]);

      const selectedText = currentQuestion.options[option] || '';
      const correctKey = currentQuestion.correctAnswer;
      const correctText = currentQuestion.options[correctKey] || '';

      setLastAnswerResult({
        selectedOption: option,
        selectedOptionText: selectedText,
        correctAnswer: correctKey,
        correctAnswerText: correctText,
        isCorrect,
        pointsAwarded,
        explanation: currentQuestion.explanation,
        isTimeout: false,
        speedBonus: elapsedSec <= 5.0 && isCorrect,
        responseTimeSec: elapsedSec,
        speedTier: scoring.speedTierLabel,
        specialEffectNote: scoring.specialMultiplierOrBonus || (isCorrect ? undefined : 'Incorrect. Better luck on the next turn!')
      });

      setPhase('ANSWER_REVIEW');

      deviceService.send({
        type: 'ANSWER_RESULT',
        payload: {
          isCorrect,
          pointsAwarded,
          selectedOption: option,
          correctAnswer: correctKey,
          oledLines: isCorrect
            ? ['CORRECT', `+${pointsAwarded} POINTS`, `TIME: ${elapsedSec}s`, 'PRESS [RETURN]']
            : ['WRONG', '+0 POINTS', `CORRECT: ${correctKey}`, 'PRESS [RETURN]']
        }
      });
    },
    [
      phase,
      currentQuestion,
      players,
      currentPlayerIndex,
      playSoundEffect,
      checkBadgeUnlocks,
      round,
      diceValue
    ]
  );

  // Choose / change category for the current location's question
  const selectCategoryForQuestion = useCallback(
    (category: CategoryType) => {
      setActiveCategory(category);
      if (phase === 'QUESTION') {
        const locId = players[currentPlayerIndex].position;
        const currentLoc = LOCATIONS_DATA.find((l) => l.id === locId) || LOCATIONS_DATA[0];
        const diff = getDefaultDifficultyForBlock(currentLoc.specialBlock, locId);
        const newQuestion = getUniversalQuestion({
          locationId: locId,
          selectedCategories: [category],
          activeCategory: category,
          blockType: currentLoc.specialBlock,
          difficulty: diff,
          previouslyUsedIds: usedQuestionIds
        });
        setCurrentQuestion(newQuestion);
        setUsedQuestionIds((prev) => [...prev, newQuestion.id]);
        deviceService.send({
          type: 'QUESTION',
          payload: {
            category: newQuestion.category,
            question: newQuestion.question,
            options: newQuestion.options
          }
        });
      }
    },
    [phase, players, currentPlayerIndex, usedQuestionIds]
  );

  // Trigger Heritage Hunt (when landed on Heritage Hunt block or manual entry)
  const triggerHeritageHunt = useCallback(() => {
    const locId = players[currentPlayerIndex].position;
    const loc = LOCATIONS_DATA.find((l) => l.id === locId) || LOCATIONS_DATA[0];
    if (!activeHuntTarget) {
      generateHuntChallengeForLocation(locId, loc.city);
    }
    setPhase('HERITAGE_HUNT');
    setActiveScreen('HERITAGE_HUNT');
  }, [players, currentPlayerIndex, activeHuntTarget, generateHuntChallengeForLocation]);

  // Complete Heritage Hunt with +50 points (awarded exactly once)
  const completeHeritageHunt = useCallback(
    (points: number = 50) => {
      isAnsweringRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsTimerRunning(false);
      setTimerSeconds(45);

      const challengeKey = activeHuntTarget
        ? `hunt-${activeHuntTarget.id}-${players[currentPlayerIndex]?.id}`
        : `hunt-pos-${players[currentPlayerIndex]?.position}-${players[currentPlayerIndex]?.id}`;

      let updatedPlayers = [...players];
      if (!isHuntCompletedThisTurn && !completedHuntChallengeIds.includes(challengeKey)) {
        setIsHuntCompletedThisTurn(true);
        setCompletedHuntChallengeIds((prev) => [...prev, challengeKey]);

        playSoundEffect('fanfare');
        try {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        } catch {
          // fallback
        }

        const current = updatedPlayers[currentPlayerIndex];
        updatedPlayers[currentPlayerIndex] = {
          ...current,
          score: current.score + points,
          heritageHuntsCompleted: current.heritageHuntsCompleted + 1
        };
        setPlayers(updatedPlayers);

        checkBadgeUnlocks(
          {
            ...currentPlayer,
            score: currentPlayer.score + points,
            heritageHuntsCompleted: currentPlayer.heritageHuntsCompleted + 1
          },
          'Heritage Hunt',
          true
        );
      }

      // Check if anyone won (reached block 80)
      const winner = updatedPlayers.find((p) => p.position >= 80);
      if (winner) {
        setPhase('GAME_OVER');
        return;
      }

      // Return to Game Dashboard and prepare next player
      setIsHuntCompletedThisTurn(false);
      setActiveHuntTarget(null);
      setActiveHuntClue(null);
      const nextIndex = (currentPlayerIndex + 1) % updatedPlayers.length;
      if (nextIndex === 0) {
        setRound((r) => r + 1);
      }
      setCurrentPlayerIndex(nextIndex);
      setPhase('READY_TO_ROLL');
      setDiceValue(null);
      setCurrentQuestion(null);
      setLastAnswerResult(null);
      setActiveScreen('GAME_DASHBOARD');

      const nextPlayer = updatedPlayers[nextIndex];
      const nextLoc = LOCATIONS_DATA.find((l) => l.id === nextPlayer.position) || LOCATIONS_DATA[0];

      deviceService.send({
        type: 'PLAYER',
        payload: {
          playerIndex: nextIndex + 1,
          name: nextPlayer.name,
          color: nextPlayer.color,
          position: nextPlayer.position,
          score: nextPlayer.score,
          oledLines: [
            `PLAYER ${nextIndex + 1}`,
            'READY',
            'PRESS ROLL',
            `POS: ${nextPlayer.position}/80 [${nextLoc.city.toUpperCase()}]`
          ]
        }
      });

      storageService.saveActiveGame({
        players: updatedPlayers,
        currentPlayerIndex: nextIndex,
        round: nextIndex === 0 ? round + 1 : round,
        selectedCategories,
        historyLog
      });
    },
    [
      isHuntCompletedThisTurn,
      completedHuntChallengeIds,
      currentPlayerIndex,
      playSoundEffect,
      checkBadgeUnlocks,
      currentPlayer,
      activeHuntTarget,
      players,
      round,
      selectedCategories,
      historyLog
    ]
  );

  // Next Turn / Return to Game Dashboard
  const nextTurn = useCallback(() => {
    isAnsweringRef.current = false;
    setIsHuntCompletedThisTurn(false);
    setActiveHuntTarget(null);
    setActiveHuntClue(null);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerRunning(false);
    setTimerSeconds(45);

    // Check if anyone won (reached block 80)
    const winner = players.find((p) => p.position >= 80);
    if (winner) {
      setPhase('GAME_OVER');
      // Save game to history
      const sorted = [...players].sort((a, b) => b.score - a.score);
      const record: SavedGameHistory = {
        gameId: `BY-${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        durationMinutes: Math.max(1, Math.round(round * 1.5)),
        players: [...players],
        winner: sorted[0],
        totalQuestionsAnswered: players.reduce((sum, p) => sum + p.correctAnswers + p.wrongAnswers, 0),
        totalHeritageHunts: players.reduce((sum, p) => sum + p.heritageHuntsCompleted, 0),
        historyLog: [...historyLog]
      };
      storageService.saveGameToHistory(record);
      setGameHistory((prev) => [record, ...prev]);
      storageService.clearActiveGame();
      return;
    }

    const nextIndex = (currentPlayerIndex + 1) % players.length;
    if (nextIndex === 0) {
      setRound((r) => r + 1);
    }
    setCurrentPlayerIndex(nextIndex);
    setPhase('READY_TO_ROLL');
    setDiceValue(null);
    setCurrentQuestion(null);
    setLastAnswerResult(null);
    setActiveScreen('GAME_DASHBOARD');

    const nextPlayer = players[nextIndex];
    const nextLoc = LOCATIONS_DATA.find((l) => l.id === nextPlayer.position) || LOCATIONS_DATA[0];

    // OLED update strictly following requirement 17
    deviceService.send({
      type: 'PLAYER',
      payload: {
        playerIndex: nextIndex + 1,
        name: nextPlayer.name,
        color: nextPlayer.color,
        position: nextPlayer.position,
        score: nextPlayer.score,
        oledLines: [
          `PLAYER ${nextIndex + 1}`,
          'READY',
          'PRESS ROLL',
          `POS: ${nextPlayer.position}/80 [${nextLoc.city.toUpperCase()}]`
        ]
      }
    });

    // Save active game to storage
    storageService.saveActiveGame({
      players,
      currentPlayerIndex: nextIndex,
      round: nextIndex === 0 ? round + 1 : round,
      selectedCategories,
      historyLog
    });
  }, [players, currentPlayerIndex, round, selectedCategories, historyLog]);

  // Settings update
  const updateSettings = useCallback((partial: Partial<GameSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      queueMicrotask(() => storageService.saveSettings(next));
      return next;
    });
  }, []);

  // Clear history
  const clearAllHistory = useCallback(() => {
    storageService.clearHistory();
    setGameHistory([]);
  }, []);

  // Reset current game
  const resetCurrentGame = useCallback(() => {
    storageService.clearActiveGame();
    setupNewGame(
      players.length,
      players.map((p) => p.name),
      selectedCategories
    );
  }, [players, selectedCategories, setupNewGame]);

  // Hardware connection status state
  const [connectionStatus, setConnectionStatus] = useState<HardwareStatus>(deviceService.getStatus());
  const setConnectionMode = useCallback((mode: 'simulator' | 'websocket' | 'mqtt') => {
    deviceService.setMode(mode);
    setConnectionStatus(deviceService.getStatus());
  }, []);

  useEffect(() => {
    const unsub = mqttService.onStatusChange(() => {
      setConnectionStatus(deviceService.getStatus());
    });
    return unsub;
  }, []);

  // Connect hardware button events from DeviceAdapter (ESP32 simulator or real WebSocket)
  const deviceCallbacksRef = useRef({ rollDice, submitAnswer, nextTurn, triggerHeritageHunt });
  useEffect(() => {
    deviceCallbacksRef.current = { rollDice, submitAnswer, nextTurn, triggerHeritageHunt };
  });

  useEffect(() => {
    const unsubscribe = deviceService.getAdapter().onDeviceEvent((event) => {
      if (event.type === 'ROLL') {
        deviceCallbacksRef.current.rollDice();
      } else if (event.type === 'ANSWER') {
        deviceCallbacksRef.current.submitAnswer(event.answer);
      } else if (event.type === 'NEXT') {
        deviceCallbacksRef.current.nextTurn();
      } else if (event.type === 'HERITAGE_REQUEST') {
        deviceCallbacksRef.current.triggerHeritageHunt();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <GameContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        players,
        currentPlayerIndex,
        currentPlayer,
        currentLocation,
        round,
        phase,
        diceValue,
        isRolling,
        selectedCategories,
        activeCategory,
        selectCategoryForQuestion,
        currentQuestion,
        timerSeconds,
        isTimerRunning,
        lastAnswerResult,
        unlockedBadges,
        historyLog,
        gameHistory,
        settings,
        connectionStatus,
        setConnectionMode,
        setupNewGame,
        rollDice,
        submitAnswer,
        nextTurn,
        triggerHeritageHunt,
        completeHeritageHunt,
        updateSettings,
        clearAllHistory,
        clearHistory: clearAllHistory,
        resetCurrentGame,
        specialBlockModal,
        closeSpecialBlockModal,
        startSpecialChallenge,
        activeHuntTarget,
        activeHuntClue,
        activeHuntClueIndex,
        isHuntCompletedThisTurn,
        generateHuntChallengeForLocation
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
