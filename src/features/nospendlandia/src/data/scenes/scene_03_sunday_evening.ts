import type { Scene } from '../../types';

export const scene_03_sunday_evening: Scene = {
  id: 'scene_03_sunday_evening',
  questId: 'no_spend_weekend',
  day: 3,
  title: 'Sunday Evening',
  timeLabel: '7:15pm',
  location: "The World's Threshold",
  characters: ['world', 'hermit'],
  patternTags: ['moonbeams', 'ambrosia', 'rainbows'],
  artKey: 'worlds_threshold',

  beats: [
    // ── Beat 1: Scene-setting narration ──
    {
      type: 'narration',
      text: "Sunday evening. The weekend is almost over. You made it through Friday night and Saturday morning. Tomorrow is Monday and the world starts spending again. But right now, in this quiet hour, something feels different. Lighter.",
    },

    // ── Beat 2: The World speaks ──
    {
      type: 'dialogue',
      character: 'world',
      lines: [
        "You walked through the weekend.",
        "Three days. That's enough to see something true.",
      ],
    },

    // ── Beat 3: Reflection choice ──
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I almost didn't make it. I slipped.",
          branchId: 'reflect_a',
        },
        {
          id: 'b',
          label: "It was harder than I expected. But I held.",
          branchId: 'reflect_b',
        },
        {
          id: 'c',
          label: "I saw the patterns. I named them.",
          patternRequired: 'moonbeams',
          branchId: 'reflect_c',
        },
      ],
    },

    // ── Beat 4: World responds (A — acknowledging a slip) ──
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-reflect_a',
      lines: [
        "You slipped. And you're still here.",
        "That's the whole lesson. The spending happened. The pattern didn't win. You noticed it.",
      ],
    },

    // ── Beat 4 alt: World responds (B — held through difficulty) ──
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-reflect_b',
      lines: [
        "Hard and worth it aren't opposites.",
        "You held. That's data about who you are when you choose to pay attention.",
      ],
    },

    // ── Beat 4 alt: World responds (C — pattern mastery) ──
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-reflect_c',
      lines: [
        "You named them. That's the whole game.",
        "The patterns don't disappear. You just stop being surprised by them.",
      ],
    },

    // ── Beat 5: The World's gift narration ──
    {
      type: 'narration',
      text: "The weekend closes like a door behind you. But it's not the same door you walked in through. Something shifted. The Hermit's lantern is still lit, and the questions you were asked are still waiting — not for answers, but for attention.",
    },

    // ── Beat 6: The World's farewell ──
    {
      type: 'dialogue',
      character: 'world',
      lines: [
        "Your spending is data. Not a verdict.",
        "Go well.",
      ],
    },

    // ── Beat 7: Final hermit beat ──
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'reflect_a': { MERCY_ACKNOWLEDGED: 1 },
    'reflect_b': { FRICTION: 1 },
    'reflect_c': { PATTERN_MASTERY_WEEKEND: 1 },
  },

  hermitQuestions: {
    pull:     "What will you do differently next Friday night?",
    friction: "What surprised you about the weekend?",
    pattern:  "Which pattern taught you the most?",
    mastery:  "What does it feel like to see clearly?",
  },

  unlocks: {},
};
