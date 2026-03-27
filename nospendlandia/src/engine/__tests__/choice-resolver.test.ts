import { describe, it, expect } from 'vitest';
import { isChoiceAvailable, resolveChoice, buildHermitEntry } from '../choice-resolver';
import { createInitialState } from '../../state/game-state';
import type { Choice, Scene, GameState } from '../../types';

// Minimal scene fixture
const mockScene: Scene = {
  id: 'scene_test',
  questId: 'no_spend_weekend',
  day: 1,
  title: 'Test Scene',
  timeLabel: '8pm',
  location: 'Test',
  characters: ['moon'],
  patternTags: ['moonbeams'],
  artKey: 'test',
  beats: [],
  stateChanges: {
    'arrival_a': { MOONBEAMS_PULL: 1 },
    'arrival_b': { FRICTION: 1 },
    'arrival_c': { MOONBEAMS_NAMED: 1 },
  },
  hermitQuestions: {
    pull: 'What pulled you?',
    friction: 'What held you back?',
    pattern: 'What did you name?',
    mastery: 'What did you master?',
  },
  unlocks: {},
};

const choiceA: Choice = { id: 'a', label: 'Pull choice', branchId: 'arrival_a' };
const choiceB: Choice = { id: 'b', label: 'Friction choice', branchId: 'arrival_b' };
const choiceC: Choice = { id: 'c', label: 'Pattern choice', branchId: 'arrival_c', patternRequired: 'moonbeams' };

function stateWithUnlocked(pid: string): GameState {
  const s = createInitialState();
  s.patternData[pid] = { pullCount: 0, observedCount: 0, namedCount: 2, masteryCount: 0, unlocked: true };
  return s;
}

describe('choice-resolver', () => {
  describe('isChoiceAvailable', () => {
    it('returns true for choices without patternRequired', () => {
      expect(isChoiceAvailable(choiceA, createInitialState())).toBe(true);
      expect(isChoiceAvailable(choiceB, createInitialState())).toBe(true);
    });

    it('returns false for Choice C when pattern is locked', () => {
      expect(isChoiceAvailable(choiceC, createInitialState())).toBe(false);
    });

    it('returns true for Choice C when pattern is unlocked', () => {
      expect(isChoiceAvailable(choiceC, stateWithUnlocked('moonbeams'))).toBe(true);
    });
  });

  describe('resolveChoice', () => {
    it('Choice A resolves to pull path and triggers mercy', () => {
      const result = resolveChoice(choiceA, mockScene, createInitialState());
      expect(result.path).toBe('pull');
      expect(result.triggersMercy).toBe(true);
    });

    it('Choice B resolves to friction path and does not trigger mercy', () => {
      const result = resolveChoice(choiceB, mockScene, createInitialState());
      expect(result.path).toBe('friction');
      expect(result.triggersMercy).toBe(false);
    });

    it('Choice C resolves to pattern path (not mastery) when no prior C branch', () => {
      const state = stateWithUnlocked('moonbeams');
      const result = resolveChoice(choiceC, mockScene, state);
      expect(result.path).toBe('pattern');
      expect(result.triggersMercy).toBe(false);
    });

    it('Choice C resolves to mastery path when prior branch ends with _c', () => {
      const state = stateWithUnlocked('moonbeams');
      state.currentBranch = 'prev_c';
      const result = resolveChoice(choiceC, mockScene, state);
      expect(result.path).toBe('mastery');
      expect(result.triggersMercy).toBe(false);
    });

    it('includes SET_BRANCH action', () => {
      const result = resolveChoice(choiceA, mockScene, createInitialState());
      expect(result.actions[0]).toEqual({ type: 'SET_BRANCH', branchId: 'arrival_a' });
    });

    it('includes APPLY_STATE_CHANGES for the chosen branch', () => {
      const result = resolveChoice(choiceA, mockScene, createInitialState());
      const stateChange = result.actions.find(a => a.type === 'APPLY_STATE_CHANGES');
      expect(stateChange).toBeDefined();
    });

    it('includes RECORD_PULL for Choice A', () => {
      const result = resolveChoice(choiceA, mockScene, createInitialState());
      const pull = result.actions.find(a => a.type === 'RECORD_PULL');
      expect(pull).toEqual({ type: 'RECORD_PULL', patternId: 'moonbeams' });
    });

    it('includes RECORD_NAMED for Choice C', () => {
      const state = stateWithUnlocked('moonbeams');
      const result = resolveChoice(choiceC, mockScene, state);
      const named = result.actions.find(a => a.type === 'RECORD_NAMED');
      expect(named).toEqual({ type: 'RECORD_NAMED', patternId: 'moonbeams' });
    });
  });

  describe('buildHermitEntry', () => {
    it('returns the pull question for pull path', () => {
      const entry = buildHermitEntry(mockScene, 'pull');
      expect(entry.question).toBe('What pulled you?');
      expect(entry.path).toBe('pull');
      expect(entry.sceneId).toBe('scene_test');
    });

    it('returns the mastery question when available', () => {
      const entry = buildHermitEntry(mockScene, 'mastery');
      expect(entry.question).toBe('What did you master?');
    });

    it('returns the friction question for friction path', () => {
      const entry = buildHermitEntry(mockScene, 'friction');
      expect(entry.question).toBe('What held you back?');
    });

    it('returns the pattern question for pattern path', () => {
      const entry = buildHermitEntry(mockScene, 'pattern');
      expect(entry.question).toBe('What did you name?');
    });

    it('includes questDay from scene', () => {
      const entry = buildHermitEntry(mockScene, 'pull');
      expect(entry.questDay).toBe(1);
    });
  });
});
