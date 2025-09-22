import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, TrendingUp, Award, Users, MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Language } from "@/data/content";

interface SuccessStoriesProps {
  content: {
    title: string;
    subtitle: string;
    cases: Array<{
      id: string;
      title: string;
      background: string;
      outcome: string;
      testimonial?: string;
      industry?: string;
    }>;
  };
  language: Language;
}

export default function SuccessStories({
  content,
  language,
}: SuccessStoriesProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我看到了很多成功案例，希望能了解如何開始我的職涯轉變之旅。"
      : "Hello! I've seen the success stories and would like to learn how to start my career transformation journey.";

  const whatsappLink = generateWhatsAppLink("85297020812", whatsappMessage);

  // Get industry icon
  const getIndustryIcon = (industry?: string) => {
    if (!industry) return Users;
    if (industry.includes("Government") || industry.includes("政府"))
      return Award;
    if (industry.includes("Management") || industry.includes("管理"))
      return TrendingUp;
    return Users;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
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
                <blockquote className={`text-2xl md:text-3xl font-medium text-neutral-800 italic leading-relaxed mb-4 ${
                  language === 'zh' ? 'font-chinese' : ''
                }`}>
                  "{language === 'zh'
                    ? '相信你能做到，你就已經成功了一半。'
                    : 'Believe you can do it, and you are already halfway to success.'
                  }"
                </blockquote>
                <cite className={`text-lg text-primary font-semibold ${
                  language === 'zh' ? 'font-chinese' : ''
                }`}>
                  — {language === 'zh' ? '羅斯福' : 'Roosevelt'}
                </cite>
              </div>
            </div>
          </div>*/}

          {/* Professional Statement */}
          <div className="text-center bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white fade-in-up stagger-5">
            <Quote className="w-12 h-12 text-secondary mx-auto mb-6" />
            <blockquote
              className={`text-xl md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto mb-6 ${
                language === "zh" ? "font-chinese" : ""
              }`}
            >
              {language === "zh"
                ? "「憑藉15年澳洲職場經驗和國際認證的專業背景，我致力於幫助華語專業人士在澳洲實現他們的職涯目標。每一次的指導都是為了讓您更自信地邁向成功。」"
                : '"With 15 years of Australian workplace experience and internationally certified professional background, I am dedicated to helping Chinese-speaking professionals achieve their career goals in Australia. Every coaching session is designed to help you move towards success with greater confidence."'}
            </blockquote>
            <p
              className={`text-lg text-secondary font-semibold ${
                language === "zh" ? "font-chinese" : ""
              }`}
            >
              — Benson Wong, ICF ACC
            </p>
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {content.cases.map((story, index) => {
            const IconComponent = getIndustryIcon(story.industry);

            return (
              <Card
                key={story.id}
                className={`group relative bg-white border border-neutral-200 hover:border-primary/30 card-elevated transition-all duration-500 hover:scale-105 fade-in-up stagger-${(index % 3) + 1}`}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                <CardHeader className="pt-8 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <CardTitle
                        className={`text-lg font-semibold text-neutral-800 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {story.title}
                      </CardTitle>
                      {story.industry && (
                        <Badge
                          variant="outline"
                          className={`text-xs mt-1 ${
                            language === "zh" ? "font-chinese" : ""
                          }`}
                        >
                          {story.industry}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Background */}
                  <div className="mb-4">
                    <h4
                      className={`font-semibold text-sm text-neutral-700 mb-2 ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {language === "zh" ? "背景：" : "Background:"}
                    </h4>
                    <p
                      className={`text-sm text-neutral-600 leading-relaxed ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {story.background.length > 120
                        ? `${story.background.substring(0, 120)}...`
                        : story.background}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="mb-4">
                    <h4
                      className={`font-semibold text-sm text-primary mb-2 ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {language === "zh" ? "成果：" : "Outcome:"}
                    </h4>
                    <p
                      className={`text-sm text-neutral-700 leading-relaxed font-medium ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {story.outcome}
                    </p>
                  </div>

                  {/* Testimonial (if available) */}
                  {story.testimonial && (
                    <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                      <p
                        className={`text-sm text-neutral-700 italic leading-relaxed ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        "
                        {story.testimonial.length > 100
                          ? `${story.testimonial.substring(0, 100)}...`
                          : story.testimonial}
                        "
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white mb-12 fade-in-up stagger-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">
                100+
              </div>
              <p
                className={`text-lg ${language === "zh" ? "font-chinese" : ""}`}
              >
                {language === "zh" ? "成功案例" : "Success Stories"}
              </p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">
                95%
              </div>
              <p
                className={`text-lg ${language === "zh" ? "font-chinese" : ""}`}
              >
                {language === "zh" ? "客戶滿意度" : "Client Satisfaction"}
              </p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">
                15+
              </div>
              <p
                className={`text-lg ${language === "zh" ? "font-chinese" : ""}`}
              >
                {language === "zh" ? "年澳洲經驗" : "Years of Experience"}
              </p>
            </div>
          </div>
        </div>

        {/* Client Outcome Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 fade-in-up stagger-5">
          {[
            {
              icon: TrendingUp,
              title: language === "zh" ? "職涯提升" : "Career Growth",
              description:
                language === "zh"
                  ? "成功轉換到理想職位"
                  : "Successfully transitioned to dream positions",
            },
            {
              icon: Award,
              title: language === "zh" ? "政府職位" : "Government Roles",
              description:
                language === "zh"
                  ? "獲得公務員永久職位"
                  : "Secured permanent public service positions",
            },
            {
              icon: Users,
              title: language === "zh" ? "自信建立" : "Confidence Building",
              description:
                language === "zh"
                  ? "重建職場自信心"
                  : "Rebuilt workplace confidence",
            },
            {
              icon: Quote,
              title: language === "zh" ? "技能轉換" : "Skill Transfer",
              description:
                language === "zh"
                  ? "成功包裝轉移技能"
                  : "Successfully packaged transferable skills",
            },
          ].map((outcome, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <outcome.icon className="w-6 h-6 text-primary" />
              </div>
              <h3
                className={`font-semibold text-neutral-800 mb-2 ${
                  language === "zh" ? "font-chinese" : ""
                }`}
              >
                {outcome.title}
              </h3>
              <p
                className={`text-sm text-neutral-600 ${
                  language === "zh" ? "font-chinese" : ""
                }`}
              >
                {outcome.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center fade-in-up stagger-6">
          <h3
            className={`text-2xl md:text-3xl font-bold text-neutral-800 mb-4 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "準備好創造您的成功故事了嗎？"
              : "Ready to Create Your Success Story?"}
          </h3>
          <p
            className={`text-lg text-neutral-600 mb-8 max-w-2xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "每一個成功故事都從第一次對話開始。讓我們一起探討如何實現您的職涯目標。"
              : "Every success story starts with a conversation. Let's explore how to achieve your career goals together."}
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
                ? "開始我的成功之旅"
                : "Start My Success Journey"}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
