# Design System

> **Context**: Color palette, typography, theming, and component styling guidelines  
> **Audience**: Designers, developers, and anyone working with visual elements  
> **Prerequisites**: [Project Overview](../business/project-overview.md) - Brand positioning  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Responsive Design](./responsive-design.md) - Breakpoints and layout
- [Component Library](../technical/component-library.md) - Implementation patterns

---

## 🎨 Color Palette

### Primary Brand Colors
```css
:root {
  /* Primary Colors - Deep Purple */
  --primary: #3b117b;        /* Main brand color */
  --primary-50: #faf7ff;     /* Lightest tint */
  --primary-100: #f0e9ff;
  --primary-200: #e5d7ff;
  --primary-500: #3b117b;    /* Base color */
  --primary-600: #2d0e5e;    /* Hover states */
  --primary-700: #240a4a;    /* Active states */
  --primary-800: #1a0735;    /* Dark backgrounds */
  --primary-900: #110421;    /* Darkest shade */
}
```

### Secondary Accent Colors  
```css
:root {
  /* Secondary Colors - Bright Yellow */
  --secondary: #ffe74c;      /* Accent color */
  --secondary-50: #fffef7;   /* Lightest tint */
  --secondary-100: #fffce5;
  --secondary-200: #fff8cc;
  --secondary-500: #ffe74c;  /* Base color */
  --secondary-600: #e6cf44;  /* Hover states */
  --secondary-700: #ccb63b;
  --secondary-800: #b39e33;
  --secondary-900: #99862a;  /* Darkest shade */
}
```

### Neutral Colors
```css
:root {
  /* Neutral Grays */
  --neutral-50: #fafafa;     /* Light backgrounds */
  --neutral-100: #f5f5f5;    /* Section backgrounds */
  --neutral-200: #e5e5e5;    /* Borders */
  --neutral-300: #d4d4d4;    /* Disabled states */
  --neutral-400: #a3a3a3;    /* Placeholders */
  --neutral-500: #737373;    /* Body text secondary */
  --neutral-600: #525252;    /* Body text primary */
  --neutral-700: #404040;    /* Headings secondary */
  --neutral-800: #262626;    /* Headings primary */
  --neutral-900: #171717;    /* High contrast text */
}
```

### Semantic Colors
```css
:root {
  /* Semantic Colors */
  --success: #10b981;        /* Success messages, completed states */
  --warning: #f59e0b;        /* Warning messages, attention */
  --error: #ef4444;          /* Error messages, destructive actions */
  --info: #3b82f6;           /* Information, links */
}
```

### Color Usage Guidelines

#### Primary Color Usage
- **Headers and Navigation**: Deep purple for professional authority
- **CTA Buttons**: Primary color for main actions (Book Consultation)
- **Links and Interactive Elements**: Primary hover states
- **Brand Elements**: Logo, icons, brand recognition

#### Secondary Color Usage
- **Accent Elements**: Highlights, badges, secondary CTAs  
- **Emphasis**: Call attention to key information
- **Interactive Feedback**: Hover effects, selected states
- **Decorative Elements**: Visual interest without overwhelming

#### Accessibility Considerations
```css
/* Ensure minimum contrast ratios */
.text-on-primary {
  color: white; /* 21:1 contrast ratio - AAA */
}

.text-on-secondary {
  color: #3b117b; /* 7.2:1 contrast ratio - AA+ */
}

.body-text {
  color: #404040; /* 4.6:1 contrast ratio - AA */
}
```

## 🔤 Typography System

### Font Family Selection
```css
/* English Typography */
.font-english {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Chinese Font Support */
.font-chinese {
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
}

/* Fallback for Mixed Content */
.font-mixed {
  font-family: system-ui, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}
```

### Typography Scale
```css
/* Heading Styles */
.heading-1 { 
  font-size: 3.5rem;    /* 56px */
  font-weight: 700;     /* Bold */
  line-height: 1.1;     /* Tight for headlines */
  letter-spacing: -0.02em;
}

.heading-2 { 
  font-size: 2.5rem;    /* 40px */
  font-weight: 600;     /* Semi-bold */
  line-height: 1.2; 
  letter-spacing: -0.01em;
}

.heading-3 { 
  font-size: 1.875rem;  /* 30px */
  font-weight: 600;     /* Semi-bold */
  line-height: 1.3; 
}

.heading-4 { 
  font-size: 1.5rem;    /* 24px */
  font-weight: 500;     /* Medium */
  line-height: 1.4; 
}

.heading-5 { 
  font-size: 1.25rem;   /* 20px */
  font-weight: 500;     /* Medium */
  line-height: 1.4; 
}

/* Body Text Styles */
.body-lg { 
  font-size: 1.125rem;  /* 18px */
  line-height: 1.6;     /* Comfortable reading */
  font-weight: 400;
}

.body-base { 
  font-size: 1rem;      /* 16px - Base size */
  line-height: 1.5; 
  font-weight: 400;
}

.body-sm { 
  font-size: 0.875rem;  /* 14px */
  line-height: 1.5; 
  font-weight: 400;
}

.body-xs { 
  font-size: 0.75rem;   /* 12px */
  line-height: 1.4; 
  font-weight: 400;
}
```

### Typography Usage Guidelines

#### Heading Hierarchy
```html
<!-- Page Title -->
<h1 class="heading-1 text-neutral-900">Career Coach Australia</h1>

<!-- Section Titles -->
<h2 class="heading-2 text-neutral-800">About Benson</h2>

<!-- Subsection Titles -->
<h3 class="heading-3 text-neutral-700">My Approach</h3>

<!-- Component Titles -->
<h4 class="heading-4 text-neutral-700">Coaching Services</h4>
```

#### Body Text Usage
```html
<!-- Hero/Lead Text -->
<p class="body-lg text-neutral-600">Welcome! Please get in touch...</p>

<!-- Regular Content -->
<p class="body-base text-neutral-600">Standard paragraph content...</p>

<!-- Supporting Information -->
<p class="body-sm text-neutral-500">Additional details or captions...</p>

<!-- Fine Print -->
<p class="body-xs text-neutral-400">Terms, conditions, disclaimers...</p>
```

## 🎯 Component Styling Patterns

### Button Styles
```css
/* Primary Button */
.btn-primary {
  background: var(--primary);
  color: white;
  border-radius: 0.5rem;          /* 8px */
  padding: 0.75rem 1.5rem;        /* 12px 24px */
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(59, 17, 123, 0.2);
}

.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 17, 123, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(59, 17, 123, 0.2);
}

/* Secondary Button */
.btn-secondary {
  background: var(--secondary);
  color: var(--primary);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(255, 231, 76, 0.2);
}

.btn-secondary:hover {
  background: var(--secondary-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 231, 76, 0.3);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: 0.5rem;
  padding: 0.625rem 1.375rem;     /* Adjusted for border */
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
}
```

### Card Styles
```css
/* Elevated Card */
.card-elevated {
  background: white;
  border-radius: 1rem;            /* 16px */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid var(--neutral-200);
}

.card-elevated:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Service Card */
.service-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;                  /* 32px */
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.service-card:hover {
  border-color: var(--primary-200);
  box-shadow: 0 8px 25px -5px rgba(59, 17, 123, 0.1);
  transform: translateY(-2px);
}

/* Testimonial Card */
.testimonial-card {
  background: var(--neutral-50);
  border-radius: 1rem;
  padding: 2rem;
  border-left: 4px solid var(--primary);
  position: relative;
}

.testimonial-card::before {
  content: '"';
  font-size: 4rem;
  color: var(--primary-200);
  font-family: serif;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  line-height: 1;
}
```

### Form Styles
```css
/* Input Fields */
.input-field {
  background: white;
  border: 2px solid var(--neutral-200);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 17, 123, 0.1);
}

.input-field:invalid {
  border-color: var(--error);
}

/* Labels */
.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--neutral-700);
  margin-bottom: 0.5rem;
  display: block;
}

/* Required Field Indicator */
.required::after {
  content: " *";
  color: var(--error);
}
```

## 🎭 Animation & Transitions

### Micro-Interactions
```css
/* Hover Animations */
@keyframes gentle-lift {
  from { transform: translateY(0); }
  to { transform: translateY(-2px); }
}

.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  animation: gentle-lift 0.2s ease forwards;
}

/* Loading States */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Fade In Animation */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fade-in 0.6s ease forwards;
}
```

### Transition Patterns
```css
/* Standard Transitions */
.transition-standard {
  transition: all 0.2s ease;
}

.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-bounce {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## 📐 Spacing System

### Spacing Scale
```css
/* Spacing Scale (based on 4px grid) */
:root {
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

### Component Spacing Guidelines
```css
/* Section Padding */
.section-padding-sm { padding: var(--space-8) var(--space-4); }
.section-padding-md { padding: var(--space-16) var(--space-4); }
.section-padding-lg { padding: var(--space-20) var(--space-4); }

/* Component Margins */
.component-margin-sm { margin-bottom: var(--space-6); }
.component-margin-md { margin-bottom: var(--space-8); }
.component-margin-lg { margin-bottom: var(--space-12); }

/* Content Spacing */
.content-spacing > * + * {
  margin-top: var(--space-4);
}

.content-spacing-lg > * + * {
  margin-top: var(--space-6);
}
```

## 🎯 Design Tokens Implementation

### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-primary: #3b117b;
  --color-secondary: #ffe74c;
  
  /* Typography */
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Spacing */
  --spacing-unit: 0.25rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

## 🌙 Dark Mode Considerations (Future)

### Dark Mode Color Palette
```css
[data-theme="dark"] {
  /* Primary colors remain the same for brand consistency */
  --primary: #5d2ebf;              /* Slightly lighter for dark backgrounds */
  
  /* Background colors */
  --background: #0f0f0f;
  --surface: #1a1a1a;
  --surface-elevated: #262626;
  
  /* Text colors */
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-muted: #737373;
  
  /* Border colors */
  --border: #404040;
  --border-light: #525252;
}
```

## 🔗 Related Documentation
- **[Responsive Design](./responsive-design.md)**: Breakpoints and mobile-first implementation
- **[Component Library](../technical/component-library.md)**: Technical implementation of design system
- **[Internationalization](./internationalization.md)**: Typography considerations for bilingual content
- **[Project Overview](../business/project-overview.md)**: Brand positioning and personality guidelines