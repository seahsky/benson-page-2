import type { Language } from '@/data/content'
import ContactButtonMenu from '@/components/ContactButtonMenu'

interface CommunityConnectionProps {
  content: {
    title: string
    footer?: string
  }
  language: Language
}

export default function CommunityConnection({ content, language }: CommunityConnectionProps) {
  const whatsappMessage = language === 'zh'
    ? '您好！我想了解專業教練服務詳情，希望能預約諮詢時間。'
    : 'Hello! I would like to learn about professional coaching services and schedule a consultation.'

  return (
    <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
      <div className="container-custom">
        {/* Main CTA Section */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className={`text-4xl md:text-5xl font-bold text-neutral-800 mb-8 max-w-3xl mx-auto leading-tight ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {content.title}
          </h2>

          {/* Single CTA Button */}
          <ContactButtonMenu
            label={language === 'zh' ? '預約・諮詢' : 'Book・Consult'}
            language={language}
            whatsappMessage={whatsappMessage}
            context="community-cta"
            variant="consultation"
            size="xl"
            className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Simplified Footer */}
        <div className="text-center border-t border-neutral-200 pt-8 fade-in-up">
          <p className={`text-sm text-neutral-500 ${language === 'zh' ? 'font-chinese' : ''}`}>
            {content.footer || (language === 'zh'
              ? '©2026 by Benson Wong ICF PCC & CICA RPCDP'
              : '©2026 by Benson Wong ICF PCC & CICA RPCDP'
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
