import { useState } from "react";
import { motion } from "framer-motion";
import { PATTERNS } from "@/lib/challenge-data";

export default function PatternsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="patterns" className="py-20 px-4" style={{ background: "#3B3B58" }}>
      <div className="container mx-auto max-w-4xl">
        <p className="section-label mb-3" style={{ color: "#E0DAE7" }}>The Chasing Series</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3" style={{ color: "#F8F1F2" }}>
          Six patterns. You're probably running at least two.
        </h2>
        <p className="font-body text-base mb-10" style={{ color: "#A7AFC8" }}>
          Not labels. Not diagnoses. Just names for the things spending is doing for you right now.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATTERNS.map((p) => (
            <motion.button
              key={p.name}
              onClick={() => setExpanded(expanded === p.name ? null : p.name)}
              className="text-left rounded-soft p-5 transition-all"
              style={{
                background: expanded === p.name ? "#F9F0F5" : "#4A4A6A",
                border: `1px solid ${expanded === p.name ? "#E0DAE7" : "rgba(167, 175, 200, 0.3)"}`,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mb-2 block">{p.emoji}</span>
              <span
                className="font-display text-lg font-semibold block mb-1"
                style={{ color: expanded === p.name ? "#493751" : "#F8F1F2" }}
              >
                {p.name}
              </span>
              <p
                className="font-body text-base md:text-sm mt-1"
                style={{ color: expanded === p.name ? "#3B3B58" : "#B7BED2" }}
              >
                {p.description}
              </p>
            </motion.button>
          ))}
        </div>

        <p className="font-body text-base md:text-sm mt-8 text-center" style={{ color: "#A7AFC8" }}>
          The full Pattern Quiz is inside the challenge. It takes about 4 minutes and will absolutely make you go "oh."
        </p>
      </div>
    </section>
  );
}
