import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  TrendingUp,
  Zap,
  Heart,
  MessageCircle,
  Quote,
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Language } from "@/data/content";

interface CoreBenefitsProps {
  content: {
    title: string;
    subtitle: string;
    quote: {
      text: string;
      author: string;
    };
    benefits: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      keyPoints: string[];
    }>;
  };
  language: Language;
}

export default function CoreBenefits({ content, language }: CoreBenefitsProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我看到了核心收穫介紹，希望能了解如何開始獲得這些職涯提升效果。"
      : "Hello! I've seen the core benefits and would like to learn how to start gaining these career enhancement effects.";

  const whatsappLink = generateWhatsAppLink("85297020812", whatsappMessage);

  // Get benefit icon component
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "Target":
        return Target;
      case "TrendingUp":
        return TrendingUp;
      case "Zap":
        return Zap;
      case "Heart":
        return Heart;
      default:
        return Target;
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2
            className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-6 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {content.title}
          </h2>
          <p
            className={`text-xl text-neutral-600 max-w-3xl mx-auto mb-8 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {content.subtitle}
          </p>

          {/* Inspirational Quote */}
          {/*<div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <blockquote
                  className={`text-2xl md:text-3xl font-medium text-neutral-800 italic leading-relaxed mb-4 ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  "{content.quote.text}"
                </blockquote>
                <cite
                  className={`text-lg text-primary font-semibold ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  — {content.quote.author}
                </cite>
              </div>
            </div>
          </div>*/}
        </div>

        {/* Core Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {content.benefits.map((benefit, index) => {
            const IconComponent = getBenefitIcon(benefit.icon);

            return (
              <Card
                key={benefit.id}
                className={`group relative bg-white border border-neutral-200 hover:border-primary/30 card-elevated transition-all duration-500 hover:scale-105 fade-in-up stagger-${(index % 2) + 1}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle
                        className={`text-xl font-bold text-neutral-800 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {benefit.title}
                      </CardTitle>
                      {/*<Badge
                        variant="outline"
                        className={`text-xs mt-2 border-primary/30 text-primary ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {language === "zh" ? "核心收穫" : "Core Benefit"}
                      </Badge>*/}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Main Description */}
                  <p
                    className={`text-neutral-700 leading-relaxed mb-6 ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {benefit.description}
                  </p>

                  {/* Key Points */}
                  <div className="space-y-3">
                    <h4
                      className={`font-semibold text-sm text-neutral-800 mb-3 ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {language === "zh" ? "關鍵要素：" : "Key Elements:"}
                    </h4>
                    {benefit.keyPoints.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p
                          className={`text-sm text-neutral-600 leading-relaxed ${
                            language === "zh" ? "font-chinese" : ""
                          }`}
                        >
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Benefit Highlight */}
                  {/*<div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border-l-4 border-primary">
                    <p
                      className={`text-sm text-primary font-medium ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {language === "zh"
                        ? "幾個小時的引導晤談可能讓您終身受惠！"
                        : "A few hours of guided sessions can benefit you for life!"}
                    </p>
                  </div>*/}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Impact Statistics */}
        {/*<div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl p-8 md:p-12 text-white mb-12 fade-in-up stagger-3">
          <div className="text-center mb-8">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
              language === 'zh' ? 'font-chinese' : ''
            }`}>
              {language === 'zh' ? '客戶普遍獲得的核心收穫' : 'Core Benefits Clients Typically Gain'}
            </h3>
            <p className={`text-lg text-neutral-300 ${
              language === 'zh' ? 'font-chinese' : ''
            }`}>
              {language === 'zh'
                ? '每位客戶的目標、需求與個人情況不同，因此收穫也各不相同'
                : 'Each client\'s goals, needs, and personal situation differ, so benefits vary accordingly'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-secondary">✓</div>
              <p className={`text-sm ${language === 'zh' ? 'font-chinese' : ''}`}>
                {language === 'zh' ? '目標更明確' : 'Clearer Goals'}
              </p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-secondary">✓</div>
              <p className={`text-sm ${language === 'zh' ? 'font-chinese' : ''}`}>
                {language === 'zh' ? '自信心提升' : 'Increased Confidence'}
              </p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-secondary">✓</div>
              <p className={`text-sm ${language === 'zh' ? 'font-chinese' : ''}`}>
                {language === 'zh' ? '行動動力提升' : 'Enhanced Motivation'}
              </p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-secondary">✓</div>
              <p className={`text-sm ${language === 'zh' ? 'font-chinese' : ''}`}>
                {language === 'zh' ? '安心與踏實感' : 'Peace of Mind'}
              </p>
            </div>
          </div>
        </div>*/}

        {/* Call to Action */}
        <div className="text-center fade-in-up stagger-4">
          <h3
            className={`text-2xl md:text-3xl font-bold text-neutral-800 mb-4 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "準備好獲得這些核心收穫了嗎？"
              : "Ready to Gain These Core Benefits?"}
          </h3>
          <p
            className={`text-lg text-neutral-600 mb-8 max-w-2xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "讓我們透過專業引導，助您實現職涯目標並獲得這些寶貴的收穫。"
              : "Let us help you achieve your career goals and gain these valuable benefits through professional guidance."}
          </p>
          <Button
            size="xl"
            variant="consultation"
            asChild
            className={`shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === "zh"
                ? "開始獲得這些收穫"
                : "Start Gaining These Benefits"}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
