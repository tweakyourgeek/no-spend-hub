import { describe, it, expect } from 'vitest';
import { isChoiceCAvailable, getPatternActions, getPatternGridData } from '../pattern-engine';
import { createInitialState } from '../../state/game-state';
import type { GameState } from '../../types';

function stateWithUnlockedPattern(pid: string): GameState {
  const s = createInitialState();
  s.patternData[pid] = {
    pullCount: 0, observedCount: 0, namedCount: 2, masteryCount: 0, unlocked: true,
  };
  return s;
}

describe('pattern-engine', () => {
  describe('isChoiceCAvailable', () => {
    it('returns false for a locked pattern', () => {
      expect(isChoiceCAvailable(createInitialState(), 'moonbeams')).toBe(false);
    });

    it('returns true for an unlocked pattern', () => {
      expect(isChoiceCAvailable(stateWithUnlockedPattern('moonbeams'), 'moonbeams')).toBe(true);
    });
  });

  describe('getPatternActions', () => {
    it('Choice A produces RECORD_PULL for each patternTag', () => {
      const actions = getPatternActions('a', 'coffee_a', ['moonbeams', 'sunshine'], null);
      expect(actions).toEqual([
        { type: 'RECORD_PULL', patternId: 'moonbeams' },
        { type: 'RECORD_PULL', patternId: 'sunshine' },
      ]);
    });

    it('Choice B produces RECORD_OBSERVED for each patternTag', () => {
      const actions = getPatternActions('b', 'coffee_b', ['moonbeams'], null);
      expect(actions).toEqual([
        { type: 'RECORD_OBSERVED', patternId: 'moonbeams' },
      ]);
    });

    it('Choice C produces RECORD_NAMED for each patternTag', () => {
      const actions = getPatternActions('c', 'coffee_c', ['moonbeams'], null);
      expect(actions).toEqual([
        { type: 'RECORD_NAMED', patternId: 'moonbeams' },
      ]);
    });

    it('Choice C after a prior C branch also produces RECORD_MASTERY', () => {
      const actions = getPatternActions('c', 'lunch_c', ['moonbeams'], 'coffee_c');
      expect(actions).toEqual([
        { type: 'RECORD_MASTERY', patternId: 'moonbeams' },
        { type: 'RECORD_NAMED', patternId: 'moonbeams' },
      ]);
    });

    it('Choice C with non-C prior branch does NOT produce RECORD_MASTERY', () => {
      const actions = getPatternActions('c', 'lunch_c', ['moonbeams'], 'coffee_a');
      expect(actions).toEqual([
        { type: 'RECORD_NAMED', patternId: 'moonbeams' },
      ]);
    });
  });

  describe('getPatternGridData', () => {
    it('returns all 6 patterns', () => {
      const grid = getPatternGridData(createInitialState());
      expect(grid).toHaveLength(6);
      expect(grid.map(p => p.id)).toEqual(
        expect.arrayContaining(['moonbeams', 'rainbows', 'ambrosia', 'stardust', 'sunshine', 'unicorns']),
      );
    });

    it('reflects unlocked state', () => {
      const state = stateWithUnlockedPattern('ambrosia');
      const grid = getPatternGridData(state);
      const ambrosia = grid.find(p => p.id === 'ambrosia');
      expect(ambrosia?.unlocked).toBe(true);
      expect(ambrosia?.namedCount).toBe(2);
    });

    it('shows zero counts for fresh state', () => {
      const grid = getPatternGridData(createInitialState());
      for (const p of grid) {
        expect(p.unlocked).toBe(false);
        expect(p.pullCount).toBe(0);
        expect(p.namedCount).toBe(0);
      }
    });
  });
});
