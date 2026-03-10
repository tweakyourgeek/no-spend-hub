import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "always",
    features: [
      "Skool community access",
      "Pattern quiz",
      "Quick-start guide",
      "Basic worksheets",
      "Quarterly challenge access (30 Bags, Pantry, Holiday, No-Spend)",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$27",
    period: "/mo",
    features: [
      "Everything in Free",
      "Complete No-Spend Guide (personal + business editions)",
      "Premium spreadsheet pack",
      "Monthly workshops",
      "Current month content",
    ],
    cta: "Go Premium",
    highlight: true,
  },
  {
    name: "VIP",
    price: "$97",
    period: "/year",
    features: [
      "Everything in Premium",
      "17 custom GPTs",
      "Live co-working sessions",
      "VIP workshops",
      "Full content archives",
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
                tier.highlight ? "scale-[1.02]" : ""
              }`}
              style={tier.highlight ? { background: "#9B5586" } : undefined}
            >
              <p className={`font-body font-medium text-sm mb-1 ${
                tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>{tier.name}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={`font-display text-4xl font-bold ${
                  tier.highlight ? "text-primary-foreground" : "text-foreground"
                }`}>{tier.price}</span>
                <span className={`font-body text-sm ${
                  tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>{tier.period}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={`font-body text-sm flex items-start gap-2 ${
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
                  ? "btn-pill inline-flex items-center justify-center px-8 py-3 text-center font-medium transition-all duration-200 hover:opacity-90"
                  : "btn-pill-outline text-center"
                }
                style={tier.highlight ? { background: "#F9F0F5", color: "#9B5586", borderRadius: "100px" } : undefined}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-sm text-muted-foreground mt-8">
          No guilt trips when you leave. We'd check a Rainbows pattern if that were us.
        </p>
      </div>
    </section>
  );
}
