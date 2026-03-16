import type { GuideSection } from "../GuideShell";
import CoverSection from "./CoverSection";
import WelcomeSection from "./WelcomeSection";
import ReleaseSection from "./ReleaseSection";
import C3Section from "./C3Section";
import ContainerSection from "./ContainerSection";
import { createWeekSections } from "./WeekSection";
import IntegrationSection from "./IntegrationSection";

export const MONTH_SECTIONS: GuideSection[] = [
  { id: "cover", label: "Cover", shortLabel: "Cover", component: CoverSection },
  { id: "welcome", label: "Welcome", shortLabel: "Welcome", component: WelcomeSection },
  { id: "release", label: "Before You Start", shortLabel: "Release", component: ReleaseSection },
  { id: "c3", label: "The C3 Framework", shortLabel: "C3", component: C3Section },
  { id: "container", label: "Your 30-Day Container", shortLabel: "Setup", component: ContainerSection },
  ...createWeekSections(),
  { id: "integration", label: "Integration & What's Next", shortLabel: "Finish", component: IntegrationSection },
];
