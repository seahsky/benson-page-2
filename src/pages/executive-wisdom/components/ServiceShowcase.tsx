import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Briefcase, FileText, MessageCircle } from 'lucide-react'
import { generateWhatsAppLink } from '@/lib/utils'
import type { Language } from '@/data/content'

interface ServiceShowcaseProps {
  content: {
    title: string
    subtitle: string
    career: {
      title: string
      description: string
      features: string[]
      sessions: string
    }
    jobApplication: {
      title: string
      description: string
      features: string[]
      sessions: string
    }
  }
  language: Language
}

export default function ServiceShowcase({ content, language }: ServiceShowcaseProps) {
  const whatsappMessage = language === 'zh'
    ? "您好！我對職涯教練服務很感興趣，希望能了解詳細的服務內容和費用。"
    : "Hello! I'm interested in your coaching services and would like to learn about the details and pricing."

  const whatsappLink = generateWhatsAppLink("85297020812", whatsappMessage)

  return (
    <section id="services" className="section-padding bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-6 ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.title}
          </h2>
          <p className={`text-xl text-neutral-600 max-w-3xl mx-auto ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Career Coaching Service */}
          <Card className="group card-elevated bg-white border-2 border-transparent hover:border-primary/20 transition-all duration-300 fade-in-up stagger-1">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className={`text-2xl text-primary ${language === 'zh' ? 'font-chinese' : ''}`}>
                    {content.career.title}
                  </CardTitle>
                  <Badge variant="package" className={`mt-1 ${language === 'zh' ? 'font-chinese' : ''}`}>
                    {content.career.sessions}
                  </Badge>
                </div>
              </div>
              <CardDescription className={`text-base leading-relaxed ${
                language === 'zh' ? 'font-chinese' : ''
              }`}>
                {content.career.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                {content.career.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className={`text-neutral-700 ${language === 'zh' ? 'font-chinese' : ''}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant="consultation"
                size="lg"
                asChild
                className={`w-full group-hover:shadow-xl transition-all duration-300 ${
                  language === 'zh' ? 'font-chinese' : ''
                }`}
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {language === 'zh' ? '諮詢職涯教練' : 'Consult Career Coaching'}
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Job Application Coaching Service */}
          <Card className="group card-elevated bg-white border-2 border-transparent hover:border-secondary/30 transition-all duration-300 fade-in-up stagger-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-secondary/30 transition-all duration-300">
                  <FileText className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <CardTitle className={`text-2xl text-neutral-800 ${language === 'zh' ? 'font-chinese' : ''}`}>
                    {content.jobApplication.title}
                  </CardTitle>
                  <Badge variant="experience" className={`mt-1 ${language === 'zh' ? 'font-chinese' : ''}`}>
                    {content.jobApplication.sessions}
                  </Badge>
                </div>
              </div>
              <CardDescription className={`text-base leading-relaxed ${
                language === 'zh' ? 'font-chinese' : ''
              }`}>
                {content.jobApplication.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                {content.jobApplication.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                    <span className={`text-neutral-700 ${language === 'zh' ? 'font-chinese' : ''}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant="package-select"
                size="lg"
                asChild
                className={`w-full group-hover:shadow-xl transition-all duration-300 ${
                  language === 'zh' ? 'font-chinese' : ''
                }`}
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {language === 'zh' ? '諮詢申請教練' : 'Consult Application Coaching'}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Service Comparison or Additional Info */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center fade-in-up stagger-3">
          <h3 className={`text-2xl font-semibold text-neutral-800 mb-4 ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {language === 'zh' ? '量身定制的專業指導' : 'Personalized Professional Guidance'}
          </h3>
          <p className={`text-neutral-600 text-lg mb-6 max-w-2xl mx-auto ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {language === 'zh'
              ? '每位客戶的目標、需求與個人情況不同，因此收獲也各不相同。我會根據您的具體情況，提供個人化的專業指導和支持。'
              : 'Each client has different goals, needs, and personal situations, so the benefits vary accordingly. I will provide personalized professional guidance and support based on your specific circumstances.'
            }
          </p>
          <Button
            size="lg"
            variant="outline"
            className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
            onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {language === 'zh' ? '查看投資方案' : 'View Investment Options'}
          </Button>
        </div>
      </div>
    </section>
  )
}