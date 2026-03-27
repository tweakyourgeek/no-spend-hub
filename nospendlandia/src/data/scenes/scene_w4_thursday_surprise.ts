import type { Scene } from '../../types';

export const scene_w4_thursday_surprise: Scene = {
  id: 'scene_w4_thursday_surprise',
  questId: 'no_spend_week',
  day: 4,
  title: 'Thursday Surprise',
  timeLabel: '3:22pm',
  location: "The Tower's Edge",
  characters: ['tower', 'hermit'],
  patternTags: ['moonbeams', 'ambrosia'],
  artKey: 'towers_edge',

  beats: [
    {
      type: 'narration',
      text: "Thursday afternoon. You were doing well. Then the car made a noise. Or the washing machine died. Or your phone screen cracked. Something broke — something expensive. The Tower arrives without warning. That's the whole point of The Tower.",
    },
    {
      type: 'dialogue',
      character: 'tower',
      lines: [
        "BOOM. Didn't see that coming, did you?",
        "I'm Cael. The Tower. The unexpected bill. The thing that breaks during the worst possible week.",
        "Here's the question: does the emergency cancel the challenge?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Yes. I have to spend now. The challenge is over.",
          branchId: 'emergency_a',
        },
        {
          id: 'b',
          label: "The emergency is real. But it doesn't cancel everything else.",
          branchId: 'emergency_b',
        },
        {
          id: 'c',
          label: "I see it — the Tower makes me want to abandon the whole thing.",
          patternRequired: 'ambrosia',
          branchId: 'emergency_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-emergency_a',
      lines: [
        "That's what I expected you'd say.",
        "The emergency costs what it costs. But watch what happens next — watch the 'well, I already spent money, so why not spend more?' That's not the emergency. That's the pattern.",
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-emergency_b',
      lines: [
        "Huh. You separated the emergency from the excuse.",
        "The Tower breaks things. But it doesn't break you unless you let it become a reason to stop trying.",
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-emergency_c',
      lines: [
        "You see it. The Tower isn't just the bill — it's the permission slip to give up.",
        "The emergency is real. The 'everything is ruined' feeling? That's the pattern talking.",
      ],
    },
    {
      type: 'narration',
      text: "The dust settles. The unexpected expense happened. It's Thursday evening and you feel shaken. The temptation isn't the emergency — it's the 'I deserve something nice after that' that follows it.",
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I need something nice. Today was awful.",
          branchId: 'comfort_a',
        },
        {
          id: 'b',
          label: "I'm going to sit with the discomfort. No spending.",
          branchId: 'comfort_b',
        },
        {
          id: 'c',
          label: "Moonbeams again — comfort spending after a crisis.",
          patternRequired: 'moonbeams',
          branchId: 'comfort_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-comfort_a',
      lines: [
        "\"I deserve something nice.\" The Sunshine pattern wearing the Tower's disguise.",
        "You do deserve nice things. But nice things aren't always things.",
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-comfort_b',
      lines: [
        "Sitting with discomfort. That's the hardest thing anyone does in this whole game.",
        "The Tower's real gift: you survived it. That's worth more than anything you could buy.",
      ],
    },
    {
      type: 'dialogue',
      character: 'tower',
      variant: 'after-comfort_c',
      lines: [
        "Crisis → comfort spending. You see the chain.",
        "Breaking the chain doesn't mean ignoring the crisis. It means refusing to let the crisis make your spending decisions.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "A hard day. You spent. That's data. What was the feeling between the crisis and the cart?",
      hermitQuestion: "What would 'taking care of yourself' look like if it didn't cost anything?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'emergency_a': { AMBROSIA_PULL: 1 },
    'emergency_b': { FRICTION: 1, AMBROSIA_OBSERVED: 1 },
    'emergency_c': { AMBROSIA_NAMED: 1 },
    'comfort_a':   { MOONBEAMS_PULL: 1 },
    'comfort_b':   { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'comfort_c':   { MOONBEAMS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What's the difference between a need and a 'need right now'?",
    friction: "What did sitting with the discomfort teach you?",
    pattern:  "How does the Tower change your relationship with the patterns?",
    mastery:  "You saw the chain: crisis → permission → spending. What breaks it?",
  },

  unlocks: {
    scenes: ['scene_w5_friday_paycheck'],
  },
};
