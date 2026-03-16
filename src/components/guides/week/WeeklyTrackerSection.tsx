import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

const DAYS = ["1", "2", "3", "4", "5", "6", "7"];

export default function WeeklyTrackerSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Week at a
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Glance
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Your full week of data in one view. Fill this in as you go, or come back at the end.
      </p>

      {DAYS.map((d) => (
        <div key={d} className="p-3 rounded-xl mb-3" style={{ background: "white" }}>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-lg italic flex-shrink-0 w-12"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}
            >
              Day {d}
            </span>
          </div>
          <div className="flex gap-2">
            <div style={{ width: "80px" }}>
              <GuideTextField
                fieldId={`wk-d${d}-total`}
                label="Total"
                placeholder="$"
                value={fields[`wk-d${d}-total`] || ""}
                onChange={onFieldChange}
              />
            </div>
            <div style={{ width: "50px" }}>
              <GuideTextField
                fieldId={`wk-d${d}-count`}
                label="# Buys"
                placeholder="#"
                value={fields[`wk-d${d}-count`] || ""}
                onChange={onFieldChange}
              />
            </div>
            <div className="flex-1">
              <GuideTextField
                fieldId={`wk-d${d}-emotion`}
                label="Top emotion"
                placeholder="Feeling"
                value={fields[`wk-d${d}-emotion`] || ""}
                onChange={onFieldChange}
              />
            </div>
            <div style={{ width: "50px" }}>
              <GuideTextField
                fieldId={`wk-d${d}-needs`}
                label="Needs"
                placeholder="#"
                value={fields[`wk-d${d}-needs`] || ""}
                onChange={onFieldChange}
              />
            </div>
            <div style={{ width: "50px" }}>
              <GuideTextField
                fieldId={`wk-d${d}-wants`}
                label="Wants"
                placeholder="#"
                value={fields[`wk-d${d}-wants`] || ""}
                onChange={onFieldChange}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Totals */}
      <div className="p-4 rounded-2xl mt-5" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          Weekly Total
        </p>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>
              Total spent
            </label>
            <input
              type="text"
              value={fields["wk-total-spent"] || ""}
              onChange={(e) => onFieldChange("wk-total-spent", e.target.value)}
              placeholder="$"
              className="w-full py-2 px-3 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>
              Total purchases
            </label>
            <input
              type="text"
              value={fields["wk-total-purchases"] || ""}
              onChange={(e) => onFieldChange("wk-total-purchases", e.target.value)}
              placeholder="#"
              className="w-full py-2 px-3 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
