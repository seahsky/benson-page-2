import {
  Target,
  FileText,
  Mic,
  Building,
  Brain,
  Shuffle,
  Quote,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Language, SessionTopic } from "@/data/content";

interface SessionTopicsGridProps {
  topics: SessionTopic[];
  language: Language;
  oprahQuote?: {
    text: string;
    author: string;
  };
}

// Map category to icon
const categoryIcons: Record<string, React.ElementType> = {
  "Career Goals": Target,
  "職涯目標": Target,
  "Job Application": FileText,
  "工作申請": FileText,
  "Interview Preparation": Mic,
  "面試準備": Mic,
  "Workplace Adaptation": Building,
  "職場適應": Building,
  "Mental Preparation": Brain,
  "心理建設": Brain,
  "Special Situations": Shuffle,
  "特殊情況": Shuffle,
};

// Map category to color scheme
const categoryColors: Record<string, { bg: string; icon: string; border: string }> = {
  "Career Goals": { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
  "職涯目標": { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
  "Job Application": { bg: "bg-green-50", icon: "text-green-600", border: "border-green-200" },
  "工作申請": { bg: "bg-green-50", icon: "text-green-600", border: "border-green-200" },
  "Interview Preparation": { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200" },
  "面試準備": { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200" },
  "Workplace Adaptation": { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200" },
  "職場適應": { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200" },
  "Mental Preparation": { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-200" },
  "心理建設": { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-200" },
  "Special Situations": { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-200" },
  "特殊情況": { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-200" },
};

export default function SessionTopicsGrid({
  topics,
  language,
  oprahQuote,
}: SessionTopicsGridProps) {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-4 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh" ? "晤談主題靈感" : "Session Topic Inspiration"}
          </h2>
          <p
            className={`text-xl text-neutral-600 max-w-3xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "以下是我常與客戶討論的主題，您可以參考這些方向，或帶著自己的問題來"
              : "These are common topics I discuss with clients. Feel free to use these as inspiration or bring your own questions."}
          </p>
        </div>

        {/* Topics Grid - 3x2 on desktop, 2x3 on tablet, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const IconComponent = categoryIcons[topic.category] || Target;
            const colors = categoryColors[topic.category] || {
              bg: "bg-neutral-50",
              icon: "text-neutral-600",
              border: "border-neutral-200",
            };

            return (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border ${colors.border} ${colors.bg}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm`}
                    >
                      <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <CardTitle
                        className={`text-lg font-bold text-neutral-800 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {topic.category}
                      </CardTitle>
                      <p
                        className={`text-sm text-neutral-500 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {topic.topics.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${colors.icon.replace(
                            "text-",
                            "bg-"
                          )}`}
                        />
                        <span
                          className={`text-neutral-700 ${
                            language === "zh" ? "font-chinese" : ""
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Oprah Quote - displayed near imposter syndrome topic */}
        {oprahQuote && (
          <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Quote className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <blockquote
                  className={`text-lg md:text-xl text-neutral-700 italic leading-relaxed mb-3 ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  "{oprahQuote.text}"
                </blockquote>
                <cite
                  className={`text-pink-600 font-semibold ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  — {oprahQuote.author}
                </cite>
              </div>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="text-center mt-8">
          <p
            className={`text-neutral-500 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "以上只是部分主題範例，您的需求可能與眾不同，歡迎帶著您的問題來討論！"
              : "These are just examples. Your needs may be unique—feel free to bring your own questions!"}
          </p>
        </div>
      </div>
    </section>
  );
}
