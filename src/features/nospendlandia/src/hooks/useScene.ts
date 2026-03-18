import { useMemo } from 'react';
import { useGameState } from '../contexts/GameStateContext';
import { getScene } from '../data/scenes';
import type { Scene, Beat } from '../types';

/**
 * Hook: current scene data and progression.
 *
 * Beat index walks the FULL scene.beats array (not a filtered subset).
 * Dialogue variants that don't match the current branch are skipped at render time.
 * Mercy beats are skipped (they're triggered dynamically by the choice resolver).
 */
export function useScene() {
  const state = useGameState();
  const { currentScene, currentBeatIndex, currentBranch } = state;

  const scene: Scene | null = useMemo(
    () => (currentScene ? getScene(currentScene) : null),
    [currentScene],
  );

  // Walk to the current relevant beat, skipping non-matching variants and mercy beats
  const resolved = useMemo(() => {
    if (!scene) return { beat: null, resolvedIndex: currentBeatIndex };

    // Starting from currentBeatIndex, find the next relevant beat
    for (let i = currentBeatIndex; i < scene.beats.length; i++) {
      const beat = scene.beats[i];

      // Skip mercy beats — they fire dynamically, not inline
      if (beat.type === 'mercy') continue;

      // Skip dialogue variants that don't match the current branch
      if (beat.type === 'dialogue' && beat.variant) {
        if (beat.variant !== `after-${currentBranch}`) continue;
      }

      return { beat, resolvedIndex: i };
    }

    return { beat: null, resolvedIndex: scene.beats.length };
  }, [scene, currentBeatIndex, currentBranch]);

  const totalBeats = scene?.beats.length ?? 0;
  const isLastBeat = resolved.resolvedIndex >= totalBeats - 1;

  return {
    scene,
    currentBeat: resolved.beat,
    currentBeatIndex: resolved.resolvedIndex,
    rawBeatIndex: currentBeatIndex,
    isLastBeat,
    totalBeats,
    currentBranch,
  };
}
