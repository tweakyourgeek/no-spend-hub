import type { GuideSectionProps } from "../GuideShell";

export default function WelcomeSection(_props: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Three days.
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        No rules to break.
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p
        className="text-base italic leading-relaxed mb-5"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}
      >
        This guide is for a single weekend. Start Friday night, or Saturday morning if that's where you are. The shape still works.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Here's the only thing you actually need to know before you begin: spending during a no-spend weekend doesn't mean you did it wrong. A spend is a data point. Write it down, look at it, keep going.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        The goal here is noticing what usually runs on autopilot. Zero spending is not the target.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Finish Sunday with $47 spent instead of $0? You still learned something. You know what you bought, when you bought it, and what was happening right before you clicked add to cart. That information is worth more than a clean scorecard.
      </p>

      <div className="p-4 rounded-2xl" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          The One Rule
        </p>
        <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "white" }}>
          Participation over perfection. A weekend with data beats a perfect weekend that never happened.
        </p>
      </div>

      <div className="mt-6 p-4 rounded-2xl" style={{ background: "hsl(156 24% 94%)", borderLeft: "3px solid #A6C9BB" }}>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          <strong>Not financial advice.</strong> This guide is for reflection, awareness, and pattern recognition only. It does not replace financial advice, therapy, or any professional guidance.
        </p>
      </div>
    </div>
  );
}
