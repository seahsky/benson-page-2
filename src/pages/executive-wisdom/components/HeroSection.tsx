import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Award, TrendingUp, Users } from 'lucide-react'
import { generateWhatsAppLink } from '@/lib/utils'
import type { Language } from '@/data/content'

interface HeroSectionProps {
  content: {
    title: string
    subtitle: string
    description: string
    credentials: string[]
    cta: {
      primary: string
      secondary: string
    }
  }
  language: Language
}

export default function HeroSection({ content, language }: HeroSectionProps) {
  const whatsappMessage = language === 'zh'
    ? "您好！我對職涯教練服務很感興趣，希望能了解更多詳情。"
    : "Hello! I'm interested in your career coaching services and would like to learn more."

  const whatsappLink = generateWhatsAppLink("85297020812", whatsappMessage)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sophisticated Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10" />

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 border border-secondary/30 rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container-custom section-padding text-center text-white">
        {/* Professional Avatar/Logo Space */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-xl">
            <Award className="w-16 h-16 text-secondary" />
          </div>
        </div>

        {/* Main Title with Professional Typography */}
        <div className="space-y-4 mb-8 fade-in-up">
          <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.title}
          </h1>
          <h2 className={`text-2xl md:text-3xl font-medium text-secondary ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.subtitle}
          </h2>
        </div>

        {/* Professional Credentials */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 fade-in-up stagger-1">
          {content.credentials.map((credential, index) => (
            <Badge
              key={index}
              variant="credential"
              className={`px-4 py-2 text-sm font-medium shadow-lg ${
                language === 'zh' ? 'font-chinese' : ''
              }`}
            >
              {credential}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12 text-white/90 fade-in-up stagger-2 ${
          language === 'zh' ? 'font-chinese' : ''
        }`}>
          {content.description}
        </p>

        {/* Key Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 fade-in-up stagger-3">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
            <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className={`font-semibold text-lg mb-2 ${language === 'zh' ? 'font-chinese' : ''}`}>
              {language === 'zh' ? '職涯提升' : 'Career Growth'}
            </h3>
            <p className={`text-sm text-white/80 ${language === 'zh' ? 'font-chinese' : ''}`}>
              {language === 'zh' ? '專業教練助您實現職涯目標' : 'Professional coaching to achieve your career goals'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
            <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className={`font-semibold text-lg mb-2 ${language === 'zh' ? 'font-chinese' : ''}`}>
              {language === 'zh' ? '文化融合' : 'Cultural Bridge'}
            </h3>
            <p className={`text-sm text-white/80 ${language === 'zh' ? 'font-chinese' : ''}`}>
              {language === 'zh' ? '了解華人專業人士在澳洲的挑戰' : 'Understanding Chinese professionals\' challenges in Australia'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
            <Award className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className={`font-semibold text-lg mb-2 ${language === 'zh' ? 'font-chinese' : ''}`}>
              {language === 'zh' ? '專業認證' : 'Certified Excellence'}
            </h3>
            <p className={`text-sm text-white/80 ${language === 'zh' ? 'font-chinese' : ''}`}>
              {language === 'zh' ? 'ICF ACC 國際認證教練' : 'ICF ACC internationally certified coach'}
            </p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up stagger-4">
          <Button
            size="xl"
            variant="consultation"
            asChild
            className={`bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              {content.cta.primary}
            </a>
          </Button>

          <Button
            size="xl"
            variant="outline"
            className={`bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {content.cta.secondary}
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}