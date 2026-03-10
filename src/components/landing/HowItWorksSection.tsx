import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const weeks = [
  {
    label: "Week 1",
    title: "Starting the Experiment",
    theme: "Curiosity, not commitment",
    description: "Name why you're here. Notice what comes up when you interrupt a habit. Nothing to fix. Just data to collect.",
  },
  {
    label: "Week 2",
    title: "Meeting Resistance",
    theme: "The work, not failure",
    description: "Triggers will show up. That's the point. Resistance is information, not a sign you're doing it wrong.",
  },
  {
    label: "Week 3",
    title: "What's Enough?",
    theme: "Identity and comparison",
    description: "Notice what you buy to feel like yourself. Ask what enough looks like. You might surprise yourself.",
  },
  {
    label: "Week 4",
    title: "What Comes Next",
    theme: "Integration",
    description: "Sit with wanting without answering immediately. What does this 30 days want you to know?",
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <p className="section-label mb-3">The 30 Days</p>
        <h2 className="display-heading text-3xl md:text-4xl mb-10">
          Four weeks. Four different jobs.
        </h2>

        <div className="flex flex-wrap gap-3 mb-8">
          {weeks.map((w, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`btn-pill text-sm px-5 py-2 transition-all ${
                active === i
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:opacity-80"
              }`}
              style={{
                background: active === i ? "#9B5586" : "#F9F0F5",
              }}
            >
              {w.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="card-soft border-l-4 pl-8"
            style={{ borderLeftColor: "#9B5586" }}
          >
            <h3 className="font-display text-2xl font-semibold mb-1">{weeks[active].title}</h3>
            <p className="font-body font-medium text-sm text-primary mb-4">{weeks[active].theme}</p>
            <p className="body-text text-base leading-relaxed">{weeks[active].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
