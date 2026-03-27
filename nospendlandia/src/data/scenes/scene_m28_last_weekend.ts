import type { Scene } from '../../types';

export const scene_m28_last_weekend: Scene = {
  id: 'scene_m28_last_weekend',
  questId: 'low_spend_month',
  day: 28,
  title: 'Last Weekend',
  timeLabel: '11:30am',
  location: "The Moon's Final Pull",
  characters: ['moon', 'queen_of_pentacles', 'hermit'],
  patternTags: ['moonbeams', 'rainbows', 'ambrosia'],
  artKey: 'moons_final_pull',

  beats: [
    {
      type: 'narration',
      text: "Day twenty-eight. The last weekend of the challenge. The Moon is here for a final visit. Not to tempt — to reflect. The Queen of Pentacles stands nearby, quiet and steady as always. Two days until the arch is complete.",
    },
    {
      type: 'dialogue',
      character: 'moon',
      lines: [
        "Last weekend. I've been here every weekend, haven't I?",
        "Friday nights. Saturday mornings. Sunday scrolls. I'm the weekend pattern.",
        "But you know that now. So what happens this time?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I want to celebrate being almost done. Just one more indulgence.", branchId: 'last_a' },
        { id: 'b', label: "This weekend is the practice, same as every other.", branchId: 'last_b' },
        { id: 'c', label: "I see you, Moon. The Moonbeams on the last weekend. I choose differently.", patternRequired: 'moonbeams', branchId: 'last_c' },
      ],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-last_a',
      lines: ["One more. I've heard that every weekend for twenty-eight days.", "But this time you hear yourself saying it. That's new."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-last_b',
      lines: ["Same as every other. No special treatment because it's the end.", "That's not willpower. That's identity. You've become someone who practices."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-last_c',
      lines: ["You see me and choose differently. That's...", "That's the whole point. I pull. You see. You choose. The pull doesn't stop. The choice changes."],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      lines: [
        "Twenty-eight days of data.",
        "Your spending is a story you wrote, one day at a time. Not perfect. Not terrible. Honest.",
        "Two more entries. Then you read it back.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "The last weekend. You spent. That's part of the data. What does the whole month's data say?",
      hermitQuestion: "How is this last weekend different from the first one?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'last_a': { MOONBEAMS_PULL: 1 },
    'last_b': { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'last_c': { MOONBEAMS_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What does 'one more' mean on day twenty-eight versus day three?",
    friction: "Practice without special treatment. How did that feel?",
    pattern: "The Moon on the first weekend versus the last. What changed?",
    mastery: "Twenty-eight days. Two left. What are you taking with you?",
  },
  unlocks: { scenes: ['scene_m30_the_world'] },
};
