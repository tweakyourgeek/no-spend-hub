import type { GuideSection } from "../GuideShell";
import CoverSection from "./CoverSection";
import WelcomeSection from "./WelcomeSection";
import SetupSection from "./SetupSection";
import PatternMapSection from "./PatternMapSection";
import FridaySection from "./FridaySection";
import SaturdaySection from "./SaturdaySection";
import SundaySection from "./SundaySection";
import AlternativesSection from "./AlternativesSection";
import TrackingSection from "./TrackingSection";
import AlmostBoughtSection from "./AlmostBoughtSection";
import WhatsNextSection from "./WhatsNextSection";

export const WEEKEND_SECTIONS: GuideSection[] = [
  { id: "cover", label: "Cover", shortLabel: "Cover", component: CoverSection },
  { id: "welcome", label: "Welcome", shortLabel: "Welcome", component: WelcomeSection },
  { id: "setup", label: "Before You Start", shortLabel: "Setup", component: SetupSection },
  { id: "patterns", label: "Pattern Map", shortLabel: "Patterns", component: PatternMapSection },
  { id: "friday", label: "Friday Evening", shortLabel: "Friday", component: FridaySection },
  { id: "saturday", label: "Saturday All Day", shortLabel: "Saturday", component: SaturdaySection },
  { id: "sunday", label: "Sunday Reset", shortLabel: "Sunday", component: SundaySection },
  { id: "alternatives", label: "Weekend Alternatives", shortLabel: "Alts", component: AlternativesSection },
  { id: "tracking", label: "Tracking Sheet", shortLabel: "Tracking", component: TrackingSection },
  { id: "almost", label: "Almost Bought It", shortLabel: "Almost", component: AlmostBoughtSection },
  { id: "next", label: "What's Next", shortLabel: "Next", component: WhatsNextSection },
];
