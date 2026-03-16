import { useState } from "react";
import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField, GuideCheckbox } from "../GuideField";

function SpentAnywayModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(73,55,81,0.6)" }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "#F8F1F2" }}>
        <p
          className="text-xs font-bold uppercase tracking-[2px] mb-4"
          style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
        >
          Spent Anyway Protocol
        </p>

        <p className="text-sm mb-5" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
          If you spend today, here's the complete response:
        </p>

        {[
          { n: 1, bold: "Name it.", text: '"I bought ___________."' },
          { n: 2, bold: "Own it.", text: "Don't pretend it didn't happen." },
          { n: 3, bold: "Look at it.", text: "What was I feeling right before?" },
          { n: 4, bold: "Keep going.", text: "One data point doesn't break a weekend." },
        ].map((step) => (
          <div key={step.n} className="flex gap-3 mb-3 items-start">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "#493751" }}
            >
              <span className="text-xs font-bold text-white">{step.n}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
              <strong>{step.bold}</strong> {step.text}
            </p>
          </div>
        ))}

        <div className="mt-5 p-3 rounded-xl" style={{ borderLeft: "3px solid #B375A0" }}>
          <p className="text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
            "A slip is a data point, not a verdict."
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-full text-sm font-medium"
          style={{ fontFamily: "'Open Sans', sans-serif", background: "#493751", color: "white" }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default function SaturdaySection({ fields, onFieldChange }: GuideSectionProps) {
  const [showProtocol, setShowProtocol] = useState(false);

  return (
    <div className="py-8">
      {showProtocol && <SpentAnywayModal onClose={() => setShowProtocol(false)} />}

      {/* Day bar */}
      <div className="p-4 rounded-2xl mb-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
          Day Two
        </p>
        <h2 className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "white" }}>
          Saturday <span className="italic" style={{ color: "#E8B4A0" }}>All Day</span>
        </h2>
      </div>

      <p className="text-base italic leading-relaxed mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        Saturday is the heaviest spend day of the week. This is the day worth paying the most attention to.
      </p>

      <div className="p-4 rounded-2xl mb-5" style={{ background: "hsl(var(--off-white))", border: "1px solid #B375A0" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
          Morning Prompt
        </p>
        <p className="text-base leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          What's on your plan for today? Write it out: activities, errands, social things, anything. Circle anything that typically involves spending, even incidentally.
        </p>
      </div>

      <GuideTextField
        fieldId="sat-plan"
        label="Today's plan"
        placeholder="What's on the agenda?"
        value={fields["sat-plan"] || ""}
        onChange={onFieldChange}
        multiline
        rows={3}
      />

      {/* Spent Anyway Protocol trigger */}
      <button
        onClick={() => setShowProtocol(true)}
        className="w-full mt-4 mb-6 py-3 rounded-2xl text-sm font-medium transition-all"
        style={{
          fontFamily: "'Open Sans', sans-serif",
          background: "hsl(268 21% 88%)",
          color: "#493751",
          border: "none",
        }}
      >
        Spent today? Open the Spent Anyway Protocol
      </button>

      <p
        className="text-xs font-bold uppercase tracking-[2px] mt-4 mb-4"
        style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
      >
        End of Day
      </p>

      <div className="flex gap-6 mb-4">
        <GuideCheckbox
          fieldId="sat-spent-yes"
          label="Yes, I spent"
          checked={fields["sat-spent-yes"] === "true"}
          onChange={(id, val) => {
            onFieldChange(id, val);
            if (val === "true") onFieldChange("sat-spent-no", "");
          }}
        />
        <GuideCheckbox
          fieldId="sat-spent-no"
          label="No spend"
          checked={fields["sat-spent-no"] === "true"}
          onChange={(id, val) => {
            onFieldChange(id, val);
            if (val === "true") onFieldChange("sat-spent-yes", "");
          }}
        />
      </div>

      <GuideTextField
        fieldId="sat-spent-on"
        label="What I spent on"
        placeholder="List what you spent on..."
        value={fields["sat-spent-on"] || ""}
        onChange={onFieldChange}
        multiline
        rows={2}
      />

      <GuideTextField
        fieldId="sat-total"
        label="Total spent"
        placeholder="$"
        value={fields["sat-total"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="sat-before"
        label="What was happening right before"
        placeholder="What were you doing or feeling?"
        value={fields["sat-before"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="sat-pattern"
        label="Pattern I noticed"
        placeholder="Which pattern showed up?"
        value={fields["sat-pattern"] || ""}
        onChange={onFieldChange}
      />

      <GuideTextField
        fieldId="sat-surprise"
        label="What surprised me"
        placeholder="Anything unexpected?"
        value={fields["sat-surprise"] || ""}
        onChange={onFieldChange}
      />
    </div>
  );
}
