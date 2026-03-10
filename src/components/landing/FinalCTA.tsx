import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="py-20 px-4" style={{ background: "#9B5586" }}>
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4" style={{ color: "#FFFFFF" }}>
          Any 30 days can be your reset.
        </h2>
        <p className="font-body text-lg mb-8" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          The best time to start was 30 days ago. The second best time is today.
        </p>
        <Link
          to="/app"
          className="btn-pill inline-flex px-10 py-4 text-base font-medium hover:opacity-90"
          style={{ background: "#F9F0F5", color: "#9B5586" }}
        >
          Start the Challenge Free
        </Link>
      </div>
    </section>
  );
}
