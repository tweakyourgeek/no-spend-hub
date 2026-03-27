/**
 * Mercy Engine
 *
 * Every Pull outcome (Choice A) triggers the Mercy Beat.
 * This is not optional. It is a retention mechanism.
 *
 * The Mercy Beat:
 * - A single Queen of Pentacles line. Warm, short, zero judgment.
 * - One Hermit question specific to the pull context.
 * - A "continue" path that picks up exactly where the scene left off.
 *
 * No score penalty. No streak broken. No counter visible. The game just continues.
 */

/** Default Queen lines — used when a scene doesn't provide a specific one */
const QUEEN_LINES = [
  "That's data. What did you notice?",
  "Okay. Still here. What was happening right before that?",
  "No judgment. Just a question — what were you feeling?",
  "That happened. You're still playing. What did you learn?",
  "The purchase happened. The pattern didn't disappear. What did you see?",
];

/** Default Hermit questions for Pull paths */
const HERMIT_PULL_QUESTIONS = [
  "What were you actually reaching for?",
  "What did the moment before feel like?",
  "If the thing arrived right now, what would change?",
  "What were you hoping would be different after?",
];

/** Get a contextual Queen line for a mercy beat */
export function getQueenLine(sceneSpecificLine?: string): string {
  if (sceneSpecificLine) return sceneSpecificLine;
  return QUEEN_LINES[Math.floor(Math.random() * QUEEN_LINES.length)];
}

/** Get a contextual Hermit question for a mercy beat */
export function getHermitPullQuestion(sceneSpecificQuestion?: string): string {
  if (sceneSpecificQuestion) return sceneSpecificQuestion;
  return HERMIT_PULL_QUESTIONS[Math.floor(Math.random() * HERMIT_PULL_QUESTIONS.length)];
}

/** Should the mercy beat fire? Always yes after a Pull. */
export function shouldTriggerMercy(path: 'pull' | 'friction' | 'pattern' | 'mastery'): boolean {
  return path === 'pull';
}
