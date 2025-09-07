# Content Strategy Framework

> **Context**: Content organization, SEO strategy, and page structure for maximum conversion  
> **Audience**: Content creators, developers, and marketing team  
> **Prerequisites**: [Project Overview](./project-overview.md) - Business context  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Project Overview](./project-overview.md) - Business context
- [Success Metrics](./success-metrics.md) - Measuring content effectiveness

---

## 📋 Page Structure Strategy

### Page Sections (Optimized Order)
1. **Hero Section** - Introduction and credentials
2. **About/Why Choose Benson** - Experience and philosophy  
3. **Services** - Career coaching vs Job application coaching
4. **Success Stories** - Testimonials and case studies
5. **Pricing** - Clear pricing structure
6. **Additional Offerings** - Video courses and workshops
7. **Contact** - Multiple contact methods
8. **Footer** - Quick links and credentials

### Section Prioritization Logic
- **Above the fold**: Hero with clear value proposition
- **Trust building**: About and credentials early in flow
- **Social proof**: Success stories before pricing
- **Clear pricing**: Transparency builds trust
- **Multiple CTAs**: Contact opportunities throughout

## 📝 Content Principles

### KISS Principle (Keep It Simple & Straightforward)
- **Clarity over Cleverness**: Direct, easy-to-understand language
- **Scannable Format**: Headers, bullets, short paragraphs
- **Action-Oriented**: Clear next steps for visitors
- **Benefit-Focused**: What visitors get, not just what is offered

### Bilingual Parity Standard
- **Equal Quality**: Chinese content matches English depth and value
- **Cultural Adaptation**: Not just translation - cultural relevance
- **Consistent Messaging**: Core value propositions maintained across languages
- **Local Relevance**: Australia-specific context in both languages

### Trust Building Elements
- **Credentials First**: Lead with ICF and CICA certifications
- **Success Stories**: Real client outcomes with specific details
- **Transparent Pricing**: No hidden costs or unclear packages
- **Professional Photography**: High-quality, professional images
- **Contact Accessibility**: Multiple ways to reach Benson

### Call-to-Action Strategy
- **Primary CTA**: "Book Consultation" - most prominent
- **Secondary CTAs**: WhatsApp contact, course enrollment
- **Soft CTAs**: "Learn more", email signup, social follow
- **Progressive Engagement**: Multiple commitment levels available

## 🔍 SEO Content Strategy

### Target Keywords (Primary)
- **English**: career coach australia, chinese career coach, job application coaching
- **Chinese**: 澳洲職涯教練, 工作申請指導, 華人職涯顧問
- **Long-tail**: career coach for chinese professionals australia, new immigrant career guidance

### SEO Implementation
```html
<!-- Primary Meta Tags -->
<title>Benson Wong - 澳洲職涯教練 | Career Coach Australia</title>
<meta name="description" content="ICF certified career coach helping new Australians and international students find their ideal careers. Bilingual coaching in English and Chinese." />
<meta name="keywords" content="career coach australia, chinese career coach, job application coaching, australian workplace, new immigrant career, 澳洲職涯教練" />

<!-- Open Graph Tags -->
<meta property="og:title" content="Benson Wong - Career Coach Australia" />
<meta property="og:description" content="Certified career coach specializing in helping Chinese-speaking professionals succeed in Australian workplace" />
<meta property="og:image" content="/images/profile-image.png" />
<meta property="og:type" content="website" />

<!-- Local SEO -->
<meta name="geo.region" content="AU" />
<meta name="geo.placename" content="Australia" />
```

### Content SEO Guidelines
- **Header Structure**: H1 → H2 → H3 hierarchy maintained
- **Keyword Density**: Natural integration, not keyword stuffing  
- **Internal Linking**: Cross-link between related sections
- **Image Alt Text**: Descriptive alt text for all images
- **Schema Markup**: Professional service schema implementation

## 📱 Content Responsiveness

### Mobile-First Content Strategy
- **Headline Hierarchy**: Shorter headlines for mobile screens
- **Paragraph Length**: Shorter paragraphs for mobile reading
- **Touch-Friendly**: Large enough touch targets for mobile
- **Progressive Disclosure**: Show more details on desktop

### Cross-Cultural Content Considerations
- **Font Selection**: Support for Chinese characters across devices
- **Reading Patterns**: Left-to-right for English, adapted layouts for Chinese
- **Cultural Colors**: Color meanings in Chinese culture considered
- **Local References**: Australian workplace terminology explained

## 🎯 Conversion Optimization

### Landing Page Optimization
- **Value Proposition**: Clear within 5 seconds of landing
- **Social Proof**: Testimonials prominently featured
- **Urgency/Scarcity**: Limited consultation slots messaging
- **Risk Reduction**: Money-back guarantee or free initial consultation
- **Trust Signals**: Certifications, testimonials, professional photos

### Content Funnel Strategy
```
Awareness → Interest → Consideration → Action

Hero Section: Awareness (Who is Benson?)
About/Services: Interest (What can he do for me?)
Success Stories: Consideration (Has he helped others like me?)
Pricing/Contact: Action (How do I get started?)
```

### A/B Testing Content Elements
- **Headlines**: Different value propositions
- **CTA Text**: "Book Consultation" vs "Get Started" vs "Contact Now"
- **Social Proof**: Different testimonial selections
- **Pricing Display**: Package vs individual session emphasis

## 📊 Content Performance Metrics

### Content Engagement Tracking
```javascript
// Example event tracking for key content interactions
gtag('event', 'content_engagement', {
  'section': 'testimonials',
  'action': 'scroll_to_view',
  'language': currentLanguage
});

gtag('event', 'cta_interaction', {
  'cta_type': 'primary_booking',
  'page_section': 'hero',
  'language': currentLanguage
});
```

### Key Content KPIs
- **Time on Page**: Average engagement per section
- **Scroll Depth**: How far users read
- **Language Toggle**: Usage patterns between EN/ZH
- **CTA Click Rates**: Conversion by section and language
- **Bounce Rate**: By landing section and language

## 🌐 Bilingual Content Management

### Content Structure Pattern
```javascript
// Example content organization
export const content = {
  en: {
    hero: {
      title: "Career and Job Application Coach",
      subtitle: "Welcome! Please get in touch if you have any questions about my Career Coaching and Job Application Coaching services.",
      cta: "Book Consultation"
    }
  },
  zh: {
    hero: {
      title: "澳洲職涯 & 工作申請教練", 
      subtitle: "歡迎光臨，希望我有這個榮幸能幫助您往理想職涯更邁前一步！如果您對我的職涯引導及工作申請引導服務有任何問題，歡迎與我聯絡。",
      cta: "預約諮詢"
    }
  }
};
```

### Translation Guidelines
- **Professional Tone**: Maintain professional language in both languages
- **Cultural Nuance**: Adapt messaging for cultural context, not literal translation
- **Action Words**: Strong action verbs in CTAs for both languages
- **Consistency**: Key terms translated consistently throughout

## 📚 Content Templates

### Success Story Template
```markdown
## Client Success Story: [Role/Industry]

**Background**: [Brief client background - anonymized]
**Challenge**: [Specific career challenge faced]
**Solution**: [How Benson helped - specific services used]
**Outcome**: [Measurable result achieved]
**Quote**: "[Client testimonial in their own words]"
```

### Service Description Template
```markdown
### [Service Name]
**Duration**: [Time commitment]
**Format**: [Delivery method - online/in-person/hybrid]
**Includes**: 
- [Specific deliverable 1]
- [Specific deliverable 2]
- [Specific deliverable 3]

**Best For**: [Target audience/situation]
**Investment**: [Price]
[CTA Button: Book This Service]
```

## 🔗 Related Documentation
- **[Project Overview](./project-overview.md)**: Business objectives driving content strategy
- **[Success Metrics](./success-metrics.md)**: How content performance is measured
- **[Internationalization](../design/internationalization.md)**: Technical implementation of bilingual content
- **[Design System](../design/design-system.md)**: Visual presentation of content strategy