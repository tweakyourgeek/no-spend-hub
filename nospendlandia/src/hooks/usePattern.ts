import { useMemo } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import type { PatternId } from '../types';
import { PATTERNS } from '../data/patterns';
import { getPatternGridData } from '../engine/pattern-engine';
import { isPatternUnlocked, getUnlockedPatterns } from '../state/selectors';

/**
 * Hook: pattern unlock status and history.
 */
export function usePattern() {
  const state = useGameState();

  const unlockedPatterns = useMemo(() => getUnlockedPatterns(state), [state.patternData]);

  const gridData = useMemo(() => getPatternGridData(state), [state.patternData]);

  function isUnlocked(patternId: PatternId): boolean {
    return isPatternUnlocked(state, patternId);
  }

  return {
    unlockedPatterns,
    gridData,
    isUnlocked,
    allPatterns: PATTERNS,
  };
}
