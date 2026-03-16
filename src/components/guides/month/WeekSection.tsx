import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField, GuideCheckbox } from "../GuideField";

interface WeekConfig {
  weekNum: number;
  title: string;
  subtitle: string;
  phase: string;
  lens: string;
  focus: string;
  days: { dayNum: number; theme: string; prompt: string }[];
}

const WEEKS: WeekConfig[] = [
  {
    weekNum: 1,
    title: "Starting the",
    subtitle: "Experiment",
    phase: "Chasing (Curiosity/Desire)",
    lens: "Being — Who am I being with money?",
    focus: "You're figuring out what this challenge actually looks like in your life. What stays, what pauses, what feels harder than expected. The goal is not perfection. The goal is participation.",
    days: [
      { dayNum: 1, theme: "Why Now", prompt: "Name why you're doing this and what you hope shifts." },
      { dayNum: 2, theme: "Essential vs. Optional", prompt: "What's essential and what's optional for this round?" },
      { dayNum: 3, theme: "What You're Aiming For", prompt: "Set a specific goal — something you can actually see at Day 30." },
      { dayNum: 4, theme: "What You Already Have", prompt: "Notice what you already own or have access to." },
      { dayNum: 5, theme: "The Fear of Doing It Wrong", prompt: "Name the fear of failure. Remember: you can't do this wrong." },
      { dayNum: 6, theme: "The Weekend Plan", prompt: "Plan for the weekend — weekends are often spending triggers." },
      { dayNum: 7, theme: "Week One Check-In", prompt: "What went well? What was hard? What are you carrying forward?" },
    ],
  },
  {
    weekNum: 2,
    title: "Meeting",
    subtitle: "Resistance",
    phase: "Shadow (Integration/Resistance)",
    lens: "Feeling — What am I avoiding, soothing, or seeking?",
    focus: "The novelty has worn off. You're in it now. Emotions, boredom, and the voice that says 'I've earned this' may get louder. That's not failure. That's the work.",
    days: [
      { dayNum: 8, theme: "What Triggered You", prompt: "Notice what triggers the urge to spend." },
      { dayNum: 9, theme: "The Comfort Menu", prompt: "Build alternatives that meet needs without money." },
      { dayNum: 10, theme: "The 'I Deserve This' Voice", prompt: "Examine the reward script. Change the state, not the cart." },
      { dayNum: 11, theme: "Boredom and the Scroll", prompt: "Notice the boredom → browsing → buying pipeline." },
      { dayNum: 12, theme: "A Hard Day", prompt: "Practice sitting with discomfort instead of buying your way out." },
      { dayNum: 13, theme: "A Small Win", prompt: "What went well? Name it. Even small wins count." },
      { dayNum: 14, theme: "Week Two Check-In", prompt: "What patterns are clearer now? What's still hard?" },
    ],
  },
  {
    weekNum: 3,
    title: "Practicing",
    subtitle: "Differently",
    phase: "Getting (Application)",
    lens: "Acting — What am I doing differently with money?",
    focus: "You've seen the patterns. Now you're practicing doing things differently. Not perfectly — differently. Small shifts that let you choose instead of react.",
    days: [
      { dayNum: 15, theme: "Halfway Point", prompt: "You're halfway. How does the money landscape look from here?" },
      { dayNum: 16, theme: "The Social Pressure Day", prompt: "How do you handle spending pressure from others?" },
      { dayNum: 17, theme: "What You've Learned So Far", prompt: "Name three things you know now that you didn't on Day 1." },
      { dayNum: 18, theme: "The Free Alternative", prompt: "Find a free version of something you'd normally pay for today." },
      { dayNum: 19, theme: "Values Check", prompt: "Does your spending align with what you actually value?" },
      { dayNum: 20, theme: "The Maintenance Day", prompt: "Some days are just about maintaining. That's enough." },
      { dayNum: 21, theme: "Week Three Check-In", prompt: "What's shifted? What are you proud of? What still pulls?" },
    ],
  },
  {
    weekNum: 4,
    title: "Choosing",
    subtitle: "What's Next",
    phase: "Releasing (Assimilation)",
    lens: "Showing Up — How am I showing up for my financial life?",
    focus: "The final stretch. You're not just tracking now — you're choosing. What stays, what goes, what you want your relationship with money to look like going forward.",
    days: [
      { dayNum: 22, theme: "The Pattern You Named", prompt: "Which spending pattern is clearest now? Name it." },
      { dayNum: 23, theme: "What You Didn't Buy", prompt: "Look back at what you almost bought. What resolved on its own?" },
      { dayNum: 24, theme: "The Money Conversation", prompt: "If you could have one honest conversation about money, what would you say?" },
      { dayNum: 25, theme: "Gratitude, Not Guilt", prompt: "What do you appreciate about how you handled this month?" },
      { dayNum: 26, theme: "Systems That Worked", prompt: "What systems or strategies actually helped?" },
      { dayNum: 27, theme: "What Surprised You", prompt: "What was unexpected about this whole experiment?" },
      { dayNum: 28, theme: "The Comfort Menu (Revisited)", prompt: "Update your comfort menu with what you've learned." },
      { dayNum: 29, theme: "Your Next Cycle", prompt: "What does the next month look like? Will you continue, adjust, or take a break?" },
      { dayNum: 30, theme: "The Full Picture", prompt: "Step back. See the whole 30 days. What story does the data tell?" },
    ],
  },
];

export function createWeekSections(): { id: string; label: string; shortLabel: string; component: React.ComponentType<GuideSectionProps> }[] {
  return WEEKS.map((week) => ({
    id: `week-${week.weekNum}`,
    label: `Week ${week.weekNum}: ${week.title} ${week.subtitle}`,
    shortLabel: `W${week.weekNum}`,
    component: function WeekComponent(props: GuideSectionProps) {
      return <WeekSectionView week={week} {...props} />;
    },
  }));
}

function WeekSectionView({ week, fields, onFieldChange }: GuideSectionProps & { week: WeekConfig }) {
  return (
    <div className="py-8">
      {/* Week header */}
      <div className="p-4 rounded-2xl mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
          Week {week.weekNum} — {week.phase}
        </p>
        <h2 className="text-2xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "white" }}>
          {week.title} <span className="italic" style={{ color: "#E8B4A0" }}>{week.subtitle}</span>
        </h2>
        <p className="text-xs" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>
          {week.lens}
        </p>
      </div>

      <div className="p-4 rounded-2xl mb-6" style={{ borderLeft: "3px solid #B375A0" }}>
        <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          {week.focus}
        </p>
      </div>

      {/* Daily entries */}
      {week.days.map((day) => {
        const prefix = `m-d${day.dayNum}`;
        return (
          <div key={day.dayNum} className="mb-5 p-4 rounded-2xl" style={{ background: "white" }}>
            <div className="flex items-start gap-3 mb-3">
              <span
                className="text-lg font-bold flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ fontFamily: "'Open Sans', sans-serif", background: "hsl(268 21% 88%)", color: "#493751", fontSize: "12px" }}
              >
                {day.dayNum}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif", color: "#493751" }}>
                  {day.theme}
                </p>
                <p className="text-sm italic mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
                  {day.prompt}
                </p>
              </div>
            </div>

            <GuideTextField
              fieldId={`${prefix}-journal`}
              placeholder="Your response..."
              value={fields[`${prefix}-journal`] || ""}
              onChange={onFieldChange}
              multiline
              rows={2}
            />

            <div className="flex gap-4 mt-2">
              <GuideCheckbox
                fieldId={`${prefix}-spent`}
                label="Spent today"
                checked={fields[`${prefix}-spent`] === "true"}
                onChange={onFieldChange}
              />
              <div style={{ width: "100px" }}>
                <GuideTextField
                  fieldId={`${prefix}-amount`}
                  placeholder="$ total"
                  value={fields[`${prefix}-amount`] || ""}
                  onChange={onFieldChange}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
