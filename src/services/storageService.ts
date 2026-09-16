import { GameSettings, Player, SavedGameHistory, MoveRecord } from '../types/game';

const KEYS = {
  SETTINGS: 'bharat_yatra_settings_v1',
  ACTIVE_GAME: 'bharat_yatra_active_game_v1',
  GAME_HISTORY: 'bharat_yatra_history_v1',
  UNLOCKED_BADGES: 'bharat_yatra_badges_v1'
};

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  animationsEnabled: true,
  timerEnabled: true,
  presentationMode: false
};

export const storageService = {
  // Settings
  loadSettings(): GameSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: GameSettings): void {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to save settings to localStorage:', e);
    }
  },

  // Game History
  loadHistory(): SavedGameHistory[] {
    try {
      const data = localStorage.getItem(KEYS.GAME_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveGameToHistory(gameRecord: SavedGameHistory): void {
    try {
      const history = this.loadHistory();
      history.unshift(gameRecord); // newest first
      // Keep up to 20 past games
      if (history.length > 20) history.pop();
      localStorage.setItem(KEYS.GAME_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Unable to save game to history:', e);
    }
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(KEYS.GAME_HISTORY);
    } catch (e) {
      console.warn('Failed to clear history:', e);
    }
  },

  // Active Game State
  saveActiveGame(state: {
    players: Player[];
    currentPlayerIndex: number;
    round: number;
    selectedCategories: string[];
    historyLog: MoveRecord[];
  }): void {
    try {
      localStorage.setItem(KEYS.ACTIVE_GAME, JSON.stringify(state));
    } catch (e) {
      console.warn('Unable to save active game state:', e);
    }
  },

  loadActiveGame(): {
    players: Player[];
    currentPlayerIndex: number;
    round: number;
    selectedCategories: string[];
    historyLog: MoveRecord[];
  } | null {
    try {
      const data = localStorage.getItem(KEYS.ACTIVE_GAME);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  clearActiveGame(): void {
    try {
      localStorage.removeItem(KEYS.ACTIVE_GAME);
    } catch (e) {
      console.warn('Failed to clear active game:', e);
    }
  },

  // Badges
  loadUnlockedBadges(): string[] {
    try {
      const data = localStorage.getItem(KEYS.UNLOCKED_BADGES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveUnlockedBadges(badgeIds: string[]): void {
    try {
      localStorage.setItem(KEYS.UNLOCKED_BADGES, JSON.stringify(badgeIds));
    } catch (e) {
      console.warn('Failed to save badges:', e);
    }
  }
};
