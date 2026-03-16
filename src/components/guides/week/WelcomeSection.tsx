import type { GuideSectionProps } from "../GuideShell";

export default function WelcomeSection(_props: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Welcome
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        to Your Week
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        You're not here to restrict yourself. You're not here to feel guilty. You're here to get curious.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        For the next 7 days, you're going to do one simple thing: <strong>notice where your money goes</strong>. That's it. No cutting back. No budgeting. No shame spirals.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Just awareness.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Because here's what most money advice gets wrong — it asks you to change before you understand. That's like trying to fix a car without opening the hood. This week, you open the hood.
      </p>

      <div className="p-4 rounded-2xl mb-5" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          The Only Rule
        </p>
        <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "white" }}>
          Track every purchase. Every single one. The $4 coffee. The $1.29 app. The $47 impulse buy. The bills on autopay. Write it down.
        </p>
      </div>

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-6 mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        What You're NOT Doing
      </p>

      <div className="space-y-2 mb-6">
        {[
          "Judging yourself",
          "Trying to spend less",
          "Feeling bad about what you find",
          "Changing any habits (yet)",
        ].map((item) => (
          <div key={item} className="flex gap-2 text-sm" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
            <span className="text-lg leading-none" style={{ color: "#A6C9BB" }}>·</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl" style={{ borderLeft: "3px solid #B375A0" }}>
        <p className="text-base italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          You're a scientist this week. Scientists observe. They don't judge the data.
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
