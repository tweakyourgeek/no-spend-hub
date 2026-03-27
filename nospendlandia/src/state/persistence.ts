import type { GameState } from '../types';

// ─── Persistence Adapter ─────────────────────────────────────────────────────

export interface PersistenceAdapter {
  load(): Promise<GameState | null>;
  save(state: GameState): Promise<void>;
  clear(): Promise<void>;
}

const STORAGE_KEY = 'nospendlandia_gamestate';

export const localStorageAdapter: PersistenceAdapter = {
  async load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as GameState;
    } catch {
      // corrupt data — start fresh
    }
    return null;
  },

  async save(state: GameState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable
    }
  },

  async clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};

// Future: swap to supabaseAdapter or clerkAdapter without changing anything upstream
export const activeAdapter: PersistenceAdapter = localStorageAdapter;
