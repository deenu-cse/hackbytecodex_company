import HeroSection from "@/components/constants/Home/heroSection";
import ServiceHero from "@/components/constants/Home/service";
import LandingPage from "@/components/constants/Home/landingPage";
import KeyFindings from "@/components/constants/Home/keyFindings";
import AgencyServices from "@/components/constants/Home/agencyServices";
import PortfolioShowcase from "@/components/constants/Home/portfolioShowcase";
import GovernmentWorkSection from "@/components/constants/Home/GovernmentWorkSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServiceHero />
      <PortfolioShowcase />
      <GovernmentWorkSection />
      <LandingPage />
      <KeyFindings />
      <AgencyServices />
    </div>
  );
}
