import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Standard",
    price: "$0",
    period: "always",
    features: [
      "Skool community access",
      "Monthly no-spend challenges",
      "7-Day Spending Tracker",
      "Pattern Quiz, Impulse Brake, Decision Matrix",
    ],
    cta: "Join Free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$9",
    period: "/mo",
    features: [
      "Everything in Standard",
      "Monthly themed challenge",
      "Monthly live check-in",
      "Current month's tool",
    ],
    cta: "Go Premium",
    highlight: true,
  },
  {
    name: "VIP",
    price: "$99",
    period: "/year",
    features: [
      "Everything in Premium",
      "Quarterly Live VIP Reset",
      "Updated No Spend Journal and Guide",
      "Full No Spend Toolkit",
      "Full content archives",
      "Founding rate locked forever (first 100 members)",
    ],
    cta: "Join VIP",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Pricing</p>
          <h2 className="display-heading text-3xl md:text-4xl mb-4">No contracts. No pressure.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card-soft flex flex-col ${
                tier.highlight ? "md:scale-[1.02]" : ""
              }`}
              style={tier.highlight ? { background: "#9B5586" } : undefined}
            >
              <p className={`font-body font-medium text-base md:text-sm mb-1 ${
                tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>{tier.name}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={`font-display text-4xl font-bold ${
                  tier.highlight ? "text-primary-foreground" : "text-foreground"
                }`}>{tier.price}</span>
                <span className={`font-body text-base md:text-sm ${
                  tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>{tier.period}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={`font-body text-base md:text-sm flex items-start gap-2 ${
                    tier.highlight ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    <span className={`mt-0.5 ${tier.highlight ? "text-primary-foreground/70" : "text-secondary"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/app"
                className={tier.highlight
                  ? "btn-pill inline-flex items-center justify-center px-8 py-3 min-h-[44px] text-center font-medium transition-all duration-200 hover:opacity-90"
                  : "btn-pill-outline text-center min-h-[44px]"
                }
                style={tier.highlight ? { background: "#F9F0F5", color: "#9B5586", borderRadius: "100px" } : undefined}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-base md:text-sm font-medium text-foreground mt-8">
          First 100 members lock founding rates forever. Pricing increases after that.
        </p>
        <p className="text-center font-body text-base md:text-sm text-muted-foreground mt-3">
          No guilt trips when you leave. We'd check a Rainbows pattern if that were us.
        </p>
      </div>
    </section>
  );
}
