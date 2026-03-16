import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 px-4 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="display-heading mb-6">
            Your spending is data.{" "}
            <em className="font-accent italic text-primary">Not a verdict.</em>
          </h1>
          <p className="hero-sub body-text text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            Thirty days of watching your spending without trying to fix it first. The noticing does more work than you'd expect.
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <Link to="/app" className="btn-pill-primary text-base">
              Join Free
            </Link>
            <a href="#how-it-works" className="btn-pill-outline text-base">
              See How It Works
            </a>
          </div>
          <p className="text-base md:text-sm text-muted-foreground font-body">
            No credit card. No judgment. You can't do this wrong.
          </p>
        </motion.div>

        {/* Right Column — Floating Cards */}
        <div className="relative h-[420px] hidden md:block">
          {/* Card 1: Check-in */}
          <motion.div
            className="card-soft absolute top-0 right-0 w-72 float-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="font-body font-medium text-sm text-muted-foreground mb-1">Day 12 Check-in</p>
            <p className="font-body text-sm text-foreground mb-3">
              You spent. That's not a failure. That's a data point. Which pattern was running?
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="chip-purple">🌈 Rainbows</span>
              <span className="chip-peach">🍑 Ambrosia</span>
              <span className="chip-sage">☀️ Sunshine</span>
            </div>
          </motion.div>

          {/* Card 2: Stats — mauve background */}
          <motion.div
            className="absolute top-36 left-0 w-64 rounded-soft p-5 float-2"
            style={{ background: "#9B5586", borderRadius: "20px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="font-body font-medium text-sm text-primary-foreground/70 mb-2">Challenge Stats</p>
            <div className="space-y-1.5">
              <p className="font-body text-primary-foreground text-sm">No-spend days <span className="font-medium">18/30</span></p>
              <p className="font-body text-primary-foreground text-sm">Freed up <span className="font-medium">$340</span></p>
              <p className="font-body text-primary-foreground text-sm">Pattern caught: <span className="font-medium">Rainbows 🌈</span></p>
            </div>
          </motion.div>

          {/* Card 3: Quote — lavender background with plum text */}
          <motion.div
            className="absolute bottom-0 right-8 w-60 rounded-soft p-5 float-3"
            style={{ background: "#E0DAE7", borderRadius: "20px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="font-accent italic text-lg mb-1" style={{ color: "#493751" }}>
              "You can't do this wrong."
            </p>
            <p className="font-body text-sm text-foreground">The only rule</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
