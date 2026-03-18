import type { Scene } from '../../types';

export const scene_m30_the_world: Scene = {
  id: 'scene_m30_the_world',
  questId: 'low_spend_month',
  day: 30,
  title: 'Day Thirty',
  timeLabel: '9:00pm',
  location: "The World Complete",
  characters: ['world', 'hermit'],
  patternTags: ['moonbeams', 'rainbows', 'ambrosia', 'stardust', 'sunshine', 'unicorns'],
  artKey: 'world_complete',

  beats: [
    {
      type: 'narration',
      text: "Day thirty. The Lunar Arch is complete. Not perfectly — that was never the goal. But completely. Thirty days of noticing, naming, and choosing. The World stands at the far end of the arch, steady and unsurprised. She knew you'd make it.",
    },
    {
      type: 'dialogue',
      character: 'world',
      lines: [
        "Thirty days.",
        "You did it. Not without slipping. Not without struggling. But you did it.",
      ],
    },
    {
      type: 'choices',
      choices: [
        {
          id: 'a',
          label: "I spent more than I wanted to. But I saw every single purchase.",
          branchId: 'final_a',
        },
        {
          id: 'b',
          label: "I found patterns I didn't know I had. Now I can't unsee them.",
          branchId: 'final_b',
        },
        {
          id: 'c',
          label: "I named them all. Moonbeams, Rainbows, Ambrosia. They're still here — but I'm not afraid of them.",
          patternRequired: 'moonbeams',
          branchId: 'final_c',
        },
      ],
    },
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-final_a',
      lines: [
        "Every purchase seen. That's the whole transformation.",
        "Thirty days of consciousness. The spending changed because you did.",
      ],
    },
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-final_b',
      lines: [
        "Can't unsee. That's permanent.",
        "The patterns were always there. Now you have names for them. Named things have less power.",
      ],
    },
    {
      type: 'dialogue',
      character: 'world',
      variant: 'after-final_c',
      lines: [
        "Not afraid. That's mastery.",
        "The patterns don't disappear. You just stop letting them drive.",
      ],
    },
    {
      type: 'narration',
      text: "The Hermit's journal is full. Thirty days of questions — some answered, some still open, all honest. The arch glows behind you, complete. Ahead, the world continues. Your spending is data. Not a verdict. And now you know how to read it.",
    },
    {
      type: 'dialogue',
      character: 'world',
      lines: [
        "Your spending is data. Not a verdict.",
        "The month is done. What you learned is yours to keep.",
        "Go well, Fool. You've earned the name.",
      ],
    },
    {
      type: 'hermit',
    },
  ],

  stateChanges: {
    'final_a': { MERCY_ACKNOWLEDGED: 1 },
    'final_b': { FRICTION: 1, PATTERN_MASTERY_MONTH: 1 },
    'final_c': { PATTERN_MASTERY_MONTH: 1 },
  },

  hermitQuestions: {
    pull:     "What will you carry from these thirty days into the next thirty?",
    friction: "What's the most important thing you learned about yourself?",
    pattern:  "Which pattern taught you the most? Why?",
    mastery:  "Thirty days later: who are you now that you weren't before?",
  },

  unlocks: {},
};
