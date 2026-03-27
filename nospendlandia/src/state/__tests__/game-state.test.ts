import { describe, it, expect, beforeEach } from 'vitest';
import { createInitialState, gameReducer } from '../game-state';
import type { GameState } from '../../types';

describe('game-state reducer', () => {
  let state: GameState;

  beforeEach(() => {
    state = createInitialState();
  });

  describe('createInitialState', () => {
    it('starts on entry screen', () => {
      expect(state.currentScreen).toBe('entry');
    });

    it('has all 6 patterns initialized', () => {
      const ids = Object.keys(state.patternData);
      expect(ids).toHaveLength(6);
      expect(ids).toEqual(
        expect.arrayContaining(['moonbeams', 'rainbows', 'ambrosia', 'stardust', 'sunshine', 'unicorns']),
      );
    });

    it('all patterns start locked with zero counts', () => {
      for (const tracking of Object.values(state.patternData)) {
        expect(tracking.unlocked).toBe(false);
        expect(tracking.pullCount).toBe(0);
        expect(tracking.namedCount).toBe(0);
      }
    });
  });

  describe('NAVIGATE', () => {
    it('changes screen and saves previous', () => {
      const next = gameReducer(state, { type: 'NAVIGATE', screen: 'realm-map' });
      expect(next.currentScreen).toBe('realm-map');
      expect(next.previousScreen).toBe('entry');
    });
  });

  describe('START_QUEST', () => {
    it('sets quest and clears scene state', () => {
      const next = gameReducer(state, { type: 'START_QUEST', questId: 'no_spend_weekend' });
      expect(next.currentQuest).toBe('no_spend_weekend');
      expect(next.currentScene).toBeNull();
      expect(next.currentBranch).toBeNull();
      expect(next.sessionStartTime).toBeGreaterThan(0);
    });
  });

  describe('COMPLETE_QUEST', () => {
    it('adds quest to completed list', () => {
      const next = gameReducer(state, { type: 'COMPLETE_QUEST', questId: 'no_spend_weekend' });
      expect(next.completedQuests).toContain('no_spend_weekend');
    });

    it('does not duplicate completed quests', () => {
      let next = gameReducer(state, { type: 'COMPLETE_QUEST', questId: 'no_spend_weekend' });
      next = gameReducer(next, { type: 'COMPLETE_QUEST', questId: 'no_spend_weekend' });
      expect(next.completedQuests.filter(q => q === 'no_spend_weekend')).toHaveLength(1);
    });
  });

  describe('START_SCENE', () => {
    it('sets scene and navigates to scene screen', () => {
      const next = gameReducer(state, { type: 'START_SCENE', sceneId: 'scene_01_friday_night' });
      expect(next.currentScene).toBe('scene_01_friday_night');
      expect(next.currentScreen).toBe('scene');
      expect(next.currentBeatIndex).toBe(0);
    });
  });

  describe('ADVANCE_BEAT', () => {
    it('increments beat index by 1', () => {
      const next = gameReducer(state, { type: 'ADVANCE_BEAT' });
      expect(next.currentBeatIndex).toBe(1);
    });

    it('uses fromIndex when provided', () => {
      const next = gameReducer(state, { type: 'ADVANCE_BEAT', fromIndex: 5 });
      expect(next.currentBeatIndex).toBe(6);
    });
  });

  describe('SET_BRANCH', () => {
    it('sets current branch', () => {
      const next = gameReducer(state, { type: 'SET_BRANCH', branchId: 'arrival_a' });
      expect(next.currentBranch).toBe('arrival_a');
    });
  });

  describe('COMPLETE_SCENE', () => {
    it('adds scene to completed list', () => {
      const next = gameReducer(state, { type: 'COMPLETE_SCENE', sceneId: 'scene_01_friday_night' });
      expect(next.completedScenes).toContain('scene_01_friday_night');
    });

    it('does not duplicate', () => {
      let next = gameReducer(state, { type: 'COMPLETE_SCENE', sceneId: 'scene_01_friday_night' });
      next = gameReducer(next, { type: 'COMPLETE_SCENE', sceneId: 'scene_01_friday_night' });
      expect(next.completedScenes.filter(s => s === 'scene_01_friday_night')).toHaveLength(1);
    });
  });

  describe('Pattern actions', () => {
    it('RECORD_PULL increments pullCount', () => {
      const next = gameReducer(state, { type: 'RECORD_PULL', patternId: 'moonbeams' });
      expect(next.patternData.moonbeams.pullCount).toBe(1);
    });

    it('RECORD_OBSERVED increments observedCount', () => {
      const next = gameReducer(state, { type: 'RECORD_OBSERVED', patternId: 'moonbeams' });
      expect(next.patternData.moonbeams.observedCount).toBe(1);
    });

    it('RECORD_NAMED increments namedCount', () => {
      const next = gameReducer(state, { type: 'RECORD_NAMED', patternId: 'moonbeams' });
      expect(next.patternData.moonbeams.namedCount).toBe(1);
    });

    it('RECORD_NAMED unlocks pattern at threshold (namedCount >= 2)', () => {
      let next = gameReducer(state, { type: 'RECORD_NAMED', patternId: 'moonbeams' });
      expect(next.patternData.moonbeams.unlocked).toBe(false);
      next = gameReducer(next, { type: 'RECORD_NAMED', patternId: 'moonbeams' });
      expect(next.patternData.moonbeams.unlocked).toBe(true);
      expect(next.patternData.moonbeams.namedCount).toBe(2);
    });

    it('RECORD_MASTERY increments masteryCount', () => {
      const next = gameReducer(state, { type: 'RECORD_MASTERY', patternId: 'moonbeams' });
      expect(next.patternData.moonbeams.masteryCount).toBe(1);
    });

    it('UNLOCK_PATTERN force-unlocks a pattern', () => {
      const next = gameReducer(state, { type: 'UNLOCK_PATTERN', patternId: 'sunshine' });
      expect(next.patternData.sunshine.unlocked).toBe(true);
    });
  });

  describe('APPLY_STATE_CHANGES', () => {
    it('accumulates state tags', () => {
      let next = gameReducer(state, { type: 'APPLY_STATE_CHANGES', changes: { FRICTION: 1 } });
      expect(next.stateTags.FRICTION).toBe(1);
      next = gameReducer(next, { type: 'APPLY_STATE_CHANGES', changes: { FRICTION: 1 } });
      expect(next.stateTags.FRICTION).toBe(2);
    });
  });

  describe('ADD_HERMIT_ENTRY', () => {
    it('appends to hermit journal', () => {
      const entry = {
        sceneId: 'scene_test', question: 'Why?', path: 'pull' as const,
        timestamp: Date.now(), questDay: 1,
      };
      const next = gameReducer(state, { type: 'ADD_HERMIT_ENTRY', entry });
      expect(next.hermitJournal).toHaveLength(1);
      expect(next.hermitJournal[0].question).toBe('Why?');
    });
  });

  describe('RESET', () => {
    it('returns to initial state', () => {
      let next = gameReducer(state, { type: 'START_QUEST', questId: 'no_spend_weekend' });
      next = gameReducer(next, { type: 'RESET' });
      expect(next.currentScreen).toBe('entry');
      expect(next.currentQuest).toBeNull();
    });
  });

  describe('LOAD_STATE', () => {
    it('merges loaded state with defaults', () => {
      const partial = { ...createInitialState(), currentQuest: 'no_spend_week' as const };
      const next = gameReducer(state, { type: 'LOAD_STATE', state: partial });
      expect(next.currentQuest).toBe('no_spend_week');
    });
  });
});
