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

// Month quest scenes
import { scene_m01_day_one } from './scene_m01_day_one';
import { scene_m03_first_test } from './scene_m03_first_test';
import { scene_m05_first_weekend } from './scene_m05_first_weekend';
import { scene_m07_one_week } from './scene_m07_one_week';
import { scene_m08_temptation } from './scene_m08_temptation';
import { scene_m10_week_two } from './scene_m10_week_two';
import { scene_m12_social_pressure } from './scene_m12_social_pressure';
import { scene_m14_two_weeks } from './scene_m14_two_weeks';
import { scene_m15_halfway } from './scene_m15_halfway';
import { scene_m17_the_slip } from './scene_m17_the_slip';
import { scene_m20_identity } from './scene_m20_identity';
import { scene_m21_week_three } from './scene_m21_week_three';
import { scene_m23_relapse } from './scene_m23_relapse';
import { scene_m25_almost } from './scene_m25_almost';
import { scene_m28_last_weekend } from './scene_m28_last_weekend';
import { scene_m30_the_world } from './scene_m30_the_world';

/** Scene registry — maps scene_id to scene data */
export const scenes: Record<string, Scene> = {
  // Weekend (3 scenes)
  scene_01_friday_night,
  scene_02_saturday_morning,
  scene_03_sunday_evening,
  // Week (7 scenes)
  scene_w1_monday_morning,
  scene_w2_tuesday_evening,
  scene_w3_wednesday_night,
  scene_w4_thursday_surprise,
  scene_w5_friday_paycheck,
  scene_w6_weekend_test,
  scene_w7_sunday_world,
  // Month (16 scenes — key moments across 30 days)
  scene_m01_day_one,
  scene_m03_first_test,
  scene_m05_first_weekend,
  scene_m07_one_week,
  scene_m08_temptation,
  scene_m10_week_two,
  scene_m12_social_pressure,
  scene_m14_two_weeks,
  scene_m15_halfway,
  scene_m17_the_slip,
  scene_m20_identity,
  scene_m21_week_three,
  scene_m23_relapse,
  scene_m25_almost,
  scene_m28_last_weekend,
  scene_m30_the_world,
};

export function getScene(sceneId: string): Scene | null {
  return scenes[sceneId] ?? null;
}
