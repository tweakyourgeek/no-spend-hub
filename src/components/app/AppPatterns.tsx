import { ChallengeData, getStats, PATTERNS } from "@/lib/challenge-data";

interface Props {
  data: ChallengeData;
}

export default function AppPatterns({ data }: Props) {
  const stats = getStats(data);
  const maxCount = Math.max(1, ...Object.values(stats.patternCounts));
  
  const topPattern = Object.entries(stats.patternCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-8">
      <div>
        <p className="section-label mb-2">My Patterns</p>
        <h2 className="font-display text-3xl font-semibold text-foreground">What's Running</h2>
      </div>

      <div className="space-y-4">
        {PATTERNS.map((p) => {
          const count = stats.patternCounts[p.name] || 0;
          const pct = (count / maxCount) * 100;
          return (
            <div key={p.name} className="card-soft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.emoji}</span>
                  <span className="font-body font-medium text-foreground">{p.name}</span>
                </div>
                <span className="font-body text-sm text-muted-foreground">{count} times</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: "hsl(var(--primary))" }}
                />
              </div>
              <p className="font-body text-xs text-muted-foreground mt-1">{p.description}</p>
            </div>
          );
        })}
      </div>

      {topPattern && (
        <div className="card-soft border-l-4" style={{ borderLeftColor: "hsl(var(--purple))" }}>
          <p className="font-body text-sm text-foreground leading-relaxed">
            <strong>{topPattern[0]}</strong> has shown up {topPattern[1]} time{topPattern[1] !== 1 ? "s" : ""}.
            No judgment — just useful to know.
          </p>
        </div>
      )}

      {Object.keys(stats.patternCounts).length === 0 && (
        <div className="card-soft text-center" style={{ background: "hsl(var(--sage-light))" }}>
          <p className="font-body text-sm text-muted-foreground">
            No patterns logged yet. They'll show up here as you track your days.
          </p>
        </div>
      )}
    </div>
  );
}
