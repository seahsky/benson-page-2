import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import type { Language, FAQ } from "@/data/content";
import ContactButtonMenu from "@/components/ContactButtonMenu";

interface FAQSectionProps {
  faq: FAQ[];
  language: Language;
}

export default function FAQSection({ faq, language }: FAQSectionProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我有一些問題想要諮詢，希望能了解更多關於職涯教練服務。"
      : "Hello! I have some questions and would like to learn more about your career coaching services.";

  return (
    <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-4 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh" ? "常見問題" : "Frequently Asked Questions"}
          </h2>
          <p
            className={`text-xl text-neutral-600 max-w-2xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "以下是客戶最常詢問的問題，希望能幫助您更了解我的服務"
              : "Here are the most common questions from clients. I hope this helps you understand my services better."}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300 px-6"
              >
                <AccordionTrigger
                  className={`text-left text-lg font-semibold text-neutral-800 hover:text-primary hover:no-underline ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {item.answer.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={`text-neutral-700 leading-relaxed ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p
            className={`text-lg text-neutral-600 mb-6 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh"
              ? "還有其他問題？歡迎直接與我聯繫"
              : "Have more questions? Feel free to contact me directly"}
          </p>
          <ContactButtonMenu
            label={language === "zh" ? "預約・諮詢" : "Book・Consult"}
            language={language}
            whatsappMessage={whatsappMessage}
            context="faq-cta"
            variant="consultation"
            size="lg"
            className="shadow-lg hover:shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
