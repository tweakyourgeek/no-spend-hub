import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import { getPatternBySlug } from "@/data/chasing-patterns";

export default function PatternDetailPage() {
  const { patternSlug } = useParams<{ patternSlug: string }>();
  const pattern = patternSlug ? getPatternBySlug(patternSlug) : undefined;

  useEffect(() => {
    if (pattern) {
      document.title = pattern.metaTitle;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", pattern.metaDescription);
    }
  }, [pattern]);

  if (!pattern) return <Navigate to="/patterns" replace />;

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/patterns"
            className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block"
          >
            &larr; All patterns
          </Link>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4" style={{ color: "#493751" }}>
            {pattern.name}
          </h1>
          <p className="font-display text-xl md:text-2xl italic" style={{ color: "#B375A0" }}>
            {pattern.oneLiner}
          </p>
        </div>
      </section>

      {/* What this looks like */}
      <section className="pb-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5" style={{ color: "#493751" }}>
            What this looks like
          </h2>
          {pattern.whatThisLooksLike.map((para, i) => (
            <p key={i} className="body-text text-base leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Pullquote */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <blockquote
            className="rounded-[20px] px-8 py-10 text-center"
            style={{ backgroundColor: "#493751" }}
          >
            <p
              className="font-display text-xl md:text-2xl italic leading-relaxed"
              style={{ color: "#FAFAF0" }}
            >
              "{pattern.pullquote}"
            </p>
          </blockquote>
        </div>
      </section>

      {/* What it's usually about */}
      <section className="pb-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5" style={{ color: "#493751" }}>
            What it's usually about
          </h2>
          {pattern.whatItsUsuallyAbout.map((para, i) => (
            <p key={i} className="body-text text-base leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* What helps */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5" style={{ color: "#493751" }}>
            What helps
          </h2>
          <ul className="space-y-4">
            {pattern.whatHelps.map((item, i) => (
              <li key={i} className="body-text text-base leading-relaxed pl-5 relative">
                <span
                  className="absolute left-0 top-2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: pattern.color === "#493751" ? "#E0DAE7" : pattern.color }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lab/nospendlandia" className="btn-pill-primary text-center">
              Try NoSpendLandia free
            </Link>
            <a
              href="https://www.skool.com/nospend-8052/about"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-outline text-center"
            >
              Join the No Spend Collective
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="font-body text-xs text-muted-foreground">
            This is pattern recognition, not diagnosis. Not financial advice. Not therapy.
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
