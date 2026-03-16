import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField, GuideCheckbox } from "../GuideField";

export default function SundaySection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      {/* Day bar */}
      <div className="p-4 rounded-2xl mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
          Day Three
        </p>
        <h2 className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "white" }}>
          Sunday <span className="italic" style={{ color: "#E8B4A0" }}>Reset</span>
        </h2>
      </div>

      <p className="text-base italic leading-relaxed mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        Sunday spending has its own specific flavor. It's quieter than Saturday but sneakier. It tends to dress itself up as practicality.
      </p>

      <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Some Sunday purchases are genuinely practical. The pattern to notice is when a purchase is doing emotional work that it's framing as a logistics move. Groceries you actually need: logistics. The new planner that represents a whole fresh start you're hoping a purchase will deliver: that's the pattern.
      </p>

      <div className="p-4 rounded-2xl mb-5" style={{ background: "hsl(var(--off-white))", border: "1px solid #B375A0" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
          Sunday Prompt
        </p>
        <p className="text-base leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          What does your Sunday usually include that costs money? Now ask: what's that purchase actually giving you? Getting ahead, or the feeling of getting ahead?
        </p>
      </div>

      <GuideTextField
        fieldId="sun-honest"
        label="My honest answer"
        placeholder="What's the purchase actually giving you?"
        value={fields["sun-honest"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-8 mb-4"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        End of Day
      </p>

      <div className="flex gap-6 mb-4">
        <GuideCheckbox
          fieldId="sun-spent-yes"
          label="Yes, I spent"
          checked={fields["sun-spent-yes"] === "true"}
          onChange={(id, val) => {
            onFieldChange(id, val);
            if (val === "true") onFieldChange("sun-spent-no", "");
          }}
        />
        <GuideCheckbox
          fieldId="sun-spent-no"
          label="No spend"
          checked={fields["sun-spent-no"] === "true"}
          onChange={(id, val) => {
            onFieldChange(id, val);
            if (val === "true") onFieldChange("sun-spent-yes", "");
          }}
        />
      </div>

      <GuideTextField
        fieldId="sun-spent-on"
        label="What I spent on"
        placeholder="List what you spent on..."
        value={fields["sun-spent-on"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <GuideTextField
        fieldId="sun-before"
        label="What was happening right before"
        placeholder="What were you doing or feeling?"
        value={fields["sun-before"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="sun-pattern"
        label="Pattern I noticed"
        placeholder="Which pattern showed up?"
        value={fields["sun-pattern"] || ""}
        onChange={onFieldChange}
      />

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-8 mb-4"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Weekend Wrap
      </p>

      <GuideTextField
        fieldId="sun-unexpected"
        label="What I didn't expect to notice"
        placeholder="What surprised you?"
        value={fields["sun-unexpected"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <GuideTextField
        fieldId="sun-easy-hard"
        label="What felt easy vs. genuinely hard"
        placeholder="Where did you struggle?"
        value={fields["sun-easy-hard"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <GuideTextField
        fieldId="sun-remember"
        label="What I want to remember"
        placeholder="Your takeaway..."
        value={fields["sun-remember"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />
    </div>
  );
}
