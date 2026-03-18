import type { GameState, GameAction, PatternId } from '../types';
import { PATTERNS } from '../data/patterns';
import { isPatternUnlocked } from '../state/selectors';

/**
 * Pattern Engine
 *
 * Tracks pattern exposure and manages unlock thresholds.
 * Patterns unlock when namedCount >= threshold (default 2).
 * Once unlocked, Choice C becomes available in scenes tagged with that pattern.
 */

/** Check if Choice C is available for a given pattern */
export function isChoiceCAvailable(state: GameState, patternId: PatternId): boolean {
  return isPatternUnlocked(state, patternId);
}

/** Get actions to dispatch when a choice is made in a scene */
export function getPatternActions(
  choiceId: string,
  branchId: string,
  patternTags: PatternId[],
  prevBranch: string | null,
): GameAction[] {
  const actions: GameAction[] = [];

  for (const pid of patternTags) {
    if (choiceId === 'a') {
      // Choice A = The Pull
      actions.push({ type: 'RECORD_PULL', patternId: pid });
    } else if (choiceId === 'b') {
      // Choice B = Friction (resisted)
      actions.push({ type: 'RECORD_OBSERVED', patternId: pid });
    } else if (choiceId === 'c') {
      // Choice C = Pattern named
      // Check for mastery: C choice when previous branch was also C
      const isMastery = prevBranch && (prevBranch.endsWith('_c') || prevBranch.includes('_c_'));
      if (isMastery) {
        actions.push({ type: 'RECORD_MASTERY', patternId: pid });
      }
      actions.push({ type: 'RECORD_NAMED', patternId: pid });
    }
  }

  return actions;
}

/**
 * Fog-of-war tier for a pattern card:
 * - 'hidden'   — no interaction yet, fully fogged
 * - 'glowing'  — pullCount >= 1, faint glow (something is here)
 * - 'observed' — observedCount >= 1, silhouette visible (shape but not name)
 * - 'revealed' — namedCount >= 2 (unlocked), full card with name + description
 */
export type PatternTier = 'hidden' | 'glowing' | 'observed' | 'revealed';

export interface PatternGridItem {
  id: PatternId;
  name: string;
  icon: string;
  description: string;
  advice: string;
  hermitQuestion: string;
  tier: PatternTier;
  unlocked: boolean;
  pullCount: number;
  observedCount: number;
  namedCount: number;
}

/** Get all patterns and their status for the PatternGrid display */
export function getPatternGridData(state: GameState): PatternGridItem[] {
  return (Object.keys(PATTERNS) as PatternId[]).map(pid => {
    const def = PATTERNS[pid];
    const tracking = state.patternData[pid] || {
      pullCount: 0, observedCount: 0, namedCount: 0, masteryCount: 0, unlocked: false,
    };

    let tier: PatternTier = 'hidden';
    if (tracking.unlocked || tracking.namedCount >= def.unlock.namedCount) {
      tier = 'revealed';
    } else if (tracking.observedCount >= 1 || tracking.namedCount >= 1) {
      tier = 'observed';
    } else if (tracking.pullCount >= 1) {
      tier = 'glowing';
    }

    return {
      id: pid,
      name: def.name,
      icon: def.icon,
      description: def.description,
      advice: def.advice,
      hermitQuestion: def.hermitQuestion,
      tier,
      unlocked: tracking.unlocked || tracking.namedCount >= def.unlock.namedCount,
      pullCount: tracking.pullCount,
      observedCount: tracking.observedCount,
      namedCount: tracking.namedCount,
    };
  });
}
