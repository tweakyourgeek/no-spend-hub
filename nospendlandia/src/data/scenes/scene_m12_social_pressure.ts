import type { Scene } from '../../types';

export const scene_m12_social_pressure: Scene = {
  id: 'scene_m12_social_pressure',
  questId: 'low_spend_month',
  day: 12,
  title: 'Social Pressure',
  timeLabel: '6:00pm',
  location: "The Rainbows' Hall",
  characters: ['moon', 'hermit'],
  patternTags: ['rainbows', 'unicorns'],
  artKey: 'rainbows_hall',

  beats: [
    {
      type: 'narration',
      text: "Day twelve. A group dinner invite. A birthday party. A \"let's split the bill evenly\" situation where you ordered the cheapest thing. The social world doesn't pause for your challenge. The Rainbows' Hall is every restaurant, every bar, every social occasion that costs money to attend.",
    },
    {
      type: 'dialogue',
      character: 'moon',
      lines: [
        "The social squeeze. Day twelve is when it usually hits.",
        "You can't tell your friends you're on a spending challenge. Or can you?",
        "What's scarier — spending the money, or having the conversation?",
      ],
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "I'll just go and spend. It's easier than explaining.", branchId: 'social_a' },
        { id: 'b', label: "I told them. It was awkward, but honest.", branchId: 'social_b' },
        { id: 'c', label: "Rainbows — spending to avoid social discomfort.", patternRequired: 'rainbows', branchId: 'social_c' },
      ],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-social_a',
      lines: ["Easier. That word costs a lot.", "The money wasn't the price. The silence about what you're trying to do — that was the real cost."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-social_b',
      lines: ["You told them. And the world didn't end.", "Most people are more understanding than the version of them in your head."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-social_c',
      lines: ["Social discomfort as a spending trigger. Clear-eyed.", "The discomfort is temporary. The pattern, unchecked, is permanent."],
    },
    {
      type: 'narration',
      text: "After the event, you scroll social media. Everyone posting their best life, their purchases, their \"treating myself\" moments. The comparison engine runs hot.",
    },
    {
      type: 'choices',
      choices: [
        { id: 'a', label: "Everyone else seems fine spending normally. Maybe I'm overthinking this.", branchId: 'compare_a' },
        { id: 'b', label: "Their feed isn't their reality. I'm working on mine.", branchId: 'compare_b' },
        { id: 'c', label: "Unicorns — comparing my inside to their outside.", patternRequired: 'unicorns', branchId: 'compare_c' },
      ],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-compare_a',
      lines: ["\"Normal\" spending is what got most people into debt.", "You're not overthinking. You're finally thinking."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-compare_b',
      lines: ["Their feed, your reality. Different documents.", "You're building something nobody posts about because it doesn't look impressive. It is impressive."],
    },
    {
      type: 'dialogue', character: 'moon', variant: 'after-compare_c',
      lines: ["Inside versus outside. The oldest Unicorn trick.", "Nobody posts their anxiety about money. You're seeing a highlight reel, not a balance sheet."],
    },
    {
      type: 'mercy',
      queenLine: "Social spending happened. That's the hardest kind to resist because it's wrapped in belonging.",
      hermitQuestion: "What would your friendships look like if they never involved money?",
    },
    { type: 'hermit' },
  ],

  stateChanges: {
    'social_a': { RAINBOWS_PULL: 1 }, 'social_b': { FRICTION: 1, RAINBOWS_OBSERVED: 1 }, 'social_c': { RAINBOWS_NAMED: 1 },
    'compare_a': { UNICORNS_PULL: 1 }, 'compare_b': { FRICTION: 1, UNICORNS_OBSERVED: 1 }, 'compare_c': { UNICORNS_NAMED: 1 },
  },
  hermitQuestions: {
    pull: "Which relationships involve the most spending? Are they the most meaningful?",
    friction: "How did it feel to be honest about the challenge?",
    pattern: "Social patterns and identity patterns — how do they feed each other?",
    mastery: "You see the social spending clearly. What boundary would serve you?",
  },
  unlocks: { scenes: ['scene_m15_halfway'] },
};
