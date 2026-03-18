import { describe, it, expect } from 'vitest';
import { getQueenLine, getHermitPullQuestion, shouldTriggerMercy } from '../mercy-engine';

describe('mercy-engine', () => {
  describe('shouldTriggerMercy', () => {
    it('returns true for pull path', () => {
      expect(shouldTriggerMercy('pull')).toBe(true);
    });

    it('returns false for friction path', () => {
      expect(shouldTriggerMercy('friction')).toBe(false);
    });

    it('returns false for pattern path', () => {
      expect(shouldTriggerMercy('pattern')).toBe(false);
    });

    it('returns false for mastery path', () => {
      expect(shouldTriggerMercy('mastery')).toBe(false);
    });
  });

  describe('getQueenLine', () => {
    it('returns scene-specific line when provided', () => {
      expect(getQueenLine('Custom queen line')).toBe('Custom queen line');
    });

    it('returns a default line when no scene-specific line', () => {
      const line = getQueenLine();
      expect(typeof line).toBe('string');
      expect(line.length).toBeGreaterThan(0);
    });
  });

  describe('getHermitPullQuestion', () => {
    it('returns scene-specific question when provided', () => {
      expect(getHermitPullQuestion('Custom question')).toBe('Custom question');
    });

    it('returns a default question when no scene-specific question', () => {
      const q = getHermitPullQuestion();
      expect(typeof q).toBe('string');
      expect(q.length).toBeGreaterThan(0);
    });
  });
});
