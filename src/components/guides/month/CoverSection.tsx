import type { GuideSectionProps } from "../GuideShell";

export default function CoverSection(_props: GuideSectionProps) {
  return (
    <div className="py-8">
      <div className="h-1.5 w-full rounded-full mb-8" style={{ background: "#493751" }} />

      <p
        className="text-xs font-bold uppercase tracking-[3px] mb-4"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        No Spend Collective
      </p>

      <h1
        className="text-5xl leading-none mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        The 30&#8209;Day
      </h1>
      <h1
        className="text-5xl leading-none mb-4 italic"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Challenge
      </h1>

      <p
        className="text-base italic mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}
      >
        A Pattern-Based Guide to Intentional Spending
      </p>

      <div className="w-10 h-0.5 mb-8" style={{ background: "#A6C9BB" }} />

      <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        30 days. Not to punish yourself, but to slow things down long enough to see what is actually happening. Your spending habits formed in a real life, under real pressures. They make sense in context.
      </p>

      <div className="p-5 rounded-2xl mb-8" style={{ background: "hsl(268 21% 88%)" }}>
        <p className="text-base italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          "The goal is not to be perfect. The goal is to forgive yourself for what came before, recognize the patterns that are still active, and move forward with a plan that feels steady and realistic."
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "hsl(268 21% 88%)" }}>
        <span className="text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751", letterSpacing: "1px" }}>
          An Aligned Life
        </span>
        <span className="text-xs" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
          nospend.net
        </span>
      </div>

      <div className="h-1 w-full rounded-full mt-8" style={{ background: "#A6C9BB" }} />
    </div>
  );
}
