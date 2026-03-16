import { useMemo } from "react";
import type { GuideSectionProps } from "../GuideShell";
import { GuideTextField } from "../GuideField";

export default function AlmostBoughtSection({ fields, onFieldChange }: GuideSectionProps) {
  // Count existing rows to determine how many to show (min 3, grows as user fills them)
  const rowCount = useMemo(() => {
    let max = 3;
    for (let i = 1; i <= 20; i++) {
      if (fields[`almost-${i}-what`] || fields[`almost-${i}-stopped`]) {
        max = Math.max(max, i + 1);
      }
    }
    return Math.min(max, 20);
  }, [fields]);

  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Almost
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Bought It
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Things you considered but didn't buy. The almost-log is often more interesting than the spending log. It shows which patterns activated and then resolved on their own.
      </p>

      <div className="space-y-4">
        {Array.from({ length: rowCount }, (_, i) => i + 1).map((n) => (
          <div key={n} className="p-4 rounded-2xl" style={{ background: "white" }}>
            <div className="flex items-start gap-3">
              <span
                className="text-2xl flex-shrink-0"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B375A0", opacity: 0.35 }}
              >
                {n}
              </span>
              <div className="flex-1 space-y-2">
                <GuideTextField
                  fieldId={`almost-${n}-what`}
                  label="What I almost bought"
                  placeholder="The thing you considered..."
                  value={fields[`almost-${n}-what`] || ""}
                  onChange={onFieldChange}
                />
                <GuideTextField
                  fieldId={`almost-${n}-stopped`}
                  label="What stopped me"
                  placeholder="Why you didn't..."
                  value={fields[`almost-${n}-stopped`] || ""}
                  onChange={onFieldChange}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          // Adding a new row by writing a placeholder that triggers re-render
          onFieldChange(`almost-${rowCount + 1}-what`, "");
        }}
        className="mt-4 w-full py-3 rounded-2xl text-sm font-medium transition-all"
        style={{
          fontFamily: "'Open Sans', sans-serif",
          border: "1px dashed #B375A0",
          color: "#B375A0",
          background: "transparent",
        }}
      >
        + Add another
      </button>
    </div>
  );
}
