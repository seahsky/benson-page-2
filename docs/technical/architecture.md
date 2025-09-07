# Technical Architecture

> **Context**: Technology stack, project structure, and technical requirements  
> **Audience**: Developers, technical leads, and system architects  
> **Prerequisites**: [Project Overview](../business/project-overview.md) - Business context  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Development Workflow](./development-workflow.md) - Setup and development process
- [Component Library](./component-library.md) - UI components and patterns

---

## 🛠️ Core Technology Stack

### Frontend Framework & Tools
```
Frontend Framework: React 18+
UI Library: shadcn/ui (Radix UI + Tailwind CSS)
Styling: Tailwind CSS
Icons: Lucide React (included with shadcn/ui)
Typography: System fonts + Chinese font support
Build Tool: Vite (recommended) or Next.js
Package Manager: npm or yarn
```

### Key Dependencies
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "latest",
    "tailwindcss": "latest",
    "tailwindcss-animate": "latest",
    "@fontsource/noto-sans-sc": "latest"
  }
}
```

## 📁 Project Structure

### Complete Directory Structure
```
benson-page-2/
├── public/
│   ├── images/
│   │   ├── profile-image.png
│   │   ├── coach-photo.jpg
│   │   └── services-image.jpg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── input.jsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navigation.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Pricing.jsx
│   │   │   └── Contact.jsx
│   │   └── common/
│   │       ├── LanguageToggle.jsx
│   │       ├── CTAButton.jsx
│   │       └── ServiceCard.jsx
│   ├── lib/
│   │   ├── utils.js
│   │   └── i18n.js
│   ├── styles/
│   │   └── globals.css
│   ├── data/
│   │   ├── content.js
│   │   └── testimonials.js
│   └── App.jsx
├── docs/                          # Documentation modules
│   ├── business/
│   ├── technical/
│   ├── design/
│   ├── integration/
│   └── operations/
├── components.json                # shadcn/ui configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── vite.config.js                # Vite build configuration
├── package.json
├── CLAUDE.md                      # High-level project overview
└── README.md                      # Development setup guide
```

### File Organization Principles
- **Components**: One component per file, grouped by function
- **Data Separation**: Content and business data separate from UI
- **Styling Strategy**: Tailwind utilities with minimal custom CSS
- **Asset Management**: Optimized images with appropriate formats
- **Configuration**: Centralized config files for build and styling

## 🎯 Architecture Patterns

### Component Architecture
```javascript
// Standard component structure
import { ComponentType } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // TypeScript interfaces for props (when using TypeScript)
  className?: string;
  children?: React.ReactNode;
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  );
}
```

### State Management Pattern
```javascript
// Simple state management for language and UI state
import { useState, createContext, useContext } from 'react';

// Language context for bilingual support
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(contentData[language]);
  
  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
    setContent(contentData[newLang]);
  };

  return (
    <LanguageContext.Provider value={{ language, content, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### Data Flow Architecture
```
App.jsx (Root)
├── LanguageProvider (Context)
├── Header (Navigation)
├── Main Content Sections
│   ├── Hero (Landing)
│   ├── About (Trust Building)
│   ├── Services (Value Proposition)
│   ├── Testimonials (Social Proof)
│   ├── Pricing (Clear Offers)
│   └── Contact (Conversion)
└── Footer (Additional Info)
```

## 🔧 Technical Requirements

### Wix Compatibility Requirements
- **Static Export**: Must generate static HTML/CSS/JS files only
- **No Server Dependencies**: Pure client-side React application
- **Relative Paths**: All asset references must use relative paths
- **Single Page Bundle**: Optimized for single-page application deployment
- **Cross-Browser Support**: IE11+ compatibility, modern browser optimization

### Performance Requirements
```javascript
// Performance budgets
const performanceBudgets = {
  firstContentfulPaint: '1.5s',
  largestContentfulPaint: '2.5s', 
  cumulativeLayoutShift: '0.1',
  firstInputDelay: '100ms',
  totalBundleSize: '500KB',
  imageOptimization: 'WebP with JPG fallback'
};
```

### Accessibility Requirements
- **WCAG AA Compliance**: Minimum accessibility standard
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: 4.5:1 minimum contrast ratio
- **Focus Management**: Visible focus indicators

## ⚙️ Build Configuration

### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  base: './', // Critical for Wix compatibility
})
```

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        primary: {
          DEFAULT: "#3b117b",
          50: "#faf7ff",
          100: "#f0e9ff",
          200: "#e5d7ff",
          500: "#3b117b",
          600: "#2d0e5e",
          // ... additional color variants
        },
        secondary: {
          DEFAULT: "#ffe74c",
          // ... additional color variants
        },
      },
      fontFamily: {
        chinese: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        english: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### shadcn/ui Configuration
```json
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 🔒 Security Considerations

### Client-Side Security
- **No Sensitive Data**: All data is public-facing
- **Form Validation**: Client-side validation with server-side verification
- **XSS Prevention**: Sanitize any user-generated content
- **HTTPS Only**: Force HTTPS in production

### Contact Form Security
```javascript
// Secure contact form handling
const handleContactSubmit = (formData) => {
  // Client-side validation
  if (!validateForm(formData)) {
    return false;
  }
  
  // Generate WhatsApp URL safely
  const message = encodeURIComponent(formatMessage(formData));
  const whatsappUrl = `https://wa.me/85297020812?text=${message}`;
  
  // Open in new window
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};
```

## 📱 Responsive Architecture

### Breakpoint Strategy
```javascript
// Responsive breakpoints
const breakpoints = {
  'xs': '475px',   // Large phones
  'sm': '640px',   // Small tablets
  'md': '768px',   // Tablets
  'lg': '1024px',  // Small laptops
  'xl': '1280px',  // Laptops
  '2xl': '1536px', // Large screens
};
```

### Mobile-First Approach
```css
/* Base styles for mobile */
.component {
  @apply text-sm p-4;
}

/* Enhanced for larger screens */
@screen sm {
  .component {
    @apply text-base p-6;
  }
}

@screen lg {
  .component {
    @apply text-lg p-8;
  }
}
```

## 🔗 Related Documentation
- **[Development Workflow](./development-workflow.md)**: Setup and development processes
- **[Component Library](./component-library.md)**: UI components and implementation patterns
- **[Design System](../design/design-system.md)**: Visual design specifications
- **[Wix Integration](../integration/wix-deployment.md)**: Deployment-specific architecture considerations