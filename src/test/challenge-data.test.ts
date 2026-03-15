import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  startChallenge,
  getChallengeData,
  saveDayEntry,
  getStats,
  PATTERNS,
  CATEGORIES,
  JOURNAL_PROMPTS,
  DAY_ENCOURAGEMENTS,
  type ChallengeData,
  type DayEntry,
} from "@/lib/challenge-data";

// Mock localStorage
const store: Record<string, string> = {};
beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
  });
});

// ── Constants ──

describe("constants", () => {
  it("has 30 journal prompts (one per day)", () => {
    expect(JOURNAL_PROMPTS).toHaveLength(30);
  });

  it("has 30 day encouragements (one per day)", () => {
    expect(DAY_ENCOURAGEMENTS).toHaveLength(30);
  });

  it("has 6 spending patterns", () => {
    expect(PATTERNS).toHaveLength(6);
    PATTERNS.forEach((p) => {
      expect(p.name).toBeTruthy();
      expect(p.emoji).toBeTruthy();
      expect(p.description).toBeTruthy();
    });
  });

  it("has spending categories", () => {
    expect(CATEGORIES.length).toBeGreaterThanOrEqual(5);
    expect(CATEGORIES).toContain("Food");
    expect(CATEGORIES).toContain("Subscriptions");
  });
});

// ── startChallenge ──

describe("startChallenge", () => {
  it("initializes challenge data with today's date", () => {
    const data = startChallenge();
    const today = new Date().toISOString().split("T")[0];
    expect(data.challengeStartDate).toBe(today);
    expect(data.currentDay).toBe(1);
    expect(data.days).toEqual([]);
    expect(data.baselineMonthlySpend).toBe(2000);
  });

  it("persists to localStorage", () => {
    startChallenge();
    expect(store["nospend-started"]).toBe("true");
    expect(store["nospend-challenge"]).toBeTruthy();
    const parsed = JSON.parse(store["nospend-challenge"]);
    expect(parsed.currentDay).toBe(1);
  });
});

// ── getChallengeData ──

describe("getChallengeData", () => {
  it("returns null when no challenge started", () => {
    expect(getChallengeData()).toBeNull();
  });

  it("returns stored data", () => {
    startChallenge();
    const data = getChallengeData();
    expect(data).not.toBeNull();
    expect(data!.currentDay).toBeGreaterThanOrEqual(1);
  });

  it("clamps currentDay to 1-30 range", () => {
    const futureData: ChallengeData = {
      challengeStartDate: "2020-01-01",
      currentDay: 1,
      days: [],
      baselineMonthlySpend: 2000,
    };
    store["nospend-challenge"] = JSON.stringify(futureData);
    const data = getChallengeData();
    expect(data!.currentDay).toBe(30); // clamped to max 30
  });
});

// ── saveDayEntry ──

describe("saveDayEntry", () => {
  it("adds a new entry", () => {
    startChallenge();
    const entry: DayEntry = {
      day: 1,
      date: "2026-03-15",
      noSpend: true,
      spent: null,
      category: null,
      pattern: null,
      note: "First day!",
    };
    saveDayEntry(entry);
    const data = getChallengeData();
    expect(data!.days).toHaveLength(1);
    expect(data!.days[0].noSpend).toBe(true);
  });

  it("updates an existing entry for the same day", () => {
    startChallenge();
    saveDayEntry({ day: 1, date: "2026-03-15", noSpend: true, spent: null, category: null, pattern: null, note: "" });
    saveDayEntry({ day: 1, date: "2026-03-15", noSpend: false, spent: 25, category: "Food", pattern: "Ambrosia", note: "Lunch out" });
    const data = getChallengeData();
    expect(data!.days).toHaveLength(1);
    expect(data!.days[0].noSpend).toBe(false);
    expect(data!.days[0].spent).toBe(25);
  });
});

// ── getStats ──

describe("getStats", () => {
  function makeDays(specs: Array<{ day: number; noSpend: boolean; spent: number | null; pattern?: string }>): DayEntry[] {
    return specs.map((s) => ({
      day: s.day,
      date: `2026-03-${String(s.day).padStart(2, "0")}`,
      noSpend: s.noSpend,
      spent: s.spent,
      category: null,
      pattern: s.pattern ?? null,
      note: "",
    }));
  }

  it("returns zeros for empty challenge", () => {
    const data: ChallengeData = {
      challengeStartDate: "2026-03-15",
      currentDay: 1,
      days: [],
      baselineMonthlySpend: 3000,
    };
    const stats = getStats(data);
    expect(stats.noSpendDays).toBe(0);
    expect(stats.totalSpent).toBe(0);
    expect(stats.currentStreak).toBe(0);
    expect(stats.longestStreak).toBe(0);
    expect(stats.daysCompleted).toBe(0);
  });

  it("counts no-spend days correctly", () => {
    const data: ChallengeData = {
      challengeStartDate: "2026-03-01",
      currentDay: 5,
      days: makeDays([
        { day: 1, noSpend: true, spent: null },
        { day: 2, noSpend: false, spent: 50 },
        { day: 3, noSpend: true, spent: null },
        { day: 4, noSpend: true, spent: null },
        { day: 5, noSpend: false, spent: 30 },
      ]),
      baselineMonthlySpend: 3000,
    };
    const stats = getStats(data);
    expect(stats.noSpendDays).toBe(3);
    expect(stats.totalSpent).toBe(80);
    expect(stats.daysCompleted).toBe(5);
  });

  it("calculates current streak from most recent days", () => {
    const data: ChallengeData = {
      challengeStartDate: "2026-03-01",
      currentDay: 5,
      days: makeDays([
        { day: 1, noSpend: false, spent: 10 },
        { day: 2, noSpend: false, spent: 20 },
        { day: 3, noSpend: true, spent: null },
        { day: 4, noSpend: true, spent: null },
        { day: 5, noSpend: true, spent: null },
      ]),
      baselineMonthlySpend: 2000,
    };
    const stats = getStats(data);
    expect(stats.currentStreak).toBe(3);
  });

  it("calculates longest streak across all days", () => {
    const data: ChallengeData = {
      challengeStartDate: "2026-03-01",
      currentDay: 7,
      days: makeDays([
        { day: 1, noSpend: true, spent: null },
        { day: 2, noSpend: true, spent: null },
        { day: 3, noSpend: true, spent: null },
        { day: 4, noSpend: true, spent: null },
        { day: 5, noSpend: false, spent: 50 },
        { day: 6, noSpend: true, spent: null },
        { day: 7, noSpend: true, spent: null },
      ]),
      baselineMonthlySpend: 2000,
    };
    const stats = getStats(data);
    expect(stats.longestStreak).toBe(4); // days 1-4
    expect(stats.currentStreak).toBe(2); // days 6-7
  });

  it("calculates freed-up money correctly", () => {
    const data: ChallengeData = {
      challengeStartDate: "2026-03-01",
      currentDay: 10,
      days: makeDays([
        { day: 1, noSpend: false, spent: 20 },
        { day: 2, noSpend: false, spent: 30 },
      ]),
      baselineMonthlySpend: 3000, // $100/day baseline
    };
    const stats = getStats(data);
    // Expected baseline for 10 days: (3000/30)*10 = 1000. Spent: 50. Freed: 950.
    expect(stats.freedUp).toBe(950);
  });

  it("tracks pattern counts", () => {
    const data: ChallengeData = {
      challengeStartDate: "2026-03-01",
      currentDay: 4,
      days: makeDays([
        { day: 1, noSpend: false, spent: 10, pattern: "Ambrosia" },
        { day: 2, noSpend: false, spent: 20, pattern: "Rainbows" },
        { day: 3, noSpend: false, spent: 15, pattern: "Ambrosia" },
        { day: 4, noSpend: true, spent: null },
      ]),
      baselineMonthlySpend: 2000,
    };
    const stats = getStats(data);
    expect(stats.patternCounts["Ambrosia"]).toBe(2);
    expect(stats.patternCounts["Rainbows"]).toBe(1);
  });

  it("rounds totalSpent to 2 decimal places", () => {
    const data: ChallengeData = {
      challengeStartDate: "2026-03-01",
      currentDay: 2,
      days: makeDays([
        { day: 1, noSpend: false, spent: 10.333 },
        { day: 2, noSpend: false, spent: 20.666 },
      ]),
      baselineMonthlySpend: 2000,
    };
    const stats = getStats(data);
    expect(stats.totalSpent).toBe(31); // 30.999 rounded to 2 decimal = 31.00
  });
});
