import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

export default function ReleaseSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Before You Start,
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Let This Go
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Before you begin, there are a few things this challenge asks you to loosen your grip on.
      </p>

      <p className="text-base italic leading-relaxed mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        Blame. Shame. Guilt. Fear. Anger. Resentment. Frustration.
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Those emotions are understandable. But if they stay in charge, they will turn every observation into a verdict. This challenge works better when you stop expecting yourself to be perfect, hyper-disciplined, or endlessly in control.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Your spending habits formed in a real life, under real pressures. They make sense in context. When you allow yourself to be human rather than flawless, you create space for honest reflection and practical change.
      </p>

      <div className="p-4 rounded-2xl mb-5" style={{ background: "hsl(var(--off-white))", border: "1px solid #B375A0" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
          Release Prompt
        </p>
        <p className="text-base leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          What are you carrying into this challenge that you're willing to set down? What judgment, expectation, or old story can you leave at the door?
        </p>
      </div>

      <GuideTextField
        fieldId="release-letting-go"
        label="What I'm letting go of"
        placeholder="Name what you're setting down..."
        value={fields["release-letting-go"] || ""}
        onChange={onFieldChange}
        multiline
        rows={4}
      />

      <GuideTextField
        fieldId="release-why-now"
        label="Why now? What made me start this challenge?"
        placeholder="What brought you here?"
        value={fields["release-why-now"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="release-hope"
        label="What I hope shifts in 30 days"
        placeholder="Not the perfect answer — the honest one."
        value={fields["release-hope"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />
    </div>
  );
}
