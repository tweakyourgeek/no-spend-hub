import type { Scene } from '../../types';

export const scene_w7_sunday_world: Scene = {
  id: 'scene_w7_sunday_world',
  questId: 'no_spend_week',
  day: 7,
  title: 'Sunday Complete',
  timeLabel: '8:00pm',
  location: "The World's Garden",
  characters: ['world', 'hermit'],
  patternTags: ['moonbeams', 'rainbows', 'ambrosia', 'stardust', 'sunshine', 'unicorns'],
  artKey: 'worlds_garden',

  beats: [
    {
      type: 'narration',
      text: "Sunday evening. Seven days. You made it — imperfectly, honestly, with slips and recoveries and questions that don't have easy answers. The World is waiting in a place that feels like the end and the beginning at the same time.",
    },
    {
      type: 'dialogue',
      character: 'world',
      lines: [
        "Seven days. You walked the full week.",
        "Not perfectly. That was never the point.",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I slipped more than I wanted to.",
          branchId: 'reflect_a',
        },
        {
          id: 'b',
          label: "I saw things I never noticed before.",
          branchId: 'reflect_b',
        },
        {
          id: 'c',
          label: "I named the patterns. That changed everything.",
          patternRequired: 'moonbeams',
          branchId: 'reflect_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-reflect_a',
      lines: [
        "You slipped. And you came back every time.",
        "That's not failure. That's practice.",
      ],
    },
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-reflect_b',
      lines: [
        "Seeing is the whole game.",
        "You can't unsee what you've noticed. That's permanent.",
      ],
    },
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-reflect_c',
      lines: [
        "Named them. Moonbeams, Rainbows, Ambrosia — they're still there.",
        "But named things have less power. You know that now.",
      ],
    },
    {
      type: 'narration',
      text: "The week's questions sit in your journal — not answers, just observations. Data about who you are when you choose to pay attention. The World doesn't offer congratulations. It offers clarity.",
    },
    {
      type: 'dialogue',
      character: 'world',
      lines: [
        "Your spending is data. Not a verdict.",
        "The week is done. What you learned stays.",
        "Go well.",
      ],
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'reflect_a': { MERCY_ACKNOWLEDGED: 1 },
    'reflect_b': { FRICTION: 1 },
    'reflect_c': { PATTERN_MASTERY_WEEK: 1 },
  },

  hermitQuestions: {
    pull:     "What will you do differently in the next seven days?",
    friction: "What was the hardest day? What made it hard?",
    pattern:  "Which pattern has the strongest grip? Which one loosened?",
    mastery:  "Seven days of seeing clearly. What stays with you?",
  },

  unlocks: {},
};
