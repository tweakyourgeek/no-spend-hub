import type { Scene } from '../../types';

export const scene_02_saturday_morning: Scene = {
  id: 'scene_02_saturday_morning',
  questId: 'no_spend_weekend',
  day: 2,
  title: 'Saturday Morning',
  timeLabel: '10:23am',
  location: "The Devil's Market",
  characters: ['devil', 'hermit'],
  patternTags: ['ambrosia', 'rainbows'],
  artKey: 'devils_market',

  beats: [
    // ── Beat 1: Scene-setting narration ──
    {
      type: 'narration',
      text: "Saturday. The morning feels wide open — nothing scheduled, nowhere to be. You end up walking through the market district. Not because you need anything. You just... ended up here. The storefronts are bright and the sales signs are everywhere.",
    },

    // ── Beat 2: The Devil's welcome ──
    {
      type: 'dialogue',
      character: 'devil',
      lines: [
        "Well, well. A browser.",
        "I love browsers. Browsers become buyers. It's just a matter of time.",
        "Can I show you something? No pressure. Just looking.",
      ],
    },

    // ── Beat 3: First choice — engaging with the shopkeeper ──
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Sure, what do you have?",
          branchId: 'browse_a',
        },
        {
          id: 'b',
          label: "I'm just walking. Not buying.",
          branchId: 'browse_b',
        },
        {
          id: 'c',
          label: "I see what you're doing. This is Ambrosia.",
          patternRequired: 'ambrosia',
          branchId: 'browse_c',
        },
      ],
    },

    // ── Beat 4: Devil responds (A — Pull) ──
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-browse_a',
      lines: [
        "Smart. You've got good taste — I can tell.",
        "This just came in. Limited run. Everyone's been asking about it. You'd be the first in your circle to have one.",
        "I'll hold it for you. But only for today.",
      ],
    },

    // ── Beat 4 alt: Devil responds (B — Friction) ──
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-browse_b',
      lines: [
        "\"Just walking.\" That's what they all say.",
        "But sure. Walk. Look. No charge for looking.",
        "...yet.",
      ],
    },

    // ── Beat 4 alt: Devil responds (C — Pattern named) ──
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-browse_c',
      lines: [
        "Ah. You know my tricks.",
        "That's inconvenient. Most people don't see it — the way I make everything feel urgent and rare.",
        "Go on, then. But you'll be back. They always come back.",
      ],
    },

    // ── Beat 5: Narration — the social pull ──
    {
      type: 'narration',
      text: "Your phone buzzes. A friend posted a photo — brunch at that new place. Another friend DMs: \"Coming out today? We're hitting the shops.\" The Saturday pull isn't just about things. It's about belonging.",
    },

    // ── Beat 6: Social choice ──
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Text back: \"On my way.\"",
          branchId: 'social_a',
        },
        {
          id: 'b',
          label: "Text back: \"Let's do something free instead.\"",
          branchId: 'social_b',
        },
        {
          id: 'c',
          label: "I see the Rainbows pulling — spending to belong.",
          patternRequired: 'rainbows',
          branchId: 'social_c',
        },
      ],
    },

    // ── Beat 7: Social response (A — Pull) ──
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-social_a',
      lines: [
        "Now we're talking. Can't let them have fun without you.",
        "Besides, what's a Saturday without spending a little? That's what weekends are for.",
      ],
    },

    // ── Beat 7 alt: Social response (B — Friction) ──
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-social_b',
      lines: [
        "\"Something free.\" Bold move.",
        "Let's see if they say yes. Not everyone is comfortable when the money stops flowing.",
      ],
    },

    // ── Beat 7 alt: Social response (C — Pattern named) ──
    {
      type: 'dialogue',
      character: 'devil',
      variant: 'after-social_c',
      lines: [
        "You keep naming things.",
        "Fine. Yes. The spending-to-belong trick. It works because belonging is real. The spending part isn't.",
      ],
    },

    // ── Beat 8: Mercy beat ──
    {
      type: 'mercy',
      queenLine: "That happened. You're still here. What did it feel like right before you said yes?",
      hermitQuestion: "What were you afraid would happen if you said no?",
    },

    // ── Beat 9: Hermit beat ──
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'browse_a':   { AMBROSIA_PULL: 1 },
    'browse_b':   { FRICTION: 1, AMBROSIA_OBSERVED: 1 },
    'browse_c':   { AMBROSIA_NAMED: 1 },
    'social_a':   { RAINBOWS_PULL: 1 },
    'social_b':   { FRICTION: 1, RAINBOWS_OBSERVED: 1 },
    'social_c':   { RAINBOWS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What did Saturday promise you that it didn't deliver?",
    friction: "What did you do with the space you created?",
    pattern:  "When you see the pattern, what changes about the pull?",
    mastery:  "You named it twice now. What does the naming do for you?",
  },

  unlocks: {
    scenes: ['scene_03_sunday_evening'],
  },
};
