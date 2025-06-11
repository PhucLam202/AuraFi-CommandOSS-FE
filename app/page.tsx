import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/Contract";
import Banner  from "@/components/ui/banner";
import Header from "@/components/layouts/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <Banner />
      <FeaturesSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
