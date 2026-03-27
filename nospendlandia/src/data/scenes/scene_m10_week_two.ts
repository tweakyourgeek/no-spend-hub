import type { Scene } from '../../types';

export const scene_m10_week_two: Scene = {
  id: 'scene_m10_week_two',
  questId: 'low_spend_month',
  day: 10,
  title: 'The Second Week',
  timeLabel: '7:00pm',
  location: "The Magician's Library",
  characters: ['magician', 'hermit'],
  patternTags: ['stardust', 'sunshine'],
  artKey: 'magicians_library',

  beats: [
    {
      type: 'narration',
      text: "Day ten. The novelty is gone. This is where most people quit — not with a bang but with a forgotten promise. The Magician is in a library full of tools and tricks. Some are yours. Some are traps.",
    },
    {
      type: 'dialogue',
      character: 'magician',
      lines: [
        "Day ten. The dangerous part.",
        "The first week runs on excitement. The second week runs on habit. You don't have the habit yet.",
        "What's tempting you to quit?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I'm bored of being careful. I want to spend without thinking.",
          branchId: 'quit_a',
        },
        {
          id: 'b',
          label: "I'm not quitting. But I'm tired.",
          branchId: 'quit_b',
        },
        {
          id: 'c',
          label: "Sunshine — I want to reward myself for making it this far.",
          patternRequired: 'sunshine',
          branchId: 'quit_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-quit_a',
      lines: [
        "\"Without thinking.\" That's exactly what the patterns want.",
        "The Magician's spell for week two: make one small decision consciously each day. Just one.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-quit_b',
      lines: [
        "Tired but still here. That's not weakness — that's endurance.",
        "Week two is the crucible. What survives it is real.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-quit_c',
      lines: [
        "Sunshine at day ten. The reward trap.",
        "You deserve acknowledgment. But acknowledgment doesn't require a receipt.",
      ],
    },
    {
      type: 'narration',
      text: "Arden pulls out a list of your recurring charges. The Stardust — still flowing, still draining. Some you cancelled in week one. Some you didn't. The ones that remain feel heavier now that you're paying attention.",
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I'll keep them. They're small and I use them sometimes.",
          branchId: 'stardust_a',
        },
        {
          id: 'b',
          label: "Cancel another one. Momentum matters.",
          branchId: 'stardust_b',
        },
        {
          id: 'c',
          label: "Stardust — the 'it's only a few dollars' illusion.",
          patternRequired: 'stardust',
          branchId: 'stardust_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-stardust_a',
      lines: [
        "\"Sometimes.\" That word costs more than you think.",
        "But it's your choice. Data, not a verdict.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-stardust_b',
      lines: [
        "One more cancellation. The compound effect works both ways.",
        "Small cuts. Real freedom.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-stardust_c',
      lines: [
        "The few-dollars illusion. Multiply by twelve months.",
        "Stardust is invisible until you add it up. Then it's a river.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "Week two fatigue. You kept a subscription. What's it really buying you?",
      hermitQuestion: "What's the difference between a service you use and a comfort you pay for?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'quit_a':     { SUNSHINE_PULL: 1 },
    'quit_b':     { FRICTION: 1, SUNSHINE_OBSERVED: 1 },
    'quit_c':     { SUNSHINE_NAMED: 1 },
    'stardust_a': { STARDUST_PULL: 1 },
    'stardust_b': { FRICTION: 1, STARDUST_OBSERVED: 1 },
    'stardust_c': { STARDUST_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "If you quit today, what would you miss about paying attention?",
    friction: "What's sustaining you through the fatigue?",
    pattern:  "Which pattern is loudest at day ten?",
    mastery:  "The patterns haven't changed. You have. What's different?",
  },

  unlocks: {
    scenes: ['scene_m15_halfway'],
  },
};
