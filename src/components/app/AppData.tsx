import { ChallengeData, getStats } from "@/lib/challenge-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: ChallengeData;
}

export default function AppData({ data }: Props) {
  const stats = getStats(data);
  const progressPct = Math.round((stats.daysCompleted / 30) * 100);

  const chartData = data.days
    .filter((d) => !d.noSpend && d.spent)
    .map((d) => ({ day: `Day ${d.day}`, amount: d.spent }));

  return (
    <div className="space-y-8">
      <div>
        <p className="section-label mb-2">My Data</p>
        <h2 className="font-display text-3xl font-semibold text-foreground">Your Numbers</h2>
      </div>

      {/* Progress Bar */}
      <div className="card-soft">
        <div className="flex justify-between mb-2">
          <p className="font-body font-medium text-sm text-foreground">Challenge Progress</p>
          <p className="font-body text-sm text-muted-foreground">{stats.daysCompleted}/30 days</p>
        </div>
        <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, background: "hsl(var(--primary))" }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-soft text-center">
          <p className="font-display text-3xl font-bold text-foreground">{stats.noSpendDays}</p>
          <p className="font-body text-sm text-muted-foreground">No-Spend Days</p>
        </div>
        <div className="card-soft text-center">
          <p className="font-display text-3xl font-bold text-foreground">{stats.currentStreak}</p>
          <p className="font-body text-sm text-muted-foreground">Current Streak</p>
        </div>
        <div className="card-soft text-center">
          <p className="font-display text-3xl font-bold text-foreground">{stats.longestStreak}</p>
          <p className="font-body text-sm text-muted-foreground">Longest Streak</p>
        </div>
        <div className="card-soft text-center">
          <p className="font-display text-3xl font-bold text-secondary">${stats.freedUp}</p>
          <p className="font-body text-sm text-muted-foreground">Freed Up</p>
        </div>
      </div>

      {/* Total Spent */}
      <div className="card-soft">
        <p className="font-body font-medium text-sm text-muted-foreground mb-1">Total Tracked Spending</p>
        <p className="font-display text-2xl font-bold text-foreground">${stats.totalSpent}</p>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="card-soft">
          <p className="font-body font-medium text-sm text-foreground mb-4">Spending by Day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  fontFamily: "DM Sans",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="amount" fill="hsl(var(--peach))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
