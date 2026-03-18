import type { Scene } from '../../types';

export const scene_m07_one_week: Scene = {
  id: 'scene_m07_one_week',
  questId: 'low_spend_month',
  day: 7,
  title: 'One Week Down',
  timeLabel: '7:30pm',
  location: "Queen's Hearth",
  characters: ['queen_of_pentacles', 'hermit'],
  patternTags: ['sunshine', 'stardust'],
  artKey: 'queens_hearth',

  beats: [
    {
      type: 'narration',
      text: "One week. Seven days inside a thirty-day challenge. The Queen of Pentacles has set a table — not lavish, but warm. A hearth fire, a mug of something that cost nothing to make. She's reviewing the week like a ledger, but with compassion.",
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      lines: [
        "One week. Let's look at the data.",
        "Not the shame. Not the pride. Just the data.",
        "How many times did you spend this week when you didn't plan to?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "More times than I'd like to admit.", branchId: 'review_a' },
        { id: 'b', label: "A few. But each time I noticed it faster.", branchId: 'review_b' },
        { id: 'c', label: "I tracked them all. The Stardust ones are the sneakiest.", patternRequired: 'stardust', branchId: 'review_c' },
      ],
    },
    {
      type: 'dialogue', character: 'queen_of_pentacles', variant: 'after-review_a',
      lines: ["More than you'd like. That's honest.", "The number doesn't matter as much as the noticing. You're counting now. Before, you weren't."],
    },
    {
      type: 'dialogue', character: 'queen_of_pentacles', variant: 'after-review_b',
      lines: ["Faster each time. That's the trajectory that matters.", "Speed of recognition. That's the muscle you're building."],
    },
    {
      type: 'dialogue', character: 'queen_of_pentacles', variant: 'after-review_c',
      lines: ["Stardust — the small ones. Yes.", "They're sneaky because they feel insignificant alone. Add them up over a month and they're the biggest line item."],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      lines: [
        "Week one is complete. Here's what I want you to carry into week two:",
        "Your spending is data. Not a verdict.",
        "You don't need to be perfect. You need to be present.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "A week of data. Some of it uncomfortable. What did you learn that a budget app never told you?",
      hermitQuestion: "If your spending this week were a story, what would the title be?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'review_a': { SUNSHINE_PULL: 1 }, 'review_b': { FRICTION: 1, SUNSHINE_OBSERVED: 1 }, 'review_c': { STARDUST_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What patterns showed up most in week one?",
    friction: "What was different about the moments you caught yourself?",
    pattern: "The sneaky patterns — why are they hardest to name?",
    mastery: "One week of data. What's the headline?",
  },
  unlocks: { scenes: ['scene_m08_temptation'] },
};
