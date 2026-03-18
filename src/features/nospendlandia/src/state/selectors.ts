import type { GameState, PatternId, PatternTracking, QuestId, SceneId } from '../types';
import { PATTERNS } from '../data/patterns';

/** Get tracking data for a pattern */
export function getPatternTracking(state: GameState, patternId: PatternId): PatternTracking {
  return state.patternData[patternId] || {
    pullCount: 0, observedCount: 0, namedCount: 0, masteryCount: 0, unlocked: false,
  };
}

/** Is a pattern unlocked? */
export function isPatternUnlocked(state: GameState, patternId: PatternId): boolean {
  return getPatternTracking(state, patternId).unlocked;
}

/** Get all unlocked patterns */
export function getUnlockedPatterns(state: GameState): PatternId[] {
  return (Object.keys(PATTERNS) as PatternId[]).filter(pid => isPatternUnlocked(state, pid));
}

/** Is a scene completed? */
export function isSceneCompleted(state: GameState, sceneId: SceneId): boolean {
  return state.completedScenes.includes(sceneId);
}

/** Is a quest completed? */
export function isQuestCompleted(state: GameState, questId: QuestId): boolean {
  return state.completedQuests.includes(questId);
}

/** Get the player's current path from branch history */
export function getCurrentPath(state: GameState): 'pull' | 'friction' | 'pattern' | 'mastery' | null {
  const branch = state.currentBranch;
  if (!branch) return null;
  // Convention: branch IDs contain path hints
  if (branch.includes('_a') || branch.endsWith('_pull')) return 'pull';
  if (branch.includes('_b') || branch.endsWith('_friction')) return 'friction';
  if (branch.includes('_c') || branch.endsWith('_pattern') || branch.endsWith('_mastery')) {
    // Mastery: C choice when arriving from a prior C path
    if (branch.includes('mastery') || branch.includes('_c_')) return 'mastery';
    return 'pattern';
  }
  return 'friction'; // default
}

/** Session minutes elapsed */
export function getSessionMinutes(state: GameState): number {
  if (!state.sessionStartTime) return 0;
  return Math.floor((Date.now() - state.sessionStartTime) / 60000);
}

/** Get the session target for a quest */
export function getQuestSessionTarget(questId: QuestId | null): number {
  switch (questId) {
    case 'no_spend_weekend': return 7;
    case 'no_spend_week': return 10;
    case 'low_spend_month': return 12;
    default: return 10;
  }
}
