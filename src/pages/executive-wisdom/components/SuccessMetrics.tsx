import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Award, CheckCircle2 } from "lucide-react";
import type { Language } from "@/data/content";

interface SuccessMetricsProps {
  content: {
    clients: string;
    coachingHours: string;
    interviews: string;
    efficiencyRate: string;
    efficiencyDescription: string;
    maxSessions: string;
    maxSessionsDescription: string;
    satisfaction: string;
    satisfactionDescription: string;
    sectionTitle: string;
    sectionSubtitle: string;
  };
  language: Language;
}

export default function SuccessMetrics({
  content,
  language,
}: SuccessMetricsProps) {
  const metrics = [
    {
      icon: TrendingUp,
      value: content.efficiencyRate,
      description: content.efficiencyDescription,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      icon: Target,
      value: content.maxSessions,
      description: content.maxSessionsDescription,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
    },
    {
      icon: Award,
      value: content.satisfaction,
      description: content.satisfactionDescription,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-500",
    },
  ];

  const impactStats = [
    {
      icon: CheckCircle2,
      value: content.clients,
      label: language === "zh" ? "客戶" : "Clients",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      value: content.coachingHours,
      label: language === "zh" ? "引導時數" : "Coaching Hours",
      color: "text-secondary",
    },
    {
      icon: Target,
      value: content.interviews,
      label: language === "zh" ? "面試人選" : "Interviews Coached",
      color: "text-primary",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2
            className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-6 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {content.sectionTitle}
          </h2>
          <p
            className={`text-xl text-neutral-600 max-w-3xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 fade-in-up stagger-1">
          {impactStats.map((stat, index) => (
            <Card
              key={index}
              className="group bg-white border-2 border-neutral-100 hover:border-primary/30 card-elevated transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${stat.color} mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-5xl md:text-6xl font-bold ${stat.color} mb-3`}>
                  {stat.value}
                </div>
                <div
                  className={`text-lg font-semibold text-neutral-700 ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Efficiency Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up stagger-2">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className={`group ${metric.bgColor} border-2 border-transparent hover:border-primary/40 card-elevated overflow-hidden transition-all duration-300`}
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-20 h-20 ${metric.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <metric.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Large Percentage Display */}
                  <div className="relative mb-4">
                    <div
                      className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                    >
                      {metric.value}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-white rounded-full mb-4 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: metric.value,
                        animation: "slideIn 1.5s ease-out",
                      }}
                    />
                  </div>

                  {/* Description */}
                  <p
                    className={`text-base md:text-lg text-neutral-700 font-medium leading-relaxed ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {metric.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Message */}
        <div className="mt-16 text-center fade-in-up stagger-3">
          <div className="inline-block px-8 py-4 bg-primary/5 rounded-2xl border-2 border-primary/20">
            <p
              className={`text-lg md:text-xl text-neutral-800 font-semibold ${
                language === "zh" ? "font-chinese" : ""
              }`}
            >
              {language === "zh"
                ? "成效說明一切 — 大多數客戶在短期內達成目標！"
                : "Results speak for themselves — Most clients achieve their goals in record time!"}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: var(--final-width);
          }
        }
      `}</style>
    </section>
  );
}
