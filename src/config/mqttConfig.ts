/**
 * BHARAT YATRA - MQTT Hardware Configuration
 *
 * Central configuration for MQTT communication between the website and the ESP32 + 1.3" OLED display.
 * Configured for HiveMQ Cloud Serverless Broker over Secure WebSockets (WSS).
 */

export interface MqttConfig {
  /**
   * Secure WebSocket MQTT Broker endpoint (WSS is required for HTTPS environments).
   */
  brokerUrl: string;

  /**
   * Broker host name
   */
  host: string;

  /**
   * Secure WebSocket Port
   */
  port: number;

  /**
   * WebSocket path
   */
  path: string;

  /**
   * Base topic namespace for BHARAT YATRA games:
   * bharat-yatra/<ROOM_ID>/game
   */
  topicPrefix: string;

  /**
   * Default username for HiveMQ Cloud authentication
   */
  defaultUsername: string;

  /**
   * Keep-alive interval in seconds
   */
  keepalive: number;

  /**
   * Connect timeout in milliseconds
   */
  connectTimeout: number;

  /**
   * Auto-reconnect flag (0 for debug / manual control)
   */
  reconnectPeriod: number;
}

const STORAGE_KEY_ROOM_ID = 'bharat_yatra_mqtt_room_id';

export const HIVEMQ_CLOUD_CONFIG = {
  host: '95e9f4a065c8449d85e1f2aab45c1d7e.s1.eu.hivemq.cloud',
  port: 8884,
  path: '/mqtt',
  brokerUrl: 'wss://95e9f4a065c8449d85e1f2aab45c1d7e.s1.eu.hivemq.cloud:8884/mqtt',
  defaultUsername: 'bharat_yatra_app',
  topicPrefix: 'bharat-yatra'
};

/**
 * Generates a random, unique Room ID for zero-collision gameplay (e.g. BHARAT-7F3A92)
 */
export function generateRoomId(): string {
  const chars = '0123456789ABCDEF';
  let randomHex = '';
  for (let i = 0; i < 6; i++) {
    randomHex += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BHARAT-${randomHex}`;
}

/**
 * Retrieves the saved Room ID from localStorage or creates a fresh unique one
 */
export function getSavedRoomId(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ROOM_ID);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  } catch {
    // ignore
  }
  const fresh = generateRoomId();
  saveRoomId(fresh);
  return fresh;
}

export function saveRoomId(roomId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_ROOM_ID, roomId.trim().toUpperCase());
  } catch {
    // ignore
  }
}

export const DEFAULT_MQTT_CONFIG: MqttConfig = {
  brokerUrl: HIVEMQ_CLOUD_CONFIG.brokerUrl,
  host: HIVEMQ_CLOUD_CONFIG.host,
  port: HIVEMQ_CLOUD_CONFIG.port,
  path: HIVEMQ_CLOUD_CONFIG.path,
  topicPrefix: HIVEMQ_CLOUD_CONFIG.topicPrefix,
  defaultUsername: HIVEMQ_CLOUD_CONFIG.defaultUsername,
  keepalive: 60,
  connectTimeout: 10000,
  reconnectPeriod: 0 // Zero auto-reconnect
};

/**
 * Constructs the full MQTT topic for the specified room according to specification:
 * bharat-yatra/<ROOM_ID>/game
 */
export function buildGameTopic(roomId: string, prefix: string = HIVEMQ_CLOUD_CONFIG.topicPrefix): string {
  const sanitizedRoom = (roomId || 'BHARAT-DEFAULT').trim();
  return `${prefix}/${sanitizedRoom}/game`;
}
