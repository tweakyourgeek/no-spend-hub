import { describe, it, expect } from 'vitest';
import { scenes, getScene } from '../scenes';
import { QUESTS } from '../quests';
import { PATTERNS, ALL_PATTERN_IDS } from '../patterns';
import type { Scene, PatternId } from '../../types';

describe('scene data integrity', () => {
  const allScenes = Object.values(scenes);

  it('has 26 scenes total', () => {
    expect(allScenes.length).toBe(26);
  });

  it('getScene returns null for missing scene', () => {
    expect(getScene('nonexistent')).toBeNull();
  });

  it('getScene returns a scene for a valid id', () => {
    expect(getScene('scene_01_friday_night')).not.toBeNull();
  });

  describe('every scene has required fields', () => {
    for (const scene of allScenes) {
      it(`${scene.id} is well-formed`, () => {
        expect(scene.id).toBeTruthy();
        expect(scene.questId).toBeTruthy();
        expect(scene.day).toBeGreaterThan(0);
        expect(scene.title).toBeTruthy();
        expect(scene.characters.length).toBeGreaterThan(0);
        expect(scene.patternTags.length).toBeGreaterThan(0);
        expect(scene.beats.length).toBeGreaterThan(0);
        expect(scene.hermitQuestions.pull).toBeTruthy();
        expect(scene.hermitQuestions.friction).toBeTruthy();
        expect(scene.hermitQuestions.pattern).toBeTruthy();
      });
    }
  });

  describe('every scene uses valid pattern IDs', () => {
    for (const scene of allScenes) {
      it(`${scene.id} pattern tags are valid`, () => {
        for (const tag of scene.patternTags) {
          expect(ALL_PATTERN_IDS).toContain(tag);
        }
      });
    }
  });

  describe('every scene has at least one choice beat', () => {
    for (const scene of allScenes) {
      it(`${scene.id} has choices`, () => {
        const choiceBeats = scene.beats.filter(b => b.type === 'choices');
        expect(choiceBeats.length).toBeGreaterThan(0);
      });
    }
  });

  describe('quest scene lists match registered scenes', () => {
    for (const [questId, quest] of Object.entries(QUESTS)) {
      it(`${questId} scenes are all registered`, () => {
        for (const sceneId of quest.scenes) {
          expect(scenes[sceneId]).toBeDefined();
        }
      });
    }
  });

  describe('weekend quest has 3 scenes', () => {
    it('no_spend_weekend', () => {
      expect(QUESTS.no_spend_weekend.scenes).toHaveLength(3);
    });
  });

  describe('week quest has 7 scenes', () => {
    it('no_spend_week', () => {
      expect(QUESTS.no_spend_week.scenes).toHaveLength(7);
    });
  });

  describe('month quest has 16 scenes', () => {
    it('low_spend_month', () => {
      expect(QUESTS.low_spend_month.scenes).toHaveLength(16);
    });
  });
});
