import type { Scene } from '../../types';

export const scene_01_friday_night: Scene = {
  id: 'scene_01_friday_night',
  questId: 'no_spend_weekend',
  day: 1,
  title: 'Friday Night',
  timeLabel: '11:47pm',
  location: "The Moon's Apartment",
  characters: ['moon', 'hermit'],
  patternTags: ['moonbeams', 'rainbows'],
  artKey: 'moon_apartment',

  beats: [
    // ── Beat 1: Scene-setting narration ──
    {
      type: 'narration',
      text: "It's late. The kind of late where the day is over but you're not ready to let go of it yet. You're on your phone. The Moon's apartment is blue-lit and warm — a scroll through things you didn't know you wanted until right now.",
    },

    // ── Beat 2: The Moon's arrival dialogue ──
    {
      type: 'dialogue',
      character: 'moon',
      lines: [
        "Oh, you're still up.",
        "I found something perfect for you. Look at this — it's exactly what you've been wanting. You said so last week. Remember?",
        "It's on sale. Just for tonight.",
      ],
    },

    // ── Beat 3: Arrival choice ──
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Show me. What is it?",
          branchId: 'arrival_a',
        },
        {
          id: 'b',
          label: "I'm trying not to spend this weekend.",
          branchId: 'arrival_b',
        },
        {
          id: 'c',
          label: "I know this pattern. This is Moonbeams.",
          patternRequired: 'moonbeams',
          branchId: 'arrival_c',
        },
      ],
    },

    // ── Beat 4: Moon responds to arrival choice (A path) ──
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-arrival_a',
      lines: [
        "See? I knew you'd want to look.",
        "It's beautiful, isn't it? And it's only... well, it doesn't matter what it costs. It's worth it. You deserve something beautiful tonight.",
      ],
    },

    // ── Beat 4 alt: Moon responds to arrival choice (B path) ──
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-arrival_b',
      lines: [
        "Oh. That's... admirable, I guess.",
        "But this isn't really spending. It's investing in yourself. There's a difference. And besides, it's only one thing.",
      ],
    },

    // ── Beat 4 alt: Moon responds to arrival choice (C path — pattern named) ──
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-arrival_c',
      lines: [
        "...",
        "You named it. Most people never do that. They just feel the pull and follow it.",
        "Fine. I'll still be here. I'm always here.",
      ],
    },

    // ── Beat 5: The Cart narration ──
    {
      type: 'narration',
      text: "The cart is open. Three items you saved earlier this week. Total: more than you planned for the whole weekend. The checkout button pulses gently, like a heartbeat.",
    },

    // ── Beat 6: Cart choice ──
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Buy it. I'll figure it out tomorrow.",
          branchId: 'cart_a',
        },
        {
          id: 'b',
          label: "Close the tab. Walk away.",
          branchId: 'cart_b',
        },
        {
          id: 'c',
          label: "I see what this is. The Moonbeams are pulling.",
          patternRequired: 'moonbeams',
          branchId: 'cart_c',
        },
      ],
    },

    // ── Beat 7: Cart response (A — Pull) ──
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-cart_a',
      lines: [
        "Good choice. You won't regret it.",
        "...probably.",
      ],
    },

    // ── Beat 7 alt: Cart response (B — Friction) ──
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-cart_b',
      lines: [
        "Wait — really?",
        "Huh. Okay. The tab is still there if you change your mind. I won't judge.",
      ],
    },

    // ── Beat 7 alt: Cart response (C — Pattern named) ──
    {
      type: 'dialogue',
      character: 'moon',
      variant: 'after-cart_c',
      lines: [
        "You named it again.",
        "There's less I can do when you see it clearly. That's... annoying, actually.",
      ],
    },

    // ── Beat 8: Mercy beat (fires after any Pull choice) ──
    {
      type: 'mercy',
      queenLine: "That's data. What did you notice right before you clicked?",
      hermitQuestion: "What were you actually reaching for?",
    },

    // ── Beat 9: Hermit beat ──
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'arrival_a':     {},
    'arrival_b':     { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'arrival_c':     { MOONBEAMS_NAMED: 1 },
    'cart_a':        { MOONBEAMS_PULL: 1 },
    'cart_b':        { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'cart_c':        { MOONBEAMS_NAMED: 1 },
    // Mastery: arriving at C when already on a C path
    'arrival_c_any': { MOONBEAMS_NAMED: 1, PATTERN_MASTERY_MOONBEAMS: 1 },
  },

  hermitQuestions: {
    pull:     "What were you actually going for?",
    friction: "What did you want the thing to do for you?",
    pattern:  "What does Friday night feel like when it's actually good?",
    mastery:  "You saw it before it arrived. What changed?",
  },

  unlocks: {
    scenes: ['scene_02_saturday_morning'],
  },
};
