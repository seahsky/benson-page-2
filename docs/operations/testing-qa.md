# Testing & Quality Assurance

> **Context**: Comprehensive testing procedures, quality assurance checklists, and validation processes  
> **Audience**: Developers, QA engineers, and project stakeholders  
> **Prerequisites**: [Architecture](../technical/architecture.md) - Technical foundation  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Development Workflow](../technical/development-workflow.md) - Development processes
- [Deployment](./deployment.md) - Deployment validation

---

## 🧪 Testing Strategy Overview

### Testing Pyramid
```
                    /\
                   /  \
                  /E2E \     ← End-to-End Tests (5%)
                 /______\
                /        \
               / Integration\  ← Integration Tests (15%)
              /______________\
             /                \
            /    Unit Tests    \  ← Unit Tests (80%)
           /____________________\
```

### Testing Categories
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interaction and API integration
- **End-to-End Tests**: Complete user workflows
- **Visual Regression**: UI consistency across changes
- **Performance Tests**: Loading time and resource usage
- **Accessibility Tests**: WCAG compliance and screen reader support
- **Cross-Browser Tests**: Compatibility across browsers
- **Mobile Tests**: Responsive design and touch interactions

## ✅ Manual Testing Checklist

### Pre-Development Testing
- [ ] Requirements clearly defined and understood
- [ ] Design mockups reviewed and approved
- [ ] Technical architecture validated
- [ ] Performance budgets established
- [ ] Accessibility requirements documented

### Development Testing (Per Feature)
- [ ] Component renders correctly in isolation
- [ ] Props and state management work as expected
- [ ] Error boundaries handle edge cases
- [ ] Loading states display appropriately
- [ ] Empty states handled gracefully

### Functionality Testing
```javascript
// Testing checklist template
const functionalityTests = {
  navigation: [
    'Header navigation links work correctly',
    'Language toggle switches content',
    'Mobile menu opens and closes',
    'Scroll-to-section navigation smooth scrolls',
    'Active section highlighting works'
  ],
  
  languageToggle: [
    'EN/中文 toggle switches content completely',
    'Language preference persists across page reloads',
    'Font families switch appropriately',
    'Cultural adaptations display correctly',
    'No missing translations or empty content'
  ],
  
  contactForms: [
    'All form fields accept input',
    'Validation errors display clearly',
    'Required field validation works',
    'Email format validation functional',
    'WhatsApp URL generation correct',
    'Form resets after successful submission'
  ],
  
  responsiveDesign: [
    'Layout adapts correctly to all breakpoints',
    'Text remains readable at all sizes',
    'Touch targets meet 44px minimum',
    'Images scale appropriately',
    'No horizontal scrolling on mobile',
    'Content hierarchy maintained on small screens'
  ]
};
```

### Cross-Browser Testing Matrix
```javascript
// Browser testing requirements
const browserTestMatrix = {
  desktop: {
    chrome: { versions: ['latest', 'latest-1'], priority: 'high' },
    firefox: { versions: ['latest', 'latest-1'], priority: 'high' },
    safari: { versions: ['latest', 'latest-1'], priority: 'high' },
    edge: { versions: ['latest'], priority: 'medium' }
  },
  
  mobile: {
    chromeAndroid: { versions: ['latest'], priority: 'high' },
    safariIOS: { versions: ['latest', 'latest-1'], priority: 'high' },
    samsungInternet: { versions: ['latest'], priority: 'medium' }
  },
  
  // Legacy support (if required)
  legacy: {
    ie11: { priority: 'low', notes: 'Basic functionality only' }
  }
};

// Testing checklist per browser
const perBrowserChecklist = [
  'Page loads without errors',
  'CSS styles apply correctly', 
  'JavaScript functionality works',
  'Fonts display properly',
  'Chinese characters render correctly',
  'Form submissions work',
  'Media queries respond correctly',
  'Performance meets minimum standards'
];
```

### Responsive Design Testing
```javascript
// Device testing matrix
const deviceTestMatrix = {
  mobile: [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
    { name: 'Pixel 5', width: 393, height: 851 }
  ],
  
  tablet: [
    { name: 'iPad Mini', width: 768, height: 1024 },
    { name: 'iPad Air', width: 820, height: 1180 },
    { name: 'iPad Pro 11"', width: 834, height: 1194 }
  ],
  
  desktop: [
    { name: 'MacBook Air', width: 1280, height: 800 },
    { name: 'Desktop HD', width: 1920, height: 1080 },
    { name: 'Large Desktop', width: 2560, height: 1440 }
  ]
};

// Responsive testing checklist
const responsiveChecklist = [
  'Layout never breaks at any screen size',
  'Text remains readable without horizontal scrolling',
  'Images scale appropriately',
  'Navigation is accessible and functional',
  'Touch targets are large enough (44px minimum)',
  'Content priority is maintained across breakpoints',
  'Typography scales appropriately',
  'Spacing and padding feel comfortable'
];
```

## 🎯 Accessibility Testing

### WCAG 2.1 AA Compliance Checklist
```javascript
const accessibilityTests = {
  perceivable: [
    'All images have descriptive alt text',
    'Color contrast ratios meet 4.5:1 minimum',
    'Text can be resized up to 200% without loss of functionality',
    'Content is structured with proper headings (h1-h6)',
    'Focus indicators are clearly visible',
    'Video/audio content has captions/transcripts (if applicable)'
  ],
  
  operable: [
    'All functionality available via keyboard navigation',
    'No content causes seizures or flashes',
    'Users can pause, stop, or hide moving content',
    'Keyboard focus is logical and predictable',
    'Users have enough time to read content'
  ],
  
  understandable: [
    'Language of page and parts is identified',
    'Navigation is consistent across pages',
    'Form labels and instructions are clear',
    'Error messages are descriptive and helpful',
    'Complex interactions have clear instructions'
  ],
  
  robust: [
    'Markup is valid and semantic',
    'Content works with assistive technologies',
    'ARIA attributes used correctly where needed',
    'Custom components follow accessibility patterns'
  ]
};
```

### Screen Reader Testing
```javascript
// Screen reader testing protocol
const screenReaderTests = {
  tools: [
    { name: 'NVDA', platform: 'Windows', browser: 'Firefox' },
    { name: 'JAWS', platform: 'Windows', browser: 'Chrome' },
    { name: 'VoiceOver', platform: 'macOS', browser: 'Safari' },
    { name: 'TalkBack', platform: 'Android', browser: 'Chrome' },
    { name: 'VoiceOver', platform: 'iOS', browser: 'Safari' }
  ],
  
  testScenarios: [
    'Navigate page structure using headings',
    'Access all interactive elements via keyboard',
    'Form completion and submission workflow',
    'Language toggle functionality',
    'Error message announcement',
    'Dynamic content updates (if any)',
    'Skip navigation functionality',
    'Landmark navigation'
  ],
  
  successCriteria: [
    'All content is announced accurately',
    'Navigation is logical and predictable',
    'Interactive elements have clear labels',
    'Form validation messages are announced',
    'Language switches are clearly indicated',
    'No phantom or duplicate content announced'
  ]
};
```

### Accessibility Testing Tools
```bash
# Automated accessibility testing tools
npm install --save-dev axe-core @axe-core/cli
npm install --save-dev lighthouse
npm install --save-dev pa11y

# Command line testing
npx axe-core --dir ./dist --save results.json
npx lighthouse ./dist/index.html --output html --output-path accessibility-report.html
npx pa11y http://localhost:5173
```

## 🚀 Performance Testing

### Core Web Vitals Testing
```javascript
// Performance testing checklist
const performanceTests = {
  coreWebVitals: [
    { metric: 'First Contentful Paint (FCP)', target: '<1.5s', critical: true },
    { metric: 'Largest Contentful Paint (LCP)', target: '<2.5s', critical: true },
    { metric: 'First Input Delay (FID)', target: '<100ms', critical: true },
    { metric: 'Cumulative Layout Shift (CLS)', target: '<0.1', critical: true },
    { metric: 'Time to Interactive (TTI)', target: '<3.0s', critical: false }
  ],
  
  resourceBudgets: [
    { resource: 'Total Bundle Size', target: '<500KB gzipped', critical: true },
    { resource: 'JavaScript Bundle', target: '<200KB gzipped', critical: true },
    { resource: 'CSS Bundle', target: '<50KB gzipped', critical: false },
    { resource: 'Images Total', target: '<2MB total', critical: false },
    { resource: 'Font Files', target: '<100KB total', critical: false }
  ],
  
  networkConditions: [
    { name: 'Fast 3G', download: '1.6Mbps', upload: '750Kbps', latency: '150ms' },
    { name: 'Slow 3G', download: '500Kbps', upload: '500Kbps', latency: '300ms' },
    { name: 'Regular 4G', download: '4Mbps', upload: '3Mbps', latency: '20ms' }
  ]
};

// Performance testing protocol
const performanceTestProtocol = [
  'Test on various network conditions',
  'Measure loading performance on mobile devices',
  'Validate image optimization effectiveness',
  'Check for render-blocking resources',
  'Verify lazy loading implementation',
  'Monitor memory usage during interaction',
  'Test cache effectiveness on repeat visits'
];
```

### Performance Testing Tools
```javascript
// Performance testing automation
const performanceTestSuite = {
  lighthouse: {
    command: 'lighthouse',
    options: [
      '--output=html',
      '--output-path=./reports/lighthouse.html',
      '--chrome-flags="--headless --no-sandbox"',
      '--throttling-method=devtools',
      '--form-factor=mobile'
    ]
  },
  
  webPageTest: {
    api: 'https://www.webpagetest.org/runtest.php',
    options: {
      location: 'Sydney:Chrome',
      connectivity: '3G',
      runs: 3,
      firstViewOnly: false
    }
  },
  
  bundleAnalyzer: {
    command: 'npm run build:analyze',
    outputs: ['bundle-analysis.html', 'stats.json']
  }
};
```

## 🧬 Internationalization Testing

### Bilingual Content Testing
```javascript
const i18nTestChecklist = {
  contentCompleteness: [
    'All English content has Chinese translations',
    'No placeholder text or untranslated content',
    'Cultural adaptations are appropriate',
    'Technical terms translated consistently',
    'Contact information localized correctly'
  ],
  
  functionality: [
    'Language toggle switches all content',
    'Language preference persists across sessions',
    'Form submissions work in both languages',
    'WhatsApp messages generate in correct language',
    'URLs and navigation maintain language context'
  ],
  
  typography: [
    'Chinese characters display correctly on all devices',
    'Font fallbacks work across operating systems',
    'Line height and spacing appropriate for Chinese text',
    'Text remains readable at all zoom levels',
    'Mixed content (EN/ZH) displays properly'
  ],
  
  culturalAdaptation: [
    'Color meanings culturally appropriate',
    'Number formatting follows local conventions',
    'Date/time formats match regional expectations',
    'Business terminology culturally relevant',
    'Visual hierarchy works for both languages'
  ]
};

// Character encoding tests
const characterEncodingTests = [
  '简体中文测试 (Simplified Chinese)',
  '繁體中文測試 (Traditional Chinese)', 
  'Mixed English 中文 content test',
  'Special characters: ™ © ® € ¥ £',
  'Emoji support: 😊 👍 🎯 📞 💼'
];
```

## 🔒 Security Testing

### Client-Side Security Checklist
```javascript
const securityTests = {
  dataHandling: [
    'No sensitive data stored in localStorage',
    'Form data not logged to console',
    'No hardcoded API keys or credentials',
    'External links open with noopener/noreferrer',
    'Contact form validates input client-side'
  ],
  
  contentSecurityPolicy: [
    'CSP headers configured appropriately',
    'Inline scripts avoided where possible',
    'External resources from trusted sources only',
    'Font loading from approved domains',
    'Analytics scripts properly configured'
  ],
  
  inputValidation: [
    'Contact form prevents XSS attacks',
    'Email validation prevents malformed input',
    'Phone number validation prevents injection',
    'Message field prevents script injection',
    'File uploads (if any) properly validated'
  ]
};
```

## 🎭 User Experience Testing

### User Journey Testing
```javascript
const userJourneyTests = {
  newVisitor: [
    'Landing on homepage → understanding value proposition',
    'Reading about services → finding relevant service',
    'Viewing testimonials → building trust',
    'Checking pricing → understanding investment',
    'Contacting via form → successful WhatsApp redirect'
  ],
  
  returningVisitor: [
    'Quick navigation to specific information',
    'Language preference remembered',
    'Direct contact via preferred method',
    'Accessing updated content/testimonials'
  ],
  
  mobileUser: [
    'Quick loading on mobile network',
    'Easy navigation with thumb',
    'Readable content without zooming',
    'Functional contact methods',
    'Smooth form completion'
  ],
  
  accessibilityUser: [
    'Screen reader navigation',
    'Keyboard-only interaction',
    'High contrast mode usage',
    'Voice control compatibility'
  ]
};
```

### Usability Testing Protocol
```javascript
const usabilityTestProtocol = {
  participants: {
    targetAudience: 'New Australians seeking career guidance',
    languages: ['English', 'Mandarin', 'Cantonese'],
    techSavvy: 'Mixed (beginner to advanced)',
    devicePreference: 'Mixed (mobile and desktop)'
  },
  
  tasks: [
    'Find information about career coaching services',
    'Compare pricing options',
    'Read success stories/testimonials',
    'Contact Benson via preferred method',
    'Switch between English and Chinese content'
  ],
  
  successMetrics: [
    'Task completion rate >90%',
    'Time on task <3 minutes per task',
    'Error rate <5%',
    'User satisfaction score >4/5',
    'Language preference clarity >90%'
  ]
};
```

## 🔧 Automated Testing Setup

### Test Environment Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/test/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

// src/test/setup.js
import '@testing-library/jest-dom';

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### Component Testing Examples
```javascript
// src/components/__tests__/LanguageToggle.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '../common/LanguageToggle';
import { LanguageProvider } from '@/lib/i18n';

const renderWithProvider = (component) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('LanguageToggle', () => {
  test('renders both language options', () => {
    renderWithProvider(<LanguageToggle />);
    
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('中文')).toBeInTheDocument();
  });
  
  test('switches language when clicked', () => {
    renderWithProvider(<LanguageToggle />);
    
    const chineseButton = screen.getByText('中文');
    fireEvent.click(chineseButton);
    
    // Verify language switch happened
    expect(chineseButton).toHaveAttribute('variant', 'default');
  });
  
  test('maintains accessibility attributes', () => {
    renderWithProvider(<LanguageToggle />);
    
    const englishButton = screen.getByText('EN');
    const chineseButton = screen.getByText('中文');
    
    expect(englishButton).toHaveAttribute('aria-label', 'Switch to English');
    expect(chineseButton).toHaveAttribute('aria-label', '切換到中文');
  });
});
```

## 📊 Quality Metrics Dashboard

### Quality Tracking
```javascript
const qualityMetrics = {
  codeQuality: {
    coverage: '>80%',
    complexity: '<10',
    duplicates: '<3%',
    maintainabilityIndex: '>70'
  },
  
  performance: {
    bundleSize: '<500KB',
    loadTime: '<3s',
    fcp: '<1.5s',
    lcp: '<2.5s',
    cls: '<0.1'
  },
  
  accessibility: {
    wcagCompliance: 'AA',
    colorContrast: '>4.5:1',
    keyboardNav: '100%',
    screenReader: 'Compatible'
  },
  
  usability: {
    taskCompletion: '>90%',
    errorRate: '<5%',
    satisfaction: '>4/5',
    loadingFeedback: 'Present'
  }
};
```

### Continuous Quality Monitoring
```bash
# Quality gates in CI/CD
npm run test:coverage        # Unit test coverage >80%
npm run test:accessibility   # a11y compliance check
npm run test:performance     # Performance budget check  
npm run lint                 # Code quality standards
npm run build               # Build success verification
```

## 🔗 Related Documentation
- **[Development Workflow](../technical/development-workflow.md)**: Development testing procedures
- **[Performance Optimization](../integration/performance-optimization.md)**: Performance testing implementation
- **[Deployment](./deployment.md)**: Production deployment validation
- **[Architecture](../technical/architecture.md)**: Technical testing requirements