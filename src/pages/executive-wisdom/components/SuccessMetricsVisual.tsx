import { TrendingUp, Target, ThumbsUp, CheckCircle } from "lucide-react";
import type { Language } from "@/data/content";

interface SuccessMetricsVisualProps {
  stats: {
    efficiencyRate: string;
    efficiencyDescription: string;
    maxSessions: string;
    maxSessionsDescription: string;
    satisfaction: string;
    satisfactionDescription: string;
  };
  language: Language;
}

export default function SuccessMetricsVisual({
  stats,
  language,
}: SuccessMetricsVisualProps) {
  const metrics = [
    {
      value: stats.efficiencyRate,
      description: stats.efficiencyDescription,
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      value: stats.maxSessions,
      description: stats.maxSessionsDescription,
      icon: Target,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      value: stats.satisfaction,
      description: stats.satisfactionDescription,
      icon: ThumbsUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-secondary" />
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-4 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh" ? "實證成效" : "Proven Results"}
          </h2>
          <p
            className={`text-xl text-neutral-300 max-w-2xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "數據說話：我的客戶真實達成的引導成效"
              : "The numbers speak for themselves: real outcomes from my clients"}
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;

            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${metric.bgColor} flex items-center justify-center mb-6`}
                  >
                    <IconComponent
                      className={`w-7 h-7 bg-gradient-to-r ${metric.color} bg-clip-text`}
                      style={{
                        color: metric.color.includes("blue")
                          ? "#3b82f6"
                          : metric.color.includes("green")
                          ? "#22c55e"
                          : "#a855f7",
                      }}
                    />
                  </div>

                  {/* Value */}
                  <div className="mb-4">
                    <span
                      className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                    >
                      {metric.value}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-neutral-300 text-lg leading-relaxed ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {metric.description}
                  </p>
                </div>

                {/* Decorative glow effect on hover */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${metric.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </div>
            );
          })}
        </div>

        {/* Additional note */}
        <div className="text-center mt-12">
          <p
            className={`text-neutral-400 text-sm ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "* 數據基於客戶回饋問卷統計"
              : "* Data based on client feedback surveys"}
          </p>
        </div>
      </div>
    </section>
  );
}
