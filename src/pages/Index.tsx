import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ReleasesSection from "@/components/ReleasesSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ReleasesSection />
      <NewsSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
};

export default Index;
