# Internationalization (i18n)

> **Context**: Bilingual content implementation and language toggle functionality  
> **Audience**: Developers implementing bilingual features and content managers  
> **Prerequisites**: [Design System](./design-system.md) - Typography and styling foundation  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Design System](./design-system.md) - Typography considerations
- [Component Library](../technical/component-library.md) - Language toggle implementation

---

## 🌐 Bilingual Strategy Overview

### Language Support
- **Primary Languages**: English (EN) and Chinese (ZH)
- **Chinese Support**: Simplified and Traditional Chinese characters
- **Target Regions**: Australia (English), Chinese-speaking communities
- **Content Parity**: Equal depth and quality in both languages

### Implementation Approach
- **Client-Side**: Pure React state management for language switching
- **Content Structure**: Structured JSON objects for easy maintenance
- **Font Support**: Proper Chinese character rendering across devices
- **Cultural Adaptation**: Not just translation, but cultural relevance

## 📝 Content Structure

### Bilingual Content Organization
```javascript
// src/data/content.js
export const content = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      services: "Services", 
      testimonials: "Success Stories",
      pricing: "Pricing",
      contact: "Contact"
    },
    
    // Hero Section
    hero: {
      title: "Career and Job Application Coach",
      subtitle: "Welcome! Please get in touch if you have any questions about my Career Coaching and Job Application Coaching services.",
      cta: "Book Consultation",
      credentials: "ICF ACC Certified Coach | CICA RPCDP Career Development Practitioner"
    },
    
    // About Section
    about: {
      title: "About Benson Wong",
      subtitle: "Your Bridge to Australian Career Success",
      experience: "15+ years in Australian workplace",
      certifications: ["ICF ACC Certified Coach", "CICA RPCDP Career Development Practitioner"],
      description: "I specialize in helping new Australians, international students, and working holiday makers navigate the Australian job market and build successful careers.",
      approach: {
        title: "My Approach",
        points: [
          "Cultural Bridge: Understanding both Chinese and Australian workplace cultures",
          "Personalized Strategy: Tailored coaching for your unique situation", 
          "Proven Results: Track record of successful career transitions",
          "Bilingual Support: Coaching in English, Mandarin, or Cantonese"
        ]
      }
    },
    
    // Services Section
    services: {
      title: "My Services",
      subtitle: "Comprehensive career support tailored to your needs",
      careerCoaching: {
        title: "Career Coaching",
        description: "Strategic guidance for your career journey in Australia",
        features: [
          "Career assessment and goal setting",
          "Industry insights and market analysis",
          "Professional development planning",
          "Interview preparation and practice",
          "Salary negotiation strategies",
          "Leadership development"
        ]
      },
      jobApplicationCoaching: {
        title: "Job Application Coaching", 
        description: "Expert help with resumes, applications, and job search strategy",
        features: [
          "Resume and CV optimization",
          "Cover letter writing",
          "LinkedIn profile enhancement",
          "Job search strategy",
          "Application tracking systems (ATS) optimization",
          "Interview follow-up techniques"
        ]
      }
    },
    
    // Pricing
    pricing: {
      title: "Investment in Your Future",
      subtitle: "Choose the package that works best for you",
      packages: {
        single: {
          title: "Single Session",
          price: "$220 AUD",
          duration: "90 minutes",
          description: "Perfect for specific career questions or quick guidance"
        },
        five: {
          title: "5-Session Package", 
          price: "$990 AUD",
          duration: "5 × 90 minutes",
          description: "Comprehensive career transformation program",
          savings: "Save $110"
        },
        ten: {
          title: "10-Session Package",
          price: "$1,880 AUD", 
          duration: "10 × 90 minutes",
          description: "Complete career coaching journey",
          savings: "Save $320"
        }
      },
      additionalOfferings: {
        title: "Additional Offerings",
        apsCourse: {
          title: "APS Application Course",
          price: "$150 AUD",
          description: "Master Australian Public Service applications"
        },
        networkingWorkshop: {
          title: "Professional Networking Workshop",
          price: "$350 AUD", 
          description: "Build your professional network in Australia"
        }
      }
    },
    
    // Contact
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to take the next step in your career journey?",
      methods: {
        whatsapp: {
          label: "WhatsApp",
          value: "+852 9702 0812",
          description: "Instant messaging and calls"
        },
        line: {
          label: "LINE",
          value: "ktuin0918", 
          description: "Popular messaging app"
        },
        facebook: {
          label: "Facebook",
          value: "@careercoachbenson",
          description: "Social media updates"
        },
        threads: {
          label: "Threads", 
          value: "@aus_jobs_and_career_coach",
          description: "Professional insights"
        }
      },
      form: {
        title: "Send Me a Message",
        fields: {
          name: "Full Name",
          email: "Email Address", 
          phone: "Phone Number",
          serviceInterest: "Service Interest",
          message: "Message"
        },
        submit: "Send WhatsApp Message",
        submitting: "Sending..."
      }
    }
  },
  
  zh: {
    // Navigation
    nav: {
      home: "首頁",
      about: "關於我",
      services: "服務項目",
      testimonials: "成功案例", 
      pricing: "收費標準",
      contact: "聯絡方式"
    },
    
    // Hero Section
    hero: {
      title: "澳洲職涯 & 工作申請教練",
      subtitle: "歡迎光臨，希望我有這個榮幸能幫助您往理想職涯更邁前一步！如果您對我的職涯引導及工作申請引導服務有任何問題，歡迎與我聯絡。",
      cta: "預約諮詢",
      credentials: "ICF ACC 認證教練 | CICA RPCDP 職涯發展實踐師"
    },
    
    // About Section
    about: {
      title: "關於 Benson Wong",
      subtitle: "您通往澳洲職涯成功的橋樑",
      experience: "15+ 年澳洲職場經驗",
      certifications: ["ICF ACC 認證教練", "CICA RPCDP 職涯發展實踐師"],
      description: "我專精於協助新澳洲移民、國際學生及打工度假者在澳洲職場導航，建立成功的職業生涯。",
      approach: {
        title: "我的方法",
        points: [
          "文化橋樑：深度理解華人和澳洲職場文化",
          "個人化策略：針對您獨特情況量身訂製指導",
          "實證成果：擁有成功職涯轉型的豐富經驗",
          "雙語支援：提供英語、國語或粵語指導服務"
        ]
      }
    },
    
    // Services Section
    services: {
      title: "服務項目",
      subtitle: "針對您需求的全方位職涯支援",
      careerCoaching: {
        title: "職涯指導",
        description: "澳洲職業發展的策略性引導",
        features: [
          "職涯評估與目標設定",
          "行業洞察與市場分析", 
          "專業發展規劃",
          "面試準備與練習",
          "薪資談判策略",
          "領導力發展"
        ]
      },
      jobApplicationCoaching: {
        title: "工作申請指導",
        description: "履歷表、求職申請與求職策略的專業協助",
        features: [
          "履歷表和CV優化",
          "求職信撰寫",
          "LinkedIn檔案提升",
          "求職策略規劃",
          "申請人跟蹤系統(ATS)優化",
          "面試後續技巧"
        ]
      }
    },
    
    // Pricing
    pricing: {
      title: "投資您的未來",
      subtitle: "選擇最適合您的方案",
      packages: {
        single: {
          title: "單次諮詢",
          price: "$220 澳幣",
          duration: "90 分鐘",
          description: "適合特定職涯問題或快速指導"
        },
        five: {
          title: "5次方案",
          price: "$990 澳幣",
          duration: "5 × 90 分鐘",
          description: "全面職涯轉型計劃",
          savings: "節省 $110"
        },
        ten: {
          title: "10次方案", 
          price: "$1,880 澳幣",
          duration: "10 × 90 分鐘",
          description: "完整職涯指導旅程",
          savings: "節省 $320"
        }
      },
      additionalOfferings: {
        title: "額外服務",
        apsourse: {
          title: "APS 申請課程",
          price: "$150 澳幣",
          description: "掌握澳洲公務員申請技巧"
        },
        networkingWorkshop: {
          title: "專業人脈建立工作坊",
          price: "$350 澳幣",
          description: "在澳洲建立專業人脈網絡"
        }
      }
    },
    
    // Contact
    contact: {
      title: "聯絡方式",
      subtitle: "準備好開始您的職涯發展旅程了嗎？",
      methods: {
        whatsapp: {
          label: "WhatsApp",
          value: "+852 9702 0812",
          description: "即時通訊和通話"
        },
        line: {
          label: "LINE",
          value: "ktuin0918",
          description: "熱門通訊軟體"
        },
        facebook: {
          label: "Facebook", 
          value: "@careercoachbenson",
          description: "社群媒體動態"
        },
        threads: {
          label: "Threads",
          value: "@aus_jobs_and_career_coach", 
          description: "專業見解分享"
        }
      },
      form: {
        title: "傳送訊息給我",
        fields: {
          name: "姓名",
          email: "電子郵件",
          phone: "電話號碼",
          serviceInterest: "感興趣的服務",
          message: "訊息內容"
        },
        submit: "發送 WhatsApp 訊息",
        submitting: "發送中..."
      }
    }
  }
};
```

## 🎛️ Language Management System

### React Context Implementation
```javascript
// src/lib/i18n.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { content } from '@/data/content';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get saved language or default to English
    return localStorage.getItem('preferred-language') || 'en';
  });

  const [currentContent, setCurrentContent] = useState(content[language]);

  const changeLanguage = (newLang) => {
    if (newLang !== language && (newLang === 'en' || newLang === 'zh')) {
      setLanguage(newLang);
      setCurrentContent(content[newLang]);
      localStorage.setItem('preferred-language', newLang);
      
      // Update document language attribute
      document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en-AU';
      
      // Track language change for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
          'from_language': language,
          'to_language': newLang,
          'page_location': window.location.href
        });
      }
    }
  };

  const value = {
    language,
    content: currentContent,
    changeLanguage,
    isEnglish: language === 'en',
    isChinese: language === 'zh'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Utility function for conditional text
export function useText(enText, zhText) {
  const { language } = useLanguage();
  return language === 'en' ? enText : zhText;
}
```

### Language Toggle Component
```javascript
// src/components/common/LanguageToggle.jsx
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className, size = "sm" }) {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className={cn(
      "flex items-center gap-1 bg-white/10 rounded-full p-1",
      className
    )}>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size={size}
        onClick={() => changeLanguage('en')}
        className={cn(
          "rounded-full text-xs px-3 py-1 h-7 font-english transition-all duration-200",
          language === 'en' 
            ? "bg-white text-primary hover:bg-white/90 shadow-sm" 
            : "text-white hover:bg-white/20"
        )}
        aria-label="Switch to English"
      >
        EN
      </Button>
      <Button
        variant={language === 'zh' ? 'default' : 'ghost'}
        size={size}
        onClick={() => changeLanguage('zh')}
        className={cn(
          "rounded-full text-xs px-3 py-1 h-7 font-chinese transition-all duration-200",
          language === 'zh' 
            ? "bg-white text-primary hover:bg-white/90 shadow-sm" 
            : "text-white hover:bg-white/20"
        )}
        aria-label="切換到中文"
      >
        中文
      </Button>
    </div>
  );
}
```

## 🎨 Typography for Chinese Characters

### Font Stack Configuration
```css
/* Chinese-specific font families */
.font-chinese {
  font-family: 
    'PingFang SC',           /* macOS Simplified Chinese */
    'Hiragino Sans GB',      /* macOS fallback */
    'Microsoft YaHei',       /* Windows Simplified Chinese */
    'WenQuanYi Micro Hei',   /* Linux fallback */
    'Noto Sans SC',          /* Google Fonts fallback */
    sans-serif;              /* System fallback */
}

/* Traditional Chinese support */
.font-chinese-traditional {
  font-family: 
    'PingFang TC',           /* macOS Traditional Chinese */
    'Microsoft JhengHei',    /* Windows Traditional Chinese */
    'Noto Sans TC',          /* Google Fonts fallback */
    'PingFang SC',           /* Simplified fallback */
    sans-serif;
}

/* Mixed content (English + Chinese) */
.font-mixed {
  font-family: 
    system-ui,               /* English first */
    'PingFang SC',           /* Chinese support */
    'Hiragino Sans GB', 
    'Microsoft YaHei',
    sans-serif;
}
```

### Chinese Typography Adjustments
```css
/* Chinese-specific text adjustments */
.chinese-text {
  font-family: var(--font-chinese);
  line-height: 1.7;          /* Slightly higher for Chinese characters */
  letter-spacing: 0.02em;    /* Subtle spacing for readability */
}

/* Chinese headings */
.chinese-heading {
  font-family: var(--font-chinese);
  font-weight: 600;          /* Medium weight for Chinese */
  line-height: 1.4;          /* Comfortable for larger Chinese text */
}

/* Responsive Chinese typography */
@media (max-width: 640px) {
  .chinese-text {
    font-size: 0.9em;        /* Slightly smaller on mobile for Chinese */
    line-height: 1.6;
  }
}

/* Chinese punctuation adjustments */
.chinese-content {
  /* Prevent breaking after opening punctuation */
  word-break: keep-all;
  overflow-wrap: break-word;
}
```

### Language-Specific Styling
```javascript
// Component with language-aware styling
export function AdaptiveText({ children, className }) {
  const { language } = useLanguage();
  
  return (
    <span className={cn(
      language === 'zh' ? 'font-chinese chinese-text' : 'font-english',
      className
    )}>
      {children}
    </span>
  );
}

// Usage in components
<AdaptiveText className="text-lg">
  {content.hero.title}
</AdaptiveText>
```

## 🎯 Cultural Adaptation Guidelines

### Content Localization Principles
```javascript
// Cultural adaptation examples
const culturalAdaptations = {
  // Professional titles
  en: {
    title: "Career Coach",
    credentials: "ICF ACC Certified Coach"
  },
  zh: {
    title: "職涯教練",
    credentials: "ICF ACC 認證教練"
  },
  
  // Business concepts
  networking: {
    en: "Professional Networking",
    zh: "專業人脈建立"    // More culturally appropriate term
  },
  
  // Cultural references
  success: {
    en: "Career success in Australia",
    zh: "在澳洲的職涯發展成就"   // Emphasizes development vs. just success
  },
  
  // Communication style
  cta: {
    en: "Book Consultation",        // Direct Western approach
    zh: "預約諮詢"                  // More polite Chinese approach
  }
};
```

### Visual Cultural Considerations
```css
/* Color meanings in Chinese culture */
.chinese-success {
  color: #dc2626;        /* Red for good fortune (not green) */
}

.chinese-warning {
  color: #f59e0b;        /* Gold/Yellow for attention (not red for danger) */
}

/* Number preferences (avoid 4, favor 8) */
.chinese-pricing {
  /* Use culturally positive numbers when possible */
  /* $888, $1888 instead of $840, $1440 */
}

/* Layout considerations for Chinese text */
.chinese-layout {
  /* More generous spacing for Chinese characters */
  letter-spacing: 0.02em;
  word-spacing: 0.05em;
}
```

## 🔧 Implementation Patterns

### Component Usage with i18n
```javascript
// Standard component with i18n
export function HeroSection() {
  const { content, language } = useLanguage();

  return (
    <section className="hero-section">
      <div className="container">
        <h1 className={cn(
          "hero-title",
          language === 'zh' ? 'font-chinese' : 'font-english'
        )}>
          {content.hero.title}
        </h1>
        
        <p className={cn(
          "hero-subtitle",
          language === 'zh' ? 'font-chinese' : 'font-english'
        )}>
          {content.hero.subtitle}
        </p>
        
        <Button className="cta-button">
          {content.hero.cta}
        </Button>
      </div>
    </section>
  );
}
```

### Dynamic Content Loading
```javascript
// Lazy loading content by language
const loadLanguageContent = async (language) => {
  try {
    const content = await import(`@/data/content-${language}.js`);
    return content.default;
  } catch (error) {
    console.warn(`Failed to load ${language} content, using default`);
    return content.en; // Fallback to English
  }
};

// Language-specific asset loading
const getLocalizedAsset = (assetName, language) => {
  const localizedPath = `/images/${assetName}-${language}.jpg`;
  const defaultPath = `/images/${assetName}.jpg`;
  
  // Check if localized version exists, fallback to default
  return fetch(localizedPath)
    .then(response => response.ok ? localizedPath : defaultPath)
    .catch(() => defaultPath);
};
```

## 📱 Mobile i18n Considerations

### Mobile Language Toggle
```css
/* Mobile-optimized language toggle */
@media (max-width: 640px) {
  .language-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 50;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    padding: 0.25rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
```

### Responsive Chinese Text
```css
/* Mobile Chinese text optimization */
@media (max-width: 640px) {
  .chinese-mobile-text {
    font-size: 0.9em;       /* Slightly smaller for better mobile reading */
    line-height: 1.6;       /* Tighter line height on mobile */
    word-break: keep-all;   /* Prevent awkward Chinese character breaking */
  }
}
```

## 🧪 Testing i18n Implementation

### Language Testing Checklist
- [ ] Language toggle works on all pages
- [ ] Content switches completely between languages
- [ ] Chinese characters render correctly on all devices
- [ ] Font fallbacks work properly
- [ ] Text layout adapts appropriately for both languages
- [ ] Cultural references are appropriate in both languages
- [ ] Contact forms generate correct language messages
- [ ] SEO meta tags update with language change
- [ ] Analytics track language preferences

### Browser Testing for Chinese Fonts
```javascript
// Test Chinese font rendering
const testChineseFonts = () => {
  const testElement = document.createElement('div');
  testElement.innerHTML = '测试中文字体渲染 Test Chinese Font Rendering';
  testElement.style.fontFamily = 'PingFang SC, Microsoft YaHei, sans-serif';
  document.body.appendChild(testElement);
  
  // Check computed font
  const computedFont = getComputedStyle(testElement).fontFamily;
  console.log('Chinese font rendered with:', computedFont);
  
  document.body.removeChild(testElement);
};
```

## 📊 Analytics for Bilingual Content

### Language Preference Tracking
```javascript
// Track language usage patterns
const trackLanguageUsage = (language, action) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'language_interaction', {
      'language': language,
      'action': action,
      'page_location': window.location.href,
      'user_agent': navigator.userAgent.toLowerCase()
    });
  }
};

// Track content engagement by language
const trackContentEngagement = (section, language, timeSpent) => {
  gtag('event', 'content_engagement', {
    'section': section,
    'language': language,
    'engagement_time': timeSpent,
    'content_type': 'bilingual'
  });
};
```

## 🔗 Related Documentation
- **[Design System](./design-system.md)**: Typography specifications for bilingual content
- **[Component Library](../technical/component-library.md)**: Implementation of language toggle and bilingual components
- **[Content Strategy](../business/content-strategy.md)**: Bilingual content management and SEO
- **[Architecture](../technical/architecture.md)**: Technical setup for internationalization