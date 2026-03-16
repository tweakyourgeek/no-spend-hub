import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

export default function IntegrationSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Integration &
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        What's Next
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        You did 30 days. Not perfectly — but that was never the point. You showed up, you tracked, you looked honestly at your spending. That's the work.
      </p>

      <GuideTextField
        fieldId="int-total"
        label="Total spent this month"
        placeholder="$"
        value={fields["int-total"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="int-no-spend-days"
        label="No-spend days (out of 30)"
        placeholder="How many?"
        value={fields["int-no-spend-days"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="int-biggest-pattern"
        label="My biggest spending pattern"
        placeholder="The one that showed up most"
        value={fields["int-biggest-pattern"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="int-c3-worked"
        label="C3 strategies that worked"
        placeholder="What actually helped?"
        value={fields["int-c3-worked"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="int-surprised"
        label="What surprised me most"
        placeholder="The unexpected discovery"
        value={fields["int-surprised"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="int-proud"
        label="What I'm proud of"
        placeholder="Even the small things"
        value={fields["int-proud"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-8 mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Carrying This Forward
      </p>

      <GuideTextField
        fieldId="int-keep"
        label="Habits I want to keep"
        placeholder="What stays from this month?"
        value={fields["int-keep"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="int-release"
        label="What I'm releasing"
        placeholder="What no longer serves you?"
        value={fields["int-release"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <GuideTextField
        fieldId="int-next-cycle"
        label="My plan for next month"
        placeholder="Continue, adjust, or take a break?"
        value={fields["int-next-cycle"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <div className="p-5 rounded-2xl mt-6 mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          This Journal Is a Single Cycle
        </p>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "white" }}>
          One round of observation, one set of experiments, one batch of data. If you choose to do another 30 days, it will be a different cycle with different patterns and different questions. Both count.
        </p>
      </div>

      <div className="p-4 rounded-2xl" style={{ borderLeft: "3px solid #B375A0" }}>
        <p className="text-base italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          "Progress here is cumulative, not all-or-nothing. You've already done the hardest part — you looked. That takes courage."
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
