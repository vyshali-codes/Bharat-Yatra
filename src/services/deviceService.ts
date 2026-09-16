import { ESP32EventFromDevice, ESP32EventToDevice } from '../types/game';

export type DeviceListener = (event: ESP32EventFromDevice) => void;
export type DeviceStateListener = (event: ESP32EventToDevice) => void;

export interface DeviceAdapter {
  name: string;
  isConnected(): boolean;
  connect(url?: string): Promise<boolean>;
  disconnect(): void;
  sendToDevice(event: ESP32EventToDevice): void;
  onDeviceEvent(listener: DeviceListener): () => void;
  onStateUpdate(listener: DeviceStateListener): () => void;
}

/**
 * Browser Simulator Adapter:
 * Emulates the physical ESP32 + OLED device directly within the browser runtime.
 * Dispatches simulated hardware buttons and OLED render frames.
 */
class BrowserSimulatorDeviceAdapter implements DeviceAdapter {
  public name = 'Browser ESP32 Simulator';
  private deviceListeners: Set<DeviceListener> = new Set();
  private stateListeners: Set<DeviceStateListener> = new Set();
  private connected = true;

  public isConnected(): boolean {
    return this.connected;
  }

  public async connect(): Promise<boolean> {
    this.connected = true;
    return true;
  }

  public disconnect(): void {
    this.connected = false;
  }

  public sendToDevice(event: ESP32EventToDevice): void {
    // Notify all UI simulator components asynchronously to avoid React setState during render
    queueMicrotask(() => {
      this.stateListeners.forEach((listener) => {
        try {
          listener(event);
        } catch (err) {
          console.error('Error dispatching state to simulator:', err);
        }
      });
    });
  }

  public emitFromDevice(event: ESP32EventFromDevice): void {
    queueMicrotask(() => {
      this.deviceListeners.forEach((listener) => {
        try {
          listener(event);
        } catch (err) {
          console.error('Error handling simulated hardware button:', err);
        }
      });
    });
  }

  public onDeviceEvent(listener: DeviceListener): () => void {
    this.deviceListeners.add(listener);
    return () => this.deviceListeners.delete(listener);
  }

  public onStateUpdate(listener: DeviceStateListener): () => void {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }
}

/**
 * Real Hardware WebSocket Adapter (Modular Placeholder for Future Physical ESP32):
 * Allows connecting a real ESP32 micro-controller board running FreeRTOS/Arduino
 * via a WebSocket server (e.g., ws://192.168.4.1:81 or local LAN gateway).
 */
export class WebSocketDeviceAdapter implements DeviceAdapter {
  public name = 'Real ESP32 WebSocket';
  private socket: WebSocket | null = null;
  private deviceListeners: Set<DeviceListener> = new Set();
  private stateListeners: Set<DeviceStateListener> = new Set();
  private connected = false;

  public isConnected(): boolean {
    return this.connected && this.socket?.readyState === WebSocket.OPEN;
  }

  public async connect(url: string = 'ws://192.168.4.1:81'): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.socket = new WebSocket(url);
        this.socket.onopen = () => {
          this.connected = true;
          resolve(true);
        };
        this.socket.onerror = () => {
          this.connected = false;
          resolve(false);
        };
        this.socket.onclose = () => {
          this.connected = false;
        };
        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as ESP32EventFromDevice;
            this.deviceListeners.forEach((l) => l(data));
          } catch (e) {
            console.warn('Malformed hardware payload from ESP32:', e);
          }
        };
      } catch {
        this.connected = false;
        resolve(false);
      }
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.connected = false;
  }

  public sendToDevice(event: ESP32EventToDevice): void {
    if (this.isConnected() && this.socket) {
      this.socket.send(JSON.stringify(event));
    }
    // Also broadcast to any connected UI observers
    this.stateListeners.forEach((l) => l(event));
  }

  public onDeviceEvent(listener: DeviceListener): () => void {
    this.deviceListeners.add(listener);
    return () => this.deviceListeners.delete(listener);
  }

  public onStateUpdate(listener: DeviceStateListener): () => void {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }
}

// Global active device adapter singleton instance
export const browserDeviceAdapter = new BrowserSimulatorDeviceAdapter();
export const realDeviceAdapter = new WebSocketDeviceAdapter();

class DeviceService {
  private activeAdapter: DeviceAdapter = browserDeviceAdapter;
  private mode: 'browser' | 'websocket' = 'browser';

  public getMode(): 'browser' | 'websocket' {
    return this.mode;
  }

  public setMode(mode: 'browser' | 'websocket') {
    this.mode = mode;
    this.activeAdapter = mode === 'browser' ? browserDeviceAdapter : realDeviceAdapter;
  }

  public getAdapter(): DeviceAdapter {
    return this.activeAdapter;
  }

  public getBrowserAdapter(): BrowserSimulatorDeviceAdapter {
    return browserDeviceAdapter;
  }

  public send(event: ESP32EventToDevice) {
    this.activeAdapter.sendToDevice(event);
    // Always mirror to browser simulator so inspector stays live!
    if (this.activeAdapter !== browserDeviceAdapter) {
      browserDeviceAdapter.sendToDevice(event);
    }
  }
}

export const deviceService = new DeviceService();
