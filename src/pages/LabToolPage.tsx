import { lazy, Suspense, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LAB_TOOLS } from "@/lib/lab-tools";
import { useAuth } from "@/contexts/AuthContext";

// Static map of lazy-loaded feature components.
// Each import points to the feature's standalone App.jsx.
const featureComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "pattern-quiz": lazy(() => import("@/features/pattern-quiz/src/App")),
  "impulse-brake": lazy(() => import("@/features/impulse-brake/src/App")),
  "subscription-audit": lazy(() => import("@/features/subscription-audit/src/App")),
  "c3-single-action": lazy(() => import("@/features/c3-single-action/src/App")),
  "trigger-quiz": lazy(() => import("@/features/trigger-quiz/src/App")),
  "activity-generator": lazy(() => import("@/features/activity-generator/src/App")),
  "comfort-menu": lazy(() => import("@/features/comfort-menu/src/App")),
  "journal-30day": lazy(() => import("@/features/journal-30day/src/App")),
  "challenge-roadmap": lazy(() => import("@/features/challenge-roadmap/src/App")),
  "commitment-builder": lazy(() => import("@/features/commitment-builder/src/App")),
  "four-lenses-diagnostic": lazy(() => import("@/features/four-lenses-diagnostic/src/App")),
  "expense-log": lazy(() => import("@/features/expense-log/src/App")),
  "subscription-analyzer": lazy(() => import("@/features/subscription-analyzer/src/App")),
  "savings-calculator": lazy(() => import("@/features/savings-calculator/src/App")),
  "marketing-decoder": lazy(() => import("@/features/marketing-decoder/src/App")),
  "digital-declutter": lazy(() => import("@/features/digital-declutter/src/App")),
  "meal-planner": lazy(() => import("@/features/meal-planner/src/App")),
  "decision-matrix": lazy(() => import("@/features/decision-matrix/src/App")),
  "crisis-helper": lazy(() => import("@/features/crisis-helper/src/App")),
  "rumination-interrupter": lazy(() => import("@/features/rumination-interrupter/src/App")),
  "lab-loop-tracker": lazy(() => import("@/features/lab-loop-tracker/src/App")),
  "testing-lab": lazy(() => import("@/features/testing-lab/src/App")),
  "nospendlandia": lazy(() => import("@/features/nospendlandia/src/App")),
};

export default function LabToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, loading } = useAuth();

  const tool = useMemo(
    () => LAB_TOOLS.find((t) => t.slug === slug),
    [slug],
  );

  if (!tool) return <Navigate to="/lab" replace />;

  // Gate check: email-tier tools require captured email
  if (tool.tier === "email") {
    const captured = localStorage.getItem("nsh-email-captured") === "true";
    if (!captured) return <Navigate to="/lab" replace />;
  }

  // Gate check: login-tier tools require authentication
  if (tool.tier === "login") {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="font-body text-muted-foreground animate-pulse">Loading…</p>
        </div>
      );
    }
    if (!user) return <Navigate to="/login" replace />;
  }

  const FeatureApp = featureComponents[tool.featureDir];
  if (!FeatureApp) return <Navigate to="/lab" replace />;

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center h-14 px-4 gap-4">
          <Link
            to="/lab"
            className="inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lab
          </Link>
          <span className="font-display text-sm font-semibold" style={{ color: "#493751" }}>
            {tool.emoji} {tool.name}
          </span>
        </div>
      </div>

      {/* Feature app container */}
      <div className="pt-14">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="font-body text-muted-foreground animate-pulse">
                Loading {tool.name}…
              </p>
            </div>
          }
        >
          <FeatureApp />
        </Suspense>
      </div>
    </div>
  );
}
