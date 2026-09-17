/**
 * BHARAT YATRA - MQTT Service
 *
 * Provides a clean adapter for communicating with ESP32 microcontrollers over secure WebSockets.
 * Publishes structured JSON game events when the browser/phone executes game actions.
 * Subscribes to the game topic to enable two-way telemetry and browser simulator mirroring.
 *
 * Configured for HiveMQ Cloud Serverless Broker (WSS on Port 8884, Path: /mqtt).
 * Supports runtime username and password credentials entered by the user.
 *
 * IMPORTANT:
 * Initial state is strictly 'Disconnected'. No MQTT connection attempt is made on instantiation
 * or component mount. Connection only initiates when the user explicitly triggers connect().
 */

import mqtt, { MqttClient } from 'mqtt';
import {
  DEFAULT_MQTT_CONFIG,
  HIVEMQ_CLOUD_CONFIG,
  buildGameTopic,
  getSavedRoomId,
  saveRoomId
} from '../config/mqttConfig';
import { MqttGameEvent, MqttConnectionState, MqttMessageLog } from '../types/mqtt';

export type MqttStatusListener = (status: MqttConnectionState, errorMessage?: string | null) => void;
export type MqttEventListener = (event: MqttGameEvent) => void;
export type MqttLogListener = (lastSent: MqttMessageLog | null, lastReceived: MqttMessageLog | null) => void;

class MqttService {
  private client: MqttClient | null = null;
  private status: MqttConnectionState = 'Disconnected';
  private brokerUrl: string = HIVEMQ_CLOUD_CONFIG.brokerUrl;
  private host: string = HIVEMQ_CLOUD_CONFIG.host;
  private port: number = HIVEMQ_CLOUD_CONFIG.port;
  private path: string = HIVEMQ_CLOUD_CONFIG.path;
  private roomId: string = getSavedRoomId();
  private username: string = HIVEMQ_CLOUD_CONFIG.defaultUsername;
  private password: string = ''; // Never hardcoded; supplied at runtime

  private lastMessageSent: MqttMessageLog | null = null;
  private lastMessageReceived: MqttMessageLog | null = null;
  private errorMessage: string | null = null;

  private statusListeners: Set<MqttStatusListener> = new Set();
  private eventListeners: Set<MqttEventListener> = new Set();
  private logListeners: Set<MqttLogListener> = new Set();

  constructor() {
    // Initial state must be DISCONNECTED with ZERO auto-connect
    this.status = 'Disconnected';
    this.errorMessage = null;
  }

  public getStatus(): MqttConnectionState {
    return this.status;
  }

  public getErrorMessage(): string | null {
    return this.errorMessage;
  }

  public getBrokerUrl(): string {
    return this.brokerUrl;
  }

  public getHost(): string {
    return this.host;
  }

  public getPort(): number {
    return this.port;
  }

  public getPath(): string {
    return this.path;
  }

  public getRoomId(): string {
    return this.roomId;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username.trim();
  }

  public setPassword(password: string): void {
    // Runtime only. Never logged, never persisted to localStorage
    this.password = password;
  }

  public getTopic(): string {
    return buildGameTopic(this.roomId);
  }

  public getLastMessageSent(): MqttMessageLog | null {
    return this.lastMessageSent;
  }

  public getLastMessageReceived(): MqttMessageLog | null {
    return this.lastMessageReceived;
  }

  /**
   * Updates the Room ID and resubscribes on the new topic if currently connected
   */
  public setRoomId(newRoomId: string): void {
    const cleanRoomId = newRoomId.trim().toUpperCase();
    if (!cleanRoomId || cleanRoomId === this.roomId) return;

    const oldTopic = this.getTopic();
    this.roomId = cleanRoomId;
    saveRoomId(cleanRoomId);

    if (this.client && this.status === 'Connected') {
      try {
        this.client.unsubscribe(oldTopic);
        this.client.subscribe(this.getTopic(), { qos: 0 });
      } catch (e) {
        console.warn('MQTT topic switch error:', e);
      }
    }
    this.notifyStatus();
  }

  /**
   * Establishes MQTT connection to HiveMQ Cloud over Secure WebSocket.
   * Starts ONLY when user explicitly clicks Connect.
   */
  public connect(customCredentials?: { username?: string; password?: string }): void {
    if (customCredentials?.username !== undefined) {
      this.username = customCredentials.username.trim();
    }
    if (customCredentials?.password !== undefined) {
      this.password = customCredentials.password;
    }

    // Clean up any previous client first
    this.cleanupClient();

    this.status = 'Connecting';
    this.errorMessage = null;
    this.notifyStatus();

    const currentTopic = this.getTopic();
    // Unique Client ID per connection attempt
    const clientId = `by-web-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;

    try {
      // Connect to HiveMQ Cloud Serverless via WSS on port 8884
      const connectOptions: mqtt.IClientOptions = {
        clientId,
        clean: true,
        connectTimeout: 10000,
        reconnectPeriod: 0, // No auto-reconnect while debugging or on failure
        keepalive: DEFAULT_MQTT_CONFIG.keepalive,
        username: this.username || undefined,
        password: this.password || undefined
      };

      const client = mqtt.connect(this.brokerUrl, connectOptions);
      this.client = client;

      client.on('connect', () => {
        if (this.client !== client) return;
        this.status = 'Connected';
        this.errorMessage = null;
        this.notifyStatus();

        client.subscribe(currentTopic, { qos: 0 }, (err) => {
          if (err) {
            console.warn(`MQTT Subscribe error on ${currentTopic}:`, err);
          }
        });
      });

      client.on('error', (err: Error) => {
        if (this.client !== client) return;
        console.warn('MQTT Client Error:', err);
        const errMsg = err?.message || 'Connection failed';
        this.errorMessage = errMsg;
        this.cleanupClient();
        this.status = 'Disconnected';
        this.notifyStatus();
      });

      client.on('close', () => {
        if (this.client !== client) return;
        if (this.status === 'Connecting') {
          this.errorMessage = this.errorMessage || 'Connection closed or timeout';
        }
        this.cleanupClient();
        this.status = 'Disconnected';
        this.notifyStatus();
      });

      client.on('offline', () => {
        if (this.client !== client) return;
        this.errorMessage = 'HiveMQ broker went offline';
        this.cleanupClient();
        this.status = 'Disconnected';
        this.notifyStatus();
      });

      client.on('message', (topic, message) => {
        if (this.client !== client) return;
        try {
          const parsed = JSON.parse(message.toString()) as MqttGameEvent;
          const logEntry: MqttMessageLog = {
            topic,
            payload: parsed,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          };
          this.lastMessageReceived = logEntry;
          this.notifyLogs();
          this.eventListeners.forEach((listener) => {
            try {
              listener(parsed);
            } catch (err) {
              console.error('Error dispatching MQTT event to listener:', err);
            }
          });
        } catch (e) {
          console.warn('Failed to parse MQTT message payload:', e);
        }
      });
    } catch (err: unknown) {
      console.warn('Failed to instantiate HiveMQ MQTT client:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      this.errorMessage = errMsg;
      this.cleanupClient();
      this.status = 'Disconnected';
      this.notifyStatus();
    }
  }

  /**
   * Completely stops the MQTT client, removes listeners, and clears reference
   */
  public disconnect(): void {
    this.errorMessage = null;
    this.cleanupClient();
    this.status = 'Disconnected';
    this.notifyStatus();
  }

  private cleanupClient(): void {
    if (this.client) {
      try {
        this.client.removeAllListeners();
        this.client.end(true);
      } catch (e) {
        console.warn('Error ending MQTT client:', e);
      }
      this.client = null;
    }
  }

  /**
   * Publishes a game event to the current topic.
   */
  public publish(event: MqttGameEvent): void {
    const topic = this.getTopic();
    const payloadStr = JSON.stringify(event);

    const logEntry: MqttMessageLog = {
      topic,
      payload: event,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    this.lastMessageSent = logEntry;
    this.notifyLogs();

    if (this.client && this.status === 'Connected') {
      try {
        this.client.publish(topic, payloadStr, { qos: 0, retain: false });
      } catch (err) {
        console.warn(`Failed to publish MQTT message to ${topic}:`, err);
      }
    }

    // Deliver locally to internal observers and OLED display simulator
    queueMicrotask(() => {
      this.eventListeners.forEach((listener) => {
        try {
          listener(event);
        } catch (err) {
          console.error('Error dispatching local event:', err);
        }
      });
    });
  }

  // Listener subscriptions
  public onStatusChange(listener: MqttStatusListener): () => void {
    this.statusListeners.add(listener);
    listener(this.status, this.errorMessage);
    return () => this.statusListeners.delete(listener);
  }

  public onMessage(listener: MqttEventListener): () => void {
    this.eventListeners.add(listener);
    return () => this.eventListeners.delete(listener);
  }

  public onLogUpdate(listener: MqttLogListener): () => void {
    this.logListeners.add(listener);
    listener(this.lastMessageSent, this.lastMessageReceived);
    return () => this.logListeners.delete(listener);
  }

  private notifyStatus(): void {
    this.statusListeners.forEach((l) => {
      try {
        l(this.status, this.errorMessage);
      } catch {
        // ignore
      }
    });
  }

  private notifyLogs(): void {
    this.logListeners.forEach((l) => {
      try {
        l(this.lastMessageSent, this.lastMessageReceived);
      } catch {
        // ignore
      }
    });
  }
}

export const mqttService = new MqttService();
