import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const STORAGE_KEY = "nsh-beta-welcome-seen";

const STARTING_POINTS = [
  {
    slug: "pattern-quiz",
    name: "Spending Patterns Quiz",
    description:
      "18 questions to find out which spending patterns are running the show. Takes about 4 minutes.",
    emoji: "🎯",
  },
  {
    slug: "impulse-brake",
    name: "Impulse Brake",
    description:
      "A 7-question reality check before you buy something. The 48-hour rule, automated.",
    emoji: "🛑",
  },
  {
    slug: "activity-generator",
    name: "No-Spend Activity Generator",
    description:
      "Bored and tempted to browse? This gives you something to do instead. Instant, free, no login.",
    emoji: "🎲",
  },
];

export function useBetaWelcome() {
  const { user } = useAuth();
  const seen = localStorage.getItem(STORAGE_KEY) === "true";
  const shouldShow = !!user && !seen;
  return { shouldShow };
}

export function dismissBetaWelcome() {
  localStorage.setItem(STORAGE_KEY, "true");
}

interface BetaWelcomeModalProps {
  open: boolean;
  onDismiss: () => void;
}

export default function BetaWelcomeModal({
  open,
  onDismiss,
}: BetaWelcomeModalProps) {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (!open) return null;

  function handleDismiss() {
    dismissBetaWelcome();
    onDismiss();
  }

  async function handleFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!feedback.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: feedback.trim(),
          email: user?.email || "anonymous",
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setFeedbackSent(true);
      setFeedback("");
      toast.success("Feedback sent. Thank you.");
    } catch {
      toast.error("Could not send feedback. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white rounded-[20px] p-8 md:p-10 relative"
        style={{ boxShadow: "var(--shadow-card-hover)" }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <p className="section-label mb-2">Beta</p>
        <h1
          className="font-display text-3xl md:text-4xl font-semibold mb-3"
          style={{ color: "#493751" }}
        >
          Welcome to No Spend Hub
        </h1>
        <p className="body-text text-base leading-relaxed mb-8 max-w-xl">
          This is a beta. You are one of the first people here, and your
          experience matters. Everything you see is still being shaped. Poke
          around, try things, and tell us what you notice. Your feedback goes
          directly into what gets built next.
        </p>

        {/* Starting points */}
        <h2
          className="font-display text-xl font-semibold mb-4"
          style={{ color: "#493751" }}
        >
          Three places to start
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {STARTING_POINTS.map((tool) => (
            <Link
              key={tool.slug}
              to={`/lab/${tool.slug}`}
              onClick={handleDismiss}
              className="card-soft p-5 transition-all duration-200 hover:-translate-y-0.5 block"
            >
              <span className="text-2xl mb-2 block">{tool.emoji}</span>
              <h3
                className="font-display text-lg font-semibold mb-1"
                style={{ color: "#493751" }}
              >
                {tool.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Feedback */}
        <div
          className="rounded-[16px] p-6 mb-8"
          style={{ backgroundColor: "#F8F1F2" }}
        >
          <h2
            className="font-display text-xl font-semibold mb-2"
            style={{ color: "#493751" }}
          >
            Quick feedback
          </h2>
          {feedbackSent ? (
            <p className="body-text text-sm text-muted-foreground">
              Received. We read every one of these.
            </p>
          ) : (
            <>
              <p className="body-text text-sm text-muted-foreground mb-3">
                Anything you want us to know. Bugs, confusion, ideas, vibes.
                All useful.
              </p>
              <form onSubmit={handleFeedback} className="space-y-3">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Something I noticed..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting || !feedback.trim()}
                  className="btn-pill-primary text-sm px-6 py-2 disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send feedback"}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Dismiss CTA */}
        <button
          onClick={handleDismiss}
          className="btn-pill-outline w-full text-base py-3"
        >
          Got it, take me to the Lab
        </button>
      </div>
    </div>
  );
}
