import { ChallengeData } from "@/lib/challenge-data";
import { motion } from "framer-motion";

interface Props {
  data: ChallengeData;
}

function getDayLabel(dayNumber: number, startDate: string): string {
  const start = new Date(startDate);
  const date = new Date(start);
  date.setDate(date.getDate() + dayNumber - 1);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function getDateLabel(dayNumber: number, startDate: string): string {
  const start = new Date(startDate);
  const date = new Date(start);
  date.setDate(date.getDate() + dayNumber - 1);
  return date.getDate().toString();
}

export default function SevenDayTracker({ data }: Props) {
  const currentDay = data.currentDay;

  // Calculate the 7-day window centered around today
  // Show 3 days before, today, and 3 days after (clamped to 1-30)
  let windowStart = currentDay - 3;
  let windowEnd = currentDay + 3;

  if (windowStart < 1) {
    windowStart = 1;
    windowEnd = Math.min(7, 30);
  }
  if (windowEnd > 30) {
    windowEnd = 30;
    windowStart = Math.max(1, windowEnd - 6);
  }

  const days: number[] = [];
  for (let i = windowStart; i <= windowEnd; i++) {
    days.push(i);
  }

  const dayEntryMap = new Map(data.days.map((d) => [d.day, d]));

  return (
    <div className="card-soft">
      <div className="flex items-center justify-between mb-4">
        <p className="font-body font-medium text-sm text-foreground">
          7-Day Tracker
        </p>
        <p className="font-body text-xs text-muted-foreground">
          Days {windowStart}–{windowEnd}
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((dayNum) => {
          const entry = dayEntryMap.get(dayNum);
          const isToday = dayNum === currentDay;
          const isPast = dayNum < currentDay;
          const isFuture = dayNum > currentDay;

          let statusClass = "";
          let statusIcon = "";
          let bgStyle: React.CSSProperties = {};

          if (entry) {
            if (entry.noSpend) {
              bgStyle = { background: "hsl(156 24% 86%)" };
              statusIcon = "\u2713";
            } else {
              bgStyle = { background: "hsl(var(--peach) / 0.3)" };
              statusIcon = "\uD83D\uDCB3";
            }
          } else if (isToday) {
            statusClass =
              "border-2 border-primary bg-primary/5";
          } else if (isPast) {
            bgStyle = { background: "hsl(var(--muted))" };
            statusIcon = "\u2014";
          } else if (isFuture) {
            statusClass = "bg-muted/50";
          }

          return (
            <motion.div
              key={dayNum}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (dayNum - windowStart) * 0.05 }}
              className={`flex flex-col items-center rounded-xl py-2.5 px-1 transition-all ${statusClass} ${
                isToday ? "ring-1 ring-primary/30 shadow-sm" : ""
              }`}
              style={bgStyle}
            >
              <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wide">
                {getDayLabel(dayNum, data.challengeStartDate)}
              </span>
              <span
                className={`font-display text-base font-bold mt-0.5 ${
                  isToday ? "text-primary" : "text-foreground"
                }`}
              >
                {getDateLabel(dayNum, data.challengeStartDate)}
              </span>
              <span className="text-sm mt-1 h-5 flex items-center justify-center">
                {entry ? (
                  statusIcon
                ) : isToday ? (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                ) : isPast ? (
                  <span className="text-muted-foreground text-xs">{statusIcon}</span>
                ) : (
                  <span className="text-muted-foreground/40 text-xs">&middot;</span>
                )}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: "hsl(156 24% 86%)" }}
          />
          <span className="font-body text-xs text-muted-foreground">No Spend</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: "hsl(var(--peach) / 0.5)" }}
          />
          <span className="font-body text-xs text-muted-foreground">Spent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full inline-block border-2 border-primary bg-primary/10" />
          <span className="font-body text-xs text-muted-foreground">Today</span>
        </div>
      </div>
    </div>
  );
}
