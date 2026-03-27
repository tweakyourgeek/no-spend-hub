import type { Scene } from '../../types';

export const scene_m17_the_slip: Scene = {
  id: 'scene_m17_the_slip',
  questId: 'low_spend_month',
  day: 17,
  title: 'The Slip',
  timeLabel: '4:15pm',
  location: "The Tower's Rubble",
  characters: ['tower', 'queen_of_pentacles', 'hermit'],
  patternTags: ['moonbeams', 'ambrosia', 'sunshine'],
  artKey: 'towers_rubble',

  beats: [
    {
      type: 'narration',
      text: "Day seventeen. You slipped. Not a small slip — a real one. A big purchase you didn't plan, didn't need, and immediately regretted. The Tower's rubble is everywhere. The Queen of Pentacles is here too, picking up pieces.",
    },
    {
      type: 'dialogue',
      character: 'tower',
      lines: [
        "There it is. The big one.",
        "Seventeen days of careful intention, and then — boom. One purchase that feels like it erased everything.",
        "Did it?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "Yes. I ruined it. Seventeen days for nothing.", branchId: 'slip_a' },
        { id: 'b', label: "No. One purchase doesn't erase seventeen days of data.", branchId: 'slip_b' },
        { id: 'c', label: "I see the Moonbeams and Ambrosia working together — emotional impulse.", patternRequired: 'moonbeams', branchId: 'slip_c' },
      ],
    },
    {
      type: 'dialogue', character: 'tower', variant: 'after-slip_a',
      lines: ["\"For nothing.\" That's the lie the Tower tells.", "Seventeen days of attention. That's not nothing. That's everything."],
    },
    {
      type: 'dialogue', character: 'tower', variant: 'after-slip_b',
      lines: ["One purchase. Seventeen days of practice.", "The math isn't even close. You're still ahead."],
    },
    {
      type: 'dialogue', character: 'tower', variant: 'after-slip_c',
      lines: ["Two patterns at once. The emotional trigger hit the impulse button.", "You see the mechanism even after it fired. That's not failure — that's forensics."],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      lines: [
        "The slip is part of the practice. Not a detour — a lesson.",
        "What matters now is not the purchase. It's the next three hours.",
        "Do you chase the slip with more spending? Or do you stop, note it, and continue?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I already blew it. Might as well enjoy the rest of the day.", branchId: 'chase_a' },
        { id: 'b', label: "Stop. Note it. Continue. Like you said.", branchId: 'chase_b' },
        { id: 'c', label: "Sunshine — the 'I already earned a bad day' excuse to keep spending.", patternRequired: 'sunshine', branchId: 'chase_c' },
      ],
    },
    {
      type: 'dialogue', character: 'queen_of_pentacles', variant: 'after-chase_a',
      lines: ["The chase. One slip becomes a binge.", "That's not you failing at the challenge. That's a pattern trying to survive. See it for what it is."],
    },
    {
      type: 'dialogue', character: 'queen_of_pentacles', variant: 'after-chase_b',
      lines: ["Stop. Note. Continue.", "Three words that change everything. The slip happened. The practice continues."],
    },
    {
      type: 'dialogue', character: 'queen_of_pentacles', variant: 'after-chase_c',
      lines: ["The excuse to keep going. Sunshine wearing the Tower's armor.", "You see through it. That's the practice working even when it doesn't feel like it."],
    },
    {
      type: 'mercy',
      queenLine: "A big slip. You're still here, still playing. That IS the practice.",
      hermitQuestion: "What was the feeling between 'I shouldn't' and 'I did'?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'slip_a': { MOONBEAMS_PULL: 1 }, 'slip_b': { FRICTION: 1 }, 'slip_c': { MOONBEAMS_NAMED: 1, AMBROSIA_NAMED: 1 },
    'chase_a': { SUNSHINE_PULL: 1 }, 'chase_b': { FRICTION: 1, SUNSHINE_OBSERVED: 1 }, 'chase_c': { SUNSHINE_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What would you tell a friend who slipped on day seventeen?",
    friction: "Stop, note, continue. Which part is hardest?",
    pattern: "Multiple patterns firing at once — how do you handle the pile-up?",
    mastery: "The slip taught you something the streak couldn't. What was it?",
  },
  unlocks: { scenes: ['scene_m21_week_three'] },
};
