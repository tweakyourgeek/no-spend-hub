import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import type { GameState, GameAction } from '../types';
import { gameReducer, createInitialState } from '../state/game-state';
import { activeAdapter } from '../state/persistence';

const OLD_STORAGE_KEY = 'nospendlandia-save';
const NEW_STORAGE_KEY = 'nospendlandia_gamestate';

const GameStateContext = createContext<GameState>(createInitialState());
const GameDispatchContext = createContext<React.Dispatch<GameAction>>(() => {});

/**
 * Migrate old save format to new format.
 * Maps old quest IDs (kebab-case) to new (underscore), etc.
 */
function migrateOldState(old: any): Partial<GameState> {
  const migrated: any = { ...old };

  // Migrate quest IDs
  const questMap: Record<string, string> = {
    'no-spend-weekend': 'no_spend_weekend',
    'no-spend-week': 'no_spend_week',
    'low-spend-month': 'low_spend_month',
  };

  if (migrated.activeQuest && questMap[migrated.activeQuest]) {
    migrated.currentQuest = questMap[migrated.activeQuest];
    delete migrated.activeQuest;
  }
  if (migrated.completedQuests) {
    migrated.completedQuests = migrated.completedQuests.map(
      (q: string) => questMap[q] || q
    );
  }

  // Migrate screen name: 'dialogue' → 'scene'
  if (migrated.currentScreen === 'dialogue') {
    migrated.currentScreen = 'scene';
  }

  return migrated;
}

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => {
    try {
      // Try new key first
      let raw = localStorage.getItem(NEW_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        return { ...createInitialState(), ...saved };
      }

      // Fall back to old key and migrate
      raw = localStorage.getItem(OLD_STORAGE_KEY);
      if (raw) {
        const old = JSON.parse(raw);
        const migrated = migrateOldState(old);
        // Clean up old key
        localStorage.removeItem(OLD_STORAGE_KEY);
        return { ...createInitialState(), ...migrated };
      }
    } catch { /* ignore corrupt data */ }
    return createInitialState();
  });

  const mounted = useRef(false);

  // Persist on every state change (skip first render)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    activeAdapter.save(state);
  }, [state]);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

/** Read current game state */
export function useGameState() {
  return useContext(GameStateContext);
}

/** Dispatch game state actions */
export function useGameDispatch() {
  return useContext(GameDispatchContext);
}
