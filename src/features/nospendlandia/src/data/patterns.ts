import type { ChasingPattern } from '../types';

export const chasingPatterns: Record<string, ChasingPattern> = {
  'comfort-spending': {
    id: 'comfort-spending',
    name: 'The Comfort Spiral',
    description: 'Spending to soothe difficult emotions — stress, boredom, loneliness. The purchase feels warm for a moment, then hollow.',
    icon: '🌀',
    advice: 'Pause before buying. Name the feeling. Ask: what do I actually need right now?',
  },
  'social-pressure': {
    id: 'social-pressure',
    name: 'The Mirror of Others',
    description: 'Buying to keep up, fit in, or match what you see others doing. The cost of belonging that nobody asked you to pay.',
    icon: '🪞',
    advice: 'Your worth isn\'t measured by what you own. Real friends don\'t keep a receipt.',
  },
  'impulse-rush': {
    id: 'impulse-rush',
    name: 'The Lightning Strike',
    description: 'The thrill of the spontaneous buy. It\'s the dopamine of "yes" before the thought of "why."',
    icon: '⚡',
    advice: 'Add it to a list instead of a cart. If you still want it in 48 hours, it\'s real.',
  },
  'subscription-creep': {
    id: 'subscription-creep',
    name: 'The Quiet Drain',
    description: 'Small recurring charges that each seem harmless. Together, they\'re a river flowing out unseen.',
    icon: '💧',
    advice: 'Audit every subscription today. Cancel what you haven\'t used in 30 days.',
  },
  'reward-spending': {
    id: 'reward-spending',
    name: 'The Golden Carrot',
    description: '"I earned this." "I deserve a treat." The reward loop where spending becomes the prize for surviving.',
    icon: '🥕',
    advice: 'You do deserve good things. But the best rewards are free — rest, nature, connection.',
  },
  'identity-spending': {
    id: 'identity-spending',
    name: 'The Mask Market',
    description: 'Buying to become who you think you should be. The aspirational self is expensive to maintain.',
    icon: '🎭',
    advice: 'Who are you without the stuff? That person is still whole.',
  },
};

export const patternIds = Object.keys(chasingPatterns);
