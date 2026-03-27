import type { PatternDefinition, PatternId, PatternTracking } from '../types';

/**
 * The Six Chasing Patterns.
 *
 * Internal IDs are metaphorical (moonbeams, rainbows, etc).
 * Clinical/legacy mapping:
 *   moonbeams  ← comfort-spending
 *   rainbows   ← social-pressure
 *   ambrosia   ← impulse-rush
 *   stardust   ← subscription-creep
 *   sunshine   ← reward-spending
 *   unicorns   ← identity-spending
 */
export const PATTERNS: Record<PatternId, PatternDefinition> = {
  moonbeams: {
    id: 'moonbeams',
    name: 'Moonbeams',
    description: 'Spending to soothe difficult emotions — stress, boredom, loneliness. The purchase feels warm for a moment, then hollow.',
    icon: '🌙',
    advice: 'Pause before buying. Name the feeling. Ask: what do I actually need right now?',
    hermitQuestion: 'What were you really reaching for?',
    unlock: { namedCount: 2 },
  },
  rainbows: {
    id: 'rainbows',
    name: 'Rainbows',
    description: 'Buying to keep up, fit in, or match what you see others doing. The cost of belonging that nobody asked you to pay.',
    icon: '🌈',
    advice: "Your worth isn't measured by what you own. Real friends don't keep a receipt.",
    hermitQuestion: 'Whose approval are you purchasing?',
    unlock: { namedCount: 2 },
  },
  ambrosia: {
    id: 'ambrosia',
    name: 'Ambrosia',
    description: "The thrill of the spontaneous buy. It's the dopamine of \"yes\" before the thought of \"why.\"",
    icon: '🍯',
    advice: 'Add it to a list instead of a cart. If you still want it in 48 hours, it\'s real.',
    hermitQuestion: 'What happens to the thrill by tomorrow?',
    unlock: { namedCount: 2 },
  },
  stardust: {
    id: 'stardust',
    name: 'Stardust',
    description: "Small recurring charges that each seem harmless. Together, they're a river flowing out unseen.",
    icon: '✨',
    advice: "Audit every subscription today. Cancel what you haven't used in 30 days.",
    hermitQuestion: 'What are you paying for that you have already stopped using?',
    unlock: { namedCount: 2 },
  },
  sunshine: {
    id: 'sunshine',
    name: 'Sunshine',
    description: '"I earned this." "I deserve a treat." The reward loop where spending becomes the prize for surviving.',
    icon: '☀️',
    advice: 'You do deserve good things. But the best rewards are free — rest, nature, connection.',
    hermitQuestion: 'What would rewarding yourself look like without money?',
    unlock: { namedCount: 2 },
  },
  unicorns: {
    id: 'unicorns',
    name: 'Unicorns',
    description: 'Buying to become who you think you should be. The aspirational self is expensive to maintain.',
    icon: '🦄',
    advice: 'Who are you without the stuff? That person is still whole.',
    hermitQuestion: 'Who are you performing for?',
    unlock: { namedCount: 2 },
  },
};

export const ALL_PATTERN_IDS: PatternId[] = Object.keys(PATTERNS) as PatternId[];

/** Map from legacy/clinical IDs to new metaphorical IDs */
export const LEGACY_PATTERN_MAP: Record<string, PatternId> = {
  'comfort-spending': 'moonbeams',
  'social-pressure': 'rainbows',
  'impulse-rush': 'ambrosia',
  'subscription-creep': 'stardust',
  'reward-spending': 'sunshine',
  'identity-spending': 'unicorns',
};

/** Create a fresh pattern tracking object */
export function createPatternTracking(): PatternTracking {
  return {
    pullCount: 0,
    observedCount: 0,
    namedCount: 0,
    masteryCount: 0,
    unlocked: false,
  };
}

/** Check if a pattern should be unlocked based on its tracking data */
export function shouldUnlock(patternId: PatternId, tracking: PatternTracking): boolean {
  const def = PATTERNS[patternId];
  if (!def) return false;
  return tracking.namedCount >= def.unlock.namedCount;
}
