import type { GuideSection } from "../GuideShell";
import CoverSection from "./CoverSection";
import WelcomeSection from "./WelcomeSection";
import { createDaySections } from "./DaySection";
import WeeklyTrackerSection from "./WeeklyTrackerSection";
import ReflectionSection from "./ReflectionSection";
import WhatsNextSection from "./WhatsNextSection";

export const WEEK_SECTIONS: GuideSection[] = [
  { id: "cover", label: "Cover", shortLabel: "Cover", component: CoverSection },
  { id: "welcome", label: "Welcome", shortLabel: "Welcome", component: WelcomeSection },
  ...createDaySections(),
  { id: "tracker", label: "Week at a Glance", shortLabel: "Tracker", component: WeeklyTrackerSection },
  { id: "reflection", label: "End of Week Reflection", shortLabel: "Reflect", component: ReflectionSection },
  { id: "next", label: "What's Next", shortLabel: "Next", component: WhatsNextSection },
];
