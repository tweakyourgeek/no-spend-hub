import type { GuideSectionProps } from "../GuideShell";

interface Alternative {
  trigger: string;
  number: number;
  reframe: string;
  ideas: string[];
}

const ALTERNATIVES: Alternative[] = [
  {
    trigger: "Boredom Spending",
    number: 1,
    reframe: "Change the input, not just the output.",
    ideas: [
      "Rearrange one thing in your space. Free, and weirdly satisfying.",
      "Go somewhere just to look: library, park, a neighborhood you haven't walked.",
      "Pick up a project you already own the materials for.",
    ],
  },
  {
    trigger: "Social Spending",
    number: 2,
    reframe: "Steer toward free versions of the same connection.",
    ideas: [
      "Host instead of going out. Same people, better couch.",
      "Suggest a walk-and-talk instead of a sit-and-spend.",
      "The yes to the plan and the no to the expensive venue can coexist. You just have to say the second part out loud.",
    ],
  },
  {
    trigger: '"I Deserve This" Spending',
    number: 3,
    reframe: "Find what you're actually after.",
    ideas: [
      "What does \"I deserve this\" mean right now? Rest? Recognition? Relief from something specific?",
      "Address that thing more directly: a nap, a long shower, a phone call that resets you.",
      "The purchase isn't inherently wrong. The question is whether it delivers what you're actually looking for.",
    ],
  },
  {
    trigger: "Errand Creep",
    number: 4,
    reframe: "Contain the exposure.",
    ideas: [
      "Write the list before you go in. Stores are environments engineered for spending, and walking in without a list is like reading the whole menu when you already know what you want.",
      "Single-item trips only, if in-store browsing is where the creep happens for you.",
      "Order necessities online if the physical store is the trigger.",
    ],
  },
  {
    trigger: "Sunday Reset Spending",
    number: 5,
    reframe: "Separate the mood from the cart.",
    ideas: [
      "Make a list of everything you want to buy. Don't buy it yet. Let it sit overnight.",
      "Clean and reorganize what you already have. The fresh-start feeling is available without the purchase.",
      "The new planner will still be there Monday.",
    ],
  },
];

export default function AlternativesSection(_props: GuideSectionProps) {
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
        Alternatives
      </h1>

      <div className="w-7 h-0.5 mb-6" style={{ background: "#A6C9BB" }} />

      <p className="text-base italic leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a5e8a" }}>
        For each of the five patterns: what the weekend is actually trying to give you, and some ways to get there without the purchase.
      </p>

      <div className="space-y-5">
        {ALTERNATIVES.map((alt) => (
          <div key={alt.number} className="p-4 rounded-2xl" style={{ background: "white" }}>
            <p
              className="text-xs font-bold uppercase tracking-[2px] mb-1"
              style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}
            >
              {alt.number} &nbsp; {alt.trigger}
            </p>
            <p
              className="text-sm italic mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}
            >
              {alt.reframe}
            </p>
            <ul className="space-y-2">
              {alt.ideas.map((idea, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
                  <span className="flex-shrink-0 text-lg leading-none" style={{ color: "#A6C9BB" }}>
                    ·
                  </span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B375A0" }}>
          The need is real. The purchase is optional.
        </p>
      </div>
    </div>
  );
}
