import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/Contract";
import Banner  from "@/components/ui/banner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <Banner />
      <FeaturesSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
