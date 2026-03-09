export interface DayEntry {
  day: number;
  date: string;
  noSpend: boolean;
  spent: number | null;
  category: string | null;
  pattern: string | null;
  note: string;
  journalPrompt?: string;
  journalResponse?: string;
}

export interface ChallengeData {
  challengeStartDate: string;
  currentDay: number;
  days: DayEntry[];
  baselineMonthlySpend: number;
}

const STORAGE_KEY = "nospend-challenge";
const STARTED_KEY = "nospend-started";

export const PATTERNS = [
  { name: "Rainbows", emoji: "🌈", description: "Chasing the next thing that will finally fix it" },
  { name: "Ambrosia", emoji: "🍑", description: "Spending to feel better right now" },
  { name: "Unicorns", emoji: "🦄", description: "Looking for the perfect version of what you already have" },
  { name: "Stardust", emoji: "✨", description: "Spending to feel seen or keep up" },
  { name: "Sunshine", emoji: "☀️", description: "Buying to avoid the hard thing" },
  { name: "Moonbeams", emoji: "🌙", description: "The slow drift of want without urgency" },
] as const;

export const CATEGORIES = [
  "Food", "Clothing", "Entertainment", "Household", "Personal Care", "Subscriptions", "Other"
] as const;

export const JOURNAL_PROMPTS: string[] = [
  "What made you reach for your wallet today? Or not?",
  "What did you notice about your energy when you didn't spend?",
  "Was there a moment today where you almost bought something? What happened right before?",
  "What's one thing you wanted today that you didn't buy? How do you feel about that now?",
  "If your spending today were a weather report, what would it say?",
  "What pattern showed up strongest today?",
  "What were you actually looking for when you thought about buying something?",
  "Describe your relationship with money today in three words.",
  "What did you do instead of spending?",
  "What surprised you about today?",
  "Is there something you keep almost buying? What's that about?",
  "What does 'enough' look like for you today?",
  "What emotion was driving the strongest urge today?",
  "If you could tell yesterday-you one thing about today, what would it be?",
  "What's the most interesting data point so far?",
  "What pattern are you starting to see clearly?",
  "What would change if you kept going for another 30 days?",
  "Name one thing this challenge has taught you that has nothing to do with money.",
  "What feels harder than you expected? What feels easier?",
  "If your spending patterns were a person, who would they be?",
  "What are you noticing about the gap between wanting and needing?",
  "Is there a purchase you're proud of this week? Why?",
  "What's one thing you've learned about yourself that you didn't know 3 weeks ago?",
  "What does your spending say about what you value?",
  "How has your internal conversation about money shifted?",
  "What would you tell someone just starting Day 1?",
  "What pattern caught you off guard this week?",
  "What's one thing you want to carry forward after Day 30?",
  "Describe how you feel right now about money. Just that.",
  "What does this challenge want you to know?",
];

export const DAY_ENCOURAGEMENTS: string[] = [
  "Day 1. You showed up. That's the whole assignment today.",
  "Day 2. The newness hasn't worn off yet. Enjoy that.",
  "Day 3. Three days in. You're collecting data now.",
  "Day 4. Notice what's already different about how you think before a purchase.",
  "Day 5. Five days is a pattern, not a streak. You're gathering information.",
  "Day 6. Almost a week. What have you noticed so far?",
  "Day 7. One week. You've already done more than most people ever try.",
  "Day 8. Week two is where the interesting stuff starts happening.",
  "Day 9. Resistance might be showing up. That's information, not failure.",
  "Day 10. Double digits. You're in it now.",
  "Day 11. What's the thing you keep almost buying?",
  "Day 12. The middle is messy. That's where the learning lives.",
  "Day 13. Lucky 13. What pattern keeps showing up?",
  "Day 14 is exactly where the friction usually shows up. That's not a coincidence.",
  "Day 15. Halfway. Breathe.",
  "Day 16. You're past the halfway point. What's the most surprising thing so far?",
  "Day 17. The novelty is gone. What remains is the real experiment.",
  "Day 18. What does 'enough' feel like today?",
  "Day 19. Almost three weeks of data. That's genuinely impressive.",
  "Day 20. Two-thirds done. Your patterns are becoming clearer.",
  "Day 21. Three full weeks. What do you know now that you didn't on Day 1?",
  "Day 22. The homestretch. But this was never about the finish line.",
  "Day 23. What would you keep doing even after this ends?",
  "Day 24. Six days left. What's the most useful thing you've learned?",
  "Day 25. You're not the same person who started this. (That's the point.)",
  "Day 26. Almost there. But 'there' was never a destination.",
  "Day 27. Three days left. What does this challenge want you to know?",
  "Day 28. The last week. Integration, not celebration.",
  "Day 29. Tomorrow is Day 30. Today, just be here.",
  "Day 30. You did it. Not perfectly. That was never the point.",
];

export function hasStartedChallenge(): boolean {
  return localStorage.getItem(STARTED_KEY) === "true";
}

export function startChallenge(): ChallengeData {
  const today = new Date().toISOString().split("T")[0];
  const data: ChallengeData = {
    challengeStartDate: today,
    currentDay: 1,
    days: [],
    baselineMonthlySpend: 2000,
  };
  localStorage.setItem(STARTED_KEY, "true");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function getChallengeData(): ChallengeData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const data: ChallengeData = JSON.parse(raw);
  
  // Auto-increment day based on date diff
  const start = new Date(data.challengeStartDate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  data.currentDay = Math.min(Math.max(diffDays, 1), 30);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  return data;
}

export function saveDayEntry(entry: DayEntry): void {
  const data = getChallengeData();
  if (!data) return;
  
  const existingIdx = data.days.findIndex(d => d.day === entry.day);
  if (existingIdx >= 0) {
    data.days[existingIdx] = entry;
  } else {
    data.days.push(entry);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStats(data: ChallengeData) {
  const noSpendDays = data.days.filter(d => d.noSpend).length;
  const totalSpent = data.days.reduce((sum, d) => sum + (d.spent || 0), 0);
  const freedUp = Math.max(0, (data.baselineMonthlySpend / 30) * data.currentDay - totalSpent);
  
  let currentStreak = 0;
  const sortedDays = [...data.days].sort((a, b) => b.day - a.day);
  for (const d of sortedDays) {
    if (d.noSpend) currentStreak++;
    else break;
  }
  
  let longestStreak = 0;
  let tempStreak = 0;
  const sortedAsc = [...data.days].sort((a, b) => a.day - b.day);
  for (const d of sortedAsc) {
    if (d.noSpend) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  const patternCounts: Record<string, number> = {};
  data.days.forEach(d => {
    if (d.pattern) {
      patternCounts[d.pattern] = (patternCounts[d.pattern] || 0) + 1;
    }
  });

  return {
    noSpendDays,
    totalSpent: Math.round(totalSpent * 100) / 100,
    freedUp: Math.round(freedUp * 100) / 100,
    currentStreak,
    longestStreak,
    patternCounts,
    daysCompleted: data.days.length,
  };
}
