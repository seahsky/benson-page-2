import type { Language, MyStory as MyStoryType } from "@/data/content";
import ContactButtonMenu from "@/components/ContactButtonMenu";

interface MyStoryProps {
  content: MyStoryType;
  language: Language;
}

export default function MyStory({ content, language }: MyStoryProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我對您的職涯故事很感興趣，希望能了解更多關於如何開始教練服務。"
      : "Hello! I'm interested in your career journey and would like to learn more about starting coaching services.";

  return (
    <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - Takes 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <h2
              className={`text-3xl md:text-4xl font-bold text-neutral-800 ${
                language === "zh" ? "font-chinese" : ""
              }`}
            >
              {content.title}
            </h2>

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

            <div className="pt-4">
              <ContactButtonMenu
                label={language === "zh" ? "預約・諮詢" : "Book・Consult"}
                language={language}
                whatsappMessage={whatsappMessage}
                context="my-story-cta"
                variant="consultation"
                size="lg"
                className="shadow-lg hover:shadow-xl"
              />
            </div>
          </div>

          {/* Image - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl transform rotate-3" />

              {/* Image container */}
              <div className="relative bg-white p-2 rounded-xl shadow-xl">
                <img
                  src={content.imagePath}
                  alt="Benson Wong - Career Coach"
                  className="w-full h-auto rounded-lg object-cover aspect-[4/5]"
                  onError={(e) => {
                    // Fallback to logo if profile image doesn't exist
                    e.currentTarget.src = "/images/benson-logo.jpg";
                    e.currentTarget.classList.add("object-contain", "bg-gradient-to-br", "from-purple-100", "to-purple-50", "p-8");
                  }}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg">
                <span className={`text-sm font-semibold ${language === "zh" ? "font-chinese" : ""}`}>
                  {language === "zh" ? "20年職涯旅程" : "20-Year Journey"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
