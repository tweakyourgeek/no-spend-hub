import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

interface DayConfig {
  dayNum: number;
  title: string;
  subtitle: string;
  focus: string;
  body: string;
  reflection: string;
}

const DAYS: DayConfig[] = [
  {
    dayNum: 1,
    title: "Just",
    subtitle: "Begin",
    focus: "Start tracking. Don't overthink it.",
    body: "Grab your phone, a notebook, or use the tracker below. Every time you spend money, write it down. Include what you bought, how much, and one word for how you felt (tired, happy, bored, rushed, etc.). That's it. You're just building the habit of noticing.",
    reflection: "How many purchases did you make today? Were any surprising?",
  },
  {
    dayNum: 2,
    title: "Notice the",
    subtitle: "Autopilot",
    focus: "Catch the automatic spending.",
    body: "Some purchases happen without thinking — the morning coffee, the convenience store stop, the \"add to cart\" muscle memory. Today, try to catch yourself in autopilot mode. You don't have to stop it. Just notice: \"Oh, I'm doing that thing again.\"",
    reflection: "What's your most automatic purchase? The one you don't even think about?",
  },
  {
    dayNum: 3,
    title: "Follow the",
    subtitle: "Feelings",
    focus: "Connect spending to emotions.",
    body: "Look at your \"How I Felt\" column from Days 1-2. Any patterns? Did you spend more when tired? Stressed? After a hard conversation? Today, pay extra attention to what happens RIGHT BEFORE you buy something. What triggered it?",
    reflection: "What emotion most often shows up before you spend?",
  },
  {
    dayNum: 4,
    title: "The Midweek",
    subtitle: "Check-In",
    focus: "Review without judgment.",
    body: "You're halfway there. Take 5 minutes to look at your tracker so far. Add up your totals if you want, but don't attach meaning to the number. It's just data. Some weeks are higher. Some are lower. This is ONE week of your life. What matters: Are you seeing patterns?",
    reflection: "What's one thing you've noticed that surprised you?",
  },
  {
    dayNum: 5,
    title: "Need vs.",
    subtitle: "Want",
    focus: "Get curious about the balance.",
    body: "This isn't about shaming your wants. Wants are human. But noticing the ratio helps. For today's purchases, pause before each one and ask: \"Is this a need or a want?\" Then track it honestly. No wrong answers.",
    reflection: "What's your need-to-want ratio looking like? (No judgment. Just noticing.)",
  },
  {
    dayNum: 6,
    title: "The Time",
    subtitle: "Question",
    focus: "Notice how long the good feeling lasts.",
    body: "When you buy something today, notice: How long does the satisfaction last? 5 minutes? An hour? All day? Already forgot about it? This isn't about guilt. It's about return on investment — emotional ROI.",
    reflection: "Which purchase gave you the longest-lasting good feeling?",
  },
  {
    dayNum: 7,
    title: "See the",
    subtitle: "Whole Picture",
    focus: "Step back and observe.",
    body: "Last day. Keep tracking, but also take time to review your full week. Look for your biggest spending category, your most common emotion before purchases, the need/want breakdown, any purchases you completely forgot about, and anything that surprised you.",
    reflection: "If you could describe your spending pattern in one sentence, what would it be?",
  },
];

export function createDaySections(): { id: string; label: string; shortLabel: string; component: React.ComponentType<GuideSectionProps> }[] {
  return DAYS.map((day) => ({
    id: `day-${day.dayNum}`,
    label: `Day ${day.dayNum}: ${day.title} ${day.subtitle}`,
    shortLabel: `Day ${day.dayNum}`,
    component: function DayComponent(props: GuideSectionProps) {
      return <DaySection day={day} {...props} />;
    },
  }));
}

function DaySection({ day, fields, onFieldChange }: GuideSectionProps & { day: DayConfig }) {
  const prefix = `d${day.dayNum}`;

  return (
    <div className="py-8">
      {/* Day bar */}
      <div className="p-4 rounded-2xl mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
          Day {day.dayNum} of 7
        </p>
        <h2 className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "white" }}>
          {day.title} <span className="italic" style={{ color: "#E8B4A0" }}>{day.subtitle}</span>
        </h2>
      </div>

      <div className="p-4 rounded-2xl mb-5" style={{ background: "hsl(var(--off-white))", border: "1px solid #B375A0" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
          Today's Focus
        </p>
        <p className="text-base leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          {day.focus}
        </p>
      </div>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        {day.body}
      </p>

      {/* Daily purchase tracker */}
      <p
        className="text-xs font-bold uppercase tracking-[2px] mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Today's Purchases
      </p>

      {[1, 2, 3].map((n) => (
        <div key={n} className="p-3 rounded-xl mb-3" style={{ background: "white" }}>
          <div className="flex gap-2">
            <span className="text-lg flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B375A0", opacity: 0.35 }}>
              {n}
            </span>
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <GuideTextField
                    fieldId={`${prefix}-p${n}-what`}
                    label="What"
                    placeholder="What did you buy?"
                    value={fields[`${prefix}-p${n}-what`] || ""}
                    onChange={onFieldChange}
                  />
                </div>
                <div style={{ width: "80px" }}>
                  <GuideTextField
                    fieldId={`${prefix}-p${n}-amount`}
                    label="Amount"
                    placeholder="$"
                    value={fields[`${prefix}-p${n}-amount`] || ""}
                    onChange={onFieldChange}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <GuideTextField
                    fieldId={`${prefix}-p${n}-feeling`}
                    label="How I felt"
                    placeholder="One word"
                    value={fields[`${prefix}-p${n}-feeling`] || ""}
                    onChange={onFieldChange}
                  />
                </div>
                <div className="flex-1">
                  <GuideTextField
                    fieldId={`${prefix}-p${n}-needwant`}
                    label="Need or want?"
                    placeholder="Need / Want"
                    value={fields[`${prefix}-p${n}-needwant`] || ""}
                    onChange={onFieldChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Reflection */}
      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-8 mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        End of Day Reflection
      </p>

      <div className="p-4 rounded-2xl mb-4" style={{ borderLeft: "3px solid #B375A0" }}>
        <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          {day.reflection}
        </p>
      </div>

      <GuideTextField
        fieldId={`${prefix}-reflection`}
        label="My reflection"
        placeholder="Write what you noticed..."
        value={fields[`${prefix}-reflection`] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />
    </div>
  );
}
