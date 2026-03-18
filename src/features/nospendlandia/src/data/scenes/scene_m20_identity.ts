import type { Scene } from '../../types';

export const scene_m20_identity: Scene = {
  id: 'scene_m20_identity',
  questId: 'low_spend_month',
  day: 20,
  title: 'The Identity Question',
  timeLabel: '8:30pm',
  location: "The Hermit's Depth",
  characters: ['hermit'],
  patternTags: ['unicorns', 'rainbows'],
  artKey: 'hermits_depth',

  beats: [
    {
      type: 'narration',
      text: "Day twenty. Ten days to go. The Hermit is in the deepest part of the cave — a place where the questions get personal. Not about what you buy, but about who you are when you stop buying. The identity question has been waiting.",
    },
    {
      type: 'dialogue',
      character: 'hermit',
      lines: [
        "Twenty days. Deep enough to ask the real question.",
        "Who are you without the spending?",
        "Not 'who should you be.' Who ARE you when the purchases stop?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I don't know. That's what scares me.", branchId: 'identity_a' },
        { id: 'b', label: "The same person. Just... more present.", branchId: 'identity_b' },
        { id: 'c', label: "The Unicorns showed me — I was buying an identity, not building one.", patternRequired: 'unicorns', branchId: 'identity_c' },
      ],
    },
    {
      type: 'dialogue', character: 'hermit', variant: 'after-identity_a',
      lines: ["Not knowing. That's the honest answer.", "Twenty days of removing the spending layer and finding out what's underneath. The not-knowing is the discovery."],
    },
    {
      type: 'dialogue', character: 'hermit', variant: 'after-identity_b',
      lines: ["More present. Less decorated. More real.", "The spending was noise. You're hearing the signal now."],
    },
    {
      type: 'dialogue', character: 'hermit', variant: 'after-identity_c',
      lines: ["Buying an identity. The Unicorn pattern laid bare.", "The identity you're building now — through twenty days of choice — that's not purchasable. That's earned."],
    },
    {
      type: 'narration',
      text: "The cave is quiet. Twenty days of questions sit in the journal. The patterns have names. The triggers have times. The identity question doesn't have an answer yet — and maybe it shouldn't.",
    },
    {
      type: 'dialogue',
      character: 'hermit',
      lines: [
        "Ten days left. The last ten are where everything you've learned gets tested at once.",
        "The patterns will try harder. Your eyes are sharper.",
        "Stay in the cave a little longer. Let the question sit.",
      ],
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'identity_a': { UNICORNS_PULL: 1 }, 'identity_b': { FRICTION: 1, UNICORNS_OBSERVED: 1 }, 'identity_c': { UNICORNS_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "Who do you perform for? What would they think if you stopped?",
    friction: "What did you find underneath the spending?",
    pattern: "Unicorns and Rainbows — how do identity and social pressure interact?",
    mastery: "Twenty days. The question isn't 'can I stop spending?' anymore. What's the new question?",
  },
  unlocks: { scenes: ['scene_m21_week_three'] },
};
