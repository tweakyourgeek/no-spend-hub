import { Link } from "react-router-dom";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import { CHASING_PATTERNS } from "@/data/chasing-patterns";

export default function PatternsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link
            to="/"
            className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
          >
            &larr; Back to home
          </Link>
          <p className="section-label mb-3">Patterns</p>
          <h1 className="display-heading text-4xl md:text-5xl mb-4">
            The Six Chasing Patterns
          </h1>
          <p
            className="font-display text-xl md:text-2xl italic mb-6"
            style={{ color: "#B375A0" }}
          >
            Spending patterns aren't flaws. They're data with a history.
          </p>
          <p className="body-text text-base md:text-lg max-w-2xl leading-relaxed">
            A Chasing Pattern is the emotional logic underneath a purchase. Not
            what you bought. Why it made sense at the time. Recognizing yours is
            the first move.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHASING_PATTERNS.map((pattern) => (
              <Link
                key={pattern.slug}
                to={`/patterns/${pattern.slug}`}
                className="group rounded-[20px] p-6 transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: pattern.color,
                  color: pattern.textColor,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <h2
                  className="font-display text-2xl font-semibold mb-2"
                  style={{ color: pattern.textColor }}
                >
                  {pattern.name}
                </h2>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: pattern.textColor, opacity: 0.85 }}
                >
                  {pattern.oneLiner}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
