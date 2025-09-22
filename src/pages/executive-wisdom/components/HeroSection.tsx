import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Award, TrendingUp, Users } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Language } from "@/data/content";
import { MinimalDraggableHeroLogo } from "@/components/MinimalDraggableHeroLogo";

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    credentials: string[];
    cta: {
      primary: string;
      secondary: string;
    };
  };
  language: Language;
}

export default function HeroSection({ content, language }: HeroSectionProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我對職涯教練服務很感興趣，希望能了解更多詳情。"
      : "Hello! I'm interested in your career coaching services and would like to learn more.";

  const whatsappLink = generateWhatsAppLink("85297020812", whatsappMessage);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-gray-200 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 border border-gray-300 rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Main Title with Professional Typography */}
            <div className="space-y-4 fade-in-up">
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 ${
                  language === "zh" ? "font-chinese" : ""
                }`}
              >
                {content.title}
              </h1>
              <h2
                className={`text-xl md:text-2xl lg:text-3xl font-medium text-primary ${
                  language === "zh" ? "font-chinese" : ""
                }`}
              >
                {content.subtitle}
              </h2>
            </div>

            {/* Professional Credentials */}
            <div className="flex flex-wrap gap-3 fade-in-up stagger-1">
              {content.credentials.map((credential, index) => (
                <Badge
                  key={index}
                  variant="credential"
                  className={`px-4 py-2 text-sm font-medium bg-primary text-white border border-primary hover:bg-primary/90 transition-colors ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  {credential}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p
              className={`text-lg md:text-xl leading-relaxed text-gray-700 fade-in-up stagger-2 ${
                language === "zh" ? "font-chinese" : ""
              }`}
            >
              {content.description}
            </p>

            {/* Core Benefits Preview */}
            <div className="space-y-4 fade-in-up stagger-3">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <TrendingUp className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1 text-gray-900 ${language === "zh" ? "font-chinese" : ""}`}
                  >
                    {language === "zh" ? "自信心提升" : "Increased Confidence"}
                  </h3>
                  <p
                    className={`text-sm text-gray-600 ${language === "zh" ? "font-chinese" : ""}`}
                  >
                    {language === "zh"
                      ? "第一次真正看見並能清楚表達自己的優勢與能力"
                      : "See and clearly articulate your strengths and abilities for the first time"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1 text-gray-900 ${language === "zh" ? "font-chinese" : ""}`}
                  >
                    {language === "zh" ? "目標更明確" : "Clearer Goals"}
                  </h3>
                  <p
                    className={`text-sm text-gray-600 ${language === "zh" ? "font-chinese" : ""}`}
                  >
                    {language === "zh"
                      ? "重新評估並清楚知道自己在職涯中真正想要的"
                      : "Re-evaluate and clearly understand what you truly want in your career"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Award className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1 text-gray-900 ${language === "zh" ? "font-chinese" : ""}`}
                  >
                    {language === "zh" ? "安心與踏實感" : "Peace of Mind"}
                  </h3>
                  <p
                    className={`text-sm text-gray-600 ${language === "zh" ? "font-chinese" : ""}`}
                  >
                    {language === "zh"
                      ? "在重大決定中獲得信心，確認做的是最適合自己的選擇"
                      : "Gain confidence in major decisions, ensuring the best choice for yourself"}
                  </p>
                </div>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 fade-in-up stagger-4">
              <Button
                size="xl"
                variant="consultation"
                asChild
                className={`bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  language === "zh" ? "font-chinese" : ""
                }`}
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {content.cta.primary}
                </a>
              </Button>

              <Button
                size="xl"
                variant="outline"
                className={`border-primary text-primary hover:bg-primary hover:text-white transition-colors ${
                  language === "zh" ? "font-chinese" : ""
                }`}
                onClick={() => {
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {content.cta.secondary}
              </Button>
            </div>
          </div>

          {/* Right Side - Draggable Interactive Logo */}
          <div className="flex justify-center lg:justify-end">
            <MinimalDraggableHeroLogo
              src="/images/benson-logo.png"
              alt="Benson Wong Career Coaching Logo"
              language={language}
              size={{
                mobile: "w-80 h-80",
                tablet: "w-96 h-96",
                desktop: "w-[28rem] h-[28rem]"
              }}
              className="drop-shadow-lg"
              disabled={false}
              debugMode={true}
              onDragStart={() => {
                // Optional: Track drag start analytics
                console.log('Hero logo drag started');
              }}
              onDragEnd={() => {
                // Optional: Track drag end analytics
                console.log('Hero logo drag ended');
              }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        {/*<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>*/}
      </div>
    </section>
  );
}
