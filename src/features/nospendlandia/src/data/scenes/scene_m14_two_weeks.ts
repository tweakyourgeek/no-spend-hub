import type { Scene } from '../../types';

export const scene_m14_two_weeks: Scene = {
  id: 'scene_m14_two_weeks',
  questId: 'low_spend_month',
  day: 14,
  title: 'Two Weeks',
  timeLabel: '3:00pm',
  location: "The Magician's Mirror",
  characters: ['magician', 'hermit'],
  patternTags: ['stardust', 'sunshine'],
  artKey: 'magicians_mirror',

  beats: [
    {
      type: 'narration',
      text: "Fourteen days. The exact middle of the month approaches. The Magician has set up a mirror — not the kind that shows your face, but the kind that shows your spending over the last two weeks. Every transaction, every impulse, every save. It's all there.",
    },
    {
      type: 'dialogue',
      character: 'magician',
      lines: [
        "Two weeks of data. Let me show you what I see.",
        "There's a pattern in your patterns. The same triggers at the same times. Tuesday evenings. Sunday mornings. Payday afternoons.",
        "Your spending has a schedule. Did you know?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I didn't realize it was so predictable.", branchId: 'mirror_a' },
        { id: 'b', label: "I see it. The same times, the same feelings.", branchId: 'mirror_b' },
        { id: 'c', label: "Stardust — the recurring charges mirror the recurring urges.", patternRequired: 'stardust', branchId: 'mirror_c' },
      ],
    },
    {
      type: 'dialogue', character: 'magician', variant: 'after-mirror_a',
      lines: ["Predictable. That's not a weakness — it's an advantage.", "Predictable means preventable. If you know when the urge hits, you can prepare."],
    },
    {
      type: 'dialogue', character: 'magician', variant: 'after-mirror_b',
      lines: ["Same times, same feelings. The loop.", "Two weeks of data reveals what a lifetime of budgets couldn't: it's not about the money. It's about the moments."],
    },
    {
      type: 'dialogue', character: 'magician', variant: 'after-mirror_c',
      lines: ["Recurring charges, recurring urges. Both run on autopilot.", "The Magician's third spell: make the invisible visible. Then choose."],
    },
    {
      type: 'dialogue',
      character: 'magician',
      lines: [
        "Here's your homework for the second half: instead of fighting the urge when it arrives, do something different thirty minutes before it usually hits.",
        "Change the ritual, not the willpower.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "Two weeks of patterns. Some weeks were harder than others. What made the difference?",
      hermitQuestion: "If your spending has a schedule, what else in your life follows the same clock?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'mirror_a': { STARDUST_PULL: 1 }, 'mirror_b': { FRICTION: 1, STARDUST_OBSERVED: 1 }, 'mirror_c': { STARDUST_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What does your spending schedule tell you about your emotional schedule?",
    friction: "When you see the pattern in the mirror, does the urge change?",
    pattern: "Your patterns have a rhythm. What would disrupt the rhythm?",
    mastery: "Two weeks of seeing clearly. What are you ready to change?",
  },
  unlocks: { scenes: ['scene_m15_halfway'] },
};
