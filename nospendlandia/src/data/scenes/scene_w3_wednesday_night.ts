import type { Scene } from '../../types';

export const scene_w3_wednesday_night: Scene = {
  id: 'scene_w3_wednesday_night',
  questId: 'no_spend_week',
  day: 3,
  title: 'Wednesday Night',
  timeLabel: '9:15pm',
  location: "The Hermit's Cave",
  characters: ['hermit'],
  patternTags: ['moonbeams'],
  artKey: 'hermits_cave',

  beats: [
    {
      type: 'narration',
      text: "Midweek. The hump. Everything feels harder on Wednesday — the challenge, the job, the effort of not buying things to make the feelings stop. You find yourself in a quiet place. The Hermit has been waiting.",
    },
    {
      type: 'dialogue',
      character: 'hermit',
      lines: [
        "...you came to the quiet place.",
        "Most people avoid silence. Silence is where the spending urges live — without distractions, they get loud.",
        "What's loudest right now?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I want to buy something. Anything. Just to feel different.",
          branchId: 'urge_a',
        },
        {
          id: 'b',
          label: "I'm tired. Not of spending — of resisting.",
          branchId: 'urge_b',
        },
        {
          id: 'c',
          label: "Moonbeams. The urge to spend when I'm emotionally drained.",
          patternRequired: 'moonbeams',
          branchId: 'urge_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'hermit',
      variant: 'after-urge_a',
      lines: [
        "\"Just to feel different.\" That's the most honest thing anyone has said in this cave.",
        "The purchase isn't the point. The feeling-different is. What if you could feel different without spending?",
      ],
    },
    {
      type: 'dialogue',
      character: 'hermit',
      variant: 'after-urge_b',
      lines: [
        "Tired of resisting. Yes.",
        "Here's the Hermit's secret: you don't have to resist. You just have to notice. Resistance is exhausting. Noticing is free.",
      ],
    },
    {
      type: 'dialogue',
      character: 'hermit',
      variant: 'after-urge_c',
      lines: [
        "You named it. Moonbeams — spending to fill the empty.",
        "The empty doesn't get filled by things. It gets filled by presence. You're present right now.",
      ],
    },
    {
      type: 'narration',
      text: "The cave is quiet. No notifications. No sale alerts. Just you and the question of what you actually need versus what you've been trained to want. Wednesday night stretches out, unhurried, asking nothing of your wallet.",
    },
    {
      type: 'dialogue',
      character: 'hermit',
      lines: [
        "Three days in. You've already learned more about yourself than most people learn in a month of budgeting.",
        "The second half of the week is where it gets interesting. The patterns you've seen — they'll try harder.",
        "But now you have names for them. And named things have less power.",
      ],
    },
    {
      type: 'mercy',
      queenLine: "Midweek is hard. You're still here. What kept you going?",
      hermitQuestion: "What would you tell yourself on Monday, knowing what you know now?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'urge_a': { MOONBEAMS_PULL: 1 },
    'urge_b': { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'urge_c': { MOONBEAMS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What does 'feeling different' actually look like for you — without money involved?",
    friction: "What's the difference between resisting and noticing?",
    pattern:  "You're halfway through. What pattern has taught you the most?",
    mastery:  "The names are coming easier. What does that tell you?",
  },

  unlocks: {
    scenes: ['scene_w4_thursday_surprise'],
  },
};
