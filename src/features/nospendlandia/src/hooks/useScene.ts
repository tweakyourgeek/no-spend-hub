import { useMemo } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { getScene } from '../data/scenes';
import type { Scene, Beat } from '../types';

/**
 * Hook: current scene data and progression.
 *
 * Returns the current scene, the active beat, and navigation helpers.
 */
export function useScene() {
  const state = useGameState();
  const { currentScene, currentBeatIndex, currentBranch } = state;

  const scene: Scene | null = useMemo(
    () => (currentScene ? getScene(currentScene) : null),
    [currentScene],
  );

  // Filter beats to only those relevant to the current branch
  const activeBeats: Beat[] = useMemo(() => {
    if (!scene) return [];
    return scene.beats.filter(beat => {
      // Narration, choices, hermit, mercy — always show
      if (beat.type !== 'dialogue') return true;
      // Dialogue with no variant — always show
      if (!beat.variant) return true;
      // Dialogue with variant — only show if it matches the current branch
      return beat.variant === `after-${currentBranch}`;
    });
  }, [scene, currentBranch]);

  const currentBeat: Beat | null = activeBeats[currentBeatIndex] ?? null;
  const isLastBeat = currentBeatIndex >= activeBeats.length - 1;
  const totalBeats = activeBeats.length;

  return {
    scene,
    currentBeat,
    currentBeatIndex,
    isLastBeat,
    totalBeats,
    activeBeats,
    currentBranch,
  };
}
