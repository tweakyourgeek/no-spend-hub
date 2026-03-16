import type { GuideSectionProps } from "../GuideShell";
import { GuideSelectable } from "../GuideField";

const PATTERNS = [
  {
    id: "pattern-boredom",
    number: 1,
    name: "Boredom Spending",
    desc: "The weekend opened up and the first thing you reached for was your phone. Scroll, browse, buy.",
  },
  {
    id: "pattern-social",
    number: 2,
    name: "Social Spending",
    desc: "Someone suggested it and \"no\" felt more complicated than the cost.",
  },
  {
    id: "pattern-deserve",
    number: 3,
    name: "\"I Deserve This\"",
    desc: "The week was hard. You survived something. The purchase felt earned.",
  },
  {
    id: "pattern-errand",
    number: 4,
    name: "Errand Creep",
    desc: "You needed one thing. You came home with seven. No list, open store.",
  },
  {
    id: "pattern-sunday",
    number: 5,
    name: "Sunday Reset",
    desc: "New week, fresh start. The purchase was optimism in receipt form.",
  },
];

export default function PatternMapSection({ fields, onFieldChange }: GuideSectionProps) {
  return (
    <div className="py-8">
      <h1
        className="text-4xl leading-tight mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#493751" }}
      >
        Pattern
      </h1>
      <h1
        className="text-4xl leading-tight italic mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B375A0" }}
      >
        Map
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        Tap the patterns you recognize. Watch for them in real time this weekend.
      </p>

      <div className="space-y-1">
        {PATTERNS.map((p) => (
          <GuideSelectable
            key={p.id}
            fieldId={p.id}
            label={p.name}
            description={p.desc}
            selected={fields[p.id] === "true"}
            onChange={onFieldChange}
            number={p.number}
          />
        ))}
      </div>

      <div
        className="mt-6 p-4 rounded-2xl"
        style={{ borderLeft: "3px solid #B375A0", background: "transparent" }}
      >
        <p className="text-base italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}>
          "Patterns aren't failures. They're protective strategies that made sense at some point."
        </p>
      </div>
    </div>
  );
}
