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

/** Get all patterns and their status for the PatternGrid display */
export function getPatternGridData(state: GameState): Array<{
  id: PatternId;
  name: string;
  icon: string;
  description: string;
  advice: string;
  unlocked: boolean;
  pullCount: number;
  namedCount: number;
}> {
  return (Object.keys(PATTERNS) as PatternId[]).map(pid => {
    const def = PATTERNS[pid];
    const tracking = state.patternData[pid] || {
      pullCount: 0, observedCount: 0, namedCount: 0, masteryCount: 0, unlocked: false,
    };
    return {
      id: pid,
      name: def.name,
      icon: def.icon,
      description: def.description,
      advice: def.advice,
      unlocked: tracking.unlocked,
      pullCount: tracking.pullCount,
      namedCount: tracking.namedCount,
    };
  });
}
