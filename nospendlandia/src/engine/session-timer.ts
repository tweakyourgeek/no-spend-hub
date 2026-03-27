import type { QuestId } from '../types';

/**
 * Session Timer
 *
 * Tracks session duration. Soft design constraints, not hard cutoffs.
 * A scene should never be interrupted mid-beat.
 *
 * DO NOT show a timer to the player.
 * DO use this to inform when a natural scene-end is near.
 */

const QUEST_SESSION_TARGETS: Record<QuestId, number> = {
  no_spend_weekend: 7,
  no_spend_week: 10,
  low_spend_month: 12,
};

export function getSessionTarget(questId: QuestId): number {
  return QUEST_SESSION_TARGETS[questId] ?? 10;
}

export function getSessionMinutes(startTime: number | null): number {
  if (!startTime) return 0;
  return Math.floor((Date.now() - startTime) / 60000);
}

export function isApproachingTarget(startTime: number | null, questId: QuestId): boolean {
  const elapsed = getSessionMinutes(startTime);
  const target = getSessionTarget(questId);
  // "Approaching" = within 2 minutes of target
  return elapsed >= target - 2;
}
