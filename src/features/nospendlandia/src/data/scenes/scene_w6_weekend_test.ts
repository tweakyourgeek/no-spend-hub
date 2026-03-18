import type { Scene } from '../../types';

export const scene_w6_weekend_test: Scene = {
  id: 'scene_w6_weekend_test',
  questId: 'no_spend_week',
  day: 6,
  title: 'The Weekend Test',
  timeLabel: '2:00pm',
  location: "The Moon's Return",
  characters: ['moon', 'devil', 'hermit'],
  patternTags: ['moonbeams', 'rainbows', 'ambrosia'],
  artKey: 'moons_return',

  beats: [
    {
      type: 'narration',
      text: "Saturday again. But this Saturday is different — you've been paying attention all week. The Moon is back, and The Devil has set up shop nearby. The weekend is a test of everything you've learned. Two days until you finish.",
    },
    {
      type: 'dialogue',
      character: 'moon',
      lines: [
        "Miss me?",
        "Friday night was just the warm-up. Saturday is when the real pull happens — when you have time, money, and boredom all at once.",
        "The whole weekend stretches ahead. What are you going to do with it?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I've been good all week. I can relax the rules a little.",
          branchId: 'relax_a',
        },
        {
          id: 'b',
          label: "Two more days. I've come this far.",
          branchId: 'relax_b',
        },
        {
          id: 'c',
          label: "I see you, Moon. The Moonbeams are here, but I know them now.",
          patternRequired: 'moonbeams',
          branchId: 'relax_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-relax_a',
      lines: [
        "\"Relax the rules.\" Music to my ears.",
        "One relaxed rule becomes two becomes \"I'll start again Monday.\" I've seen it a thousand times.",
      ],
    },
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-relax_b',
      lines: [
        "Two more days. You're counting down. Good.",
        "I'll be here when the count hits zero. I'm always here. But you know that now.",
      ],
    },
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-relax_c',
      lines: [
        "You know them. Knowing changes everything.",
        "I can't pull as hard when you see the string. That's... the point of this whole game, isn't it?",
      ],
    },
    {
      type: 'narration',
      text: "The afternoon fills with opportunities to spend. A friend's invite. A sidewalk cafe. A pop-up market. The Devil is everywhere, disguised as leisure. But you've spent a week learning the difference between wanting and needing.",
    },
    {
      type: 'dialogue',
      character: 'devil',
      lines: [
        "Still here? I'm impressed. Most people crack by the weekend.",
        "But here's my last offer: you don't have to buy anything. Just... look. Window-shop. What's the harm?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Just looking. No harm in that.",
          branchId: 'window_a',
        },
        {
          id: 'b',
          label: "I know where 'just looking' leads. I'm walking away.",
          branchId: 'window_b',
        },
        {
          id: 'c',
          label: "Rainbows and Ambrosia — the social pull and the impulse together.",
          patternRequired: 'rainbows',
          branchId: 'window_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-window_a',
      lines: [
        "That's the spirit. Just looking.",
        "...for now.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-window_b',
      lines: [
        "Walking away. You've learned something this week.",
        "I'll be here next time. But you'll be different.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-window_c',
      lines: [
        "You see both patterns at once. The social pull and the impulse.",
        "Naming them together — that's mastery. I have less to offer someone who sees clearly.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "The weekend pulled. You're still playing. What did you learn this week that changed today?",
      hermitQuestion: "How is this Saturday different from last Saturday?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'relax_a':  { MOONBEAMS_PULL: 1 },
    'relax_b':  { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'relax_c':  { MOONBEAMS_NAMED: 1 },
    'window_a': { RAINBOWS_PULL: 1, AMBROSIA_PULL: 1 },
    'window_b': { FRICTION: 1, RAINBOWS_OBSERVED: 1, AMBROSIA_OBSERVED: 1 },
    'window_c': { RAINBOWS_NAMED: 1, AMBROSIA_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What's different about spending after a week of noticing?",
    friction: "What did you do with the time you would have spent shopping?",
    pattern:  "Multiple patterns in one scene. How do they reinforce each other?",
    mastery:  "The Moon and the Devil together, and you see through both. What now?",
  },

  unlocks: {
    scenes: ['scene_w7_sunday_world'],
  },
};
