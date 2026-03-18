import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { GameState, GameAction } from '../types';

const STORAGE_KEY = 'nospendlandia-save';

const initialState: GameState = {
  currentScreen: 'entry',
  previousScreen: null,
  activeQuest: null,
  chasingPattern: null,
  revealedPatterns: [],
  flags: {},
  currentDialogueId: null,
  encounterIndex: 0,
  completedQuests: [],
  journalEntries: [],
};

function loadState(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialState, ...parsed };
    }
  } catch {
    // ignore
  }
  return initialState;
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, previousScreen: state.currentScreen, currentScreen: action.screen };
    case 'SET_QUEST':
      return { ...state, activeQuest: action.quest, encounterIndex: 0 };
    case 'SET_CHASING_PATTERN':
      return { ...state, chasingPattern: action.pattern };
    case 'REVEAL_PATTERN':
      if (state.revealedPatterns.includes(action.patternId)) return state;
      return { ...state, revealedPatterns: [...state.revealedPatterns, action.patternId] };
    case 'SET_FLAG':
      return { ...state, flags: { ...state.flags, [action.key]: action.value } };
    case 'SET_DIALOGUE':
      return { ...state, currentDialogueId: action.dialogueId, currentScreen: 'dialogue' };
    case 'ADVANCE_ENCOUNTER':
      return { ...state, encounterIndex: state.encounterIndex + 1 };
    case 'COMPLETE_QUEST':
      if (state.completedQuests.includes(action.quest)) return state;
      return { ...state, completedQuests: [...state.completedQuests, action.quest] };
    case 'ADD_JOURNAL':
      return { ...state, journalEntries: [...state.journalEntries, action.entry] };
    case 'LOAD_STATE':
      return { ...initialState, ...action.state };
    case 'RESET':
      localStorage.removeItem(STORAGE_KEY);
      return initialState;
    default:
      return state;
  }
}

const GameStateContext = createContext<GameState>(initialState);
const GameDispatchContext = createContext<React.Dispatch<GameAction>>(() => {});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
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
