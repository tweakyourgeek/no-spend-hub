import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PATTERNS } from "@/lib/challenge-data";

export default function PatternsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="patterns" className="py-20 px-4" style={{ background: "hsl(var(--charcoal))" }}>
      <div className="container mx-auto max-w-4xl">
        <p className="section-label mb-3" style={{ color: "hsl(var(--purple-light))" }}>The Chasing Series</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3" style={{ color: "hsl(var(--cream))" }}>
          Six patterns. You're probably running at least two.
        </h2>
        <p className="font-body text-base mb-10" style={{ color: "hsl(var(--muted-brand))" }}>
          Not labels. Not diagnoses. Just names for the things spending is doing for you right now.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATTERNS.map((p) => (
            <motion.button
              key={p.name}
              onClick={() => setExpanded(expanded === p.name ? null : p.name)}
              className="text-left rounded-soft p-5 transition-all"
              style={{
                background: expanded === p.name ? "hsl(var(--cream))" : "hsl(var(--charcoal))",
                border: `1px solid ${expanded === p.name ? "hsl(var(--border))" : "hsl(var(--muted-brand) / 0.3)"}`,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mb-2 block">{p.emoji}</span>
              <span
                className="font-display text-lg font-semibold block mb-1"
                style={{ color: expanded === p.name ? "hsl(var(--charcoal))" : "hsl(var(--cream))" }}
              >
                {p.name}
              </span>
              <AnimatePresence>
                {expanded === p.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-body text-sm text-muted-foreground"
                  >
                    {p.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <p className="font-body text-sm mt-8 text-center" style={{ color: "hsl(var(--muted-brand))" }}>
          The full Pattern Quiz is inside the challenge. It takes about 4 minutes and will absolutely make you go "oh."
        </p>
      </div>
    </section>
  );
}
