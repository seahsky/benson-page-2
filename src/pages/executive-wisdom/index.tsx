import { useState } from "react";
import { content, type Language } from "@/data/content";
import TopNavigation from "./components/TopNavigation";
import HeroSection from "./components/HeroSection";
import CoreBenefits from "./components/CoreBenefits";
import ServiceShowcase from "./components/ServiceShowcase";
import PricingSection from "./components/PricingSection";
import SuccessStories from "./components/SuccessStories";
import ProfessionalAuthority from "./components/ProfessionalAuthority";
import AdditionalOfferings from "./components/AdditionalOfferings";
import CommunityConnection from "./components/CommunityConnection";

export default function ExecutiveWisdom() {
  const [language, setLanguage] = useState<Language>("en");
  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation
        navigation={currentContent.navigation}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Hero Section */}
      <section id="home">
        <HeroSection content={currentContent.hero} language={language} />
      </section>

      {/* Professional Authority - Why Benson */}
      <section id="why-benson">
        <ProfessionalAuthority
          content={currentContent.authority}
          language={language}
        />
      </section>

      {/* Core Benefits */}
      <section id="core-benefits">
        <CoreBenefits
          content={currentContent.coreBenefits}
          language={language}
        />
      </section>

      {/* Services Showcase */}
      <section id="services">
        <ServiceShowcase
          content={currentContent.services}
          language={language}
        />
      </section>

      {/* Success Stories */}
      <section id="success-stories">
        <SuccessStories
          content={currentContent.successStories}
          language={language}
        />
      </section>

      {/* Pricing Section - Fees */}
      <section id="fees">
        <PricingSection content={currentContent.pricing} language={language} />
      </section>

      {/* Additional Offerings - Only show if Chinese and items exist */}
      {language === "zh" &&
        currentContent.additionalOfferings.courses.length > 0 && (
          <section id="additional-courses">
            <AdditionalOfferings
              content={currentContent.additionalOfferings}
              language={language}
            />
          </section>
        )}

      {/* Community Connection */}
      <CommunityConnection
        content={currentContent.contact}
        language={language}
      />
    </div>
  );
}
