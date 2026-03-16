import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField, GuideCheckbox } from "../GuideField";

export default function FridaySection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      {/* Day bar */}
      <div className="p-4 rounded-2xl mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
          Day One
        </p>
        <h2 className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "white" }}>
          Friday <span className="italic" style={{ color: "#E8B4A0" }}>Evening</span>
        </h2>
      </div>

      <p className="text-base italic leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        Most of the action on Friday happens after work. The challenge starts now, whenever now is for you.
      </p>

      <div className="p-4 rounded-2xl mb-5" style={{ background: "hsl(var(--off-white))", border: "1px solid #B375A0" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
          Opening Prompt
        </p>
        <p className="text-base leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          What does a good weekend feel like to you? Not what you do. The feeling you're actually going for.
        </p>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Write a few words. "Relaxed." "Like nothing needs me." Whatever comes up without overthinking it. Keep that nearby. That feeling is what you're often shopping for.
      </p>

      <GuideTextField
        fieldId="fri-feeling"
        label="The feeling I'm going for this weekend"
        placeholder="What does a good weekend feel like?"
        value={fields["fri-feeling"] || ""}
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
          fieldId="fri-spent-yes"
          label="Yes, I spent"
          checked={fields["fri-spent-yes"] === "true"}
          onChange={(id, val) => {
            onFieldChange(id, val);
            if (val === "true") onFieldChange("fri-spent-no", "");
          }}
        />
        <GuideCheckbox
          fieldId="fri-spent-no"
          label="No spend"
          checked={fields["fri-spent-no"] === "true"}
          onChange={(id, val) => {
            onFieldChange(id, val);
            if (val === "true") onFieldChange("fri-spent-yes", "");
          }}
        />
      </div>

      <GuideTextField
        fieldId="fri-spent-on"
        label="What I spent on"
        placeholder="List what you spent on..."
        value={fields["fri-spent-on"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <GuideTextField
        fieldId="fri-before"
        label="What was happening right before"
        placeholder="What were you doing or feeling?"
        value={fields["fri-before"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="fri-pattern"
        label="Pattern I noticed (from the map)"
        placeholder="Which pattern showed up?"
        value={fields["fri-pattern"] || ""}
        onChange={onFieldChange}
      />

      <div className="mt-6 p-4 rounded-2xl" style={{ background: "hsl(156 24% 94%)", borderLeft: "3px solid #A6C9BB" }}>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          <strong>Didn't spend?</strong> Note that too. What felt easy to skip? What felt like effort?
        </p>
      </div>
    </div>
  );
}
