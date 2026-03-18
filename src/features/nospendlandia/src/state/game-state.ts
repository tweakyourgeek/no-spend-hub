import type { GameState, GameAction, PatternId, PatternTracking } from '../types';
import { createPatternTracking, shouldUnlock, ALL_PATTERN_IDS } from '../data/patterns';

// ─── Initial State ───────────────────────────────────────────────────────────

export function createInitialState(): GameState {
  const patternData: Record<string, PatternTracking> = {};
  for (const pid of ALL_PATTERN_IDS) {
    patternData[pid] = createPatternTracking();
  }

  return {
    currentScreen: 'entry',
    previousScreen: null,
    currentQuest: null,
    currentScene: null,
    currentBeatIndex: 0,
    currentBranch: null,
    completedScenes: [],
    completedQuests: [],
    patternData,
    stateTags: {},
    hermitJournal: [],
    sessionStartTime: null,
    lastPlayedAt: null,
    flags: {},
    revealedPatterns: [],
    encounterIndex: 0,
    currentDialogueId: null,
    journalEntries: [],
  };
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    // ── Navigation ──
    case 'NAVIGATE':
      return { ...state, previousScreen: state.currentScreen, currentScreen: action.screen };

    // ── Quest ──
    case 'START_QUEST':
      return {
        ...state,
        currentQuest: action.questId,
        currentScene: null,
        currentBeatIndex: 0,
        currentBranch: null,
        sessionStartTime: Date.now(),
      };
    case 'COMPLETE_QUEST': {
      if (state.completedQuests.includes(action.questId)) return state;
      return {
        ...state,
        completedQuests: [...state.completedQuests, action.questId],
        lastPlayedAt: Date.now(),
      };
    }

    // ── Scene ──
    case 'START_SCENE':
      return {
        ...state,
        currentScene: action.sceneId,
        currentBeatIndex: 0,
        currentBranch: null,
        currentScreen: 'scene',
      };
    case 'ADVANCE_BEAT':
      return { ...state, currentBeatIndex: state.currentBeatIndex + 1 };
    case 'SET_BRANCH':
      return { ...state, currentBranch: action.branchId };
    case 'COMPLETE_SCENE': {
      if (state.completedScenes.includes(action.sceneId)) return state;
      return {
        ...state,
        completedScenes: [...state.completedScenes, action.sceneId],
        lastPlayedAt: Date.now(),
      };
    }

    // ── Patterns ──
    case 'RECORD_PULL': {
      const pd = { ...state.patternData };
      const t = { ...(pd[action.patternId] || createPatternTracking()) };
      t.pullCount += 1;
      pd[action.patternId] = t;
      return { ...state, patternData: pd };
    }
    case 'RECORD_OBSERVED': {
      const pd = { ...state.patternData };
      const t = { ...(pd[action.patternId] || createPatternTracking()) };
      t.observedCount += 1;
      pd[action.patternId] = t;
      return { ...state, patternData: pd };
    }
    case 'RECORD_NAMED': {
      const pd = { ...state.patternData };
      const t = { ...(pd[action.patternId] || createPatternTracking()) };
      t.namedCount += 1;
      // Check unlock
      if (!t.unlocked && shouldUnlock(action.patternId as PatternId, t)) {
        t.unlocked = true;
      }
      pd[action.patternId] = t;
      return { ...state, patternData: pd };
    }
    case 'RECORD_MASTERY': {
      const pd = { ...state.patternData };
      const t = { ...(pd[action.patternId] || createPatternTracking()) };
      t.masteryCount += 1;
      pd[action.patternId] = t;
      return { ...state, patternData: pd };
    }
    case 'UNLOCK_PATTERN': {
      const pd = { ...state.patternData };
      const t = { ...(pd[action.patternId] || createPatternTracking()) };
      t.unlocked = true;
      pd[action.patternId] = t;
      return { ...state, patternData: pd };
    }

    // ── State Tags ──
    case 'APPLY_STATE_CHANGES': {
      const tags = { ...state.stateTags };
      for (const [key, val] of Object.entries(action.changes)) {
        tags[key] = (tags[key] || 0) + (val ?? 0);
      }
      return { ...state, stateTags: tags };
    }

    // ── Hermit ──
    case 'ADD_HERMIT_ENTRY':
      return { ...state, hermitJournal: [...state.hermitJournal, action.entry] };

    // ── Session ──
    case 'START_SESSION':
      return { ...state, sessionStartTime: Date.now() };

    // ── Legacy support ──
    case 'SET_FLAG':
      return { ...state, flags: { ...state.flags, [action.key]: action.value } };
    case 'REVEAL_PATTERN':
      if (state.revealedPatterns.includes(action.patternId)) return state;
      return { ...state, revealedPatterns: [...state.revealedPatterns, action.patternId] };
    case 'SET_DIALOGUE':
      return { ...state, currentDialogueId: action.dialogueId, currentScreen: 'scene' as any };
    case 'ADVANCE_ENCOUNTER':
      return { ...state, encounterIndex: state.encounterIndex + 1 };
    case 'ADD_JOURNAL':
      return { ...state, journalEntries: [...state.journalEntries, action.entry] };

    // ── Persistence ──
    case 'LOAD_STATE':
      return { ...createInitialState(), ...action.state };
    case 'RESET':
      return createInitialState();

    default:
      return state;
  }
}
