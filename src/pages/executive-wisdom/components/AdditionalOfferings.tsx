import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, BookOpen, Users, Clock } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Language } from '@/data/content'
import ContactButtonMenu from '@/components/ContactButtonMenu'

interface AdditionalOfferingsProps {
  content: {
    title: string
    subtitle: string
    courses: Array<{
      name: string
      price: number
      description: string
      duration?: string
      features: string[]
    }>
  }
  language: Language
}

export default function AdditionalOfferings({ content, language }: AdditionalOfferingsProps) {
  const generateCourseWhatsAppMessage = (courseName: string, price: number) => {
    return language === 'zh'
      ? `您好！我對 ${courseName} (${formatPrice(price)}) 很感興趣，希望能了解更多詳情和報名方式。`
      : `Hello! I'm interested in the ${courseName} (${formatPrice(price)}) and would like to learn more about the details and enrollment process.`
  }

  const getCourseIcon = (courseName: string) => {
    if (courseName.includes('APS') || courseName.includes('公務')) return BookOpen
    if (courseName.includes('Networking') || courseName.includes('人脈')) return Users
    return BookOpen
  }

  return (
    <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {content.courses.map((course, index) => {
            const IconComponent = getCourseIcon(course.name)
            const whatsappMessage = generateCourseWhatsAppMessage(course.name, course.price)

            return (
              <Card
                key={index}
                className={`group bg-white border-2 border-transparent hover:border-primary/30 card-elevated transition-all duration-300 hover:scale-105 fade-in-up stagger-${index + 1}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="experience" className={`${language === 'zh' ? 'font-chinese' : ''}`}>
                          {formatPrice(course.price)}
                        </Badge>
                        {course.duration && (
                          <Badge variant="outline" className={`text-xs ${language === 'zh' ? 'font-chinese' : ''}`}>
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className={`text-2xl text-neutral-800 ${
                        language === 'zh' ? 'font-chinese' : ''
                      }`}>
                        {course.name}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className={`text-base leading-relaxed ${
                    language === 'zh' ? 'font-chinese' : ''
                  }`}>
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {course.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className={`text-neutral-700 ${language === 'zh' ? 'font-chinese' : ''}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Course Benefits */}
                  <div className="bg-primary/5 rounded-lg p-4 mb-6">
                    <h4 className={`font-semibold text-primary mb-2 ${
                      language === 'zh' ? 'font-chinese' : ''
                    }`}>
                      {language === 'zh' ? '課程收益：' : 'Course Benefits:'}
                    </h4>
                    <ul className={`text-sm text-neutral-700 space-y-1 ${
                      language === 'zh' ? 'font-chinese' : ''
                    }`}>
                      {(course.name.includes('APS') || course.name.includes('公務') ? (
                        language === 'zh' ? [
                          '深入了解澳洲公務體系',
                          '掌握申請策略和技巧',
                          '提高選拔成功率',
                          '建立長期職涯規劃'
                        ] : [
                          'Deep understanding of Australian Public Service',
                          'Master application strategies and techniques',
                          'Increase selection success rate',
                          'Establish long-term career planning'
                        ]
                      ) : (
                        language === 'zh' ? [
                          '建立有效的專業人脈網絡',
                          '提升溝通和社交技巧',
                          '增加職涯發展機會',
                          '學會文化適應策略'
                        ] : [
                          'Build effective professional networks',
                          'Enhance communication and social skills',
                          'Increase career development opportunities',
                          'Learn cultural adaptation strategies'
                        ]
                      )).map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                    </ul>
                  </div>

                  {/* Enrollment Button */}
                  <ContactButtonMenu
                    label={language === 'zh' ? '報名課程' : 'Enroll Now'}
                    language={language}
                    whatsappMessage={whatsappMessage}
                    context={`course-${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                    variant="consultation"
                    size="lg"
                    className="w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Course Comparison or Bundle Offer */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 md:p-12 mb-12 fade-in-up stagger-3">
          <div className="text-center mb-8">
            <h3 className={`text-3xl font-bold text-neutral-800 mb-4 ${
              language === 'zh' ? 'font-chinese' : ''
            }`}>
              {language === 'zh' ? '課程組合優惠' : 'Course Bundle Offer'}
            </h3>
            <p className={`text-lg text-neutral-600 max-w-2xl mx-auto ${
              language === 'zh' ? 'font-chinese' : ''
            }`}>
              {language === 'zh'
                ? '同時報名兩門課程，可享受特別優惠價格，並獲得額外的個人化指導時間。'
                : 'Enroll in both courses simultaneously for a special discounted price and receive additional personalized guidance time.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {formatPrice(450)}
              </div>
              <div className="text-lg text-neutral-500 line-through mb-2">
                {formatPrice(500)}
              </div>
              <Badge variant="discount" className={`text-sm ${language === 'zh' ? 'font-chinese' : ''}`}>
                {language === 'zh' ? '節省 $50' : 'Save $50'}
              </Badge>
              <p className={`text-sm text-neutral-600 mt-2 ${
                language === 'zh' ? 'font-chinese' : ''
              }`}>
                {language === 'zh' ? '雙課程組合價' : 'Bundle Price'}
              </p>
            </div>

            <div className="text-center">
              <ContactButtonMenu
                label={language === 'zh' ? '選擇組合優惠' : 'Choose Bundle Offer'}
                language={language}
                whatsappMessage={language === 'zh'
                  ? "您好！我對課程組合優惠很感興趣，希望能了解更多詳情。"
                  : "Hello! I'm interested in the course bundle offer and would like to learn more details."
                }
                context="course-bundle"
                variant="package-select"
                size="lg"
                className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Why Choose These Courses */}
        <div className="text-center fade-in-up stagger-4">
          <h3 className={`text-2xl md:text-3xl font-bold text-neutral-800 mb-8 ${
            language === 'zh' ? 'font-chinese' : ''
          }`}>
            {language === 'zh' ? '為什麼選擇這些課程？' : 'Why Choose These Courses?'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: language === 'zh' ? '實用知識' : 'Practical Knowledge',
                description: language === 'zh' ? '基於真實澳洲職場經驗的實用內容' : 'Practical content based on real Australian workplace experience'
              },
              {
                icon: Users,
                title: language === 'zh' ? '小班教學' : 'Small Class Size',
                description: language === 'zh' ? '個人化關注，確保每位學員都能獲得充分指導' : 'Personalized attention ensuring every participant receives adequate guidance'
              },
              {
                icon: CheckCircle,
                title: language === 'zh' ? '後續支持' : 'Ongoing Support',
                description: language === 'zh' ? '課程結束後仍提供持續的指導和建議' : 'Continued guidance and advice even after course completion'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className={`text-xl font-semibold text-neutral-800 mb-3 ${
                  language === 'zh' ? 'font-chinese' : ''
                }`}>
                  {item.title}
                </h4>
                <p className={`text-neutral-600 ${language === 'zh' ? 'font-chinese' : ''}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}