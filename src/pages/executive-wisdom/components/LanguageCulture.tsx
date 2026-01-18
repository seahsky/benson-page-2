import { Globe, Languages } from "lucide-react";
import type { Language, LanguageCulture as LanguageCultureType } from "@/data/content";
import ContactButtonMenu from "@/components/ContactButtonMenu";

interface LanguageCultureProps {
  content: LanguageCultureType;
  language: Language;
}

export default function LanguageCulture({
  content,
  language,
}: LanguageCultureProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我想了解更多關於您的雙語教練服務。"
      : "Hello! I'd like to learn more about your bilingual coaching services.";

  return (
    <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Header with Icons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
              <Languages className="w-7 h-7 text-primary" />
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold text-neutral-800 ${
                language === "zh" ? "font-chinese" : ""
              }`}
            >
              {content.title}
            </h2>
            <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center">
              <Globe className="w-7 h-7 text-secondary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
            <div className="space-y-4">
              {content.content.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-lg text-neutral-700 leading-relaxed ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Language badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-neutral-100">
              {[
                { label: "國語 Mandarin", flag: "🇹🇼" },
                { label: "廣東話 Cantonese", flag: "🇭🇰" },
                { label: "English", flag: "🇦🇺" },
              ].map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full"
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span
                    className={`text-sm font-medium text-neutral-700 ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {lang.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <ContactButtonMenu
                label={language === "zh" ? "預約・諮詢" : "Book・Consult"}
                language={language}
                whatsappMessage={whatsappMessage}
                context="language-culture-cta"
                variant="consultation"
                size="lg"
                className="shadow-lg hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
