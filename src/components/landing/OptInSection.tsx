import { useState } from "react";

export default function OptInSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      // TODO: Send email to Mailerlite API
      // Example: await fetch("https://api.mailerlite.com/...", { method: "POST", body: JSON.stringify({ email }) });

      // TODO: Redirect to Skool invite link
      // Example: window.location.href = "https://skool.com/no-spend-collective/invite";
      console.log("Opt-in submitted:", email);
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
      </div>
    </section>
  );
}
