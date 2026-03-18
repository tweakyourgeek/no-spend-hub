/**
 * Integration with the main No Spend Hub app's localStorage data.
 * The main app stores challenge data in localStorage via src/lib/challenge-data.ts.
 * This module reads that data (if available) to enhance the RPG experience.
 */

interface ChallengeDay {
  date: string;
  noSpend: boolean;
  amount?: number;
  category?: string;
  note?: string;
}

interface ChallengeData {
  startDate?: string;
  days?: ChallengeDay[];
  streak?: number;
}

const MAIN_APP_KEY = 'no-spend-challenge';

/** Try to load spending data from the main app's localStorage */
export function loadSpendingData(): ChallengeData | null {
  try {
    const raw = localStorage.getItem(MAIN_APP_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Main app data not available — that's fine
  }
  return null;
}

/** Compute stats from the main app's data */
export function getSpendingStats(): {
  totalDays: number;
  noSpendDays: number;
  spendDays: number;
  currentStreak: number;
  topCategories: string[];
} | null {
  const data = loadSpendingData();
  if (!data?.days?.length) return null;

  const noSpendDays = data.days.filter(d => d.noSpend).length;
  const spendDays = data.days.filter(d => !d.noSpend).length;

  // Count categories
  const catCounts: Record<string, number> = {};
  for (const day of data.days) {
    if (day.category) {
      catCounts[day.category] = (catCounts[day.category] || 0) + 1;
    }
  }
  const topCategories = Object.entries(catCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat]) => cat);

  // Current streak
  let streak = 0;
  const sorted = [...data.days].sort((a, b) => b.date.localeCompare(a.date));
  for (const day of sorted) {
    if (day.noSpend) streak++;
    else break;
  }

  return {
    totalDays: data.days.length,
    noSpendDays,
    spendDays,
    currentStreak: data.streak ?? streak,
    topCategories,
  };
}

/** Suggest chasing patterns based on spending data */
export function suggestPatterns(): string[] {
  const stats = getSpendingStats();
  if (!stats) return [];

  const suggestions: string[] = [];

  // If lots of spend days relative to no-spend, suggest comfort spending
  if (stats.spendDays > stats.noSpendDays) {
    suggestions.push('comfort-spending');
  }

  // Category-based suggestions
  const cats = stats.topCategories.map(c => c.toLowerCase());
  if (cats.some(c => c.includes('food') || c.includes('delivery') || c.includes('eat'))) {
    suggestions.push('comfort-spending');
  }
  if (cats.some(c => c.includes('subscription') || c.includes('recurring'))) {
    suggestions.push('subscription-creep');
  }
  if (cats.some(c => c.includes('cloth') || c.includes('shop') || c.includes('fashion'))) {
    suggestions.push('identity-spending');
  }
  if (cats.some(c => c.includes('social') || c.includes('drink') || c.includes('bar'))) {
    suggestions.push('social-pressure');
  }

  // Short streaks suggest impulse issues
  if (stats.currentStreak < 3 && stats.totalDays > 5) {
    suggestions.push('impulse-rush');
  }

  return [...new Set(suggestions)];
}
