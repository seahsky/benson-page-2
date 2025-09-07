# Responsive Design

> **Context**: Breakpoints, mobile-first approach, and responsive layout guidelines  
> **Audience**: Designers and developers implementing responsive layouts  
> **Prerequisites**: [Design System](./design-system.md) - Visual design foundation  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Design System](./design-system.md) - Colors, typography, and styling
- [Architecture](../technical/architecture.md) - Technical implementation

---

## 📱 Breakpoint System

### Tailwind CSS Breakpoints
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',      // Large phones (iPhone 12 Pro Max, etc.)
      'sm': '640px',      // Small tablets (iPad Mini portrait)
      'md': '768px',      // Tablets (iPad portrait)
      'lg': '1024px',     // Small laptops (iPad Pro landscape)
      'xl': '1280px',     /* Laptops (MacBook Air) */
      '2xl': '1536px',    // Large screens (MacBook Pro 16", Desktop)
    }
  }
}
```

### Device Targeting Strategy
```css
/* Mobile First Approach */
.component {
  /* Base styles for mobile (320px+) */
  padding: 1rem;
  font-size: 0.875rem;
}

/* Large phones (475px+) */
@screen xs {
  .component {
    padding: 1.25rem;
    font-size: 1rem;
  }
}

/* Small tablets (640px+) */
@screen sm {
  .component {
    padding: 1.5rem;
    font-size: 1rem;
  }
}

/* Tablets (768px+) */
@screen md {
  .component {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

/* Small laptops (1024px+) */
@screen lg {
  .component {
    padding: 2.5rem;
    font-size: 1.125rem;
  }
}

/* Large screens (1280px+) */
@screen xl {
  .component {
    padding: 3rem;
    font-size: 1.25rem;
  }
}
```

## 📐 Layout Guidelines

### Mobile-First Container System
```css
/* Container Classes */
.container-fluid {
  width: 100%;
  padding-left: 1rem;    /* 16px */
  padding-right: 1rem;   /* 16px */
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Responsive Container Max-Widths */
@screen sm {
  .container {
    max-width: 640px;
    padding-left: 1.5rem;   /* 24px */
    padding-right: 1.5rem;  /* 24px */
  }
}

@screen md {
  .container {
    max-width: 768px;
    padding-left: 2rem;     /* 32px */
    padding-right: 2rem;    /* 32px */
  }
}

@screen lg {
  .container {
    max-width: 1024px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@screen xl {
  .container {
    max-width: 1280px;
    padding-left: 2.5rem;   /* 40px */
    padding-right: 2.5rem;  /* 40px */
  }
}

@screen 2xl {
  .container {
    max-width: 1400px;      /* Slightly smaller than 1536px for comfort */
    padding-left: 3rem;     /* 48px */
    padding-right: 3rem;    /* 48px */
  }
}
```

### Grid System Implementation
```css
/* CSS Grid Responsive Classes */
.grid-responsive {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;        /* Mobile: Single column */
}

@screen sm {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);  /* Small tablets: 2 columns */
    gap: 1.5rem;
  }
}

@screen lg {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);  /* Desktop: 3 columns */
    gap: 2rem;
  }
}

/* Service Cards Grid */
.services-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@screen md {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@screen xl {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@screen lg {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Flexbox Responsive Patterns
```css
/* Responsive Flex Direction */
.flex-responsive {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@screen md {
  .flex-responsive {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
}

/* Header Navigation */
.nav-responsive {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

@screen md {
  .nav-responsive {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
```

## 📱 Mobile-First Design Principles

### Progressive Enhancement Strategy
```css
/* Start with mobile base styles */
.hero-section {
  /* Mobile styles (320px+) */
  padding: 2rem 1rem;
  text-align: center;
}

.hero-title {
  font-size: 2rem;           /* 32px */
  line-height: 1.2;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1rem;           /* 16px */
  line-height: 1.5;
  margin-bottom: 2rem;
}

/* Enhance for larger screens */
@screen sm {
  .hero-section {
    padding: 3rem 1.5rem;
  }
  
  .hero-title {
    font-size: 2.5rem;       /* 40px */
  }
  
  .hero-subtitle {
    font-size: 1.125rem;     /* 18px */
  }
}

@screen lg {
  .hero-section {
    padding: 4rem 2rem;
    text-align: left;
  }
  
  .hero-title {
    font-size: 3.5rem;       /* 56px */
    line-height: 1.1;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;      /* 20px */
    max-width: 32rem;        /* Limit line length for readability */
  }
}
```

### Touch Target Guidelines
```css
/* Minimum 44px touch targets for mobile */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1rem;    /* Ensure comfortable padding */
}

/* Navigation Links */
.nav-link {
  display: block;
  padding: 1rem;            /* Large touch area */
  text-decoration: none;
  transition: background-color 0.2s ease;
}

@screen md {
  .nav-link {
    display: inline-block;
    padding: 0.5rem 1rem;    /* Smaller padding for desktop */
  }
}

/* Buttons */
.btn-mobile {
  width: 100%;              /* Full width on mobile */
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

@screen sm {
  .btn-mobile {
    width: auto;             /* Auto width on larger screens */
    min-width: 120px;        /* Minimum width for aesthetics */
    padding: 0.75rem 1.5rem;
  }
}
```

## 🖼️ Image Responsiveness

### Responsive Image Implementation
```html
<!-- Responsive image with multiple sizes -->
<img 
  src="profile-image-400.jpg" 
  srcset="
    profile-image-300.jpg 300w,
    profile-image-400.jpg 400w,
    profile-image-600.jpg 600w,
    profile-image-800.jpg 800w
  "
  sizes="
    (max-width: 640px) 300px,
    (max-width: 1024px) 400px,
    600px
  "
  alt="Benson Wong - Career Coach"
  class="responsive-image"
/>
```

### CSS Image Responsive Classes
```css
/* Base responsive image */
.responsive-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

/* Hero image sizing */
.hero-image {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

@screen sm {
  .hero-image {
    max-width: 400px;
  }
}

@screen lg {
  .hero-image {
    max-width: 500px;
    margin: 0;
  }
}

/* Service image aspect ratios */
.service-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* Profile image circular */
.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}

@screen md {
  .profile-image {
    width: 150px;
    height: 150px;
    margin: 0;
  }
}
```

## 📏 Typography Responsiveness

### Responsive Typography Scale
```css
/* Responsive headings */
.heading-responsive-1 {
  font-size: 2rem;          /* 32px mobile */
  line-height: 1.2;
  font-weight: 700;
}

@screen sm {
  .heading-responsive-1 {
    font-size: 2.5rem;      /* 40px tablet */
  }
}

@screen lg {
  .heading-responsive-1 {
    font-size: 3.5rem;      /* 56px desktop */
    line-height: 1.1;
  }
}

.heading-responsive-2 {
  font-size: 1.5rem;       /* 24px mobile */
  line-height: 1.3;
  font-weight: 600;
}

@screen sm {
  .heading-responsive-2 {
    font-size: 2rem;        /* 32px tablet */
  }
}

@screen lg {
  .heading-responsive-2 {
    font-size: 2.5rem;      /* 40px desktop */
    line-height: 1.2;
  }
}

/* Responsive body text */
.body-responsive {
  font-size: 0.875rem;     /* 14px mobile */
  line-height: 1.5;
}

@screen sm {
  .body-responsive {
    font-size: 1rem;        /* 16px tablet+ */
    line-height: 1.6;
  }
}

@screen lg {
  .body-responsive {
    font-size: 1.125rem;    /* 18px desktop */
  }
}
```

### Text Alignment Responsiveness
```css
/* Center text on mobile, left-align on desktop */
.text-responsive {
  text-align: center;
}

@screen lg {
  .text-responsive {
    text-align: left;
  }
}

/* Responsive text length control */
.text-constrained {
  max-width: 100%;
}

@screen sm {
  .text-constrained {
    max-width: 32rem;       /* ~512px */
  }
}

@screen lg {
  .text-constrained {
    max-width: 40rem;       /* ~640px */
  }
}
```

## 🎯 Component Responsive Patterns

### Navigation Responsive Pattern
```css
/* Mobile navigation */
.nav-container {
  position: relative;
}

.nav-menu {
  display: none;            /* Hidden on mobile */
}

.nav-toggle {
  display: block;           /* Visible on mobile */
  background: none;
  border: none;
  font-size: 1.5rem;
}

@screen md {
  .nav-menu {
    display: flex;          /* Visible on desktop */
    align-items: center;
    gap: 2rem;
  }
  
  .nav-toggle {
    display: none;          /* Hidden on desktop */
  }
}

/* Mobile menu overlay */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 50;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.open {
  transform: translateX(0);
}

@screen md {
  .mobile-menu {
    display: none;          /* Not needed on desktop */
  }
}
```

### Card Layout Responsive Pattern
```css
/* Service cards responsive layout */
.service-cards-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

.service-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@screen sm {
  .service-cards-container {
    grid-template-columns: 1fr 1fr;
  }
}

@screen lg {
  .service-cards-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  .service-card {
    padding: 2rem;
  }
}

/* Two-column content layout */
.content-two-column {
  display: block;
}

@screen lg {
  .content-two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
}
```

## 📊 Performance Considerations

### Mobile Performance Optimization
```css
/* Optimize animations for mobile */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}

/* GPU acceleration for smooth scrolling */
.smooth-scroll {
  transform: translateZ(0);
  will-change: transform;
}

/* Optimize images for mobile */
@media (max-width: 640px) {
  .background-image {
    background-image: url('background-mobile.jpg');
  }
}

@media (min-width: 641px) {
  .background-image {
    background-image: url('background-desktop.jpg');
  }
}
```

### Loading States for Mobile
```css
/* Progressive loading */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Lazy loading placeholder */
.image-placeholder {
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
```

## 🧪 Testing Responsive Design

### Testing Breakpoints
```javascript
// Common device sizes to test
const testDevices = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'MacBook Air', width: 1280, height: 800 },
  { name: 'Desktop', width: 1920, height: 1080 }
];

// Manual testing checklist:
// 1. Navigation accessibility on all sizes
// 2. Touch targets are 44px+ on mobile
// 3. Text remains readable at all sizes
// 4. Images scale appropriately
// 5. No horizontal scrolling on mobile
// 6. CTAs remain accessible and prominent
```

### Responsive Design Debug Classes
```css
/* Debug classes to visualize breakpoints */
.debug-breakpoint::after {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 0.5rem;
  background: red;
  color: white;
  font-size: 0.875rem;
  z-index: 9999;
}

.debug-breakpoint::after {
  content: 'XS: <475px';
}

@screen xs {
  .debug-breakpoint::after {
    content: 'XS: 475px+';
    background: orange;
  }
}

@screen sm {
  .debug-breakpoint::after {
    content: 'SM: 640px+';
    background: yellow;
    color: black;
  }
}

@screen md {
  .debug-breakpoint::after {
    content: 'MD: 768px+';
    background: green;
  }
}

@screen lg {
  .debug-breakpoint::after {
    content: 'LG: 1024px+';
    background: blue;
  }
}

@screen xl {
  .debug-breakpoint::after {
    content: 'XL: 1280px+';
    background: purple;
  }
}
```

## 🔗 Related Documentation
- **[Design System](./design-system.md)**: Color palette, typography, and component styles
- **[Component Library](../technical/component-library.md)**: Implementation of responsive components
- **[Architecture](../technical/architecture.md)**: Technical configuration for responsive builds
- **[Testing & QA](../operations/testing-qa.md)**: Responsive testing procedures