import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField, GuideCheckbox } from "../GuideField";

const DAYS = [
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
] as const;

export default function TrackingSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Weekend
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Tracking Sheet
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Three days of data. Keep it honest and keep it simple. Every row is information.
      </p>

      {DAYS.map((day) => (
        <div
          key={day.key}
          className="mb-5 p-4 rounded-2xl"
          style={{ background: "white" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-lg italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}
            >
              {day.label}
            </span>
            <div className="flex gap-4">
              <GuideCheckbox
                fieldId={`track-${day.key}-nospend`}
                label="No spend"
                checked={fields[`track-${day.key}-nospend`] === "true"}
                onChange={(id, val) => {
                  onFieldChange(id, val);
                  if (val === "true") onFieldChange(`track-${day.key}-spent`, "");
                }}
              />
              <GuideCheckbox
                fieldId={`track-${day.key}-spent`}
                label="Spent"
                checked={fields[`track-${day.key}-spent`] === "true"}
                onChange={(id, val) => {
                  onFieldChange(id, val);
                  if (val === "true") onFieldChange(`track-${day.key}-nospend`, "");
                }}
              />
            </div>
          </div>
          <GuideTextField
            fieldId={`track-${day.key}-what`}
            label="What I spent on"
            placeholder="Items or nothing"
            value={fields[`track-${day.key}-what`] || ""}
            onChange={onFieldChange}
          />
          <GuideTextField
            fieldId={`track-${day.key}-happening`}
            label="What was happening"
            placeholder="Context before the spend"
            value={fields[`track-${day.key}-happening`] || ""}
            onChange={onFieldChange}
          />
          <GuideTextField
            fieldId={`track-${day.key}-pattern`}
            label="Pattern"
            placeholder="Which pattern?"
            value={fields[`track-${day.key}-pattern`] || ""}
            onChange={onFieldChange}
          />
        </div>
      ))}

      {/* Weekend totals */}
      <div className="p-4 rounded-2xl mt-6" style={{ background: "#493751" }}>
        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-3" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.55)" }}>
          Weekend Total
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>
              Total spent
            </label>
            <input
              type="text"
              value={fields["track-total-spent"] || ""}
              onChange={(e) => onFieldChange("track-total-spent", e.target.value)}
              placeholder="$"
              className="w-full py-2 px-3 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>
              No-spend days (of 3)
            </label>
            <input
              type="text"
              value={fields["track-nospend-days"] || ""}
              onChange={(e) => onFieldChange("track-nospend-days", e.target.value)}
              placeholder="0-3"
              className="w-full py-2 px-3 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ fontFamily: "'Open Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>
              Patterns I saw most
            </label>
            <input
              type="text"
              value={fields["track-top-patterns"] || ""}
              onChange={(e) => onFieldChange("track-top-patterns", e.target.value)}
              placeholder="Which patterns showed up?"
              className="w-full py-2 px-3 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
