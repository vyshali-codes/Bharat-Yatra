export type SpecialBlockType =
  | 'Culture Challenge'
  | 'Heritage Challenge'
  | 'Festival Challenge'
  | 'Heritage Hunt'
  | 'Golden Heritage'
  | 'Knowledge Ladder'
  | 'Myth/Misinformation Trap'
  | 'Final'
  | 'Normal';

export type CategoryType =
  | 'History'
  | 'Geography'
  | 'Culture'
  | 'Festivals'
  | 'Monuments'
  | 'Food'
  | 'Art'
  | 'Dance'
  | 'Heritage';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';

export interface LocationData {
  id: number;
  city: string;
  state: string;
  heritageSite: string;
  description: string;
  specialBlock: SpecialBlockType;
  questionCategory: CategoryType;
  // Normalized map coordinates for stylized SVG map (0-100 scale or SVG viewBox)
  mapCoord: { x: number; y: number };
}

export interface Player {
  id: number;
  name: string;
  color: string;
  bgHex: string;
  tokenSymbol: string;
  position: number; // 1 - 80
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  heritageHuntsCompleted: number;
  badges: string[];
  totalResponseTimeSec?: number;
  fastestResponseTimeSec?: number;
  questionsAnsweredCount?: number;
}

export interface QuestionOptionItem {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  locationId: number;
  locationName: string;
  category: CategoryType;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswerId?: string;
  optionItems?: QuestionOptionItem[];
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert' | DifficultyLevel;
  difficultyLevel?: DifficultyLevel;
  basePoints?: number;
  points?: number;
  blockType?: SpecialBlockType;
  isMythTrap?: boolean;
  isKnowledgeLadder?: boolean;
  challengeType?: string;
}

export interface HeritageHuntTarget {
  id: string;
  locationId: number;
  city: string;
  state: string;
  monument: string;
  clues: string[];
  acceptedAliases: string[];
  description: string;
  historicalPeriod?: string;
  sampleFilename?: string;
}

export interface SpecialChallengeModalData {
  isOpen: boolean;
  blockType: SpecialBlockType;
  locationId: number;
  locationName: string;
  city: string;
  state: string;
  difficulty: DifficultyLevel;
  challengeTitle: string;
  challengeSubtitle: string;
  iconName?: string;
  isHeritageHunt?: boolean;
}

export interface Monument {
  id: string;
  name: string;
  location: string;
  state: string;
  description: string;
  historicalFacts: string[];
  heritageImportance: string;
  iconType: string;
  accentColor: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconName: string;
  category: string;
  requiredCondition: string;
}

export type GameSessionHistory = SavedGameHistory;


export interface GameSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  timerEnabled: boolean;
  presentationMode: boolean;
}

export interface MoveRecord {
  round: number;
  playerId: number;
  playerName: string;
  fromPosition: number;
  toPosition: number;
  diceRoll: number;
  locationName: string;
  specialBlock: SpecialBlockType;
  questionAnswered?: string;
  isCorrect?: boolean;
  pointsAwarded: number;
  timeTakenSec?: number;
  timestamp: string;
}

export interface SavedGameHistory {
  gameId: string;
  date: string;
  durationMinutes: number;
  players: Player[];
  winner: Player;
  totalQuestionsAnswered: number;
  totalHeritageHunts: number;
  historyLog: MoveRecord[];
}

export type GamePhase =
  | 'READY_TO_ROLL'
  | 'ROLLING'
  | 'MOVING'
  | 'QUESTION'
  | 'ANSWER_REVIEW'
  | 'SPECIAL_EVENT'
  | 'HERITAGE_HUNT'
  | 'GAME_OVER';

export type ESP32EventFromDevice =
  | { type: 'ROLL' }
  | { type: 'ANSWER'; answer: 'A' | 'B' | 'C' | 'D' }
  | { type: 'NEXT' }
  | { type: 'HERITAGE_REQUEST' };

export type ESP32EventToDevice = {
  type:
    | 'DICE_RESULT'
    | 'QUESTION'
    | 'OPTIONS'
    | 'PLAYER'
    | 'POSITION'
    | 'SCORE'
    | 'ANSWER_RESULT'
    | 'SPECIAL_BLOCK'
    | 'HERITAGE_RESULT'
    | 'GAME_STATE'
    | 'TIMER'
    | 'GAME_START'
    | 'GAME_END';
  payload: Record<string, unknown>;
};
