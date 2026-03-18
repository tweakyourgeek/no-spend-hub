import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import type { GameState, GameAction } from '../types';
import { gameReducer, createInitialState } from '../state/game-state';
import { activeAdapter } from '../state/persistence';

const GameStateContext = createContext<GameState>(createInitialState());
const GameDispatchContext = createContext<React.Dispatch<GameAction>>(() => {});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => {
    // Synchronous initial load — adapter is localStorage-based
    try {
      const raw = localStorage.getItem('nospendlandia_gamestate');
      if (raw) {
        const saved = JSON.parse(raw);
        return { ...createInitialState(), ...saved };
      }
    } catch { /* ignore */ }
    return createInitialState();
  });

  const mounted = useRef(false);

  // Persist on every state change (skip first render to avoid overwriting with initial)
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
