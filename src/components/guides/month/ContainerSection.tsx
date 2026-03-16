import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

export default function ContainerSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Design Your
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        30-Day Container
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        Like any experiment, this one needs parameters. Not rigid rules — design choices that give the month a shape.
      </p>

      <p
        className="text-xs font-bold uppercase tracking-[2px] mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Your Numbers Snapshot
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Not a full budget. A quick look at where your money goes right now. Estimates work.
      </p>

      <GuideTextField
        fieldId="container-income"
        label="Monthly income (approx)"
        placeholder="$"
        value={fields["container-income"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="container-fixed"
        label="Fixed expenses (rent, utilities, insurance)"
        placeholder="$"
        value={fields["container-fixed"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="container-subscriptions"
        label="Subscriptions & memberships"
        placeholder="$"
        value={fields["container-subscriptions"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="container-variable"
        label="Typical variable spending (food, transport, etc.)"
        placeholder="$"
        value={fields["container-variable"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="container-leaky"
        label="Which 1-2 categories feel surprisingly high or 'leaky'?"
        placeholder="Where does money disappear?"
        value={fields["container-leaky"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-8 mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Support & Accountability
      </p>

      <GuideTextField
        fieldId="container-support"
        label="Who knows I'm doing this?"
        placeholder="People who can check in or cheer you on"
        value={fields["container-support"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="container-environment"
        label="What environmental changes would help?"
        placeholder="e.g. Unsubscribe from sale emails, delete shopping apps..."
        value={fields["container-environment"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-8 mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Your Commitment
      </p>

      <div className="p-4 rounded-2xl mb-4" style={{ background: "hsl(var(--off-white))", border: "1px solid #B375A0" }}>
        <p className="text-base leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          For the next 30 days, I commit to pausing, observing, and tracking my spending. I will use the C3 framework to make intentional choices. I will treat every purchase as data, not a verdict.
        </p>
      </div>

      <GuideTextField
        fieldId="container-commitment"
        label="In my own words, I'm doing this because..."
        placeholder="Your reason, your way"
        value={fields["container-commitment"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />
    </div>
  );
}
