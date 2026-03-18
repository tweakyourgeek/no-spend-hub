import type { Scene } from '../../types';

// Weekend quest scenes
import { scene_01_friday_night } from './scene_01_friday_night';
import { scene_02_saturday_morning } from './scene_02_saturday_morning';
import { scene_03_sunday_evening } from './scene_03_sunday_evening';

// Week quest scenes
import { scene_w1_monday_morning } from './scene_w1_monday_morning';
import { scene_w2_tuesday_evening } from './scene_w2_tuesday_evening';
import { scene_w3_wednesday_night } from './scene_w3_wednesday_night';
import { scene_w4_thursday_surprise } from './scene_w4_thursday_surprise';
import { scene_w5_friday_paycheck } from './scene_w5_friday_paycheck';
import { scene_w6_weekend_test } from './scene_w6_weekend_test';
import { scene_w7_sunday_world } from './scene_w7_sunday_world';

/** Scene registry — maps scene_id to scene data */
export const scenes: Record<string, Scene> = {
  // Weekend
  scene_01_friday_night,
  scene_02_saturday_morning,
  scene_03_sunday_evening,
  // Week
  scene_w1_monday_morning,
  scene_w2_tuesday_evening,
  scene_w3_wednesday_night,
  scene_w4_thursday_surprise,
  scene_w5_friday_paycheck,
  scene_w6_weekend_test,
  scene_w7_sunday_world,
};

export function getScene(sceneId: string): Scene | null {
  return scenes[sceneId] ?? null;
}
