import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChallengeData,
  saveDayEntry,
  PATTERNS,
  CATEGORIES,
  JOURNAL_PROMPTS,
  DAY_ENCOURAGEMENTS,
  DayEntry,
} from "@/lib/challenge-data";

interface Props {
  data: ChallengeData;
  onUpdate: () => void;
}

export default function AppHome({ data, onUpdate }: Props) {
  const today = data.days.find((d) => d.day === data.currentDay);
  const [showSpendForm, setShowSpendForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [pattern, setPattern] = useState("");
  const [note, setNote] = useState("");
  const [journalResponse, setJournalResponse] = useState(today?.journalResponse || "");
  const [logged, setLogged] = useState(!!today);

  const prompt = JOURNAL_PROMPTS[(data.currentDay - 1) % JOURNAL_PROMPTS.length];
  const encouragement = DAY_ENCOURAGEMENTS[(data.currentDay - 1) % DAY_ENCOURAGEMENTS.length];

  const handleNoSpend = () => {
    const entry: DayEntry = {
      day: data.currentDay,
      date: new Date().toISOString().split("T")[0],
      noSpend: true,
      spent: null,
      category: null,
      pattern: null,
      note: "",
    };
    saveDayEntry(entry);
    setLogged(true);
    onUpdate();
  };

  const handleLogSpend = () => {
    const entry: DayEntry = {
      day: data.currentDay,
      date: new Date().toISOString().split("T")[0],
      noSpend: false,
      spent: parseFloat(amount) || 0,
      category,
      pattern: pattern || null,
      note,
    };
    saveDayEntry(entry);
    setShowSpendForm(false);
    setLogged(true);
    onUpdate();
  };

  const handleSaveJournal = () => {
    const existing = data.days.find((d) => d.day === data.currentDay);
    if (existing) {
      saveDayEntry({ ...existing, journalResponse });
    } else {
      saveDayEntry({
        day: data.currentDay,
        date: new Date().toISOString().split("T")[0],
        noSpend: true,
        spent: null,
        category: null,
        pattern: null,
        note: "",
        journalResponse,
      });
    }
    onUpdate();
  };

  return (
    <div className="space-y-8">
      {/* Day Header */}
      <div className="text-center py-8">
        <p className="font-body text-sm text-muted-foreground mb-1">Today is</p>
        <h1 className="font-display text-6xl font-bold text-foreground">Day {data.currentDay}</h1>
      </div>

      {/* Check-in Buttons */}
      {!logged ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleNoSpend} className="btn-pill-secondary py-6 text-base flex flex-col items-center gap-1">
              <span className="text-2xl">✓</span>
              No Spend Day
            </button>
            <button
              onClick={() => setShowSpendForm(true)}
              className="btn-pill-accent py-6 text-base flex flex-col items-center gap-1"
            >
              <span className="text-2xl">💳</span>
              Spent Today
            </button>
          </div>

          <AnimatePresence>
            {showSpendForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="card-soft space-y-4"
              >
                <div>
                  <label className="font-body font-medium text-sm text-foreground block mb-1">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="font-body font-medium text-sm text-foreground block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body font-medium text-sm text-foreground block mb-1">Pattern</label>
                  <select
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Not sure yet</option>
                    {PATTERNS.map((p) => <option key={p.name} value={p.name}>{p.emoji} {p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body font-medium text-sm text-foreground block mb-1">What was happening before you spent?</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <button onClick={handleLogSpend} className="btn-pill-primary w-full">
                  Log It →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="card-soft text-center" style={{ background: "hsl(156 24% 86%)" }}>
          <p className="font-body font-medium text-foreground">✓ Day {data.currentDay} logged</p>
          <p className="font-body text-sm text-foreground">Come back tomorrow for your next check-in.</p>
        </div>
      )}

      {/* Journal Prompt */}
      <div className="card-soft">
        <p className="font-body font-medium text-sm text-primary mb-2">Today's Journal Prompt</p>
        <p className="font-display italic text-lg text-foreground mb-4">{prompt}</p>
        <textarea
          value={journalResponse}
          onChange={(e) => setJournalResponse(e.target.value)}
          rows={3}
          placeholder="Write your thoughts..."
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
        />
        <button onClick={handleSaveJournal} className="btn-pill-outline text-sm px-6 py-2">
          Save
        </button>
      </div>

      {/* Encouragement */}
      <div className="card-soft border-l-4" style={{ borderLeftColor: "hsl(var(--peach))" }}>
        <p className="font-body text-sm text-foreground leading-relaxed">{encouragement}</p>
      </div>
    </div>
  );
}
