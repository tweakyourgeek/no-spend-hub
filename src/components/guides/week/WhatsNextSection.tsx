import type { GuideSectionProps } from "../GuideShell";

export default function WhatsNextSection(_props: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        What
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Now?
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        Now you have something most people don't: actual data about your actual life.
      </p>

      <p
        className="text-xs font-bold uppercase tracking-[2px] mb-4"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Three Things You Can Do Next
      </p>

      {[
        {
          num: "1",
          title: "Share Your Pattern",
          desc: "Bring your insights to the community. What did you discover? You'll be surprised how many people share your pattern.",
        },
        {
          num: "2",
          title: "Pick ONE Thing",
          desc: "Now that you see clearly, you might want to change something. Don't overhaul everything. Pick ONE thing: one subscription to pause, one autopilot purchase to question, one emotional trigger to watch.",
        },
        {
          num: "3",
          title: "Try the Full Challenge",
          desc: "If you're ready for deeper work, the 30-Day Challenge takes everything you learned and builds on it. But only if you're ready. No rush.",
        },
      ].map((item) => (
        <div key={item.num} className="p-4 rounded-2xl mb-3" style={{ background: "white" }}>
          <div className="flex gap-3">
            <span
              className="text-2xl flex-shrink-0"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(268 21% 88%)" }}
            >
              {item.num}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "#493751" }}>
                {item.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="p-5 rounded-2xl mt-6 mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          Ready for the Full Experiment?
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "white" }}>
          The 30-Day Challenge goes deeper. Workdays, paychecks, social events, stressful weeks — the full picture of your spending patterns across a whole month.
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
          "What you do with that clarity is up to you. But you've already done the hardest part — you looked. That takes courage."
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
