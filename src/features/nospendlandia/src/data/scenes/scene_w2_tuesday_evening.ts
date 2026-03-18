import type { Scene } from '../../types';

export const scene_w2_tuesday_evening: Scene = {
  id: 'scene_w2_tuesday_evening',
  questId: 'no_spend_week',
  day: 2,
  title: 'Tuesday Evening',
  timeLabel: '6:30pm',
  location: "The Magician's Workshop",
  characters: ['magician', 'hermit'],
  patternTags: ['ambrosia', 'stardust'],
  artKey: 'magicians_workshop',

  beats: [
    {
      type: 'narration',
      text: "Tuesday evening. The novelty of the challenge is already fading. Your inbox has two 'flash sale' emails. Your phone shows three app notifications with red badges. The Magician is waiting in a space that looks like a workshop — tools on every surface, each one promising transformation.",
    },
    {
      type: 'dialogue',
      character: 'magician',
      lines: [
        "Ah, you came back. Most people quit by Tuesday.",
        "I'm Arden. I deal in tools. Real tools — the kind that change how you think, not just what you buy.",
        "Tell me: what's the most tempting thing in your inbox right now?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "There's a sale I don't want to miss. It ends tonight.",
          branchId: 'sale_a',
        },
        {
          id: 'b',
          label: "I deleted the emails without opening them.",
          branchId: 'sale_b',
        },
        {
          id: 'c',
          label: "Ambrosia — the urgency is manufactured.",
          patternRequired: 'ambrosia',
          branchId: 'sale_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-sale_a',
      lines: [
        "\"Ends tonight.\" The oldest trick in the book.",
        "Here's a spell: if it ends tonight and you didn't know about it yesterday, you don't need it.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-sale_b',
      lines: [
        "Deleted without opening. That's a power move.",
        "The first spell I teach: don't let them start the conversation. Delete is a complete sentence.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-sale_c',
      lines: [
        "Manufactured urgency. You see through it.",
        "The Magician's truth: nothing real expires in 24 hours. Only the illusion does.",
      ],
    },
    {
      type: 'narration',
      text: "Arden shows you your phone's subscription list. Small charges you forgot about. A streaming service you haven't used in months. A productivity app that was supposed to change your life. The Stardust — tiny recurring drains, invisible until you look.",
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I'll cancel them later. Now isn't the time.",
          branchId: 'subs_a',
        },
        {
          id: 'b',
          label: "Let me cancel one right now. Just one.",
          branchId: 'subs_b',
        },
        {
          id: 'c',
          label: "Stardust — small charges that add up because I never look.",
          patternRequired: 'stardust',
          branchId: 'subs_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-subs_a',
      lines: [
        "\"Later\" is where good intentions go to die.",
        "But I won't push. Notice that impulse to delay. That's data too.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-subs_b',
      lines: [
        "One. That's all it takes. One cancellation breaks the spell of 'it's only a few dollars.'",
        "The Magician's second spell: small actions compound. In both directions.",
      ],
    },
    {
      type: 'dialogue',
      character: 'magician',
      variant: 'after-subs_c',
      lines: [
        "You named it. The quiet drain.",
        "Stardust is insidious because each grain seems harmless. It's the accumulation that drowns you.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "You delayed. That's honest. What made 'now' feel like the wrong time?",
      hermitQuestion: "What are you paying for that you've already stopped using?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'sale_a': { AMBROSIA_PULL: 1 },
    'sale_b': { FRICTION: 1, AMBROSIA_OBSERVED: 1 },
    'sale_c': { AMBROSIA_NAMED: 1 },
    'subs_a': { STARDUST_PULL: 1 },
    'subs_b': { FRICTION: 1, STARDUST_OBSERVED: 1 },
    'subs_c': { STARDUST_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What would you do with the money those subscriptions cost in a year?",
    friction: "What did it feel like to delete without opening?",
    pattern:  "How many patterns have you named so far? What do they have in common?",
    mastery:  "You see the tricks now. What's left after the tricks are gone?",
  },

  unlocks: {
    scenes: ['scene_w3_wednesday_night'],
  },
};
