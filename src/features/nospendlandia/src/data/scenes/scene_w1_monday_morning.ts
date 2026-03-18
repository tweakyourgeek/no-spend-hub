import type { Scene } from '../../types';

export const scene_w1_monday_morning: Scene = {
  id: 'scene_w1_monday_morning',
  questId: 'no_spend_week',
  day: 1,
  title: 'Monday Morning',
  timeLabel: '7:48am',
  location: "The Queen's Kitchen",
  characters: ['queen_of_pentacles', 'hermit'],
  patternTags: ['moonbeams', 'sunshine'],
  artKey: 'queens_kitchen',

  beats: [
    {
      type: 'narration',
      text: "Monday. The week stretches ahead like a road with no rest stops. You're making coffee — or thinking about buying one on the way to work. The Queen of Pentacles is already here, calm as always, hands wrapped around a mug she brought from home.",
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      lines: [
        "Good morning, Fool.",
        "A whole week. Seven days of noticing. Not seven days of perfection — seven days of paying attention.",
        "What's the first thing you'd usually spend on today?",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Coffee. I always buy coffee on Monday.",
          branchId: 'coffee_a',
        },
        {
          id: 'b',
          label: "Nothing yet. I'm going to make it through the morning.",
          branchId: 'coffee_b',
        },
        {
          id: 'c',
          label: "I see the Sunshine — rewarding myself for starting the week.",
          patternRequired: 'sunshine',
          branchId: 'coffee_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-coffee_a',
      lines: [
        "Monday coffee. The reward for surviving the alarm.",
        "What if Monday coffee wasn't a purchase? What if it was a ritual you made yourself?",
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-coffee_b',
      lines: [
        "Good. Not because spending is bad — because noticing is the whole point.",
        "Make it through the morning. That's enough for now.",
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-coffee_c',
      lines: [
        "You see it. The \"I deserve this\" loop.",
        "You do deserve good mornings. You just don't have to buy them.",
      ],
    },
    {
      type: 'narration',
      text: "The morning passes. Lunch comes. You're hungry and tired and someone suggests ordering in. The delivery app icon sits on your home screen like a little red promise.",
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "Order lunch. I'll start the challenge properly tomorrow.",
          branchId: 'lunch_a',
        },
        {
          id: 'b',
          label: "Eat what I have. It's fine.",
          branchId: 'lunch_b',
        },
        {
          id: 'c',
          label: "Moonbeams — comfort spending because the morning was hard.",
          patternRequired: 'moonbeams',
          branchId: 'lunch_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-lunch_a',
      lines: [
        "\"Tomorrow.\" That word has cost you more than any single purchase.",
        "But okay. Data, not a verdict.",
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-lunch_b',
      lines: [
        "It's fine. Those might be the two most powerful words in this whole challenge.",
        "\"It's fine\" means you don't need the upgrade. You just need enough.",
      ],
    },
    {
      type: 'dialogue',
      character: 'queen_of_pentacles',
      variant: 'after-lunch_c',
      lines: [
        "Named it. The hard morning became the excuse for spending.",
        "What if you comforted yourself without the app?",
      ],
    },
    {
      type: 'mercy',
      queenLine: "You ordered. That's data. What was the feeling between 'I'm hungry' and 'confirm order'?",
      hermitQuestion: "Was it hunger, or was it something else wearing hunger's clothes?",
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'coffee_a': { SUNSHINE_PULL: 1 },
    'coffee_b': { FRICTION: 1, SUNSHINE_OBSERVED: 1 },
    'coffee_c': { SUNSHINE_NAMED: 1 },
    'lunch_a':  { MOONBEAMS_PULL: 1 },
    'lunch_b':  { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'lunch_c':  { MOONBEAMS_NAMED: 1 },
  },

  hermitQuestions: {
    pull:     "What did Monday need from you that money couldn't provide?",
    friction: "How did it feel to say 'it's fine' and mean it?",
    pattern:  "When you name the pattern, does the urge shrink?",
    mastery:  "You're seeing Monday differently now. What shifted?",
  },

  unlocks: {
    scenes: ['scene_w2_tuesday_evening'],
  },
};
