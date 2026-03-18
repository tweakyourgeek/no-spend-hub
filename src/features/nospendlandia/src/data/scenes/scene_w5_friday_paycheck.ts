import type { Scene } from '../../types';

export const scene_w5_friday_paycheck: Scene = {
  id: 'scene_w5_friday_paycheck',
  questId: 'no_spend_week',
  day: 5,
  title: 'Friday Paycheck',
  timeLabel: '12:01pm',
  location: "The Wheel's Treasury",
  characters: ['wheel', 'hermit'],
  patternTags: ['sunshine', 'unicorns'],
  artKey: 'wheels_treasury',

  beats: [
    {
      type: 'narration',
      text: "Friday. Payday. The number in your account just jumped. After a week of restraint, the money feels like it's burning a hole. The Wheel turns — what was scarce is now abundant. And abundance whispers: spend.",
    },
    {
      type: 'dialogue',
      character: 'wheel',
      lines: [
        "Payday. The Wheel turns.",
        "You survived the week. The money arrived. And now every pattern you've been holding at bay is lining up at the door.",
        "What's the first thing you want to buy?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Something I've been eyeing all week. I earned it.",
          branchId: 'reward_a',
        },
        {
          id: 'b',
          label: "Nothing yet. The money just arrived — it can wait.",
          branchId: 'reward_b',
        },
        {
          id: 'c',
          label: "Sunshine — the 'I earned this' loop.",
          patternRequired: 'sunshine',
          branchId: 'reward_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-reward_a',
      lines: [
        "\"I earned it.\" The three most expensive words in the language.",
        "You did earn it. But the money you earned can work for you or against you. Which is it doing right now?",
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-reward_b',
      lines: [
        "It can wait. That's the Wheel's secret — the money doesn't expire at midnight.",
        "Payday is the hardest day to not spend. You're choosing to wait. That's power.",
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-reward_c',
      lines: [
        "The reward loop. You see it spinning.",
        "Earning is real. The spending that follows? That's the pattern, not the paycheck.",
      ],
    },
    {
      type: 'narration',
      text: "The afternoon stretches on. Social media is full of weekend plans — restaurants, bars, new outfits. Everyone seems to be celebrating payday. The pressure to join in, to show up, to be the version of yourself that has money to spend.",
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I'm going out tonight. One night won't hurt.",
          branchId: 'social_a',
        },
        {
          id: 'b',
          label: "I'm staying in. I'll make something at home.",
          branchId: 'social_b',
        },
        {
          id: 'c',
          label: "Unicorns — buying to be the version of me that 'has it together.'",
          patternRequired: 'unicorns',
          branchId: 'social_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-social_a',
      lines: [
        "One night. That's what the Wheel says every Friday.",
        "Go, if you go. But count what it costs — not just dollars. Energy. Progress. Momentum.",
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-social_b',
      lines: [
        "Staying in on payday Friday. That's a statement.",
        "The Wheel respects it. Not everyone who earns money needs to prove it.",
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-social_c',
      lines: [
        "Unicorns. The aspirational self that needs purchases to exist.",
        "You are already the person you're performing. The spending doesn't make it realer.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "Payday spending. It happened. What was the feeling when you saw the money arrive?",
      hermitQuestion: "What does 'having money' feel like when you don't spend it?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'reward_a': { SUNSHINE_PULL: 1 },
    'reward_b': { FRICTION: 1, SUNSHINE_OBSERVED: 1 },
    'reward_c': { SUNSHINE_NAMED: 1 },
    'social_a': { UNICORNS_PULL: 1 },
    'social_b': { FRICTION: 1, UNICORNS_OBSERVED: 1 },
    'social_c': { UNICORNS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What did you really want to celebrate — the earning, or the spending?",
    friction: "What does Friday night feel like when the money stays?",
    pattern:  "Which patterns showed up strongest on payday?",
    mastery:  "You see the Wheel clearly. What changes when the money arrives now?",
  },

  unlocks: {
    scenes: ['scene_w6_weekend_test'],
  },
};
