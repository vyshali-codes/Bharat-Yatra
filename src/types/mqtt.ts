/**
 * BHARAT YATRA - MQTT Hardware Event Types
 *
 * All messages emitted from Website (Single Source of Truth) to ESP32 + 1.3" OLED.
 */

export type MqttEventType =
  | 'GAME_START'
  | 'PLAYER'
  | 'DICE_RESULT'
  | 'POSITION'
  | 'LOCATION'
  | 'QUESTION'
  | 'OPTIONS'
  | 'TIMER'
  | 'SCORE'
  | 'CORRECT'
  | 'WRONG'
  | 'TIMEOUT'
  | 'SPECIAL_BLOCK'
  | 'HERITAGE_HUNT'
  | 'HERITAGE_RESULT'
  | 'GAME_STATE'
  | 'TURN_COMPLETE'
  | 'GAME_END'
  | 'TEST'
  | 'READY_TO_ROLL'
  | 'DICE_ROLL'
  | 'MOVEMENT'
  | 'ANSWER_RESULT'
  | 'SPECIAL_CHALLENGE';

export interface MqttPlayerSummary {
  id: number;
  name: string;
  position: number;
  score: number;
}

export type MqttGameEvent =
  | {
      type: 'TEST';
      message: string;
      [key: string]: unknown;
    }
  | {
      type: 'GAME_START';
      players: MqttPlayerSummary[];
      round: number;
    }
  | {
      type: 'PLAYER';
      player: number;
      name: string;
      score: number;
      position: number;
      status?: 'READY_TO_ROLL' | 'ROLLING' | 'MOVING' | 'QUESTION' | 'WAITING' | string;
    }
  | {
      type: 'READY_TO_ROLL';
      player: number;
      name?: string;
      score?: number;
      position?: number;
    }
  | {
      type: 'DICE_RESULT';
      player: number;
      value: number;
    }
  | {
      type: 'DICE_ROLL';
      player: number;
      value: number;
    }
  | {
      type: 'POSITION';
      player: number;
      position: number;
      city: string;
    }
  | {
      type: 'MOVEMENT';
      player: number;
      fromPosition?: number;
      toPosition: number;
      city?: string;
    }
  | {
      type: 'LOCATION';
      locationId: number;
      locationName?: string;
      city: string;
      block: number;
      specialBlock?: string;
    }
  | {
      type: 'QUESTION';
      locationId: number;
      locationName: string;
      category: string;
      question: string;
      options: string[];
    }
  | {
      type: 'OPTIONS';
      options: Array<{
        key: 'A' | 'B' | 'C' | 'D';
        text: string;
      }>;
    }
  | {
      type: 'TIMER';
      remaining: number;
    }
  | {
      type: 'SCORE';
      player: number;
      score: number;
    }
  | {
      type: 'CORRECT';
      player: number;
      points: number;
      score: number;
    }
  | {
      type: 'WRONG';
      player: number;
      points: number;
      score: number;
      correctAnswer?: string;
    }
  | {
      type: 'TIMEOUT';
      player: number;
      points: number;
      score: number;
      correctAnswer?: string;
    }
  | {
      type: 'ANSWER_RESULT';
      player: number;
      isCorrect: boolean;
      points: number;
      score: number;
      correctAnswer?: string;
    }
  | {
      type: 'SPECIAL_BLOCK';
      blockType: string;
      city: string;
      challenge: string;
      difficulty?: string;
    }
  | {
      type: 'SPECIAL_CHALLENGE';
      blockType: string;
      city?: string;
      challenge: string;
      difficulty?: string;
    }
  | {
      type: 'HERITAGE_HUNT';
      city: string;
      monument?: string;
      clue?: string;
    }
  | {
      type: 'HERITAGE_RESULT';
      player: number;
      isCorrect: boolean;
      points: number;
      score: number;
    }
  | {
      type: 'GAME_STATE';
      phase: string;
      round: number;
      currentPlayer: number;
      location?: string;
    }
  | {
      type: 'TURN_COMPLETE';
      player: number;
      nextPlayer: number;
    }
  | {
      type: 'GAME_END';
      winner: string;
      score: number;
    };

export type MqttConnectionState = 'Connected' | 'Connecting' | 'Disconnected';

export interface MqttMessageLog {
  topic: string;
  payload: MqttGameEvent | Record<string, unknown>;
  timestamp: string;
}
