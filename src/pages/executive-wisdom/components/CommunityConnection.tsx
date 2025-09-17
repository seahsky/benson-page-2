import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, MessageSquare, Facebook, AtSign, Phone, Mail, MapPin } from 'lucide-react'
import type { Language } from '@/data/content'

interface CommunityConnectionProps {
  content: {
    title: string
    subtitle: string
    channels: Array<{
      name: string
      label: string
      value: string
      link: string
      icon: string
      primary?: boolean
    }>
    cta: string
  }
  language: Language
}

export default function CommunityConnection({ content, language }: CommunityConnectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircle': return MessageCircle
      case 'MessageSquare': return MessageSquare
      case 'Facebook': return Facebook
      case 'AtSign': return AtSign
      case 'Phone': return Phone
      case 'Mail': return Mail
      default: return MessageCircle
    }
  }

  const getChannelColor = (channelName: string) => {
    switch (channelName) {
      case 'whatsapp': return 'from-green-500 to-green-600'
      case 'line': return 'from-green-400 to-green-500'
      case 'facebook': return 'from-blue-600 to-blue-700'
      case 'threads': return 'from-purple-600 to-pink-600'
      default: return 'from-primary to-primary/80'
    }
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-6 ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.title}
          </h2>
          <p className={`text-xl text-neutral-600 max-w-3xl mx-auto mb-8 ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.subtitle}
          </p>
          <Badge variant="credential" className={`text-lg px-6 py-2 ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.cta}
          </Badge>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.channels.map((channel, index) => {
            const IconComponent = getIcon(channel.icon)
            const gradientColor = getChannelColor(channel.name)

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  channel.primary
                    ? 'border-primary shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5'
                    : 'border-neutral-200 hover:border-primary/30'
                } fade-in-up stagger-${index + 1}`}
              >
                {channel.primary && (
                  <div className="absolute -top-3 -right-3">
                    <Badge variant="credential" className={`text-xs ${
                      language === 'zh' ? 'font-chinese' : ''
                    }`}>
                      {language === 'zh' ? '推薦' : 'Recommended'}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradientColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className={`text-lg font-semibold ${
                    language === 'zh' ? 'font-chinese' : ''
                  }`}>
                    {channel.label}
                  </CardTitle>
                  <CardDescription className={`text-sm font-medium ${
                    language === 'zh' ? 'font-chinese' : ''
                  }`}>
                    {channel.value}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    variant={channel.primary ? "consultation" : "outline"}
                    size="lg"
                    asChild
                    className={`w-full shadow-md hover:shadow-lg transition-all duration-300 ${
                      language === 'zh' ? 'font-chinese' : ''
                    }`}
                  >
                    <a href={channel.link} target="_blank" rel="noopener noreferrer">
                      <IconComponent className="w-4 h-4 mr-2" />
                      {language === 'zh' ? '立即聯繫' : 'Contact Now'}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Professional Contact Information */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white mb-16 fade-in-up stagger-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className={`text-3xl font-bold mb-6 ${
                language === 'zh' ? 'font-chinese' : ''
              }`}>
                {language === 'zh' ? '專業諮詢服務' : 'Professional Consultation Services'}
              </h3>
              <p className={`text-lg text-white/90 leading-relaxed mb-6 ${
                language === 'zh' ? 'font-chinese' : ''
              }`}>
                {language === 'zh'
                  ? '作為ICF ACC認證教練，我致力於為每一位客戶提供專業、個人化的職涯指導服務。無論您面臨什麼職涯挑戰，我都會用我的專業知識和豐富經驗來幫助您。'
                  : 'As an ICF ACC certified coach, I am committed to providing professional, personalized career guidance services for every client. Whatever career challenges you face, I will use my professional knowledge and rich experience to help you.'
                }
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Phone,
                    label: language === 'zh' ? '諮詢時間' : 'Consultation Hours',
                    value: language === 'zh' ? '週一至週五 9:00-18:00' : 'Mon-Fri 9:00-18:00'
                  },
                  {
                    icon: MapPin,
                    label: language === 'zh' ? '服務地區' : 'Service Area',
                    value: language === 'zh' ? '澳洲全境線上服務' : 'Australia-wide Online'
                  },
                  {
                    icon: MessageCircle,
                    label: language === 'zh' ? '回應時間' : 'Response Time',
                    value: language === 'zh' ? '24小時內回覆' : 'Within 24 hours'
                  },
                  {
                    icon: AtSign,
                    label: language === 'zh' ? '語言服務' : 'Languages',
                    value: language === 'zh' ? '中文、英文' : 'Chinese, English'
                  }
                ].map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className={`text-sm text-white/80 ${language === 'zh' ? 'font-chinese' : ''}`}>
                        {info.label}
                      </div>
                      <div className={`text-sm font-medium ${language === 'zh' ? 'font-chinese' : ''}`}>
                        {info.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h4 className={`text-2xl font-bold mb-4 text-secondary ${
                  language === 'zh' ? 'font-chinese' : ''
                }`}>
                  {language === 'zh' ? '免費初次諮詢' : 'Free Initial Consultation'}
                </h4>
                <p className={`text-white/90 mb-6 ${language === 'zh' ? 'font-chinese' : ''}`}>
                  {language === 'zh'
                    ? '15分鐘免費諮詢，了解您的需求並為您推薦最適合的服務方案。'
                    : '15-minute free consultation to understand your needs and recommend the most suitable service plan.'
                  }
                </p>
                <Button
                  size="xl"
                  variant="secondary"
                  asChild
                  className={`shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                    language === 'zh' ? 'font-chinese' : ''
                  }`}
                >
                  <a href={content.channels[0].link} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {language === 'zh' ? '預約免費諮詢' : 'Book Free Consultation'}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-neutral-200 pt-12 fade-in-up stagger-6">
          <div className="mb-6">
            <h3 className={`text-2xl font-bold text-neutral-800 mb-2 ${
              language === 'zh' ? 'font-chinese' : ''
            }`}>
              Benson Wong
            </h3>
            <p className={`text-lg text-neutral-600 ${language === 'zh' ? 'font-chinese' : ''}`}>
              {language === 'zh' ? 'ICF ACC 認證職涯教練' : 'ICF ACC Certified Career Coach'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              'ICF ACC',
              'CICA RPCDP',
              language === 'zh' ? '15年澳洲經驗' : '15 Years Experience',
              language === 'zh' ? '雙語服務' : 'Bilingual Service'
            ].map((credential, index) => (
              <Badge key={index} variant="outline" className={`${
                language === 'zh' ? 'font-chinese' : ''
              }`}>
                {credential}
              </Badge>
            ))}
          </div>

          <p className={`text-sm text-neutral-500 ${language === 'zh' ? 'font-chinese' : ''}`}>
            {language === 'zh'
              ? '© 2024 Benson Wong 職涯教練服務。專業、可信賴的職涯指導。'
              : '© 2024 Benson Wong Career Coaching Services. Professional, trusted career guidance.'
            }
          </p>
        </div>
      </div>
    </section>
  )
}