import type { GuideSectionProps } from "../GuideShell";

export default function WhatsNextSection(_props: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Keep
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Going
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        A weekend is a taste. Three days gives you a sliver of your patterns in weekend mode.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        The 30-day challenge goes deeper. It runs through more contexts: workdays, paychecks, social events, stressful weeks, easy weeks. It builds a full picture of your spending across a whole month, across more of the areas where money shows up in your life than you'd expect.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        If this weekend surprised you in any direction, if something was easier than expected or harder, or if you noticed a pattern you hadn't named before, that's the reason to keep going.
      </p>

      <div className="p-5 rounded-2xl mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          Ready for the Full Experiment?
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "white" }}>
          The No Spend Collective is where the 30-day challenge lives. Free community access. Tools. Prompts. Other people who are also paying attention to their money without making it a whole personality.
        </p>
        <span
          className="text-base italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#E8B4A0" }}
        >
          nospend.net
        </span>
      </div>

      <div className="p-4 rounded-2xl" style={{ borderLeft: "3px solid #B375A0" }}>
        <p className="text-base italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          "Spending is data. Not a verdict."
        </p>
      </div>

      <div className="mt-8 text-center pt-4 border-t" style={{ borderColor: "hsl(268 21% 88%)" }}>
        <p className="text-[10px] uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif", color: "#ccc" }}>
          No Spend Collective &bull; An Aligned Life &bull; nospend.net
        </p>
      </div>
    </div>
  );
}
