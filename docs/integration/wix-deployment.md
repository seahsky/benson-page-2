# Wix Deployment Guide

> **Context**: Wix-specific requirements, optimization strategies, and deployment process  
> **Audience**: Developers deploying to Wix platform  
> **Prerequisites**: [Architecture](../technical/architecture.md) - Build configuration  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Performance Optimization](./performance-optimization.md) - Build optimization
- [Deployment Process](../operations/deployment.md) - General deployment procedures

---

## 🎯 Wix Platform Requirements

### Static File Constraints
- **No Server-Side Code**: Pure client-side React application only
- **Relative Paths**: All asset references must be relative, not absolute
- **Single Page Bundle**: Optimized for single HTML entry point
- **File Size Limits**: Individual file size limits and total project size constraints
- **Browser Support**: IE11+ compatibility required for broader audience reach

### Technical Limitations
```javascript
// Wix deployment constraints
const wixConstraints = {
  maxFileSize: '50MB',           // Individual file limit
  maxProjectSize: '100MB',       // Total project size
  supportedFormats: ['html', 'css', 'js', 'jpg', 'png', 'gif', 'svg', 'webp'],
  noServerSide: true,            // No Node.js, PHP, etc.
  httpsOnly: true,               // HTTPS enforced
  customDomains: true            // Custom domain support available
};
```

## ⚙️ Build Configuration for Wix

### Vite Configuration Optimization
```javascript
// vite.config.js - Wix-optimized build
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
    sourcemap: false,              // Disable sourcemaps for smaller build
    minify: 'esbuild',            // Fast minification
    target: 'es2015',             // IE11+ compatibility
    rollupOptions: {
      output: {
        manualChunks: undefined,   // Single chunk for Wix compatibility
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  base: './',                     // CRITICAL: Relative paths for Wix
  define: {
    global: 'globalThis',         // Polyfill for older browsers
  }
})
```

### Package.json Build Scripts
```json
{
  "scripts": {
    "build": "vite build",
    "build:wix": "vite build && npm run optimize:wix",
    "optimize:wix": "npm run compress:images && npm run validate:build",
    "compress:images": "npx imagemin dist/assets/*.{jpg,png} --out-dir=dist/assets --plugin=imagemin-mozjpeg --plugin=imagemin-pngcrush",
    "validate:build": "node scripts/validate-wix-build.js",
    "preview:wix": "vite preview --base=./"
  }
}
```

### Build Validation Script
```javascript
// scripts/validate-wix-build.js
const fs = require('fs');
const path = require('path');

const validateWixBuild = () => {
  const distPath = path.join(__dirname, '../dist');
  
  // Check if build directory exists
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build directory not found');
    process.exit(1);
  }
  
  // Check for required files
  const requiredFiles = ['index.html', 'assets'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(distPath, file))) {
      console.error(`❌ Required file/directory not found: ${file}`);
      process.exit(1);
    }
  }
  
  // Check HTML for absolute paths
  const htmlContent = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
  const hasAbsolutePaths = htmlContent.includes('src="/') || htmlContent.includes('href="/');
  
  if (hasAbsolutePaths) {
    console.error('❌ Absolute paths detected in HTML. Use relative paths for Wix.');
    process.exit(1);
  }
  
  // Check total build size
  const getDirectorySize = (dirPath) => {
    let totalSize = 0;
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    }
    return totalSize;
  };
  
  const buildSize = getDirectorySize(distPath);
  const buildSizeMB = (buildSize / 1024 / 1024).toFixed(2);
  
  console.log(`✅ Build size: ${buildSizeMB}MB`);
  
  if (buildSize > 100 * 1024 * 1024) { // 100MB limit
    console.warn('⚠️  Build size exceeds recommended 100MB limit for Wix');
  }
  
  console.log('✅ Wix build validation passed');
};

validateWixBuild();
```

## 📁 File Structure for Wix

### Optimized Build Output
```
dist/
├── index.html                 # Main entry point
├── favicon.ico               # Site icon
├── assets/
│   ├── index-[hash].js       # Main JavaScript bundle
│   ├── index-[hash].css      # Main CSS bundle
│   ├── profile-image.webp    # Optimized images
│   ├── coach-photo.webp
│   └── services-image.webp
└── robots.txt                # SEO file (optional)
```

### HTML Template Optimization
```html
<!-- dist/index.html - Wix-optimized -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>Benson Wong - 澳洲職涯教練 | Career Coach Australia</title>
  <meta name="description" content="ICF certified career coach helping new Australians and international students find their ideal careers. Bilingual coaching in English and Chinese." />
  <meta name="keywords" content="career coach australia, chinese career coach, job application coaching, australian workplace, new immigrant career" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Benson Wong - Career Coach Australia" />
  <meta property="og:description" content="Certified career coach specializing in helping Chinese-speaking professionals succeed in Australian workplace" />
  <meta property="og:image" content="./assets/profile-image.webp" />
  <meta property="og:type" content="website" />
  
  <!-- Favicon -->
  <link rel="icon" href="./favicon.ico" />
  
  <!-- Preload critical resources -->
  <link rel="preload" href="./assets/index-[hash].css" as="style" />
  <link rel="preload" href="./assets/index-[hash].js" as="script" />
  
  <!-- Critical CSS (inlined) -->
  <style>
    /* Critical CSS for above-the-fold content */
    body { margin: 0; font-family: system-ui, sans-serif; }
    .loading { opacity: 0; }
  </style>
</head>
<body>
  <div id="root">
    <!-- Loading fallback -->
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <div>Loading...</div>
    </div>
  </div>
  
  <!-- Scripts with relative paths -->
  <script type="module" src="./assets/index-[hash].js"></script>
</body>
</html>
```

## 🖼️ Asset Optimization for Wix

### Image Optimization Strategy
```javascript
// Image optimization configuration
const imageOptimization = {
  formats: {
    primary: 'webp',           // Modern format for smaller sizes
    fallback: 'jpg',           // Fallback for older browsers
  },
  sizes: {
    profileImage: {
      mobile: '300x300',
      desktop: '400x400'
    },
    heroBackground: {
      mobile: '800x600',
      desktop: '1920x1080'
    },
    serviceIcons: {
      size: '64x64',
      format: 'svg'            // Vector for crisp display
    }
  },
  optimization: {
    quality: 85,               // Balance quality vs file size
    progressive: true,         // Progressive JPEG loading
    stripMetadata: true        // Remove EXIF data
  }
};
```

### CSS Asset Optimization
```css
/* Optimized CSS for Wix deployment */
@charset "UTF-8";

/* Critical CSS - inline in HTML */
.critical {
  /* Above-the-fold styles */
}

/* Non-critical CSS - loaded async */
.non-critical {
  /* Below-the-fold styles */
}

/* Font loading optimization */
@font-face {
  font-family: 'PingFang SC';
  font-display: swap;          /* Prevent invisible text during font load */
  src: local('PingFang SC');
}

/* Remove unused CSS */
/* Purged automatically by Tailwind CSS */
```

## 🚀 Wix Deployment Process

### Step 1: Pre-Deployment Preparation
```bash
# 1. Clean previous build
rm -rf dist

# 2. Install dependencies (clean slate)
npm ci

# 3. Run Wix-optimized build
npm run build:wix

# 4. Validate build output
npm run validate:build

# 5. Test locally with relative paths
npm run preview:wix
```

### Step 2: Wix Upload Process
```bash
# Manual upload process to Wix:
# 1. Open Wix Editor
# 2. Go to Site Actions > Manage Site > File Manager
# 3. Create new folder: "career-coach-app"
# 4. Upload all files from dist/ folder
# 5. Set index.html as entry point
# 6. Configure custom domain (if needed)
```

### Step 3: Post-Deployment Configuration
```javascript
// Wix-specific configurations after upload
const wixConfigurations = {
  // Custom domain setup
  domain: {
    custom: 'careercoachbenson.com',
    wixSubdomain: 'bensonwong.wixsite.com/career-coach'
  },
  
  // SEO settings in Wix
  seo: {
    sitemap: true,             // Enable XML sitemap
    robotsTxt: true,           // Configure robots.txt
    metaTags: 'configured',    // Verify meta tags
    structuredData: true       // Add JSON-LD schema
  },
  
  // Analytics integration
  analytics: {
    googleAnalytics: 'GA4_MEASUREMENT_ID',
    wixAnalytics: true,
    customTracking: 'configured'
  }
};
```

## 🔧 Wix-Specific Optimizations

### Performance Optimizations
```css
/* Optimize for Wix hosting environment */
.wix-optimized {
  /* Use transform instead of changing layout properties */
  transform: translateZ(0);    /* GPU acceleration */
  will-change: transform;      /* Hint browser for optimization */
}

/* Critical resource hints */
.hero-image {
  /* Preload hero image */
  content: '';
  background-image: url('./assets/hero-background.webp');
  background-size: cover;
  background-position: center;
}

/* Lazy loading for non-critical images */
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image.loaded {
  opacity: 1;
}
```

### JavaScript Optimizations
```javascript
// Wix-compatible JavaScript patterns
const wixOptimizations = {
  // Avoid global pollution
  namespace: 'CareerCoachApp',
  
  // Graceful degradation
  enhancedFeatures: {
    checkSupport: () => {
      return 'IntersectionObserver' in window;
    },
    fallback: () => {
      // Provide basic functionality for older browsers
    }
  },
  
  // Error handling for Wix environment
  errorHandling: {
    catchGlobalErrors: true,
    reportToAnalytics: true,
    gracefulFallbacks: true
  }
};

// Initialize app with Wix considerations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  // Safe initialization for Wix environment
  try {
    ReactDOM.render(<App />, document.getElementById('root'));
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Show fallback content
    document.getElementById('root').innerHTML = 
      '<p>Loading... Please refresh if this takes too long.</p>';
  }
}
```

## 🧪 Testing on Wix Platform

### Pre-Upload Testing Checklist
- [ ] Build completes without errors
- [ ] All paths are relative (no `/` prefixes)
- [ ] Assets load correctly in local preview
- [ ] No console errors in browser
- [ ] Mobile responsiveness verified
- [ ] Language toggle functions properly
- [ ] Contact forms generate correct URLs
- [ ] Total build size under 100MB

### Post-Upload Testing Checklist
- [ ] Site loads correctly on Wix hosting
- [ ] All images display properly
- [ ] CSS styles apply correctly
- [ ] JavaScript functionality works
- [ ] Language switching maintains state
- [ ] WhatsApp contact links work
- [ ] SEO meta tags are visible
- [ ] Site works on mobile devices
- [ ] Cross-browser compatibility verified

### Troubleshooting Common Issues
```javascript
// Common Wix deployment issues and solutions
const troubleshooting = {
  // Issue: Assets not loading
  assetPaths: {
    problem: "Assets return 404 errors",
    solution: "Ensure all paths start with './' not '/'"
  },
  
  // Issue: JavaScript errors
  jsErrors: {
    problem: "React app doesn't initialize",
    solution: "Check for ES6+ features, add polyfills for IE11"
  },
  
  // Issue: CSS not applying
  cssIssues: {
    problem: "Styles don't load or apply",
    solution: "Check CSS file paths and Wix CSS precedence"
  },
  
  // Issue: Large file sizes
  performanceIssues: {
    problem: "Slow loading or file size errors",
    solution: "Optimize images, minimize JS/CSS bundles"
  }
};
```

## 📊 Wix Analytics Integration

### Analytics Setup for Wix
```html
<!-- Add to index.html head section -->
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Wix Analytics (automatically included) -->
<!-- Facebook Pixel (if needed) -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'FACEBOOK_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🔒 Wix Security Considerations

### Content Security Policy
```html
<!-- Add CSP for security (Wix-compatible) -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://www.google-analytics.com;
  font-src 'self' data:;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://wa.me;
">
```

### Privacy Compliance
```javascript
// GDPR/Privacy compliance for Wix
const privacyCompliance = {
  cookieConsent: {
    required: true,
    implementation: "Wix cookie banner or custom solution"
  },
  dataCollection: {
    analytics: "Anonymized analytics data only",
    contactForms: "Explicit consent before WhatsApp redirect",
    localStorage: "Language preference only"
  },
  thirdPartyServices: {
    googleAnalytics: "Analytics data processing agreement",
    whatsapp: "User-initiated contact only",
    wixHosting: "Wix privacy policy covers hosting"
  }
};
```

## 🔗 Related Documentation
- **[Performance Optimization](./performance-optimization.md)**: Build optimization and performance tuning
- **[Architecture](../technical/architecture.md)**: Technical configuration and build setup
- **[Deployment Process](../operations/deployment.md)**: General deployment procedures and checklists
- **[Testing & QA](../operations/testing-qa.md)**: Testing procedures for deployment validation