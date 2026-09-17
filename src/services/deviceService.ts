/**
 * BHARAT YATRA - Device Service & Hardware Adapter
 *
 * Integrates MQTT communication for the ESP32 + 1.3" OLED secondary display.
 * The phone/browser remains the sole game controller.
 */

import { mqttService } from './mqttService';
import { MqttGameEvent, MqttConnectionState } from '../types/mqtt';

export interface HardwareStatus {
  status: MqttConnectionState;
  broker: string;
  topic: string;
  roomId: string;
  mode: 'simulator' | 'websocket' | 'mqtt';
}

export interface DeviceEvent {
  type: 'ROLL' | 'ANSWER' | 'NEXT' | 'HERITAGE_REQUEST' | string;
  answer?: 'A' | 'B' | 'C' | 'D';
  [key: string]: unknown;
}

export type StateUpdateListener = (evt: { type: string; payload?: unknown }) => void;
export type DeviceEventListener = (event: DeviceEvent) => void;

export class BrowserDeviceAdapter {
  private stateListeners: Set<StateUpdateListener> = new Set();
  private deviceListeners: Set<DeviceEventListener> = new Set();

  public onStateUpdate(listener: StateUpdateListener): () => void {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }

  public notifyState(evt: { type: string; payload?: unknown }): void {
    this.stateListeners.forEach((listener) => {
      try {
        listener(evt);
      } catch (e) {
        console.error('Error in state update listener:', e);
      }
    });
  }

  public emitFromDevice(event: DeviceEvent): void {
    this.deviceListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (e) {
        console.error('Error in device event listener:', e);
      }
    });
  }

  public onDeviceEvent(listener: DeviceEventListener): () => void {
    this.deviceListeners.add(listener);
    return () => this.deviceListeners.delete(listener);
  }
}

export const browserDeviceAdapter = new BrowserDeviceAdapter();

class DeviceService {
  private adapter: BrowserDeviceAdapter = browserDeviceAdapter;
  private mode: 'simulator' | 'websocket' | 'mqtt' = 'simulator';

  constructor() {
    // When mqttService receives a message from the broker, notify local adapter
    mqttService.onMessage((event) => {
      this.adapter.notifyState({
        type: event.type,
        payload: event
      });
    });
  }

  public getAdapter(): BrowserDeviceAdapter {
    return this.adapter;
  }

  public getMode(): 'simulator' | 'websocket' | 'mqtt' {
    return this.mode;
  }

  public setMode(mode: 'simulator' | 'websocket' | 'mqtt'): void {
    this.mode = mode;
  }

  public getStatus(): HardwareStatus {
    return {
      status: mqttService.getStatus(),
      broker: mqttService.getBrokerUrl(),
      topic: mqttService.getTopic(),
      roomId: mqttService.getRoomId(),
      mode: this.mode
    };
  }

  /**
   * Publishes an MQTT game event to the ESP32 secondary OLED display
   */
  public publish(event: MqttGameEvent): void {
    this.adapter.notifyState({
      type: event.type,
      payload: event
    });
    mqttService.publish(event);
  }

  /**
   * Compatibility wrapper for legacy send calls across GameContext
   */
  public send(event: { type: string; payload?: Record<string, unknown> }): void {
    // Immediately notify local adapter
    this.adapter.notifyState(event);

    const p = event.payload || {};
    switch (event.type) {
      case 'DICE_RESULT':
        this.publish({
          type: 'DICE_RESULT',
          player: Number(p.player || 1),
          value: Number(p.value || p.roll || 1)
        });
        break;
      case 'DICE_ROLL':
        this.publish({
          type: 'DICE_ROLL',
          player: Number(p.player || 1),
          value: Number(p.value || p.roll || 1)
        });
        break;
      case 'READY_TO_ROLL':
        this.publish({
          type: 'READY_TO_ROLL',
          player: Number(p.player || 1),
          name: p.name ? String(p.name) : undefined,
          score: p.score !== undefined ? Number(p.score) : undefined,
          position: p.position !== undefined ? Number(p.position) : undefined
        });
        break;
      case 'MOVEMENT':
        this.publish({
          type: 'MOVEMENT',
          player: Number(p.player || 1),
          fromPosition: p.fromPosition !== undefined ? Number(p.fromPosition) : undefined,
          toPosition: Number(p.toPosition || p.position || 1),
          city: p.city ? String(p.city) : undefined
        });
        break;
      case 'QUESTION':
        this.publish({
          type: 'QUESTION',
          locationId: Number(p.locationId || 1),
          locationName: String(p.locationName || p.city || 'India'),
          category: String(p.category || 'Monuments'),
          question: String(p.question || ''),
          options: Array.isArray(p.options)
            ? (p.options as string[])
            : Object.values((p.options as Record<string, string>) || {})
        });
        break;
      case 'TIMER':
        this.publish({
          type: 'TIMER',
          remaining: Number(p.remaining || 0)
        });
        break;
      case 'PLAYER':
        this.publish({
          type: 'PLAYER',
          player: Number(p.player || p.playerIndex || 1),
          name: String(p.name || 'Player'),
          score: Number(p.score || 0),
          position: Number(p.position || 1),
          status: String(p.status || 'READY_TO_ROLL')
        });
        break;
      case 'GAME_START':
        this.publish({
          type: 'GAME_START',
          players: Array.isArray(p.players) ? (p.players as any) : [],
          round: Number(p.round || 1)
        });
        break;
      case 'CORRECT':
        this.publish({
          type: 'CORRECT',
          player: Number(p.player || 1),
          points: Number(p.points || 0),
          score: Number(p.score || 0)
        });
        break;
      case 'WRONG':
        this.publish({
          type: 'WRONG',
          player: Number(p.player || 1),
          points: Number(p.points || 0),
          score: Number(p.score || 0),
          correctAnswer: String(p.correctAnswer || '')
        });
        break;
      case 'TIMEOUT':
        this.publish({
          type: 'TIMEOUT',
          player: Number(p.player || 1),
          points: Number(p.points || 0),
          score: Number(p.score || 0),
          correctAnswer: String(p.correctAnswer || '')
        });
        break;
      case 'ANSWER_RESULT':
        this.publish({
          type: 'ANSWER_RESULT',
          player: Number(p.player || 1),
          isCorrect: Boolean(p.isCorrect),
          points: Number(p.points || 0),
          score: Number(p.score || 0),
          correctAnswer: p.correctAnswer ? String(p.correctAnswer) : undefined
        });
        break;
      case 'SPECIAL_BLOCK':
        this.publish({
          type: 'SPECIAL_BLOCK',
          blockType: String(p.blockType || 'Special Block'),
          city: String(p.city || ''),
          challenge: String(p.challenge || ''),
          difficulty: p.difficulty ? String(p.difficulty) : undefined
        });
        break;
      case 'SPECIAL_CHALLENGE':
        this.publish({
          type: 'SPECIAL_CHALLENGE',
          blockType: String(p.blockType || 'Special Challenge'),
          city: p.city ? String(p.city) : undefined,
          challenge: String(p.challenge || ''),
          difficulty: p.difficulty ? String(p.difficulty) : undefined
        });
        break;
      case 'HERITAGE_HUNT':
        this.publish({
          type: 'HERITAGE_HUNT',
          city: String(p.city || ''),
          monument: p.monument ? String(p.monument) : undefined,
          clue: p.clue ? String(p.clue) : undefined
        });
        break;
      case 'HERITAGE_RESULT':
        this.publish({
          type: 'HERITAGE_RESULT',
          player: Number(p.player || 1),
          isCorrect: Boolean(p.isCorrect),
          points: Number(p.points || 0),
          score: Number(p.score || 0)
        });
        break;
      case 'GAME_STATE':
        this.publish({
          type: 'GAME_STATE',
          phase: String(p.phase || ''),
          round: Number(p.round || 1),
          currentPlayer: Number(p.currentPlayer || 1),
          location: p.location ? String(p.location) : undefined
        });
        break;
      case 'TURN_COMPLETE':
        this.publish({
          type: 'TURN_COMPLETE',
          player: Number(p.player || 1),
          nextPlayer: Number(p.nextPlayer || 1)
        });
        break;
      case 'GAME_END':
        this.publish({
          type: 'GAME_END',
          winner: String(p.winner || 'Winner'),
          score: Number(p.score || 0)
        });
        break;
      default:
        this.publish(event as unknown as MqttGameEvent);
        break;
    }
  }
}

export const deviceService = new DeviceService();
