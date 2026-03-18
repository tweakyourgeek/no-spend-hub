import type { Scene } from '../../types';

export const scene_m23_relapse: Scene = {
  id: 'scene_m23_relapse',
  questId: 'low_spend_month',
  day: 23,
  title: 'The Second Wind',
  timeLabel: '10:00am',
  location: "The Wheel's Return",
  characters: ['wheel', 'magician', 'hermit'],
  patternTags: ['sunshine', 'ambrosia', 'stardust'],
  artKey: 'wheels_return',

  beats: [
    {
      type: 'narration',
      text: "Day twenty-three. One week left. You've been in a groove — or maybe a rut. The challenge is familiar now, and familiar is where complacency hides. The Wheel turns again, and the Magician has new tools to show you.",
    },
    {
      type: 'dialogue',
      character: 'wheel',
      lines: [
        "Seven days left. The Wheel is spinning faster.",
        "This is the sprint. Everything you've learned gets compressed into one final week.",
        "Are you coasting, or are you pushing?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "Coasting. I've been doing this long enough to relax.", branchId: 'coast_a' },
        { id: 'b', label: "Pushing. I want to finish strong.", branchId: 'coast_b' },
        { id: 'c', label: "I see the Sunshine — wanting to reward myself for almost finishing.", patternRequired: 'sunshine', branchId: 'coast_c' },
      ],
    },
    {
      type: 'dialogue', character: 'wheel', variant: 'after-coast_a',
      lines: ["Coasting. That's the week-four trap.", "You've built something in twenty-three days. Coasting can undo it in three."],
    },
    {
      type: 'dialogue', character: 'wheel', variant: 'after-coast_b',
      lines: ["Pushing. Not punishing — pushing.", "One more week of intentional practice. That's all."],
    },
    {
      type: 'dialogue', character: 'wheel', variant: 'after-coast_c',
      lines: ["The pre-celebration spending. Sunshine before the finish line.", "You're almost there. The reward is the completion, not a purchase."],
    },
    {
      type: 'dialogue',
      character: 'magician',
      lines: [
        "Here's the Magician's final tool: the audit.",
        "Look at your spending from day one to today. Not with judgment — with curiosity.",
        "What changed? When did it change? What triggered the changes?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "The numbers went down. But the feelings didn't change much.", branchId: 'audit_a' },
        { id: 'b', label: "The awareness changed everything. I spend differently now.", branchId: 'audit_b' },
        { id: 'c', label: "Stardust was the biggest surprise — so much invisible spending.", patternRequired: 'stardust', branchId: 'audit_c' },
      ],
    },
    {
      type: 'dialogue', character: 'magician', variant: 'after-audit_a',
      lines: ["Feelings unchanged. That's honest.", "The feelings drive the spending, not the other way around. The next step is the feelings work. That's beyond this challenge — but now you know."],
    },
    {
      type: 'dialogue', character: 'magician', variant: 'after-audit_b',
      lines: ["Awareness changed everything. The Magician's favorite outcome.", "Conscious spending isn't no spending. It's chosen spending."],
    },
    {
      type: 'dialogue', character: 'magician', variant: 'after-audit_c',
      lines: ["Stardust revealed. The invisible made visible.", "That one pattern alone probably saved you more than all the others combined."],
    },
    {
      type: 'mercy',
      queenLine: "Almost done. You spent today. What made today different from day one?",
      hermitQuestion: "What will you keep doing after day thirty? What will you let go?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'coast_a': { SUNSHINE_PULL: 1 }, 'coast_b': { FRICTION: 1 }, 'coast_c': { SUNSHINE_NAMED: 1 },
    'audit_a': { AMBROSIA_PULL: 1 }, 'audit_b': { FRICTION: 1, AMBROSIA_OBSERVED: 1 }, 'audit_c': { STARDUST_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What would coasting cost you in the last week?",
    friction: "What does 'finishing strong' look like in practice?",
    pattern: "Which pattern has weakened most over twenty-three days?",
    mastery: "The audit shows the arc. Where are you on it?",
  },
  unlocks: { scenes: ['scene_m25_almost'] },
};
