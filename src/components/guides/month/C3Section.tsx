import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

export default function C3Section({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        The C3
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Framework
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        The C3 Framework gives you three clear paths for any spending decision instead of vague promises to "spend less" or "be better with money."
      </p>

      {/* CUT */}
      <div className="p-4 rounded-2xl mb-3" style={{ background: "white" }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#493751" }}>
          CUT — Reduce Frequency
        </p>
        <p className="text-sm leading-relaxed mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          Keep it but reduce how often it happens. Creates friction without deprivation.
        </p>
        <p className="text-xs italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
          Coffee from 5x/week to 2x. Takeout from 4x/month to 1x. Impulse buys get a 24-hour wait.
        </p>
      </div>

      {/* CANCEL */}
      <div className="p-4 rounded-2xl mb-3" style={{ background: "white" }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#493751" }}>
          CANCEL — Stop or Downgrade
        </p>
        <p className="text-sm leading-relaxed mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          Stop it completely or downgrade to a lower tier. Stops the slow drain on things that no longer fit.
        </p>
        <p className="text-xs italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
          Premium to basic. Unused gym gone. Three streaming services become one.
        </p>
      </div>

      {/* COMBINE */}
      <div className="p-4 rounded-2xl mb-6" style={{ background: "white" }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#493751" }}>
          COMBINE — Consolidate or Share
        </p>
        <p className="text-sm leading-relaxed mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          Consolidate multiple services into one, share costs, or replace with cheaper alternatives.
        </p>
        <p className="text-xs italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
          Solo plan becomes family split. Three tools become one. Branded items become generics.
        </p>
      </div>

      <p
        className="text-xs font-bold uppercase tracking-[2px] mb-3"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        Your C3 Strategy for This Round
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Pick 2-4 strategies. Less is more. Too many commitments create friction that collapses the experiment.
      </p>

      <GuideTextField
        fieldId="c3-cut"
        label="What I will CUT (reduce frequency)"
        placeholder="e.g. Coffee runs from 5x to 2x per week..."
        value={fields["c3-cut"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="c3-cancel"
        label="What I will CANCEL (stop or downgrade)"
        placeholder="e.g. Cancel unused gym membership..."
        value={fields["c3-cancel"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      <GuideTextField
        fieldId="c3-combine"
        label="What I will COMBINE (consolidate or share)"
        placeholder="e.g. Split streaming plan with family..."
        value={fields["c3-combine"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />
    </div>
  );
}
