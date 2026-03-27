import type { Scene } from '../../types';

export const scene_m25_almost: Scene = {
  id: 'scene_m25_almost',
  questId: 'low_spend_month',
  day: 25,
  title: 'Almost There',
  timeLabel: '5:00pm',
  location: "The World's Threshold",
  characters: ['world', 'devil', 'hermit'],
  patternTags: ['moonbeams', 'rainbows', 'sunshine', 'ambrosia'],
  artKey: 'worlds_threshold',

  beats: [
    {
      type: 'narration',
      text: "Day twenty-five. Five days to go. The World's Threshold is where the end becomes visible — close enough to taste, far enough to stumble. The Devil makes one last appearance. All the patterns show up for a final curtain call.",
    },
    {
      type: 'dialogue',
      character: 'world',
      lines: [
        "Five days. You're standing at the threshold.",
        "Everything you've learned is here. Every pattern, every name, every question.",
        "The ending isn't a finish line. It's a door.",
      ],
    },
    {
      type: 'dialogue',
      character: 'devil',
      lines: [
        "Last chance. Five days. You could celebrate early.",
        "One big purchase to mark the occasion. You've earned it, right?",
        "...right?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "Five more days won't hurt. But one celebration won't either.", branchId: 'final_a' },
        { id: 'b', label: "Five days. I'll finish what I started.", branchId: 'final_b' },
        { id: 'c', label: "Every pattern at once — Moonbeams, Sunshine, Ambrosia. I see them all.", patternRequired: 'moonbeams', branchId: 'final_c' },
      ],
    },
    {
      type: 'dialogue', character: 'devil', variant: 'after-final_a',
      lines: ["One celebration. Famous last words.", "But you know that now. You see me saying it. That's... different from before."],
    },
    {
      type: 'dialogue', character: 'world', variant: 'after-final_b',
      lines: ["Finish what you started. Five more days of practice.", "Not perfection. Practice."],
    },
    {
      type: 'dialogue', character: 'world', variant: 'after-final_c',
      lines: ["All of them. At once. And you're still standing.", "That's what twenty-five days builds. Not immunity — clarity."],
    },
    {
      type: 'narration',
      text: "The threshold stretches ahead. Five days. The patterns are all present — Moonbeams, Rainbows, Ambrosia, Stardust, Sunshine, Unicorns. They don't disappear. They just stop being invisible. And visible things can be chosen or declined.",
    },
    {
      type: 'mercy',
      queenLine: "Twenty-five days. Nearly there. What do you want to remember about this journey?",
      hermitQuestion: "When you walk through the door on day thirty, who walks out the other side?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'final_a': { MOONBEAMS_PULL: 1, SUNSHINE_PULL: 1 },
    'final_b': { FRICTION: 1 },
    'final_c': { MOONBEAMS_NAMED: 1, SUNSHINE_NAMED: 1, AMBROSIA_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What will the celebration actually look like? Is it a purchase, or something else?",
    friction: "What gave you the strength to finish?",
    pattern: "All six patterns in one scene. Which one is loudest? Which one is quietest?",
    mastery: "Twenty-five days of naming. What's left unnamed?",
  },
  unlocks: { scenes: ['scene_m28_last_weekend'] },
};
