# Success Metrics & Analytics

> **Context**: KPIs, analytics setup, and success measurement for the coaching landing page  
> **Audience**: Business stakeholders, marketers, and analysts  
> **Prerequisites**: [Project Overview](./project-overview.md) - Business objectives  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Project Overview](./project-overview.md) - Business objectives
- [Content Strategy](./content-strategy.md) - Content performance

---

## 📊 Key Performance Indicators (KPIs)

### Primary Business Metrics
- **Lead Generation**: Consultation booking requests per month
- **Conversion Rate**: Visitors to consultation bookings (Target: 2-5%)
- **Revenue Attribution**: Bookings traced to website visits
- **Cost Per Acquisition**: Marketing spend per new client

### Secondary Engagement Metrics
- **Time on Site**: Average session duration (Target: 3+ minutes)
- **Pages per Session**: Content consumption depth (Target: 2.5+ pages)
- **Bounce Rate**: Single page visits (Target: <60%)
- **Return Visitors**: Repeat engagement rate (Target: 15%+)

### Technical Performance Metrics
- **Page Load Time**: First Contentful Paint (Target: <1.5s)
- **Mobile Usability**: Mobile-friendly test score
- **Accessibility Score**: WCAG AA compliance level
- **Search Rankings**: Position for target keywords

## 🎯 Conversion Tracking Setup

### Primary Conversion Events
```javascript
// Consultation booking (highest value)
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/consultation_booking',
  'value': 220,
  'currency': 'AUD',
  'transaction_id': generateTransactionId()
});

// WhatsApp contact click
gtag('event', 'contact_click', {
  'contact_method': 'whatsapp',
  'page_location': window.location.href,
  'value': 50 // Estimated lead value
});

// Course enrollment interest
gtag('event', 'course_interest', {
  'course_type': 'APS_course', // or 'networking_workshop'
  'value': 150,
  'currency': 'AUD'
});
```

### Micro-Conversion Events
```javascript
// Language toggle usage
gtag('event', 'language_toggle', {
  'from_language': previousLanguage,
  'to_language': currentLanguage,
  'page_section': currentSection
});

// Section engagement
gtag('event', 'section_engagement', {
  'section_name': 'testimonials', // or 'pricing', 'services'
  'engagement_time': timeSpent,
  'scroll_depth': scrollPercentage
});

// Social media clicks
gtag('event', 'social_click', {
  'platform': 'facebook', // or 'threads', 'line'
  'link_position': 'header' // or 'footer', 'contact'
});
```

## 📈 Analytics Implementation

### Google Analytics 4 Setup
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  gtag('config', 'GA_MEASUREMENT_ID', {
    // Enhanced ecommerce for service bookings
    'custom_map': {
      'custom_parameter_1': 'service_type',
      'custom_parameter_2': 'language_preference'
    }
  });
</script>
```

### Custom Dimensions Setup
```javascript
// Custom dimensions for GA4
const customDimensions = {
  'language_preference': currentLanguage, // 'en' or 'zh'
  'service_interest': serviceType, // 'coaching', 'course', 'workshop'
  'visitor_type': visitorType, // 'first_time', 'returning'
  'traffic_source': trafficSource, // 'organic', 'social', 'direct'
  'page_section': pageSection // 'hero', 'about', 'services', etc.
};

gtag('config', 'GA_MEASUREMENT_ID', {
  'custom_map': customDimensions
});
```

### Enhanced E-commerce Tracking
```javascript
// Service viewed (equivalent to product view)
gtag('event', 'view_item', {
  'currency': 'AUD',
  'value': 220,
  'items': [{
    'item_id': 'single_consultation',
    'item_name': 'Career Coaching Session',
    'category': 'Coaching Services',
    'price': 220,
    'currency': 'AUD'
  }]
});

// Service booking initiated
gtag('event', 'begin_checkout', {
  'currency': 'AUD', 
  'value': 990,
  'items': [{
    'item_id': '5_session_package',
    'item_name': '5-Session Coaching Package',
    'category': 'Coaching Packages',
    'price': 990,
    'currency': 'AUD'
  }]
});
```

## 🔍 Performance Monitoring

### Core Web Vitals Tracking
```javascript
// Performance budgets and monitoring
const performanceBudgets = {
  firstContentfulPaint: 1500, // 1.5 seconds
  largestContentfulPaint: 2500, // 2.5 seconds
  cumulativeLayoutShift: 0.1, // < 0.1
  firstInputDelay: 100, // 100ms
  totalBundleSize: 512000, // 500KB
  imageOptimization: 'webp_with_fallback'
};

// Track Core Web Vitals
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Real User Monitoring
```javascript
// Performance tracking to GA4
function sendWebVitals({name, delta, value, id}) {
  gtag('event', 'web_vital', {
    'metric_name': name,
    'metric_value': Math.round(name === 'CLS' ? delta * 1000 : delta),
    'metric_id': id,
    'page_url': window.location.href
  });
}

// Initialize web vitals tracking
getCLS(sendWebVitals);
getFID(sendWebVitals);
getFCP(sendWebVitals);
getLCP(sendWebVitals);
```

## 🧪 A/B Testing Framework

### Testing Opportunities
- **Hero Headlines**: Value proposition variations
  - "Career and Job Application Coach" 
  - "Your Bridge to Australian Career Success"
  - "ICF Certified Coach for New Australians"

- **CTA Button Text**: Action-oriented variations
  - "Book Consultation" vs "Get Started" vs "Contact Now"
  - "預約諮詢" vs "開始諮詢" vs "立即聯絡"

- **Pricing Display**: Package emphasis
  - Individual session pricing prominent
  - Package deals prominent
  - Value comparison tables

- **Testimonial Selection**: Different success stories
  - Recent graduate success
  - Career pivot success 
  - Industry-specific success

### A/B Testing Implementation
```javascript
// Simple A/B testing with GA4
function initializeABTest(testName, variants) {
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  
  // Track test participation
  gtag('event', 'ab_test_view', {
    'test_name': testName,
    'variant': variant,
    'user_id': generateUserId()
  });
  
  return variant;
}

// Example usage
const heroVariant = initializeABTest('hero_headline', ['original', 'bridge_focus']);
const ctaVariant = initializeABTest('cta_text', ['book_consultation', 'get_started']);
```

## 📊 Reporting & Dashboards

### Weekly Performance Report
```javascript
// Key metrics to track weekly
const weeklyMetrics = {
  traffic: {
    unique_visitors: 0,
    page_views: 0,
    bounce_rate: 0,
    avg_session_duration: 0
  },
  conversions: {
    consultation_requests: 0,
    whatsapp_clicks: 0,
    course_interests: 0,
    conversion_rate: 0
  },
  engagement: {
    language_toggles: 0,
    social_clicks: 0,
    video_plays: 0,
    section_completions: 0
  },
  performance: {
    avg_page_load: 0,
    mobile_score: 0,
    desktop_score: 0,
    accessibility_score: 0
  }
};
```

### Monthly Business Review Metrics
- **Lead Quality**: Consultation booking to actual client conversion
- **Service Interest**: Which services generate most interest
- **Geographic Distribution**: Visitor locations and local performance
- **Language Preference**: EN vs ZH usage patterns
- **Device Usage**: Mobile vs desktop behavior patterns
- **Traffic Sources**: Best performing acquisition channels

## 🎯 Success Benchmarks

### Month 1 Goals (Launch)
- **Traffic**: 500+ unique visitors
- **Engagement**: 2+ minutes average time on site
- **Conversions**: 5+ consultation bookings
- **Performance**: <2s page load time
- **Quality**: 95+ accessibility score

### Month 3 Goals (Optimization)
- **Traffic**: 1,500+ unique visitors
- **Engagement**: 3+ minutes average time on site  
- **Conversions**: 20+ consultation bookings
- **SEO**: Page 1 ranking for primary keywords
- **User Experience**: <1.5s page load time

### Month 6 Goals (Scaling)
- **Traffic**: 3,000+ unique visitors
- **Engagement**: 65% returning visitor rate
- **Conversions**: 50+ consultation bookings
- **Revenue**: $10,000+ attributed to website
- **Brand**: 1,000+ social media followers

## 📱 Mobile Analytics Focus

### Mobile-Specific Metrics
- **Mobile Traffic**: Percentage of mobile visitors (Target: 60%+)
- **Mobile Conversion**: Mobile vs desktop conversion rates
- **Touch Interactions**: Tap behavior on mobile CTAs
- **Mobile Speed**: Mobile page speed scores (Target: 90+)

### Mobile User Behavior
```javascript
// Track mobile-specific behaviors
if (window.innerWidth <= 768) {
  gtag('event', 'mobile_session', {
    'device_type': 'mobile',
    'screen_size': `${window.innerWidth}x${window.innerHeight}`,
    'orientation': window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  });
}
```

## 🔗 Related Documentation
- **[Project Overview](./project-overview.md)**: Business objectives being measured
- **[Content Strategy](./content-strategy.md)**: Content performance tracking
- **[Performance Optimization](../integration/performance-optimization.md)**: Technical performance metrics
- **[Testing & QA](../operations/testing-qa.md)**: Quality metrics and testing procedures