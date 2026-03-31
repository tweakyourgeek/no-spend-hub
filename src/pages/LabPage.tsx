import { useState } from "react";
import { Link } from "react-router-dom";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import ToolCard from "@/components/lab/ToolCard";
import BetaWelcomeModal, { useBetaWelcome } from "@/components/BetaWelcomeModal";
import { LAB_TOOLS } from "@/lib/lab-tools";

const tiers = [
  { key: "free" as const, label: "Always Free", sublabel: "No login required" },
  { key: "email" as const, label: "Free with Email", sublabel: "One-time email to unlock" },
  { key: "login" as const, label: "Member Tools", sublabel: "Join the community to access" },
];

export default function LabPage() {
  const { shouldShow } = useBetaWelcome();
  const [showWelcome, setShowWelcome] = useState(shouldShow);

  return (
    <div className="min-h-screen bg-background">
      <BetaWelcomeModal open={showWelcome} onDismiss={() => setShowWelcome(false)} />
      <LandingNav />

      {/* Header */}
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link
            to="/"
            className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
          >
            ← Back to home
          </Link>
          <p className="section-label mb-3">The Lab</p>
          <h1 className="display-heading text-4xl md:text-5xl mb-4">
            Tools for noticing, not fixing.
          </h1>
          <p className="body-text text-base md:text-lg max-w-2xl leading-relaxed">
            Everything here is built around the same idea: your spending patterns
            are data, not a verdict. Pick a tool, poke around, see what you
            notice.
          </p>
        </div>
      </section>

      {/* Tool grid by tier */}
      {tiers.map((tier) => {
        const tools = LAB_TOOLS.filter((t) => t.tier === tier.key);
        if (tools.length === 0) return null;
        return (
          <section key={tier.key} className="pb-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-semibold" style={{ color: "#493751" }}>
                  {tier.label}
                </h2>
                <p className="font-body text-sm text-muted-foreground">
                  {tier.sublabel}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tools.map((tool, i) => (
                  <ToolCard key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <LandingFooter />
    </div>
  );
}
