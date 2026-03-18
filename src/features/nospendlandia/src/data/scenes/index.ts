import type { Scene } from '../../types';
import { scene_01_friday_night } from './scene_01_friday_night';
import { scene_02_saturday_morning } from './scene_02_saturday_morning';
import { scene_03_sunday_evening } from './scene_03_sunday_evening';

/** Scene registry — maps scene_id to scene data */
export const scenes: Record<string, Scene> = {
  scene_01_friday_night,
  scene_02_saturday_morning,
  scene_03_sunday_evening,
};

export function getScene(sceneId: string): Scene | null {
  return scenes[sceneId] ?? null;
}
