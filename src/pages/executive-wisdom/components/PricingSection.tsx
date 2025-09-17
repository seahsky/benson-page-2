import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Crown, MessageCircle, Clock, Users } from 'lucide-react'
import { formatPrice, generateWhatsAppLink } from '@/lib/utils'
import type { Language } from '@/data/content'

interface PricingSectionProps {
  content: {
    title: string
    subtitle: string
    packages: Array<{
      name: string
      price: number
      originalPrice?: number
      discount?: string
      sessions: number
      description: string
      features: string[]
      additionalRate?: number
      popular?: boolean
    }>
    note: string
  }
  language: Language
}

export default function PricingSection({ content, language }: PricingSectionProps) {
  const generatePricingWhatsAppMessage = (packageName: string, price: number) => {
    return language === 'zh'
      ? `您好！我對 ${packageName} (${formatPrice(price)}) 很感興趣，希望能預約諮詢時間。`
      : `Hello! I'm interested in the ${packageName} (${formatPrice(price)}) and would like to schedule a consultation.`
  }

  return (
    <section id="pricing" className="section-padding bg-white">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content.packages.map((pkg, index) => {
            const whatsappMessage = generatePricingWhatsAppMessage(pkg.name, pkg.price)
            const whatsappLink = generateWhatsAppLink("85297020812", whatsappMessage)

            return (
              <Card
                key={index}
                className={`group relative card-elevated transition-all duration-300 hover:scale-105 ${
                  pkg.popular
                    ? 'border-2 border-primary shadow-xl bg-gradient-to-b from-primary/5 to-transparent'
                    : 'border border-neutral-200 hover:border-primary/30'
                } fade-in-up stagger-${index + 1}`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="credential" className={`px-4 py-1 shadow-lg ${
                      language === 'zh' ? 'font-chinese' : ''
                    }`}>
                      <Crown className="w-3 h-3 mr-1" />
                      {language === 'zh' ? '最受歡迎' : 'Most Popular'}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  {/* Package Name */}
                  <CardTitle className={`text-2xl font-bold mb-2 ${
                    language === 'zh' ? 'font-chinese' : ''
                  }`}>
                    {pkg.name}
                  </CardTitle>

                  {/* Pricing Display */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary">
                        {formatPrice(pkg.price)}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-neutral-400 line-through">
                          {formatPrice(pkg.originalPrice)}
                        </span>
                      )}
                    </div>

                    {pkg.discount && (
                      <Badge variant="discount" className={`text-xs ${
                        language === 'zh' ? 'font-chinese' : ''
                      }`}>
                        {pkg.discount}
                      </Badge>
                    )}

                    <div className="flex items-center justify-center gap-2 mt-2 text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span className={`text-sm ${language === 'zh' ? 'font-chinese' : ''}`}>
                        {pkg.sessions} × 90 {language === 'zh' ? '分鐘' : 'minutes'}
                      </span>
                    </div>
                  </div>

                  <CardDescription className={`text-base ${
                    language === 'zh' ? 'font-chinese' : ''
                  }`}>
                    {pkg.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          pkg.popular ? 'text-primary' : 'text-neutral-400'
                        }`} />
                        <span className={`text-neutral-700 ${
                          language === 'zh' ? 'font-chinese' : ''
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}

                    {/* Additional Rate Info */}
                    {pkg.additionalRate && (
                      <div className="flex items-start gap-3 pt-2 border-t border-neutral-100">
                        <Users className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className={`text-sm text-neutral-600 ${
                          language === 'zh' ? 'font-chinese' : ''
                        }`}>
                          {language === 'zh'
                            ? `後續加購：${formatPrice(pkg.additionalRate)}/次`
                            : `Additional sessions: ${formatPrice(pkg.additionalRate)}/session`
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={pkg.popular ? "consultation" : "package-select"}
                    size="lg"
                    asChild
                    className={`w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                      language === 'zh' ? 'font-chinese' : ''
                    }`}
                  >
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {language === 'zh' ? '選擇此方案' : 'Select Package'}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Important Note */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 text-center fade-in-up stagger-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
              <h3 className={`text-xl font-semibold text-neutral-800 ${
                language === 'zh' ? 'font-chinese' : ''
              }`}>
                {language === 'zh' ? '成功保證' : 'Success Guarantee'}
              </h3>
            </div>
            <p className={`text-neutral-700 text-lg leading-relaxed ${
              language === 'zh' ? 'font-chinese' : ''
            }`}>
              {content.note}
            </p>
          </div>
        </div>

        {/* Consultation CTA */}
        <div className="text-center mt-12 fade-in-up stagger-5">
          <p className={`text-neutral-600 mb-6 ${language === 'zh' ? 'font-chinese' : ''}`}>
            {language === 'zh'
              ? '不確定哪個方案最適合您？讓我們先聊聊您的具體需求。'
              : 'Not sure which package is right for you? Let\'s discuss your specific needs first.'
            }
          </p>
          <Button
            variant="outline"
            size="lg"
            asChild
            className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground ${
              language === 'zh' ? 'font-chinese' : ''
            }`}
          >
            <a href={generateWhatsAppLink("85297020812", language === 'zh'
              ? "您好！我想了解更多關於職涯教練服務的信息，希望能先進行免費諮詢。"
              : "Hello! I'd like to learn more about career coaching services and would appreciate a free consultation."
            )} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              {language === 'zh' ? '免費諮詢' : 'Free Consultation'}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}