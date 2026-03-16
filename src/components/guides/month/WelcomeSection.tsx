import type { GuideSectionProps } from "../GuideShell";

export default function WelcomeSection(_props: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Welcome to
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Your 30-Day Reset
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        This 30-day no-spend challenge is about recognizing patterns. It is a pause. A deliberate stop in the middle of habits that usually run on autopilot.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Not to punish yourself, but to slow things down long enough to see what is actually happening. This challenge asks you to notice how and why you spend. What you reach for when you are tired, bored, stressed, hopeful, or avoiding something harder to look at.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Those patterns are not failures. They are protective strategies that made sense at some point. If you feel guilty about your spending, that's okay. It's not running this show, though. Awareness is.
      </p>

      <p
        className="text-xs font-bold uppercase tracking-[2px] mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        What Counts as Participation
      </p>

      <div className="space-y-2 mb-6">
        {[
          "Checking boxes counts.",
          "Skipping journal prompts counts.",
          "Spending during the challenge counts (it's data).",
          "Missing days counts.",
          "Coming back after quitting counts.",
        ].map((item) => (
          <div key={item} className="flex gap-2 text-sm" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
            <span className="text-lg leading-none" style={{ color: "#A6C9BB" }}>·</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl mb-5" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          The Promise
        </p>
        <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "white" }}>
          There is no minimum effort requirement. If you showed up today, that's the work.
        </p>
      </div>

      <div className="p-4 rounded-2xl" style={{ background: "hsl(156 24% 94%)", borderLeft: "3px solid #A6C9BB" }}>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          <strong>Not financial advice.</strong> This challenge is not a substitute for professional support around deep money trauma or mental health care. It does not replace an accountant, financial planner, or therapist.
        </p>
      </div>
    </div>
  );
}
