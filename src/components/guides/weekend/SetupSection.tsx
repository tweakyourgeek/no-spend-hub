import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

export default function SetupSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Before
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        You Start
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        Before Friday night, take five minutes and write the spoilers.
      </p>

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        You already know how your weekend goes. You've lived it before. The patterns are predictable because they've been running for a while.
      </p>

      <div className="p-4 rounded-2xl mb-6" style={{ background: "hsl(var(--off-white))", border: "1px solid #B375A0" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
          Fill This In Before Friday Night
        </p>
        <p className="text-base leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          "This weekend, I'm most likely to spend on _______ when _______."
        </p>
      </div>

      <GuideTextField
        fieldId="setup-predictions"
        label="My predictions"
        placeholder="Write what you already know about your weekend spending..."
        value={fields["setup-predictions"] || ""}
        onChange={onFieldChange}
        multiline
        rows={4}
      />

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-8 mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        One More Thing
      </p>

      <div className="p-4 rounded-2xl" style={{ background: "hsl(268 21% 88%)" }}>
        <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          <strong>If cash helps:</strong> put $20 in your wallet before Friday. The physical limit makes the weekend more concrete.
        </p>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          <strong>If reminders help:</strong> set a Saturday morning alarm that just says "notice."
        </p>
      </div>
    </div>
  );
}
