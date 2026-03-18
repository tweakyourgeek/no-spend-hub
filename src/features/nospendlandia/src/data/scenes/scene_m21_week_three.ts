import type { Scene } from '../../types';

export const scene_m21_week_three: Scene = {
  id: 'scene_m21_week_three',
  questId: 'low_spend_month',
  day: 21,
  title: 'Week Three',
  timeLabel: '5:45pm',
  location: "The Wheel's Crossroads",
  characters: ['wheel', 'devil', 'hermit'],
  patternTags: ['sunshine', 'rainbows', 'stardust'],
  artKey: 'wheels_crossroads',

  beats: [
    {
      type: 'narration',
      text: "Day twenty-one. Three weeks. The pattern of low-spending is becoming your new normal — which is exactly when the old normal fights back hardest. The Wheel turns again. Payday hits. The Devil is waiting.",
    },
    {
      type: 'dialogue',
      character: 'wheel',
      lines: [
        "Another payday. The third one inside the challenge.",
        "By now you know what happens when fresh money arrives. The question is whether knowing changes what you do.",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Three weeks of effort deserves a reward. A real one.",
          branchId: 'pay_a',
        },
        {
          id: 'b',
          label: "The money stays where it is. I see the payday pattern now.",
          branchId: 'pay_b',
        },
        {
          id: 'c',
          label: "Sunshine again — but weaker this time. I know its name.",
          patternRequired: 'sunshine',
          branchId: 'pay_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-pay_a',
      lines: [
        "A real reward. What makes it real — the cost, or the meaning?",
        "Three weeks of data says you already know the answer.",
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-pay_b',
      lines: [
        "The money stays. That's mastery.",
        "Not because spending is wrong. Because you chose, instead of reacting.",
      ],
    },
    {
      type: 'dialogue',
      character: 'wheel',
      variant: 'after-pay_c',
      lines: [
        "Weaker. Good.",
        "Named patterns don't die. They just stop being the boss.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      lines: [
        "Three weeks. I'm almost impressed.",
        "But here's the thing about week three: you start thinking you've 'fixed' the problem. That's when you get sloppy.",
        "Stay sharp.",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Maybe I have fixed it. Maybe I can relax now.",
          branchId: 'relax_a',
        },
        {
          id: 'b',
          label: "Not fixed. Just practicing. Nine more days.",
          branchId: 'relax_b',
        },
        {
          id: 'c',
          label: "Rainbows — the 'everyone else is spending normally' comparison.",
          patternRequired: 'rainbows',
          branchId: 'relax_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-relax_a',
      lines: [
        "\"Fixed.\" That's my favorite word to hear at week three.",
        "You haven't fixed anything. You've built something. Don't mistake construction for completion.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-relax_b',
      lines: [
        "Practice, not perfection. Even the Devil respects that.",
        "Nine days. You can see the finish line. Don't sprint — walk.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-relax_c',
      lines: [
        "Comparison spending. The Rainbows at week three.",
        "Everyone else is spending normally. You're spending consciously. That's not the same as abnormally.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "Week three and you spent. That's okay. What did the spending teach you that the not-spending didn't?",
      hermitQuestion: "Is your relationship with money different now than it was twenty-one days ago?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'pay_a':   { SUNSHINE_PULL: 1 },
    'pay_b':   { FRICTION: 1, SUNSHINE_OBSERVED: 1 },
    'pay_c':   { SUNSHINE_NAMED: 1 },
    'relax_a': { RAINBOWS_PULL: 1 },
    'relax_b': { FRICTION: 1, RAINBOWS_OBSERVED: 1 },
    'relax_c': { RAINBOWS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What does 'reward' mean to you now versus day one?",
    friction: "What habit formed in the last twenty-one days that surprises you?",
    pattern:  "Three weeks of naming patterns. Which one changed the most?",
    mastery:  "Practice, not perfection. What does that look like tomorrow?",
  },

  unlocks: {
    scenes: ['scene_m30_the_world'],
  },
};
