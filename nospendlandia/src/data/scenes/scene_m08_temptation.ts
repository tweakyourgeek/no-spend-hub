import type { Scene } from '../../types';

export const scene_m08_temptation: Scene = {
  id: 'scene_m08_temptation',
  questId: 'low_spend_month',
  day: 8,
  title: 'The Temptation',
  timeLabel: '9:45pm',
  location: "Devil's Late-Night Shop",
  characters: ['devil', 'hermit'],
  patternTags: ['ambrosia', 'moonbeams'],
  artKey: 'devils_late_shop',

  beats: [
    {
      type: 'narration',
      text: "Late night. The kids are asleep, or the roommates are out, or the house is just quiet. Your phone is warm in your hand. The glow of a shopping app. The Devil runs a late-night shop that never closes — it lives in your pocket.",
    },
    {
      type: 'dialogue',
      character: 'devil',
      lines: [
        "Ah, the late-night scroll. My busiest hours.",
        "Nobody's watching. Nobody will know. Just you and the cart.",
        "What are you looking at?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "Something I've been thinking about all week.", branchId: 'scroll_a' },
        { id: 'b', label: "I'm putting the phone down. Nothing good happens here.", branchId: 'scroll_b' },
        { id: 'c', label: "Ambrosia — the late-night impulse when my defenses are down.", patternRequired: 'ambrosia', branchId: 'scroll_c' },
      ],
    },
    {
      type: 'dialogue', character: 'devil', variant: 'after-scroll_a',
      lines: ["All week. The wanting has been building.", "Here's my trick: I make you think about it for days so by the time you buy, it feels 'considered.' It wasn't. It was just prolonged."],
    },
    {
      type: 'dialogue', character: 'devil', variant: 'after-scroll_b',
      lines: ["Phone down. My least favorite move.", "The glow fades. The wanting fades with it. Most things you want at 10pm you forget by morning."],
    },
    {
      type: 'dialogue', character: 'devil', variant: 'after-scroll_c',
      lines: ["Late-night Ambrosia. When you're tired and the filters are off.", "You see me clearly even in the dark. That's... inconvenient for me."],
    },
    {
      type: 'narration',
      text: "The night deepens. The cart still has items in it from last week — abandoned but not deleted. They sit there like unfinished sentences, waiting for you to complete the purchase.",
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I'll just buy the one thing. Clear the cart.", branchId: 'cart_a' },
        { id: 'b', label: "Empty the cart. All of it.", branchId: 'cart_b' },
        { id: 'c', label: "Moonbeams — the emotional comfort of 'completing' something.", patternRequired: 'moonbeams', branchId: 'cart_c' },
      ],
    },
    {
      type: 'dialogue', character: 'devil', variant: 'after-cart_a',
      lines: ["\"Just one thing.\" The most profitable sentence in retail.", "But alright. One thing. Notice how it feels tomorrow."],
    },
    {
      type: 'dialogue', character: 'devil', variant: 'after-cart_b',
      lines: ["Empty. All of it. That took something.", "The cart was designed to make emptying it feel like loss. You just proved it isn't."],
    },
    {
      type: 'dialogue', character: 'devil', variant: 'after-cart_c',
      lines: ["Completion as comfort. You see the trick.", "The cart isn't unfinished business. It's manufactured urgency pretending to be a task."],
    },
    {
      type: 'mercy',
      queenLine: "The late-night purchase. Everyone does it. What time was it, exactly?",
      hermitQuestion: "What were you avoiding by shopping?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'scroll_a': { AMBROSIA_PULL: 1 }, 'scroll_b': { FRICTION: 1, AMBROSIA_OBSERVED: 1 }, 'scroll_c': { AMBROSIA_NAMED: 1 },
    'cart_a': { MOONBEAMS_PULL: 1 }, 'cart_b': { FRICTION: 1, MOONBEAMS_OBSERVED: 1 }, 'cart_c': { MOONBEAMS_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "What happens to the wanting by morning?",
    friction: "What did you do instead of scrolling?",
    pattern: "Late-night patterns — why are they stronger?",
    mastery: "You emptied the cart. How did that feel at midnight? And at noon the next day?",
  },
  unlocks: { scenes: ['scene_m10_week_two'] },
};
