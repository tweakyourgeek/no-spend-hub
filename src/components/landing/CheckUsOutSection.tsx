import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const bullets = [
  "You've opened your bank statement and immediately closed it.",
  "You have a budget. You have never actually looked at your budget.",
  "You know exactly which apps you open when you're stressed. One of them is a retailer.",
  "\u201CRetail therapy\u201D is a phrase you use without irony.",
  "Someone has told you to \u201Cjust stop spending\u201D and you had feelings about that.",
  "You want to understand your patterns. Not be told to stop having them.",
  "You\u2019ve tried the 30-day challenge before. It lasted eleven days. That counts.",
];

export default function CheckUsOutSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#F9F0F5" }}>
      <div className="container mx-auto max-w-3xl">
        <p className="section-label mb-3">Check us out if</p>
        <h2 className="display-heading text-3xl md:text-4xl mb-10">
          This might be for you if&hellip;
        </h2>

        <ul className="space-y-4 mb-10">
          {bullets.map((text, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <span
                className="mt-1.5 block h-2 w-2 rounded-full shrink-0"
                style={{ background: "#9B5586" }}
              />
              <span className="body-text text-base leading-relaxed">{text}</span>
            </motion.li>
          ))}
        </ul>

        <p className="font-accent italic text-lg md:text-xl leading-relaxed mb-8" style={{ color: "#493751" }}>
          If any of that landed, the community is free to join. No commitment, no credit card, no transformation arc required.
        </p>

        <Link to="/app" className="btn-pill-primary text-base">
          Join Free
        </Link>
      </div>
    </section>
  );
}
