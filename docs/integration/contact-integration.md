# Contact Integration

> **Context**: Contact methods, form handling, and communication channel integrations  
> **Audience**: Developers implementing contact functionality and business stakeholders  
> **Prerequisites**: [Project Overview](../business/project-overview.md) - Business context  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Component Library](../technical/component-library.md) - Contact form implementation
- [Internationalization](../design/internationalization.md) - Multilingual contact content

---

## 📞 Contact Method Hierarchy

### Primary Contact Methods (Priority Order)
1. **WhatsApp**: +852 9702 0812 (Primary - instant messaging and calls)
2. **LINE**: ktuin0918 (Popular with Asian community)
3. **Facebook**: @careercoachbenson (Social proof and messaging)
4. **Threads**: @aus_jobs_and_career_coach (Professional updates and networking)

### Contact Strategy Rationale
```javascript
const contactStrategy = {
  whatsapp: {
    priority: 1,
    reasons: [
      "Instant communication preferred by target audience",
      "Supports both text and voice communication", 
      "Cross-platform availability",
      "Popular in Chinese-speaking communities",
      "Business-friendly with WhatsApp Business features"
    ],
    targetAudience: "All client segments",
    responseTime: "Within 2-4 hours during business hours"
  },
  
  line: {
    priority: 2,
    reasons: [
      "Extremely popular in Asian markets",
      "Familiar to Chinese/Taiwanese/Japanese clients",
      "Rich messaging features",
      "Group chat capabilities for workshops"
    ],
    targetAudience: "Asian international students and migrants",
    responseTime: "Within 4-6 hours"
  },
  
  facebook: {
    priority: 3,
    reasons: [
      "Social proof through posts and reviews",
      "Community building potential",
      "Event promotion for workshops",
      "Broader audience reach"
    ],
    targetAudience: "Community engagement and social proof",
    responseTime: "Within 24 hours"
  },
  
  threads: {
    priority: 4,
    reasons: [
      "Professional content sharing",
      "Industry insights and thought leadership",
      "Career advice and tips",
      "Networking with other professionals"
    ],
    targetAudience: "Professional network and content marketing",
    responseTime: "Content publishing, not direct communication"
  }
};
```

## 🎯 Contact Form Implementation

### Form Structure and Fields
```javascript
// src/components/sections/ContactForm.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';

export function ContactForm({ onSubmit, className }) {
  const { content, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    urgency: 'normal',
    preferredContact: 'whatsapp',
    message: '',
    language: language
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Service options for selection
  const serviceOptions = [
    { id: 'single-session', label: content.pricing.packages.single.title },
    { id: '5-session-package', label: content.pricing.packages.five.title },
    { id: '10-session-package', label: content.pricing.packages.ten.title },
    { id: 'aps-course', label: content.pricing.additionalOfferings.apsCourse.title },
    { id: 'networking-workshop', label: content.pricing.additionalOfferings.networkingWorkshop.title },
    { id: 'general-inquiry', label: language === 'en' ? 'General Inquiry' : '一般諮詢' }
  ];

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = language === 'en' ? 'Name is required' : '姓名為必填';
    }
    
    if (!formData.email.trim()) {
      errors.email = language === 'en' ? 'Email is required' : '電子郵件為必填';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === 'en' ? 'Invalid email format' : '電子郵件格式無效';
    }
    
    if (!formData.message.trim()) {
      errors.message = language === 'en' ? 'Message is required' : '訊息為必填';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const message = `${language === 'en' ? 'Hi Benson, I\'m interested in your coaching services.' : '您好 Benson，我對您的職涯指導服務有興趣。'}

${language === 'en' ? 'Name' : '姓名'}: ${formData.name}
${language === 'en' ? 'Email' : '電子郵件'}: ${formData.email}
${language === 'en' ? 'Phone' : '電話'}: ${formData.phone || 'Not provided'}
${language === 'en' ? 'Service Interest' : '感興趣的服務'}: ${formData.serviceInterest || 'General Inquiry'}
${language === 'en' ? 'Preferred Language' : '偏好語言'}: ${language === 'en' ? 'English' : '中文'}
${language === 'en' ? 'Urgency' : '緊急程度'}: ${formData.urgency}

${language === 'en' ? 'Message' : '訊息'}:
${formData.message}

${language === 'en' ? '--- Sent from Career Coach Website ---' : '--- 來自職涯教練網站 ---'}`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate WhatsApp URL with form data
      const whatsappMessage = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/85297020812?text=${whatsappMessage}`;
      
      // Track form submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
          'service_interest': formData.serviceInterest,
          'language': formData.language,
          'contact_method': 'whatsapp',
          'urgency': formData.urgency
        });
      }
      
      // Open WhatsApp with pre-filled message
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      // Call success callback if provided
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Show success message
      alert(language === 'en' 
        ? 'WhatsApp opened with your message. Please send it to complete your inquiry!' 
        : 'WhatsApp 已開啟並包含您的訊息。請發送以完成您的諮詢！'
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceInterest: '',
        urgency: 'normal',
        preferredContact: 'whatsapp',
        message: '',
        language: language
      });
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert(language === 'en' 
        ? 'An error occurred. Please try again or contact directly via WhatsApp.'
        : '發生錯誤。請重試或直接透過 WhatsApp 聯絡。'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <Card className={`max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {content.contact.form.title}
        </CardTitle>
        <p className="text-center text-muted-foreground">
          {language === 'en' 
            ? 'Fill out the form below and we\'ll open WhatsApp with your message ready to send.'
            : '填寫下方表格，我們將開啟 WhatsApp 並準備好您的訊息以供發送。'
          }
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{content.contact.form.fields.name} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange('name')}
                className={`w-full ${validationErrors.name ? 'border-red-500' : ''}`}
                placeholder={language === 'en' ? 'Your full name' : '您的全名'}
              />
              {validationErrors.name && (
                <p className="text-sm text-red-500">{validationErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{content.contact.form.fields.email} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                className={`w-full ${validationErrors.email ? 'border-red-500' : ''}`}
                placeholder={language === 'en' ? 'your@email.com' : '您的@email.com'}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>
          </div>
          
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">{content.contact.form.fields.phone}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              className="w-full"
              placeholder={language === 'en' ? '+61 4XX XXX XXX (optional)' : '+61 4XX XXX XXX (可選)'}
            />
          </div>
          
          {/* Service Interest */}
          <div className="space-y-3">
            <Label>{content.contact.form.fields.serviceInterest}</Label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service) => (
                <Badge
                  key={service.id}
                  variant={formData.serviceInterest === service.id ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    serviceInterest: prev.serviceInterest === service.id ? '' : service.id
                  }))}
                >
                  {service.label}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Urgency Level */}
          <div className="space-y-3">
            <Label>{language === 'en' ? 'How urgent is your inquiry?' : '您的諮詢有多緊急？'}</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'low', label: language === 'en' ? 'No Rush' : '不急' },
                { id: 'normal', label: language === 'en' ? 'Normal' : '一般' },
                { id: 'high', label: language === 'en' ? 'Urgent' : '緊急' }
              ].map((urgency) => (
                <Badge
                  key={urgency.id}
                  variant={formData.urgency === urgency.id ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    urgency: urgency.id
                  }))}
                >
                  {urgency.label}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{content.contact.form.fields.message} *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange('message')}
              rows={5}
              className={`w-full ${validationErrors.message ? 'border-red-500' : ''}`}
              placeholder={language === 'en' 
                ? 'Tell me about your career goals, current situation, or any specific questions you have...'
                : '告訴我您的職涯目標、目前情況或任何具體問題...'
              }
            />
            {validationErrors.message && (
              <p className="text-sm text-red-500">{validationErrors.message}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? content.contact.form.submitting 
              : content.contact.form.submit
            }
          </Button>
          
          {/* Privacy Notice */}
          <p className="text-xs text-center text-muted-foreground">
            {language === 'en' 
              ? 'By submitting this form, you agree to be contacted via WhatsApp. Your information is used solely for responding to your inquiry.'
              : '提交此表格即表示您同意透過 WhatsApp 聯絡。您的資訊僅用於回應您的諮詢。'
            }
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
```

## 📱 WhatsApp Integration

### WhatsApp Business Features
```javascript
// WhatsApp integration utilities
export const whatsappIntegration = {
  businessNumber: '+85297020812',
  features: {
    businessProfile: {
      name: 'Benson Wong - Career Coach',
      description: 'ICF ACC Certified Career & Job Application Coach',
      website: 'https://careercoachbenson.com',
      address: 'Australia (Remote Services)',
      hours: 'Mon-Fri: 9AM-6PM AEST, Sat: 10AM-4PM AEST'
    },
    
    quickReplies: [
      'Thank you for your interest! I typically respond within 2-4 hours during business hours.',
      'I offer career coaching in English, Mandarin, and Cantonese. Which would you prefer?',
      'Would you like to schedule a free 15-minute consultation to discuss your needs?',
      'I have packages for 1, 5, or 10 sessions. What timeframe are you considering?'
    ],
    
    awayMessage: {
      en: 'Thanks for contacting me! I\'m currently away but will respond within 24 hours. For urgent matters, please mention "URGENT" in your message.',
      zh: '感謝您聯絡我！我目前不在線，但會在24小時內回覆。如有緊急事項，請在訊息中註明「緊急」。'
    }
  },
  
  // Message templates for different scenarios
  messageTemplates: {
    generalInquiry: (data) => `
Hi Benson, I'm interested in learning more about your career coaching services.

Name: ${data.name}
Email: ${data.email}
Current Situation: ${data.message}

I'd love to schedule a consultation when you're available.
    `,
    
    specificService: (data) => `
Hi Benson, I'm interested in your ${data.serviceInterest}.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Background: ${data.message}

When would be a good time to discuss this further?
    `,
    
    urgentInquiry: (data) => `
URGENT: Hi Benson, I need career guidance urgently.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Situation: ${data.message}

Please let me know when we can speak as soon as possible.
    `
  },
  
  // Analytics tracking for WhatsApp interactions
  trackWhatsAppClick: (context) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        'click_context': context,
        'contact_method': 'whatsapp',
        'page_location': window.location.href,
        'timestamp': Date.now()
      });
    }
  }
};

// Utility function to generate WhatsApp URLs
export const generateWhatsAppURL = (message, trackingContext = 'general') => {
  whatsappIntegration.trackWhatsAppClick(trackingContext);
  return `https://wa.me/${whatsappIntegration.businessNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
};
```

### Direct Contact Buttons Implementation
```javascript
// src/components/common/ContactButtons.jsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  MessageSquare, 
  Facebook, 
  AtSign 
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { generateWhatsAppURL } from '@/lib/whatsapp-integration';

export function ContactButtons({ variant = 'horizontal', className }) {
  const { content, language } = useLanguage();
  
  const contactMethods = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: content.contact.methods.whatsapp.label,
      value: content.contact.methods.whatsapp.value,
      description: content.contact.methods.whatsapp.description,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        const message = language === 'en' 
          ? 'Hi Benson! I found your website and I\'m interested in learning more about your career coaching services.'
          : '您好 Benson！我在網站上看到您的資訊，對您的職涯指導服務很有興趣。';
        window.open(generateWhatsAppURL(message, 'direct_contact'), '_blank');
      },
      priority: 1
    },
    {
      id: 'line',
      icon: MessageSquare,
      label: content.contact.methods.line.label,
      value: content.contact.methods.line.value,
      description: content.contact.methods.line.description,
      color: 'bg-green-400 hover:bg-green-500',
      action: () => {
        const lineUrl = `https://line.me/ti/p/ktuin0918`;
        window.open(lineUrl, '_blank');
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'line_click', {
            'contact_method': 'line',
            'page_location': window.location.href
          });
        }
      },
      priority: 2
    },
    {
      id: 'facebook',
      icon: Facebook,
      label: content.contact.methods.facebook.label,
      value: content.contact.methods.facebook.value,
      description: content.contact.methods.facebook.description,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const facebookUrl = 'https://facebook.com/careercoachbenson';
        window.open(facebookUrl, '_blank');
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'facebook_click', {
            'contact_method': 'facebook',
            'page_location': window.location.href
          });
        }
      },
      priority: 3
    },
    {
      id: 'threads',
      icon: AtSign,
      label: content.contact.methods.threads.label,
      value: content.contact.methods.threads.value,
      description: content.contact.methods.threads.description,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => {
        const threadsUrl = 'https://threads.net/@aus_jobs_and_career_coach';
        window.open(threadsUrl, '_blank');
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'threads_click', {
            'contact_method': 'threads',
            'page_location': window.location.href
          });
        }
      },
      priority: 4
    }
  ];

  if (variant === 'horizontal') {
    return (
      <div className={`flex flex-wrap gap-3 justify-center ${className}`}>
        {contactMethods.map((method) => (
          <Button
            key={method.id}
            onClick={method.action}
            className={`${method.color} text-white hover:scale-105 transition-all duration-200`}
            size="lg"
          >
            <method.icon className="w-5 h-5 mr-2" />
            {method.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${className}`}>
      {contactMethods.map((method) => (
        <div
          key={method.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-primary/20 transition-colors cursor-pointer"
          onClick={method.action}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${method.color} text-white`}>
              <method.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium">{method.label}</h4>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline">{method.value}</Badge>
            {method.priority === 1 && (
              <Badge className="ml-2 bg-primary text-white">
                {language === 'en' ? 'Recommended' : '推薦'}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 📊 Contact Analytics & Tracking

### Contact Method Performance Tracking
```javascript
// Contact analytics implementation
export const contactAnalytics = {
  // Track contact method clicks
  trackContactMethod: (method, context = 'general') => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'contact_method_click', {
        'contact_method': method,
        'click_context': context,
        'page_location': window.location.href,
        'timestamp': Date.now(),
        'user_agent': navigator.userAgent
      });
    }
    
    // Store in localStorage for conversion tracking
    const contactHistory = JSON.parse(localStorage.getItem('contact_history') || '[]');
    contactHistory.push({
      method,
      context,
      timestamp: Date.now(),
      url: window.location.href
    });
    localStorage.setItem('contact_history', JSON.stringify(contactHistory.slice(-10))); // Keep last 10
  },
  
  // Track form field interactions
  trackFormInteraction: (field, action) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_interaction', {
        'field_name': field,
        'interaction_type': action,
        'form_type': 'contact_form'
      });
    }
  },
  
  // Track successful message generation
  trackMessageGenerated: (messageType, serviceInterest) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'contact_message_generated', {
        'message_type': messageType,
        'service_interest': serviceInterest,
        'conversion_value': 50 // Estimated lead value
      });
    }
  }
};
```

### Conversion Rate Optimization
```javascript
// A/B testing for contact methods
export const contactOptimization = {
  // Test different CTA button texts
  ctaVariants: {
    whatsapp: [
      'Message on WhatsApp',
      'Chat with Benson',
      'Start WhatsApp Chat',
      'Contact via WhatsApp'
    ],
    general: [
      'Book Consultation',
      'Get Started',
      'Contact Now',
      'Schedule Chat'
    ]
  },
  
  // Test contact method prominence
  layoutVariants: {
    'whatsapp-first': ['whatsapp', 'line', 'facebook', 'threads'],
    'equal-weight': ['whatsapp', 'line', 'facebook', 'threads'],
    'social-last': ['whatsapp', 'line', 'facebook', 'threads']
  },
  
  // Performance metrics
  measureContactEffectiveness: () => {
    const history = JSON.parse(localStorage.getItem('contact_history') || '[]');
    const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
    const recentContacts = history.filter(contact => contact.timestamp > last24Hours);
    
    return {
      totalContacts: recentContacts.length,
      methodBreakdown: recentContacts.reduce((acc, contact) => {
        acc[contact.method] = (acc[contact.method] || 0) + 1;
        return acc;
      }, {}),
      conversionByPage: recentContacts.reduce((acc, contact) => {
        const page = contact.url.split('/').pop() || 'home';
        acc[page] = (acc[page] || 0) + 1;
        return acc;
      }, {})
    };
  }
};
```

## 🔧 Privacy & Compliance

### Privacy Considerations for Contact Integration
```javascript
// Privacy compliance for contact forms
export const contactPrivacy = {
  dataCollection: {
    collected: ['name', 'email', 'phone', 'message', 'service_interest'],
    purpose: 'Responding to coaching service inquiries',
    retention: '24 months or until services completed',
    sharing: 'Not shared with third parties except WhatsApp for communication'
  },
  
  userConsent: {
    required: true,
    consentText: {
      en: 'By submitting this form, you consent to being contacted about coaching services via your provided contact methods.',
      zh: '提交此表格即表示您同意就指導服務通過您提供的聯絡方式與您聯絡。'
    }
  },
  
  dataMinimization: {
    onlyNecessary: true,
    optionalFields: ['phone'],
    requiredFields: ['name', 'email', 'message'],
    autoDelete: 'Messages deleted from form after WhatsApp redirect'
  },
  
  // GDPR compliance for EU visitors
  gdprCompliance: {
    rightToErasure: 'Contact benson@careercoach.com.au to delete your data',
    dataPortability: 'Contact details can be provided in JSON format',
    processingLawfulness: 'Legitimate interest for business communication'
  }
};
```

## 🌐 Multi-Language Contact Support

### Localized Contact Content
```javascript
// Localized contact responses and templates
export const localizedContact = {
  autoResponses: {
    en: {
      initial: 'Thank you for your message! I typically respond within 2-4 hours during business hours (Mon-Fri 9AM-6PM AEST).',
      consultation: 'I\'d be happy to offer you a free 15-minute consultation to understand your career goals. When would be convenient for you?',
      packages: 'I offer flexible coaching packages - single sessions ($220), 5-session packages ($990), or 10-session packages ($1,880). Which interests you most?'
    },
    zh: {
      initial: '感謝您的訊息！我通常在工作時間內（週一至週五上午9點至下午6點澳洲東部時間）2-4小時內回覆。',
      consultation: '我很樂意為您提供免費的15分鐘諮詢，以了解您的職涯目標。什麼時間對您方便？',
      packages: '我提供靈活的指導套餐 - 單次諮詢（$220澳幣）、5次套餐（$990澳幣）或10次套餐（$1,880澳幣）。您最感興趣哪個？'
    }
  },
  
  businessHours: {
    timezone: 'Australia/Sydney',
    hours: {
      monday: '09:00-18:00',
      tuesday: '09:00-18:00', 
      wednesday: '09:00-18:00',
      thursday: '09:00-18:00',
      friday: '09:00-18:00',
      saturday: '10:00-16:00',
      sunday: 'closed'
    },
    holidays: ['2024-12-25', '2024-12-26', '2024-01-01'] // Australian public holidays
  }
};
```

## 🔗 Related Documentation
- **[Component Library](../technical/component-library.md)**: Contact form implementation details
- **[Internationalization](../design/internationalization.md)**: Multilingual contact content
- **[Success Metrics](../business/success-metrics.md)**: Contact conversion tracking
- **[Project Overview](../business/project-overview.md)**: Business context and contact strategy