import type { Scene } from '../../types';
import { scene_01_friday_night } from './scene_01_friday_night';

/** Scene registry — maps scene_id to scene data */
export const scenes: Record<string, Scene> = {
  scene_01_friday_night,
};

export function getScene(sceneId: string): Scene | null {
  return scenes[sceneId] ?? null;
}
