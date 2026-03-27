import type { Scene } from '../../types';

export const scene_m03_first_test: Scene = {
  id: 'scene_m03_first_test',
  questId: 'low_spend_month',
  day: 3,
  title: 'The First Test',
  timeLabel: '12:30pm',
  location: "The Moon's Market",
  characters: ['moon', 'hermit'],
  patternTags: ['moonbeams', 'ambrosia'],
  artKey: 'moons_market',

  beats: [
    {
      type: 'narration',
      text: "Day three. The excitement of starting has faded. Lunch hour. You're walking past shops you normally don't notice and today every window display feels personal. The Moon is sitting on a bench, scrolling through something that looks like your wish list.",
    },
    {
      type: 'dialogue',
      character: 'moon',
      lines: [
        "Day three already. The honeymoon's over.",
        "This is when the autopilot kicks in. You've been spending without thinking for so long that not-spending requires constant attention.",
        "How's the attention holding up?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I almost bought something without realizing it.", branchId: 'auto_a' },
        { id: 'b', label: "I caught myself three times today. Each time I stopped.", branchId: 'auto_b' },
        { id: 'c', label: "Ambrosia — the impulse to buy happens before I even think.", patternRequired: 'ambrosia', branchId: 'auto_c' },
      ],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-auto_a',
      lines: ["\"Almost\" is important. The autopilot engaged, but you noticed.", "That gap between impulse and action — that's the whole game."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-auto_b',
      lines: ["Three catches. Three moments of consciousness.", "That's not deprivation. That's skill."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-auto_c',
      lines: ["Before thinking. Yes.", "Ambrosia works below consciousness. Naming it brings it up where you can see it."],
    },
    {
      type: 'narration',
      text: "The afternoon drags. Your phone buzzes — a friend wants to grab coffee. The social spending feels different from the impulse spending. It's wrapped in connection, in belonging, in 'this is what people do.'",
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I'll go. It's not about the coffee, it's about the friend.", branchId: 'social_a' },
        { id: 'b', label: "I'll suggest a walk instead. Same friend, no receipt.", branchId: 'social_b' },
        { id: 'c', label: "Moonbeams — using friendship as a spending excuse.", patternRequired: 'moonbeams', branchId: 'social_c' },
      ],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-social_a',
      lines: ["Connection over coffee. Fair.", "But notice: did you choose the friend, or did you choose the purchase?"],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-social_b',
      lines: ["A walk. Same connection, zero cost.", "The friend didn't change. Only the setting did."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-social_c',
      lines: ["Friendship as a spending wrapper. Sharp eyes.", "The friendship is real. The 'I have to spend to participate' is not."],
    },
    {
      type: 'mercy',
      queenLine: "You went for coffee. The connection was real. What was the spending about?",
      hermitQuestion: "Can you separate the friend from the transaction?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'auto_a': { AMBROSIA_PULL: 1 }, 'auto_b': { FRICTION: 1, AMBROSIA_OBSERVED: 1 }, 'auto_c': { AMBROSIA_NAMED: 1 },
    'social_a': { MOONBEAMS_PULL: 1 }, 'social_b': { FRICTION: 1, MOONBEAMS_OBSERVED: 1 }, 'social_c': { MOONBEAMS_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What relationships in your life involve spending? Which don't?",
    friction: "How did it feel to suggest a free alternative?",
    pattern: "When you name the autopilot, does it slow down?",
    mastery: "Three days in. What surprised you most?",
  },
  unlocks: { scenes: ['scene_m05_first_weekend'] },
};
