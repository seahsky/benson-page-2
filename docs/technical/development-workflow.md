# Development Workflow

> **Context**: Setup instructions, development processes, and best practices  
> **Audience**: Developers setting up and working on the project  
> **Prerequisites**: Basic knowledge of React, Node.js, and Git  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Architecture](./architecture.md) - Technical architecture and stack
- [Component Library](./component-library.md) - UI component implementation

---

## 🚀 Initial Project Setup

### Prerequisites
```bash
# Required software
Node.js >= 18.0.0
npm >= 8.0.0 (or yarn >= 1.22.0)
Git >= 2.30.0

# Verify installations
node --version
npm --version
git --version
```

### Step-by-Step Setup

#### 1. Create React Project with Vite
```bash
# Create new React project with Vite
npm create vite@latest benson-page-2 -- --template react
cd benson-page-2

# Install base dependencies
npm install
```

#### 2. Install and Configure shadcn/ui
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Follow the prompts:
# - Would you like to use TypeScript? No
# - Which style would you like to use? Default
# - Which color would you like to use as base color? Slate
# - Where is your global CSS file? src/styles/globals.css
# - Would you like to use CSS variables for colors? Yes
# - Where is your tailwind.config.js located? tailwind.config.js
# - Configure the import alias for components? @/components
# - Configure the import alias for utils? @/lib/utils
```

#### 3. Install Additional Dependencies
```bash
# Install required packages
npm install lucide-react class-variance-authority clsx tailwind-merge

# Install Chinese font support (optional)
npm install @fontsource/noto-sans-sc

# Development dependencies (optional but recommended)
npm install --save-dev @rollup/plugin-analyzer
```

#### 4. Install Core shadcn/ui Components
```bash
# Core UI components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add tabs

# Form components
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form
```

## ⚙️ Configuration Files

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
  base: './', // Important for Wix compatibility
})
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "analyze": "vite build --analyze"
  }
}
```

### Global CSS Setup
```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    
    --primary: 259 92% 27%;       /* #3b117b */
    --primary-foreground: 210 40% 98%;
    
    --secondary: 54 100% 66%;     /* #ffe74c */
    --secondary-foreground: 259 92% 27%;
    
    /* Additional CSS variables for colors */
  }
}

/* Chinese font support */
.font-chinese {
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
}

/* English typography */
.font-english {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## 🔧 Development Commands

### Daily Development
```bash
# Start development server
npm run dev
# Opens http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview

# Analyze bundle size
npm run analyze
```

### Adding Components
```bash
# Add new shadcn/ui components as needed
npx shadcn-ui@latest add [component-name]

# Examples:
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add avatar
```

### Dependency Management
```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Install specific version
npm install package-name@version
```

## 📁 File Structure Best Practices

### Component Organization
```javascript
// Standard component file structure
// src/components/sections/Hero.jsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';

export function Hero() {
  const { content, language } = useLanguage();
  
  return (
    <section className="bg-gradient-to-r from-primary to-primary-700">
      {/* Component content */}
    </section>
  );
}
```

### Data Structure
```javascript
// src/data/content.js
export const content = {
  en: {
    hero: {
      title: "Career and Job Application Coach",
      subtitle: "Welcome! Please get in touch...",
      cta: "Book Consultation"
    },
    // ... other sections
  },
  zh: {
    hero: {
      title: "澳洲職涯 & 工作申請教練",
      subtitle: "歡迎光臨，希望我有這個榮幸...",
      cta: "預約諮詢"
    },
    // ... other sections
  }
};
```

### Utility Functions
```javascript
// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Custom utility functions
export function formatPhoneNumber(phone) {
  // Phone number formatting logic
}

export function generateWhatsAppURL(message) {
  return `https://wa.me/85297020812?text=${encodeURIComponent(message)}`;
}
```

## 🎯 Development Best Practices

### Code Style Guidelines
```javascript
// Use consistent naming conventions
const ComponentName = () => {  // PascalCase for components
  const [isVisible, setIsVisible] = useState(false);  // camelCase for variables
  const CONSTANT_VALUE = 'value';  // UPPER_CASE for constants
  
  return (
    <div className="bg-primary text-white">  {/* kebab-case for CSS classes */}
      {/* Content */}
    </div>
  );
};
```

### Import Organization
```javascript
// Group imports logically
import React, { useState, useEffect } from 'react';  // React imports first
import { Button } from '@/components/ui/button';     // UI components
import { useLanguage } from '@/lib/i18n';            // Custom hooks/utilities
import { content } from '@/data/content';            // Data imports
import './Component.styles.css';                     // Styles last (if any)
```

### Component Structure Pattern
```javascript
// Standard component structure
export function ComponentName({ prop1, prop2, ...props }) {
  // 1. State declarations
  const [state, setState] = useState(initialValue);
  
  // 2. Custom hooks
  const { language, content } = useLanguage();
  
  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 5. Render functions (if complex)
  const renderContent = () => {
    // Complex rendering logic
  };
  
  // 6. Main return
  return (
    <div className="component-classes" {...props}>
      {/* Component JSX */}
    </div>
  );
}
```

## 🔍 Testing & Quality Assurance

### Code Quality Checks
```bash
# Run linting
npm run lint

# Fix lint issues automatically
npm run lint -- --fix

# Check for unused dependencies
npx depcheck

# Analyze bundle size
npm run build && npm run analyze
```

### Testing Workflow
```bash
# Manual testing checklist
# 1. Start dev server: npm run dev
# 2. Test all breakpoints (mobile, tablet, desktop)
# 3. Test language toggle functionality
# 4. Test all contact methods
# 5. Test form submissions
# 6. Check accessibility (screen reader, keyboard nav)
# 7. Build and test production: npm run build && npm run preview
```

### Performance Monitoring
```javascript
// Check performance during development
// Use browser DevTools:
// 1. Lighthouse audit
// 2. Network tab for asset loading
// 3. Performance tab for rendering issues
// 4. Accessibility tab for a11y issues

// Core Web Vitals monitoring
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

// Log metrics to console during development
getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 Version Control Workflow

### Git Workflow
```bash
# Standard development workflow
git checkout -b feature/component-name
# Make changes
git add .
git commit -m "feat: add hero section component"
git push origin feature/component-name
# Create pull request for review

# Commit message conventions
# feat: new feature
# fix: bug fix
# docs: documentation changes
# style: formatting, no code change
# refactor: code refactoring
# test: adding tests
# chore: build tasks, package updates
```

### Branch Strategy
```bash
main           # Production-ready code
├── develop    # Integration branch (optional)
├── feature/   # Feature development
├── fix/       # Bug fixes
└── hotfix/    # Emergency fixes
```

## 🚀 Build & Deployment Workflow

### Production Build Process
```bash
# 1. Clean previous build
rm -rf dist

# 2. Install dependencies (ensure clean state)
npm ci

# 3. Run production build
npm run build

# 4. Test production build locally
npm run preview

# 5. Verify build outputs
ls -la dist/
# Should contain: index.html, assets/, favicon.ico
```

### Pre-Deployment Checklist
- [ ] All components render correctly
- [ ] Language toggle works
- [ ] All contact methods functional
- [ ] Mobile responsiveness verified
- [ ] Accessibility score >95%
- [ ] Performance budget met (<500KB total)
- [ ] Cross-browser testing completed

### Environment-Specific Configs
```javascript
// Handle different environments
const config = {
  development: {
    API_URL: 'http://localhost:3000',
    DEBUG: true
  },
  production: {
    API_URL: 'https://api.example.com',
    DEBUG: false
  }
};

export default config[import.meta.env.MODE] || config.development;
```

## 🛠️ Troubleshooting Common Issues

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Check for conflicting dependencies
npm ls
```

### Development Server Issues
```bash
# Port already in use
npm run dev -- --port 3000

# Permission issues (macOS/Linux)
sudo npm run dev

# Clear browser cache and localStorage
# Use incognito mode for testing
```

### Styling Issues
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/styles/globals.css -o ./dist/output.css --watch

# Check Tailwind config is correct
npx tailwindcss -c ./tailwind.config.js
```

## 🔗 Related Documentation
- **[Architecture](./architecture.md)**: Technical architecture overview
- **[Component Library](./component-library.md)**: Component implementation guidelines
- **[Testing & QA](../operations/testing-qa.md)**: Testing procedures and checklists
- **[Deployment](../operations/deployment.md)**: Production deployment process