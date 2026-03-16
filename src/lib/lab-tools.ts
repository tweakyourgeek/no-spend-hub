export type ToolTier = "free" | "email" | "login";

export interface LabTool {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  tier: ToolTier;
  featureDir: string;
}

export const LAB_TOOLS: LabTool[] = [
  // ── Free tier (no login) ──────────────────────────────
  {
    slug: "pattern-quiz",
    name: "Spending Patterns Quiz",
    description: "18 questions. Find out which spending patterns are running you. Takes about 4 minutes.",
    emoji: "🎯",
    tier: "free",
    featureDir: "pattern-quiz",
  },
  {
    slug: "impulse-brake",
    name: "Impulse Brake",
    description: "7-question reality check before you buy. The 48-hour rule, automated.",
    emoji: "🛑",
    tier: "free",
    featureDir: "impulse-brake",
  },

  // ── Email-gated tier ──────────────────────────────────
  {
    slug: "subscription-audit",
    name: "Subscription Audit",
    description: "Quick audit to find subscriptions you forgot you were paying for.",
    emoji: "🔍",
    tier: "email",
    featureDir: "subscription-audit",
  },
  {
    slug: "c3-guide",
    name: "C3 Implementation Guide",
    description: "Step-by-step Cut, Cancel, Combine framework with savings projections.",
    emoji: "✂️",
    tier: "email",
    featureDir: "c3-single-action",
  },

  // ── Login-required tier ───────────────────────────────
  {
    slug: "trigger-quiz",
    name: "Trigger Quiz",
    description: "Identify the triggers behind your spending patterns and learn your response profile.",
    emoji: "⚡",
    tier: "login",
    featureDir: "trigger-quiz",
  },
  {
    slug: "activity-generator",
    name: "Activity Generator",
    description: "Zero-cost activity suggestions based on your mood, energy, and available time.",
    emoji: "🎲",
    tier: "login",
    featureDir: "activity-generator",
  },
  {
    slug: "comfort-menu",
    name: "Comfort Menu",
    description: "Build your personal list of non-spending ways to cope when urges hit.",
    emoji: "🧘",
    tier: "login",
    featureDir: "comfort-menu",
  },
  {
    slug: "journal",
    name: "30-Day Journal",
    description: "Daily reflection prompts designed around pattern recognition, not guilt.",
    emoji: "📓",
    tier: "login",
    featureDir: "journal-30day",
  },
  {
    slug: "challenge-roadmap",
    name: "Challenge Roadmap",
    description: "Interactive 30-day guide with weekly themes, workbook sections, and journaling prompts.",
    emoji: "🗺️",
    tier: "login",
    featureDir: "challenge-roadmap",
  },
  {
    slug: "commitment-builder",
    name: "Commitment Builder",
    description: "Create a visual anchor pledge with your pillars, reflections, and downloadable card.",
    emoji: "📜",
    tier: "login",
    featureDir: "commitment-builder",
  },
  {
    slug: "four-lenses",
    name: "Four Lenses Diagnostic",
    description: "Being, Feeling, Acting, Showing Up — find where your spending disconnect lives.",
    emoji: "🔮",
    tier: "login",
    featureDir: "four-lenses-diagnostic",
  },
  {
    slug: "expense-log",
    name: "Expense Log",
    description: "Customizable household expense tracker with tone options from sensible to irreverent.",
    emoji: "📊",
    tier: "login",
    featureDir: "expense-log",
  },
  {
    slug: "subscription-analyzer",
    name: "Subscription Analyzer",
    description: "Full subscription tracking with C3 recommendations, renewal calendar, and savings tips.",
    emoji: "📋",
    tier: "login",
    featureDir: "subscription-analyzer",
  },
  {
    slug: "savings-calculator",
    name: "C3 Savings Calculator",
    description: "Model Cut/Cancel/Combine scenarios and project your monthly and annual savings.",
    emoji: "💰",
    tier: "login",
    featureDir: "savings-calculator",
  },
  {
    slug: "marketing-decoder",
    name: "Marketing Decoder",
    description: "Paste sales copy to spot urgency tricks, FOMO, social proof, and other tactics.",
    emoji: "🕵️",
    tier: "login",
    featureDir: "marketing-decoder",
  },
  {
    slug: "digital-declutter",
    name: "Digital Declutter",
    description: "Interactive checklist for cleaning up subscriptions, apps, tabs, and digital noise.",
    emoji: "🧹",
    tier: "login",
    featureDir: "digital-declutter",
  },
  {
    slug: "meal-planner",
    name: "Meal Planner",
    description: "18+ budget-friendly recipes filtered by time, effort, and what you have on hand.",
    emoji: "🍳",
    tier: "login",
    featureDir: "meal-planner",
  },
  {
    slug: "decision-matrix",
    name: "Decision Matrix",
    description: "Weighted comparison tool for evaluating options against your own criteria.",
    emoji: "⚖️",
    tier: "login",
    featureDir: "decision-matrix",
  },
  {
    slug: "crisis-helper",
    name: "Crisis Helper",
    description: "Guided support for when you're stuck, frustrated, or don't know where to start.",
    emoji: "🆘",
    tier: "login",
    featureDir: "crisis-helper",
  },
  {
    slug: "rumination-interrupter",
    name: "Rumination Interrupter",
    description: "Break the 'should have / what if' loop. Redirect or accept past spending decisions.",
    emoji: "🔄",
    tier: "login",
    featureDir: "rumination-interrupter",
  },
  {
    slug: "lab-loop-tracker",
    name: "Lab Loop Tracker",
    description: "Track your Chasing → Shadow → Getting → Releasing cycle with guided reflections.",
    emoji: "🔁",
    tier: "login",
    featureDir: "lab-loop-tracker",
  },
];
