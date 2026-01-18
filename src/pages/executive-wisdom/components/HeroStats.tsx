import { Users, Clock, UserCheck } from "lucide-react";
import type { Language } from "@/data/content";

interface HeroStatsProps {
  stats: {
    clients: string;
    coachingHours: string;
    interviews: string;
  };
  language: Language;
}

export default function HeroStats({ stats, language }: HeroStatsProps) {
  const statItems = [
    {
      value: stats.clients,
      label: language === "zh" ? "服務客戶" : "Clients Served",
      icon: Users,
    },
    {
      value: stats.coachingHours,
      label: language === "zh" ? "引導時數" : "Coaching Hours",
      icon: Clock,
    },
    {
      value: stats.interviews,
      label: language === "zh" ? "面試人選" : "Interviewees",
      icon: UserCheck,
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10">
      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {statItems.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-secondary/20 rounded-full border border-secondary/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div
                    className={`text-xs md:text-sm text-neutral-600 font-medium ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
