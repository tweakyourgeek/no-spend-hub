import type { Scene } from '../../types';

export const scene_m05_first_weekend: Scene = {
  id: 'scene_m05_first_weekend',
  questId: 'low_spend_month',
  day: 5,
  title: 'First Weekend',
  timeLabel: '11:00am',
  location: "The Devil's Bazaar",
  characters: ['devil', 'moon', 'hermit'],
  patternTags: ['ambrosia', 'rainbows', 'moonbeams'],
  artKey: 'devils_bazaar',

  beats: [
    {
      type: 'narration',
      text: "First weekend of the month challenge. Five days in. The weekdays were manageable — routine helps. But Saturday blows the doors open. The Devil's Bazaar is alive with color and noise and things you didn't know you wanted.",
    },
    {
      type: 'dialogue',
      character: 'devil',
      lines: [
        "Welcome back. Five whole days — impressive.",
        "But weekends are my territory. No routine to hide behind. Just time, money, and desire.",
        "What brings you here?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I wandered in without thinking.",
          branchId: 'wander_a',
        },
        {
          id: 'b',
          label: "I came to test myself.",
          branchId: 'wander_b',
        },
        {
          id: 'c',
          label: "I know the Ambrosia pulls stronger on weekends.",
          patternRequired: 'ambrosia',
          branchId: 'wander_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-wander_a',
      lines: [
        "\"Without thinking.\" That's how most spending happens.",
        "Autopilot is my best salesperson.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-wander_b',
      lines: [
        "Testing yourself. Brave. Foolish, but brave.",
        "The test isn't whether you spend. It's whether you notice.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-wander_c',
      lines: [
        "Weekends and Ambrosia. You know the pattern.",
        "Knowing doesn't stop the pull. But it changes your relationship with it.",
      ],
    },
    {
      type: 'narration',
      text: "The Moon appears at the edge of the bazaar, scrolling on a phone, showing you things that look like your search history given physical form. The two of them — Moon and Devil — work the weekend like a team.",
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I'll buy just one thing. One small thing.",
          branchId: 'one_a',
        },
        {
          id: 'b',
          label: "I'm leaving. This whole place is designed to make me spend.",
          branchId: 'one_b',
        },
        {
          id: 'c',
          label: "Rainbows — the bazaar makes spending feel like belonging.",
          patternRequired: 'rainbows',
          branchId: 'one_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-one_a',
      lines: [
        "\"Just one thing.\" Those are the most expensive words in the bazaar.",
        "But okay. One thing. Notice how it feels when you hold it.",
      ],
    },
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-one_b',
      lines: [
        "Leaving. That takes more strength than staying and resisting.",
        "The door is right there. Use it.",
      ],
    },
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-one_c',
      lines: [
        "The bazaar as belonging. You see it.",
        "The belonging is real. The spending is optional. Hard to separate — but you're learning.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "First weekend of the month. You bought something. That's data. What was the moment of decision?",
      hermitQuestion: "Five days in — what's the difference between this weekend and the ones before?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'wander_a': { AMBROSIA_PULL: 1 },
    'wander_b': { FRICTION: 1, AMBROSIA_OBSERVED: 1 },
    'wander_c': { AMBROSIA_NAMED: 1 },
    'one_a':    { RAINBOWS_PULL: 1 },
    'one_b':    { FRICTION: 1, RAINBOWS_OBSERVED: 1 },
    'one_c':    { RAINBOWS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What did 'just one thing' cost you beyond money?",
    friction: "What gave you the strength to leave?",
    pattern:  "You named two patterns in one visit. What connects them?",
    mastery:  "Five days of data. What story is the data telling?",
  },

  unlocks: {
    scenes: ['scene_m10_week_two'],
  },
};
