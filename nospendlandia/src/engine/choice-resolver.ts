import type { GameState, GameAction, Choice, Scene, PatternId, HermitEntry } from '../types';
import { isChoiceCAvailable, getPatternActions } from './pattern-engine';

/**
 * Choice Resolver
 *
 * Evaluates a player's choice, checks pattern locks, and returns
 * the list of actions to dispatch plus the path taken.
 */

export interface ResolvedChoice {
  actions: GameAction[];
  path: 'pull' | 'friction' | 'pattern' | 'mastery';
  triggersMercy: boolean;
}

/** Check if a choice is available to the player */
export function isChoiceAvailable(choice: Choice, state: GameState): boolean {
  if (!choice.patternRequired) return true;
  return isChoiceCAvailable(state, choice.patternRequired);
}

/** Resolve a choice and return the actions to dispatch */
export function resolveChoice(
  choice: Choice,
  scene: Scene,
  state: GameState,
): ResolvedChoice {
  const actions: GameAction[] = [];

  // Determine path
  let path: ResolvedChoice['path'] = 'friction';
  if (choice.id === 'a') path = 'pull';
  else if (choice.id === 'c') {
    const prevBranch = state.currentBranch;
    const isMastery = prevBranch && (prevBranch.endsWith('_c') || prevBranch.includes('_c_'));
    path = isMastery ? 'mastery' : 'pattern';
  }

  // Set branch
  actions.push({ type: 'SET_BRANCH', branchId: choice.branchId });

  // Apply state changes for this branch
  const changes = scene.stateChanges[choice.branchId];
  if (changes) {
    actions.push({ type: 'APPLY_STATE_CHANGES', changes });
  }

  // Mastery-specific state changes (arrival_c_any etc)
  if (path === 'mastery') {
    const masteryKey = `${choice.branchId}_any`;
    const masteryChanges = scene.stateChanges[masteryKey];
    if (masteryChanges) {
      actions.push({ type: 'APPLY_STATE_CHANGES', changes: masteryChanges });
    }
  }

  // Pattern tracking actions
  const patternActions = getPatternActions(
    choice.id,
    choice.branchId,
    scene.patternTags,
    state.currentBranch,
  );
  actions.push(...patternActions);

  return {
    actions,
    path,
    triggersMercy: path === 'pull',
  };
}

/** Build the Hermit journal entry for the end of a scene */
export function buildHermitEntry(
  scene: Scene,
  path: 'pull' | 'friction' | 'pattern' | 'mastery',
): HermitEntry {
  const question = (path === 'mastery' && scene.hermitQuestions.mastery)
    ? scene.hermitQuestions.mastery
    : scene.hermitQuestions[path];

  return {
    sceneId: scene.id,
    question,
    path,
    timestamp: Date.now(),
    questDay: scene.day,
  };
}
