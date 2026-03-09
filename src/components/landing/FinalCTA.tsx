import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="py-20 px-4" style={{ background: "hsl(var(--purple))" }}>
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
          Any 30 days can be your reset.
        </h2>
        <p className="font-body text-lg text-primary-foreground/80 mb-8">
          The best time to start was 30 days ago. The second best time is today.
        </p>
        <Link
          to="/app"
          className="btn-pill inline-flex bg-card text-foreground hover:bg-card/90 px-10 py-4 text-base font-medium"
        >
          Start the Challenge Free
        </Link>
      </div>
    </section>
  );
}
