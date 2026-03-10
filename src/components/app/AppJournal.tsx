import { ChallengeData } from "@/lib/challenge-data";

interface Props {
  data: ChallengeData;
}

export default function AppJournal({ data }: Props) {
  const sortedDays = [...data.days].sort((a, b) => b.day - a.day);

  return (
    <div className="space-y-8">
      <div>
        <p className="section-label mb-2">Journal</p>
        <h2 className="font-display text-3xl font-semibold text-foreground">Your Log</h2>
      </div>

      {sortedDays.length === 0 ? (
        <div className="card-soft text-center" style={{ background: "hsl(156 24% 86%)" }}>
          <p className="font-body text-sm text-muted-foreground">
            Nothing here yet. Complete your first check-in to start your journal.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDays.map((entry) => (
            <div key={entry.day} className="card-soft">
              <div className="flex items-center justify-between mb-2">
                <p className="font-display text-lg font-semibold text-foreground">Day {entry.day}</p>
                <p className="font-body text-xs text-muted-foreground">{entry.date}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {entry.noSpend ? (
                  <span className="chip-sage">✓ No Spend</span>
                ) : (
                  <>
                    <span className="chip-peach">${entry.spent}</span>
                    {entry.category && <span className="chip-purple">{entry.category}</span>}
                  </>
                )}
                {entry.pattern && (
                  <span className="chip-purple">{entry.pattern}</span>
                )}
              </div>
              {entry.note && (
                <p className="font-body text-sm text-muted-foreground">{entry.note}</p>
              )}
              {entry.journalResponse && (
                <p className="font-body text-sm text-foreground mt-2 italic">{entry.journalResponse}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
