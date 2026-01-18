import { Check, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Language, ServicePlan } from "@/data/content";
import ContactButtonMenu from "@/components/ContactButtonMenu";

interface ServiceComparisonProps {
  content: {
    quote: {
      text: string;
      author: string;
    };
    plans: ServicePlan[];
    footnotes: string[];
  };
  language: Language;
}

export default function ServiceComparison({
  content,
  language,
}: ServiceComparisonProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我對服務方案很感興趣，希望能了解更多詳情。"
      : "Hello! I'm interested in your service plans and would like to learn more.";

  // Highlight the middle plan (Action Plan) as most popular
  const highlightedPlanIndex = 1;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-6 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh" ? "服務方案" : "Service Plans"}
          </h2>

          {/* Tony Robbins Quote */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <blockquote
                  className={`text-lg md:text-xl text-neutral-700 italic leading-relaxed mb-2 ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  "{content.quote.text}"
                </blockquote>
                <cite
                  className={`text-primary font-semibold ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  — {content.quote.author}
                </cite>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {content.plans.map((plan, index) => {
            const isHighlighted = index === highlightedPlanIndex;

            return (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isHighlighted
                    ? "border-2 border-primary shadow-lg scale-105 md:scale-110 z-10"
                    : "border border-neutral-200 hover:border-primary/30"
                }`}
              >
                {/* Popular Badge */}
                {isHighlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2">
                    <span
                      className={`text-sm font-semibold ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {language === "zh" ? "最多人選擇" : "Most Popular"}
                    </span>
                  </div>
                )}

                <CardHeader className={isHighlighted ? "pt-12" : ""}>
                  <CardTitle
                    className={`text-2xl text-center ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {plan.name}
                  </CardTitle>

                  {/* Price */}
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-primary">
                      ${plan.price}
                      <span className="text-lg font-normal text-neutral-500">
                        {" "}
                        AUD
                      </span>
                    </div>
                    <div
                      className={`text-sm text-neutral-600 mt-1 ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {plan.sessions}{" "}
                      {language === "zh"
                        ? plan.sessions === 1
                          ? "次晤談"
                          : "次晤談"
                        : plan.sessions === 1
                        ? "session"
                        : "sessions"}
                    </div>
                  </div>

                  {/* Target Audience Badge */}
                  <div className="flex justify-center">
                    <Badge
                      variant="outline"
                      className={`text-xs text-center px-3 py-1 ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {plan.targetAudience}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Plan Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span
                        className={`text-neutral-600 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {language === "zh" ? "建議週期" : "Duration"}
                      </span>
                      <span
                        className={`font-medium ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {plan.suggestedDuration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className={`text-neutral-600 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {language === "zh" ? "合約期限" : "Contract"}
                      </span>
                      <span
                        className={`font-medium ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {plan.contractDuration}
                      </span>
                    </div>
                    {plan.additionalRate && (
                      <div className="flex justify-between">
                        <span
                          className={`text-neutral-600 ${
                            language === "zh" ? "font-chinese" : ""
                          }`}
                        >
                          {language === "zh" ? "加購單價" : "Add-on Rate"}
                        </span>
                        <span className="font-medium">
                          ${plan.additionalRate}/
                          {language === "zh" ? "次" : "session"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 pt-4 border-t border-neutral-100">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span
                          className={`text-sm text-neutral-700 ${
                            language === "zh" ? "font-chinese" : ""
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <ContactButtonMenu
                    label={language === "zh" ? "預約・諮詢" : "Book・Consult"}
                    language={language}
                    whatsappMessage={`${whatsappMessage} (${plan.name})`}
                    context={`service-plan-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
                    variant={isHighlighted ? "consultation" : "outline"}
                    size="lg"
                    className="w-full"
                  />

                  {/* Upgrade Info */}
                  <p
                    className={`text-xs text-center text-neutral-500 ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {plan.upgradeInfo}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footnotes */}
        <div className="text-center space-y-1">
          {content.footnotes.map((footnote, index) => (
            <p
              key={index}
              className={`text-sm text-neutral-500 ${
                language === "zh" ? "font-chinese" : ""
              }`}
            >
              {footnote}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
