import type { Scene } from '../../types';

export const scene_m01_day_one: Scene = {
  id: 'scene_m01_day_one',
  questId: 'low_spend_month',
  day: 1,
  title: 'Day One',
  timeLabel: '8:00am',
  location: "The Queen's Courtyard",
  characters: ['queen_of_pentacles', 'hermit'],
  patternTags: ['moonbeams', 'sunshine'],
  artKey: 'queens_courtyard',

  beats: [
    {
      type: 'narration',
      text: "Thirty days. The number feels enormous. A whole month of intentional low-spending — not zero, but conscious. The Queen of Pentacles stands at the entrance to a courtyard you didn't know existed. She's been expecting you.",
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      lines: [
        "Thirty days, Fool. The Lunar Arch.",
        "This isn't a sprint. It's a practice. Some days you'll slip. Some days you'll soar. Both are part of it.",
        "What's your biggest fear about the next thirty days?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "That I'll fail and feel worse than before I started.",
          branchId: 'fear_a',
        },
        {
          id: 'b',
          label: "That I'll realize how much I've been spending.",
          branchId: 'fear_b',
        },
        {
          id: 'c',
          label: "I know the Moonbeams will pull hardest at the start.",
          patternRequired: 'moonbeams',
          branchId: 'fear_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-fear_a',
      lines: [
        "You can't fail at noticing. You can only stop.",
        "And you haven't stopped. You're here. Day one of thirty.",
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-fear_b',
      lines: [
        "That realization is the point. Not the punishment — the clarity.",
        "Thirty days is enough to see the full picture.",
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-fear_c',
      lines: [
        "You already know the pull. That's why you're ready for thirty days.",
        "The patterns don't get new tricks. You get sharper eyes.",
      ],
    },
    {
      type: 'narration',
      text: "The courtyard opens into a path that stretches far ahead. You can't see the end. But you can see the next step. The Queen nods. That's all you need.",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'fear_a': { MOONBEAMS_PULL: 1 },
    'fear_b': { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'fear_c': { MOONBEAMS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What would 'not failing' look like for you — specifically?",
    friction: "What do you expect to find in thirty days of looking?",
    pattern:  "You know the patterns. What do you want to learn that you don't know yet?",
    mastery:  "Day one with clear eyes. What question do you want answered by day thirty?",
  },

  unlocks: {
    scenes: ['scene_m05_first_weekend'],
  },
};
