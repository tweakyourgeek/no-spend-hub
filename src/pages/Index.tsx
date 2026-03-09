import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import PhilosophyStrip from "@/components/landing/PhilosophyStrip";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PatternsSection from "@/components/landing/PatternsSection";
import ToolsSection from "@/components/landing/ToolsSection";
import PricingSection from "@/components/landing/PricingSection";
import FinalCTA from "@/components/landing/FinalCTA";
import LandingFooter from "@/components/landing/LandingFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <PhilosophyStrip />
      <HowItWorksSection />
      <PatternsSection />
      <ToolsSection />
      <PricingSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default Index;
