import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Community access", "Pattern quiz", "Quick-start guide", "Basic worksheets", "Quarterly challenge access"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$27",
    period: "/mo",
    features: ["Everything in Free", "Complete No-Spend Guide (personal + business)", "Premium spreadsheet pack", "Monthly workshops", "Current month content"],
    cta: "Go Premium",
    highlight: true,
  },
  {
    name: "VIP",
    price: "$97",
    period: "/mo",
    features: ["Everything in Premium", "17 custom GPTs", "Live co-working sessions", "VIP workshops", "Full content archives"],
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
                tier.highlight ? "ring-2 ring-primary scale-[1.02]" : ""
              }`}
            >
              <p className="font-body font-medium text-sm text-muted-foreground mb-1">{tier.name}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-display text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="font-body text-sm text-muted-foreground">{tier.period}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="font-body text-sm text-foreground flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/app"
                className={tier.highlight ? "btn-pill-primary text-center" : "btn-pill-outline text-center"}
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
