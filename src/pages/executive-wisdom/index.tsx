import { useState } from "react";
import { content, type Language } from "@/data/content";
import TopNavigation from "./components/TopNavigation";
import HeroSection from "./components/HeroSection";
import HeroStats from "./components/HeroStats";
import MyStory from "./components/MyStory";
import ProfessionalAuthority from "./components/ProfessionalAuthority";
import LanguageCulture from "./components/LanguageCulture";
import ServiceComparison from "./components/ServiceComparison";
import SuccessMetricsVisual from "./components/SuccessMetricsVisual";
import SessionTopicsGrid from "./components/SessionTopicsGrid";
import CoreBenefits from "./components/CoreBenefits";
import OrbitNetworkTestimonials from "./components/OrbitNetworkTestimonials";
import FAQSection from "./components/FAQSection";
import CommunityConnection from "./components/CommunityConnection";

export default function ExecutiveWisdom() {
  // Default to Chinese as per plan
  const [language, setLanguage] = useState<Language>("zh");
  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation
        navigation={currentContent.navigation}
        language={language}
        onLanguageChange={setLanguage}
        subtitle={currentContent.hero.subtitle}
      />

      {/* 1. Hero Section */}
      <section id="home">
        <HeroSection content={currentContent.hero} language={language} />
      </section>

      {/* Hero Stats */}
      <HeroStats stats={currentContent.stats} language={language} />

      {/* 2. Why Benson Section */}
      <section id="why-benson">
        {/* My Story */}
        <MyStory content={currentContent.myStory} language={language} />

        {/* Professional Authority */}
        <ProfessionalAuthority
          content={currentContent.authority}
          language={language}
        />

        {/* Language & Culture */}
        <LanguageCulture
          content={currentContent.languageCulture}
          language={language}
        />
      </section>

      {/* 3. Services Section */}
      <section id="services">
        {/* Service Plans Comparison */}
        <ServiceComparison
          content={currentContent.servicePlans}
          language={language}
        />

        {/* Success Metrics Visual */}
        <SuccessMetricsVisual
          stats={currentContent.stats}
          language={language}
        />

        {/* Session Topics Grid */}
        <SessionTopicsGrid
          topics={currentContent.sessionTopics}
          language={language}
          oprahQuote={currentContent.servicePlans.oprahQuote}
        />
      </section>

      {/* 4. Benefits & Success Stories Section */}
      <section id="benefits">
        {/* Core Benefits */}
        <CoreBenefits
          content={currentContent.coreBenefits}
          language={language}
        />
      </section>

      {/* Success Stories - Orbit Network */}
      <section id="success-stories">
        <OrbitNetworkTestimonials
          content={currentContent.successStories}
          language={language}
        />
      </section>

      {/* 5. FAQ Section */}
      <section id="faq">
        <FAQSection faq={currentContent.faq} language={language} />
      </section>

      {/* 6. Footer / CTA */}
      <CommunityConnection
        content={{
          title: currentContent.contact.title,
          footer: currentContent.contact.footer,
        }}
        language={language}
      />
    </div>
  );
}
