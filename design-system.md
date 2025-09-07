# Benson Wong Career Coach - Design System Documentation

## Overview

This design system creates a professional, trustworthy, and culturally-sensitive visual identity for Benson Wong's career coaching services, specifically targeting new Australians and international students seeking career guidance in Australia.

## Color System

### Primary Colors

#### Deep Purple (`#3b117b`)
- **Usage**: Primary brand color, CTAs, headers, important text
- **Psychology**: Conveys professionalism, wisdom, and authority
- **Cultural Significance**: Purple represents nobility and success across cultures
- **Accessibility**: Excellent contrast against white (WCAG AAA)

#### Bright Yellow (`#ffe74c`)
- **Usage**: Accent color, highlights, success states, interactive elements
- **Psychology**: Optimism, energy, hope, and new beginnings
- **Cultural Significance**: Associated with prosperity and good fortune in Chinese culture
- **Accessibility**: Use with dark text only for WCAG compliance

### Color Palette

```css
:root {
  /* Primary Colors */
  --color-primary: #3b117b;
  --color-primary-light: #5a1ba3;
  --color-primary-dark: #2a0d5a;
  --color-primary-50: rgba(59, 17, 123, 0.05);
  --color-primary-100: rgba(59, 17, 123, 0.1);
  --color-primary-200: rgba(59, 17, 123, 0.2);
  --color-primary-500: #3b117b;
  --color-primary-600: #2f0d60;
  --color-primary-700: #240a4c;
  --color-primary-800: #1a0738;
  --color-primary-900: #0f0424;

  /* Secondary Colors */
  --color-secondary: #ffe74c;
  --color-secondary-light: #ffeb66;
  --color-secondary-dark: #e6d043;
  --color-secondary-50: rgba(255, 231, 76, 0.05);
  --color-secondary-100: rgba(255, 231, 76, 0.1);
  --color-secondary-200: rgba(255, 231, 76, 0.2);
  --color-secondary-500: #ffe74c;
  --color-secondary-600: #ccb93d;
  --color-secondary-700: #998b2d;
  --color-secondary-800: #665c1e;
  --color-secondary-900: #332e0f;

  /* Neutral Colors */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;

  /* Semantic Colors */
  --color-success: #16a34a;
  --color-success-light: #22c55e;
  --color-success-bg: #dcfce7;
  
  --color-warning: #ca8a04;
  --color-warning-light: #eab308;
  --color-warning-bg: #fef3c7;
  
  --color-error: #dc2626;
  --color-error-light: #ef4444;
  --color-error-bg: #fee2e2;
  
  --color-info: #2563eb;
  --color-info-light: #3b82f6;
  --color-info-bg: #dbeafe;
}
```

### Color Usage Guidelines

#### Primary Color Applications
- Navigation bars and headers
- Primary buttons and CTAs
- Logo and branding elements
- Important headings (H1, H2)
- Active states and selected items

#### Secondary Color Applications
- Accent elements and highlights
- Success indicators and positive feedback
- Interactive hover states
- Progress indicators
- Quote highlights and testimonials

#### Neutral Color Applications
- Body text and content
- Borders and dividers
- Background colors
- Form inputs and controls
- Secondary text

## Typography System

### Font Stack

```css
:root {
  /* Primary Font - Inter (Professional Sans-Serif) */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Secondary Font - Merriweather (Readable Serif for body text) */
  --font-secondary: 'Merriweather', Georgia, serif;
  
  /* Monospace Font */
  --font-mono: 'JetBrains Mono', 'Monaco', 'Cascadia Code', monospace;
}
```

### Type Scale

```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

### Typography Classes

```css
/* Headings */
.heading-1 {
  font-family: var(--font-primary);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.heading-2 {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.heading-3 {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
  color: var(--color-neutral-800);
  margin-bottom: 0.75rem;
}

/* Body Text */
.body-large {
  font-family: var(--font-secondary);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--color-neutral-700);
}

.body-base {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--color-neutral-700);
}

.body-small {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--color-neutral-600);
}

/* Specialized Text */
.quote-text {
  font-family: var(--font-secondary);
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-relaxed);
  color: var(--color-primary);
  font-style: italic;
}

.testimonial-text {
  font-family: var(--font-secondary);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--color-neutral-800);
}

.cta-text {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Spacing System

### Spacing Scale

```css
:root {
  /* Spacing Scale */
  --space-0: 0;
  --space-1: 0.25rem;      /* 4px */
  --space-2: 0.5rem;       /* 8px */
  --space-3: 0.75rem;      /* 12px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-8: 2rem;         /* 32px */
  --space-10: 2.5rem;      /* 40px */
  --space-12: 3rem;        /* 48px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */
  --space-32: 8rem;        /* 128px */
  --space-40: 10rem;       /* 160px */
  --space-48: 12rem;       /* 192px */
  --space-56: 14rem;       /* 224px */
  --space-64: 16rem;       /* 256px */
}
```

## Component System

### Buttons

```css
/* Base Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  position: relative;
  overflow: hidden;
}

.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Primary Button */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  min-height: 3rem;
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--color-primary-200);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px var(--color-primary-200);
}

/* Secondary Button */
.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  min-height: 3rem;
}

.btn-secondary:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--color-secondary-200);
}

/* Outline Button */
.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  min-height: 3rem;
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: white;
}

/* Large Button */
.btn-large {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
  min-height: 3.5rem;
}

/* Small Button */
.btn-small {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  min-height: 2.5rem;
}
```

### Cards

```css
.card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-neutral-200);
}

.card-content {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--color-neutral-200);
  background-color: var(--color-neutral-50);
}

/* Testimonial Card */
.testimonial-card {
  background: linear-gradient(135deg, var(--color-primary-50) 0%, white 100%);
  border-left: 4px solid var(--color-secondary);
  padding: var(--space-6);
  position: relative;
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  font-size: var(--text-4xl);
  color: var(--color-secondary);
  font-family: var(--font-secondary);
  line-height: 1;
}

/* Service Card */
.service-card {
  border: 2px solid var(--color-neutral-200);
  transition: all 0.3s ease;
}

.service-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 25px var(--color-primary-100);
}

.service-card-icon {
  width: 3rem;
  height: 3rem;
  background-color: var(--color-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
}
```

### Forms

```css
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-neutral-700);
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-neutral-300);
  border-radius: 0.5rem;
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  transition: all 0.2s ease;
  background-color: white;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.form-input:invalid {
  border-color: var(--color-error);
}

.form-textarea {
  resize: vertical;
  min-height: 8rem;
}

.form-error {
  color: var(--color-error);
  font-size: var(--text-sm);
  margin-top: var(--space-2);
}

.form-help {
  color: var(--color-neutral-600);
  font-size: var(--text-sm);
  margin-top: var(--space-2);
}
```

### Navigation

```css
.navbar {
  background-color: white;
  border-bottom: 1px solid var(--color-neutral-200);
  padding: var(--space-4) 0;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-link {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-neutral-700);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.navbar-link:hover {
  color: var(--color-primary);
  background-color: var(--color-primary-50);
}

.navbar-link.active {
  color: var(--color-primary);
  background-color: var(--color-secondary);
}
```

## Accessibility Standards

### Contrast Requirements

All color combinations meet WCAG 2.1 AA standards:

- Primary text (#3b117b) on white: 10.4:1 (AAA)
- Secondary text (#737373) on white: 4.7:1 (AA)
- Yellow (#ffe74c) requires dark text: Use #262626 or darker
- Focus indicators: 3:1 minimum contrast with adjacent colors

### Focus States

```css
.focus-ring {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.focus-ring-inset {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

/* Skip links for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  transition: top 0.3s;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}
```

### Screen Reader Support

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

## Responsive Design System

### Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Container System

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
```

## shadcn/ui Configuration

### Installation and Setup

```bash
npx shadcn-ui@latest init
```

### Theme Configuration (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f7f3ff",
          100: "#ede8ff",
          200: "#ddd4ff",
          300: "#c4b2ff",
          400: "#a687ff",
          500: "#8a5aff",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#3b117b",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#fffdf0",
          100: "#fffadb",
          200: "#fff3b8",
          300: "#ffe870",
          400: "#ffdc28",
          500: "#ffe74c",
          600: "#e6d043",
          700: "#ccb93d",
          800: "#998b2d",
          900: "#665c1e",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### CSS Variables (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 220 13% 9%;

    --card: 0 0% 100%;
    --card-foreground: 220 13% 9%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 13% 9%;

    --primary: 258 72% 29%;
    --primary-foreground: 0 0% 100%;

    --secondary: 53 100% 64%;
    --secondary-foreground: 258 72% 29%;

    --muted: 220 13% 95%;
    --muted-foreground: 220 13% 45%;

    --accent: 53 100% 64%;
    --accent-foreground: 258 72% 29%;

    --destructive: 0 84% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 258 72% 29%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 220 13% 9%;
    --foreground: 0 0% 95%;

    --card: 220 13% 9%;
    --card-foreground: 0 0% 95%;

    --popover: 220 13% 9%;
    --popover-foreground: 0 0% 95%;

    --primary: 258 72% 70%;
    --primary-foreground: 220 13% 9%;

    --secondary: 53 100% 64%;
    --secondary-foreground: 220 13% 9%;

    --muted: 220 13% 15%;
    --muted-foreground: 220 13% 55%;

    --accent: 53 100% 64%;
    --accent-foreground: 220 13% 9%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 15%;
    --input: 220 13% 15%;
    --ring: 258 72% 70%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

## Cultural Design Considerations

### Language Support

#### Bilingual Typography
- Chinese text requires larger line heights (1.7-2.0)
- Mixed Chinese/English content needs careful spacing
- Consider font fallbacks for Chinese characters

```css
.bilingual-text {
  font-family: var(--font-secondary), 'Noto Sans CJK TC', 'PingFang TC', sans-serif;
  line-height: 1.8;
}

.chinese-text {
  font-family: 'Noto Sans CJK TC', 'PingFang TC', 'Hiragino Sans GB', sans-serif;
  line-height: 2;
}
```

#### Cultural Color Meanings
- **Purple (#3b117b)**: Represents nobility, wisdom, and prosperity across cultures
- **Yellow (#ffe74c)**: Associated with good fortune and success in Chinese culture
- **Avoid pure white backgrounds**: Consider very light grays for better readability

### Professional Trust Signals

#### Visual Hierarchy
- Clear credential displays
- Professional headshots with consistent styling
- Structured testimonial layouts
- Clean, minimal design aesthetic

#### Content Organization
- Service categories clearly separated
- Pricing transparency
- Success stories prominently featured
- Multi-language support considerations

## Usage Guidelines

### Do's
- Use primary color (#3b117b) for important CTAs and headers
- Implement yellow (#ffe74c) sparingly as accent color
- Maintain high contrast ratios for accessibility
- Use consistent spacing and typography scales
- Implement responsive design from mobile-first perspective
- Include cultural sensitivity in content presentation

### Don'ts
- Don't use yellow as background color without dark text
- Avoid cluttered layouts that overwhelm users
- Don't ignore focus states and keyboard navigation
- Avoid mixing too many font weights or sizes
- Don't implement animations that might distract from content
- Avoid cultural assumptions in design decisions

### Component Examples

#### Hero Section
```jsx
<section className="bg-gradient-to-br from-primary-50 to-white py-20">
  <div className="container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="heading-1 mb-6">
          Your Career Success Partner in Australia
        </h1>
        <p className="body-large mb-8">
          Professional career and job application coaching for new Australians and international students.
        </p>
        <div className="flex gap-4">
          <button className="btn btn-primary btn-large">Book Consultation</button>
          <button className="btn btn-outline btn-large">Learn More</button>
        </div>
      </div>
      <div>
        <img src="/profile-image.jpg" alt="Benson Wong, Career Coach" className="rounded-lg shadow-lg" />
      </div>
    </div>
  </div>
</section>
```

#### Service Card
```jsx
<div className="service-card">
  <div className="card-content">
    <div className="service-card-icon">
      <Icon name="career" />
    </div>
    <h3 className="heading-3 mb-4">Career Coaching</h3>
    <p className="body-base mb-6">
      Discover your strengths and create a strategic career plan for success in Australia.
    </p>
    <button className="btn btn-secondary">Learn More</button>
  </div>
</div>
```

#### Testimonial
```jsx
<div className="testimonial-card">
  <blockquote className="testimonial-text mb-4">
    "Benson helped me see my strengths clearly and gain the confidence to apply for my dream job in Australia."
  </blockquote>
  <cite className="body-small">— Client Success Story</cite>
</div>
```

This design system provides a comprehensive foundation for building a professional, accessible, and culturally-sensitive website for Benson Wong's career coaching services, specifically tailored for new Australians seeking career guidance.