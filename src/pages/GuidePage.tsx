import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GuideShell from "@/components/guides/GuideShell";
import { WEEKEND_SECTIONS } from "@/components/guides/weekend";
import { WEEK_SECTIONS } from "@/components/guides/week";
import { MONTH_SECTIONS } from "@/components/guides/month";

const GUIDES: Record<
  string,
  { title: string; subtitle: string; sections: typeof WEEKEND_SECTIONS }
> = {
  weekend: {
    title: "No-Spend Weekend",
    subtitle: "A 3-Day Spending Pattern Mini-Guide",
    sections: WEEKEND_SECTIONS,
  },
  week: {
    title: "No-Spend Week",
    subtitle: "The Awareness Edition — 7 Days of Noticing",
    sections: WEEK_SECTIONS,
  },
  month: {
    title: "The 30-Day Challenge",
    subtitle: "A Pattern-Based Guide to Intentional Spending",
    sections: MONTH_SECTIONS,
  },
};

export default function GuidePage() {
  const { guideId } = useParams<{ guideId: string }>();
  const { user, loading } = useAuth();

  // TODO: Re-enable auth gate before launch
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="font-body text-muted-foreground animate-pulse">Loading...</p>
  //     </div>
  //   );
  // }
  // if (!user) return <Navigate to="/login" replace />;

  const guide = guideId ? GUIDES[guideId] : undefined;
  if (!guide) return <Navigate to="/lab" replace />;

  return (
    <GuideShell
      guideId={guideId!}
      title={guide.title}
      subtitle={guide.subtitle}
      sections={guide.sections}
    />
  );
}
