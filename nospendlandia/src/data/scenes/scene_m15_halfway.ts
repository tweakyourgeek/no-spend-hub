import type { Scene } from '../../types';

export const scene_m15_halfway: Scene = {
  id: 'scene_m15_halfway',
  questId: 'low_spend_month',
  day: 15,
  title: 'Halfway',
  timeLabel: '12:00pm',
  location: "The Hermit's Summit",
  characters: ['hermit', 'tower'],
  patternTags: ['moonbeams', 'ambrosia', 'unicorns'],
  artKey: 'hermits_summit',

  beats: [
    {
      type: 'narration',
      text: "Day fifteen. The exact middle. You can see both the beginning and the end from here. The Hermit sits at a summit — a place where the view is clear in both directions. The Tower looms nearby, because halfway is when the unexpected loves to strike.",
    },
    {
      type: 'dialogue',
      character: 'hermit',
      lines: [
        "Halfway.",
        "Look back at the first fifteen days. What pattern appeared most often?",
        "Look forward. What's the hardest part still ahead?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I've been spending more than I thought. The patterns are strong.",
          branchId: 'half_a',
        },
        {
          id: 'b',
          label: "I'm finding my rhythm. Some days are easier now.",
          branchId: 'half_b',
        },
        {
          id: 'c',
          label: "I can name three patterns by heart. They're losing their grip.",
          patternRequired: 'moonbeams',
          branchId: 'half_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'hermit',
      variant: 'after-half_a',
      lines: [
        "Strong patterns, honest observer.",
        "The patterns being strong doesn't mean you're weak. It means the conditioning runs deep. Fifteen days of seeing that clearly — that's not nothing.",
      ],
    },
    {
      type: 'dialogue',
      character: 'hermit',
      variant: 'after-half_b',
      lines: [
        "Rhythm. That's the word.",
        "When the practice becomes a rhythm instead of a fight, the hardest part is over.",
      ],
    },
    {
      type: 'dialogue',
      character: 'hermit',
      variant: 'after-half_c',
      lines: [
        "Three names. That's armor.",
        "Named patterns don't disappear. They just stop being surprises.",
      ],
    },
    {
      type: 'narration',
      text: "The Tower rumbles. Something financial shifts — a bill you forgot, a subscription that renewed, a price increase. The Tower doesn't care about your progress. It just arrives.",
    },
    {
      type: 'dialogue',
      character: 'tower',
      lines: [
        "Halfway? Perfect time for a surprise.",
        "Something just cost you money you weren't expecting. What do you do with the frustration?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Screw it. If I'm already spending, might as well spend more.",
          branchId: 'tower_a',
        },
        {
          id: 'b',
          label: "Handle the bill. Don't let it derail everything else.",
          branchId: 'tower_b',
        },
        {
          id: 'c',
          label: "The Tower plus Unicorns — crisis makes me want to perform 'having it together.'",
          patternRequired: 'unicorns',
          branchId: 'tower_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-tower_a',
      lines: [
        "The 'already ruined' excuse. Classic Tower aftermath.",
        "One expense doesn't cancel fifteen days. Unless you let it.",
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-tower_b',
      lines: [
        "Handle and move on. You've learned something.",
        "The Tower isn't about the bill. It's about what you do after the bill.",
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-tower_c',
      lines: [
        "Crisis and identity. The Tower breaks the mask, and the Unicorns scramble to rebuild it.",
        "What if you let the mask stay off?",
      ],
    },
    {
      type: 'mercy',
      queenLine: "Halfway, and the Tower hit. You're still playing. What does that tell you?",
      hermitQuestion: "Who are you at day fifteen that you weren't at day one?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'half_a':  { MOONBEAMS_PULL: 1 },
    'half_b':  { FRICTION: 1 },
    'half_c':  { MOONBEAMS_NAMED: 1 },
    'tower_a': { UNICORNS_PULL: 1, AMBROSIA_PULL: 1 },
    'tower_b': { FRICTION: 1, AMBROSIA_OBSERVED: 1 },
    'tower_c': { UNICORNS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What does 'already ruined' feel like? Is it true?",
    friction: "What's the difference between day-one you and halfway you?",
    pattern:  "At the summit, which patterns can you see most clearly?",
    mastery:  "Fifteen days of data. What's the clearest truth?",
  },

  unlocks: {
    scenes: ['scene_m21_week_three'],
  },
};
