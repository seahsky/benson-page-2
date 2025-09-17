# Benson Wong Career Coaching Landing Page

> **Bilingual career coaching website for Chinese-speaking professionals in Australia**  
> **Tech Stack**: React 18 + shadcn/ui + Tailwind CSS + Vite  
> **Deployment**: Wix Platform Compatible  

## 🚀 Quick Start

### For Developers
```bash
# Setup development environment
npm create vite@latest benson-page-2 -- --template react
cd benson-page-2 && npm install

# Install and configure shadcn/ui
npx shadcn-ui@latest init

# Start development
npm run dev
```

### For Content Updates
1. **Testimonials**: Update `src/data/testimonials.js`
2. **Pricing**: Modify `src/data/content.js` pricing sections
3. **Contact Info**: Update contact methods in `src/data/content.js`
4. **Images**: Replace files in `public/images/` (maintain naming)

## 📚 Documentation Index

### 💼 Business & Strategy
- **[Project Overview](./docs/business/project-overview.md)** - Business context, target audience, and brand positioning
- **[Content Strategy](./docs/business/content-strategy.md)** - SEO, bilingual content, and conversion optimization
- **[Success Metrics](./docs/business/success-metrics.md)** - Analytics, KPIs, and performance tracking

### 🛠️ Technical Development
- **[Architecture](./docs/technical/architecture.md)** - Tech stack, project structure, and requirements
- **[Development Workflow](./docs/technical/development-workflow.md)** - Setup, commands, and development processes
- **[Component Library](./docs/technical/component-library.md)** - shadcn/ui patterns and custom components

### 🎨 Design & UI/UX  
- **[Design System](./docs/design/design-system.md)** - Colors, typography, theming, and visual standards
- **[Responsive Design](./docs/design/responsive-design.md)** - Breakpoints, mobile-first, and layout guidelines
- **[Internationalization](./docs/design/internationalization.md)** - Bilingual implementation and Chinese typography

### 🔗 Integration & Platform
- **[Wix Deployment](./docs/integration/wix-deployment.md)** - Platform requirements and deployment process
- **[Contact Integration](./docs/integration/contact-integration.md)** - Social media buttons and direct messaging (NO forms)
- **[Performance Optimization](./docs/integration/performance-optimization.md)** - Build optimization and Core Web Vitals

### 🔧 Operations & Maintenance
- **[Testing & QA](./docs/operations/testing-qa.md)** - Quality assurance, accessibility, and cross-browser testing
- **[Maintenance](./docs/operations/maintenance.md)** - Update workflows, version control, and backup strategies  
- **[Deployment](./docs/operations/deployment.md)** - Production deployment, monitoring, and rollback procedures

## 🛠️ Tech Stack Summary

### Core Technologies
- **Frontend**: React 18 with Vite build tool
- **UI Framework**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React (included with shadcn/ui)
- **Fonts**: System fonts with Chinese character support

### Key Features
- **Bilingual Support**: English and Chinese (Simplified/Traditional)
- **Responsive Design**: Mobile-first approach with 6 breakpoints
- **Direct Social Media Contact**: WhatsApp Business, LINE, Facebook, Threads (NO forms)
- **Performance Optimized**: <500KB bundle, <2.5s LCP, Wix compatible
- **Accessibility**: WCAG 2.1 AA compliant

### Project Structure
```
benson-page-2/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── sections/     # Page sections (Hero, About, etc.)
│   │   └── common/       # Shared components
│   ├── data/             # Content and testimonials
│   ├── lib/              # Utilities and i18n
│   └── styles/           # Global CSS
├── docs/                 # Modular documentation
└── public/               # Static assets
```

## 🎯 CTA Strategy - Social Media Only

### IMPORTANT: No Contact Forms or Email Collection
- **ALL call-to-actions must direct to social media channels**
- **NO contact forms** should be implemented on the website
- **NO email collection** forms or newsletter signups
- **ONLY social media links** serve as conversion points

### Approved CTA Channels (Priority Order):
1. **WhatsApp**: Direct message link with pre-filled text
2. **LINE**: Profile link for instant messaging
3. **Facebook**: Business page for messaging and reviews
4. **Threads**: Professional updates (not direct CTA)

### Implementation Guidelines:
- Use prominent social media buttons as primary CTAs
- Include social links in hero section, footer, and after key content
- Pre-fill WhatsApp messages with context-specific text
- Track all social media clicks for conversion metrics
- No intermediate forms or data collection steps

## 🌐 Essential Information

### Business Context
**Client**: Benson Wong - ICF ACC Certified Career Coach  
**Services**: Career coaching and job application coaching for new Australians  
**Languages**: Bilingual support (English, Mandarin, Cantonese)  
**Specialization**: Chinese-speaking professionals transitioning to Australian workplace  

### Contact Information
- **Primary**: WhatsApp +852 9702 0812
- **LINE**: ktuin0918  
- **Facebook**: @careercoachbenson
- **Threads**: @aus_jobs_and_career_coach

### Pricing Structure
- **Single Session**: $220 AUD (90 minutes)
- **5-Session Package**: $990 AUD (Save $110)
- **10-Session Package**: $1,880 AUD (Save $320)
- **APS Course**: $150 AUD
- **Networking Workshop**: $350 AUD

## ⚡ Common Tasks

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run build:wix    # Wix-optimized build with validation
```

### Content Updates
```bash
# Add new testimonial
# 1. Edit src/data/testimonials.js
# 2. Add image to public/images/ (if applicable)
# 3. Test in both EN/ZH languages
# 4. Deploy

# Update pricing
# 1. Edit src/data/content.js (both en and zh sections)
# 2. Test contact form WhatsApp integration
# 3. Verify responsive display
# 4. Deploy
```

### Troubleshooting
- **Build Issues**: Check [Development Workflow](./docs/technical/development-workflow.md#troubleshooting)
- **Wix Deployment**: See [Wix Deployment Guide](./docs/integration/wix-deployment.md)
- **Performance Issues**: Review [Performance Optimization](./docs/integration/performance-optimization.md)
- **Chinese Font Issues**: Check [Internationalization](./docs/design/internationalization.md#typography-for-chinese-characters)

## 📊 Performance Targets

### Core Web Vitals
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s  
- **First Input Delay**: <100ms
- **Cumulative Layout Shift**: <0.1

### Resource Budgets
- **Total Bundle Size**: <500KB (gzipped)
- **JavaScript Bundle**: <200KB (gzipped)
- **CSS Bundle**: <50KB (gzipped)
- **Image Optimization**: WebP with fallbacks

## 🔗 External Resources

### Development Tools
- **[shadcn/ui Documentation](https://ui.shadcn.com/)** - Component library
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Build tool and development server
- **[React Documentation](https://react.dev/)** - React 18+ features

### Design Resources
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[Chinese Web Fonts](https://fonts.google.com/noto/fonts)** - Typography resources
- **[Coolors](https://coolors.co/)** - Color palette generator

### Deployment & Hosting
- **[Wix Developer Center](https://dev.wix.com/)** - Platform documentation
- **[Web.dev](https://web.dev/)** - Performance best practices
- **[WAVE](https://wave.webaim.org/)** - Accessibility testing

### Business Tools
- **[WhatsApp Business](https://business.whatsapp.com/)** - Contact integration
- **[Google Analytics](https://analytics.google.com/)** - Performance tracking
- **[PageSpeed Insights](https://pagespeed.web.dev/)** - Performance analysis

---

## 🤝 Getting Help

### Quick Reference
- **📚 Full Documentation**: See `docs/` folder for detailed guides
- **🚀 New to Project**: Start with [Project Overview](./docs/business/project-overview.md)
- **🔧 Technical Setup**: Follow [Development Workflow](./docs/technical/development-workflow.md)
- **🎨 Design Questions**: Check [Design System](./docs/design/design-system.md)

### Support Contacts
- **Technical Issues**: Review relevant documentation sections first
- **Business Requirements**: Contact project stakeholders
- **Emergency Deployment**: Follow [Emergency Response](./docs/operations/deployment.md#emergency-response-procedures)

*This streamlined overview connects to comprehensive documentation in the `docs/` folder. Each linked document provides detailed implementation guidance for its specific domain.*