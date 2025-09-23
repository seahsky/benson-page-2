import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  GraduationCap,
  Building,
  Users,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Language } from "@/data/content";

interface ProfessionalAuthorityProps {
  content: {
    title: string;
    subtitle: string;
    certifications: Array<{
      name: string;
      shortName: string;
      description: string;
    }>;
    qualifications: Array<{
      name: string;
      description: string;
    }>;
    experience: {
      years: string;
      background: string;
      specialties: string[];
    };
  };
  language: Language;
}

export default function ProfessionalAuthority({
  content,
  language,
}: ProfessionalAuthorityProps) {
  const whatsappMessage =
    language === "zh"
      ? "您好！我對您的專業背景很有信心，希望能進一步了解如何開始職涯教練服務。"
      : "Hello! I'm impressed by your professional background and would like to learn more about starting career coaching services.";

  const whatsappLink = generateWhatsAppLink("85297020812", whatsappMessage);

  return (
    <section className="section-padding bg-white">
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
            className={`text-xl text-neutral-600 max-w-3xl mx-auto ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {content.subtitle}
          </p>
        </div>

        {/* Professional Certifications */}
        <div className="mb-16 fade-in-up stagger-1">
          <h3
            className={`text-3xl font-bold text-center text-neutral-800 mb-8 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh" ? "專業認證" : "Professional Certifications"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.certifications.map((cert, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 hover:border-primary/40 card-elevated transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge
                        variant="credential"
                        className={`mb-2 ${language === "zh" ? "font-chinese" : ""}`}
                      >
                        {cert.shortName}
                      </Badge>
                      <CardTitle
                        className={`text-xl text-primary ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {cert.name}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription
                    className={`text-base leading-relaxed ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {cert.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Qualifications */}
        <div className="mb-16 fade-in-up stagger-2">
          <h3
            className={`text-3xl font-bold text-center text-neutral-800 mb-8 ${
              language === "zh" ? "font-chinese" : ""
            }`}
          >
            {language === "zh" ? "學術資格" : "Academic Qualifications"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.qualifications.map((qual, index) => (
              <Card
                key={index}
                className="group bg-white border border-neutral-200 hover:border-secondary/30 card-elevated"
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/30 transition-all duration-300">
                    <GraduationCap className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <CardTitle
                    className={`text-lg font-semibold text-neutral-800 ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {qual.name}
                  </CardTitle>
                  <CardDescription
                    className={`text-sm ${
                      language === "zh" ? "font-chinese" : ""
                    }`}
                  >
                    {qual.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="mb-16 fade-in-up stagger-3">
          <div className="bg-gradient-to-r from-neutral-50 to-primary/5 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Experience Overview */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <Badge
                        variant="experience"
                        className={`text-lg px-4 py-1 ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {content.experience.years}
                      </Badge>
                    </div>
                    <h3
                      className={`text-2xl font-bold text-neutral-800 ${
                        language === "zh" ? "font-chinese" : ""
                      }`}
                    >
                      {language === "zh"
                        ? "專業經驗"
                        : "Professional Experience"}
                    </h3>
                  </div>
                </div>

                <p
                  className={`text-lg text-neutral-700 leading-relaxed mb-6 ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  {content.experience.background}
                </p>

                <Button
                  variant="consultation"
                  size="lg"
                  asChild
                  className={`shadow-lg hover:shadow-xl ${language === "zh" ? "font-chinese" : ""}`}
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {language === "zh"
                      ? "體驗專業指導"
                      : "Experience Professional Guidance"}
                  </a>
                </Button>
              </div>

              {/* Specialties */}
              <div>
                <h4
                  className={`text-xl font-semibold text-neutral-800 mb-6 flex items-center gap-2 ${
                    language === "zh" ? "font-chinese" : ""
                  }`}
                >
                  <Users className="w-5 h-5 text-primary" />
                  {language === "zh" ? "專業領域" : "Areas of Expertise"}
                </h4>

                <div className="space-y-4">
                  {content.experience.specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span
                        className={`text-neutral-700 font-medium ${
                          language === "zh" ? "font-chinese" : ""
                        }`}
                      >
                        {specialty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 fade-in-up stagger-4">
          {[
            {
              number: "ICF ACC",
              label:
                language === "zh" ? "國際認證" : "International Certification",
              icon: Award,
            },
            {
              number: "15+",
              label: language === "zh" ? "年經驗" : "Years Experience",
              icon: Calendar,
            },
            {
              number: "100+",
              label: language === "zh" ? "成功案例" : "Success Cases",
              icon: Users,
            },
            {
              number: "5",
              label: language === "zh" ? "學術資格" : "Qualifications",
              icon: GraduationCap,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-sm border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div
                className={`text-sm text-neutral-600 font-medium ${
                  language === "zh" ? "font-chinese" : ""
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

