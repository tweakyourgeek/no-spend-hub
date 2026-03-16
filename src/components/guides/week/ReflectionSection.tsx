import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

export default function ReflectionSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        End of Week
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Reflection
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        You did it. You watched. You tracked. You stayed curious instead of critical. Now you have something most people don't: actual data about your actual life.
      </p>

      <GuideTextField
        fieldId="ref-total"
        label="My total spending this week"
        placeholder="$"
        value={fields["ref-total"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="ref-category"
        label="My most common spending category"
        placeholder="Food, entertainment, subscriptions..."
        value={fields["ref-category"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="ref-emotion"
        label="My most common emotion before spending"
        placeholder="Tired, bored, stressed, happy..."
        value={fields["ref-emotion"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="ref-ratio"
        label="My need/want ratio"
        placeholder="e.g. 12 needs / 8 wants"
        value={fields["ref-ratio"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="ref-pattern"
        label="One pattern I noticed"
        placeholder="What showed up repeatedly?"
        value={fields["ref-pattern"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="ref-change"
        label="One thing I want to explore changing"
        placeholder="What would you try differently?"
        value={fields["ref-change"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="ref-feeling"
        label="How I feel about what I discovered"
        placeholder="Honest reaction..."
        value={fields["ref-feeling"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <div className="mt-6 p-4 rounded-2xl" style={{ borderLeft: "3px solid #B375A0" }}>
        <p className="text-base italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          "This isn't about perfection. It's about awareness. You can't change what you can't see. Now you can see."
        </p>
      </div>
    </div>
  );
}
