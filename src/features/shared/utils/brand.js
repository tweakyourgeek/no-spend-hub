// Brand color utilities for No Spend Challenge apps

export const colors = {
  primary: '#3B3B58',
  accent: '#B375A0',
  secondary: '#A59880',
  background: '#F8F1F2',
  sage: '#7A9B7A',
  white: '#FFFFFF',
  text: '#3B3B58',
  textLight: '#6B6B78',
  success: '#7A9B7A',
};

export const fonts = {
  heading: "'Inter', 'Avenir', -apple-system, BlinkMacSystemFont, sans-serif",
  body: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  accent: "'Caveat', cursive",
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
};

export const shadows = {
  sm: '0 2px 4px rgba(59, 59, 88, 0.1)',
  md: '0 4px 12px rgba(59, 59, 88, 0.15)',
  lg: '0 8px 24px rgba(59, 59, 88, 0.2)',
};

// C3 Framework - Core philosophy across all No Spend Challenge apps
// This prevents "all-or-nothing deprivation" by offering three approaches
export const C3 = {
  CUT: {
    icon: '✂️',
    label: 'CUT',
    description: 'Reduce frequency or eliminate',
    color: colors.accent,
    examples: ['Skip daily coffee', 'Pack lunch instead', 'Reduce takeout', 'Cut impulse buys'],
  },
  CANCEL: {
    icon: '❌',
    label: 'CANCEL',
    description: 'Stop paying entirely',
    color: colors.primary,
    examples: ['Unused subscriptions', 'Gym membership', 'Premium upgrades', 'Auto-renewals'],
  },
  COMBINE: {
    icon: '🔗',
    label: 'COMBINE',
    description: 'Consolidate & share costs',
    color: colors.sage,
    examples: ['Family streaming plan', 'Carpool with neighbors', 'Bulk buying', 'Shared services'],
  },
};

// Helper function for formatting currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function for formatting currency with decimals
export const formatCurrencyPrecise = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Non-judgmental encouragement messages
export const encouragingMessages = [
  "You're doing great!",
  "Every small step counts",
  "Progress, not perfection",
  "You can't do this wrong",
  "Look at you making smart choices!",
  "Knowledge is power",
  "You're in control",
  "This isn't deprivation, it's empowerment",
  "Small changes, big impact",
];

export const getRandomEncouragement = () => {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
};

// C3-specific encouraging messages
export const c3Messages = {
  CUT: [
    "Cutting doesn't mean deprivation!",
    "You're making space for what matters",
    "Smart cuts, not sacrifices",
  ],
  CANCEL: [
    "Canceling unused services is empowering",
    "You're taking control of your money",
    "No judgment - just data!",
  ],
  COMBINE: [
    "Combining is collaboration!",
    "Sharing costs is smart living",
    "Community over consumption",
  ],
};

export const getC3Message = (type) => {
  const messages = c3Messages[type] || encouragingMessages;
  return messages[Math.floor(Math.random() * messages.length)];
};
