import React, { createContext, useContext, useReducer } from 'react';
import type { GameState, GameAction } from '../types';

const initialState: GameState = {
  currentScreen: 'entry',
  activeQuest: null,
  chasingPattern: null,
  flags: {},
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentScreen: action.screen };
    case 'SET_QUEST':
      return { ...state, activeQuest: action.quest };
    case 'SET_CHASING_PATTERN':
      return { ...state, chasingPattern: action.pattern };
    case 'SET_FLAG':
      return { ...state, flags: { ...state.flags, [action.key]: action.value } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const GameStateContext = createContext<GameState>(initialState);
const GameDispatchContext = createContext<React.Dispatch<GameAction>>(() => {});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

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
