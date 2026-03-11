import { useState } from "react";

export default function OptInSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="opt-in" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Start here. It's free.
        </h2>
        <p className="font-body text-lg text-muted-foreground mb-8">
          Drop your email and we'll send you straight to the community.
        </p>
        {success ? (
          <p className="font-body text-lg text-green-600">You're in! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="font-body text-base px-5 py-3 rounded-pill border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 flex-1 min-w-0"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-pill-primary text-base px-8 py-3 whitespace-nowrap disabled:opacity-60"
            >
              {submitting ? "Joining…" : "Join Free →"}
            </button>
          </form>
        )}
        {error && <p className="font-body text-sm text-red-500 mt-3">{error}</p>}
      </div>
    </section>
  );
}
