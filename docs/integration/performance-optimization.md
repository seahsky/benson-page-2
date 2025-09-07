# Performance Optimization

> **Context**: Build optimization, performance metrics, and loading strategies  
> **Audience**: Developers focused on performance and optimization  
> **Prerequisites**: [Architecture](../technical/architecture.md) - Technical foundation  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Wix Deployment](./wix-deployment.md) - Platform-specific optimizations
- [Success Metrics](../business/success-metrics.md) - Performance measurement

---

## 🎯 Performance Budgets

### Core Web Vitals Targets
```javascript
// Performance budgets for production
const performanceBudgets = {
  // Loading Performance
  firstContentfulPaint: 1500,    // 1.5 seconds
  largestContentfulPaint: 2500,  // 2.5 seconds
  firstInputDelay: 100,          // 100 milliseconds
  cumulativeLayoutShift: 0.1,    // Less than 0.1
  timeToInteractive: 3000,       // 3 seconds
  
  // Resource Budgets
  totalBundleSize: 512000,       // 500KB (gzipped)
  initialJSBundle: 200000,       // 200KB (gzipped)
  initialCSSBundle: 50000,       // 50KB (gzipped)
  imageOptimization: 'webp_with_fallback',
  
  // Network Performance
  maxRequests: 50,               // Total HTTP requests
  criticalRequests: 10,          // Above-the-fold requests
  renderBlockingResources: 2     // CSS/JS blocking render
};

// Performance monitoring implementation
export const performanceMonitor = {
  measureCoreWebVitals: () => {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(metric => reportMetric('CLS', metric));
      getFID(metric => reportMetric('FID', metric));  
      getFCP(metric => reportMetric('FCP', metric));
      getLCP(metric => reportMetric('LCP', metric));
      getTTFB(metric => reportMetric('TTFB', metric));
    });
  },
  
  reportMetric: (name, metric) => {
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vital', {
        'metric_name': name,
        'metric_value': Math.round(metric.value),
        'metric_id': metric.id,
        'page_url': window.location.href
      });
    }
    
    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${metric.value}`, metric);
    }
  }
};
```

## 🏗️ Build Optimization Strategies

### Vite Build Configuration
```javascript
// vite.config.js - Performance optimized
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer for development
    process.env.ANALYZE && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true
    })
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  
  build: {
    target: 'es2015',              // IE11+ support
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,              // Disable for smaller build
    minify: 'esbuild',            // Fastest minification
    
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        },
        
        // Optimized file naming for caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // Compression and optimization
    cssCodeSplit: true,            // Split CSS for better caching
    reportCompressedSize: true,    // Report gzipped sizes
    chunkSizeWarningLimit: 600,    // Warn for large chunks
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  },
  
  base: './'  // Relative paths for Wix compatibility
});
```

### Package.json Optimization Scripts
```json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "ANALYZE=true vite build",
    "build:performance": "npm run build && npm run measure:build",
    "measure:build": "node scripts/measure-performance.js",
    "optimize:images": "node scripts/optimize-images.js",
    "precompress": "node scripts/precompress-assets.js"
  }
}
```

### Build Performance Measurement
```javascript
// scripts/measure-performance.js
const fs = require('fs');
const path = require('path');
const gzip = require('gzip-size');

const measureBuildPerformance = () => {
  const distPath = path.join(__dirname, '../dist');
  const assetsPath = path.join(distPath, 'assets');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build not found. Run `npm run build` first.');
    process.exit(1);
  }
  
  console.log('📊 Build Performance Analysis\n');
  
  // Analyze JavaScript bundles
  const jsFiles = fs.readdirSync(assetsPath)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath);
      const gzipSize = gzip.sync(content);
      
      return {
        name: file,
        size: stats.size,
        gzipSize,
        ratio: gzipSize / stats.size
      };
    });
    
  // Analyze CSS bundles
  const cssFiles = fs.readdirSync(assetsPath)
    .filter(file => file.endsWith('.css'))
    .map(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath);
      const gzipSize = gzip.sync(content);
      
      return {
        name: file,
        size: stats.size,
        gzipSize,
        ratio: gzipSize / stats.size
      };
    });
  
  // Calculate totals
  const totalJS = jsFiles.reduce((sum, file) => sum + file.gzipSize, 0);
  const totalCSS = cssFiles.reduce((sum, file) => sum + file.gzipSize, 0);
  const totalBundle = totalJS + totalCSS;
  
  // Report results
  console.log('JavaScript Bundles:');
  jsFiles.forEach(file => {
    console.log(`  ${file.name}: ${(file.gzipSize / 1024).toFixed(1)}KB (gzipped)`);
  });
  
  console.log('\nCSS Bundles:');
  cssFiles.forEach(file => {
    console.log(`  ${file.name}: ${(file.gzipSize / 1024).toFixed(1)}KB (gzipped)`);
  });
  
  console.log(`\n📈 Total Bundle Size: ${(totalBundle / 1024).toFixed(1)}KB (gzipped)`);
  
  // Check against performance budgets
  const budgets = {
    totalBundle: 512000,    // 500KB
    jsBundle: 200000,       // 200KB
    cssBundle: 50000        // 50KB
  };
  
  console.log('\n🎯 Performance Budget Check:');
  console.log(`Total Bundle: ${totalBundle <= budgets.totalBundle ? '✅' : '❌'} ${(totalBundle / 1024).toFixed(1)}KB / ${(budgets.totalBundle / 1024).toFixed(1)}KB`);
  console.log(`JS Bundle: ${totalJS <= budgets.jsBundle ? '✅' : '❌'} ${(totalJS / 1024).toFixed(1)}KB / ${(budgets.jsBundle / 1024).toFixed(1)}KB`);
  console.log(`CSS Bundle: ${totalCSS <= budgets.cssBundle ? '✅' : '❌'} ${(totalCSS / 1024).toFixed(1)}KB / ${(budgets.cssBundle / 1024).toFixed(1)}KB`);
  
  if (totalBundle > budgets.totalBundle) {
    console.log('\n⚠️  Bundle size exceeds performance budget. Consider:');
    console.log('   - Code splitting');
    console.log('   - Removing unused dependencies');
    console.log('   - Lazy loading non-critical components');
  } else {
    console.log('\n✅ All performance budgets met!');
  }
};

measureBuildPerformance();
```

## 🖼️ Image Optimization

### Image Processing Pipeline
```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImages = async () => {
  const inputDir = path.join(__dirname, '../public/images');
  const outputDir = path.join(__dirname, '../public/images/optimized');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const imageFiles = fs.readdirSync(inputDir)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
  
  console.log('🖼️  Optimizing images...\n');
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const fileName = path.parse(file).name;
    const ext = path.parse(file).ext.toLowerCase();
    
    try {
      // Generate WebP version
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(path.join(outputDir, `${fileName}.webp`));
      
      // Generate optimized fallback
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(inputPath)
          .jpeg({ quality: 85, progressive: true })
          .toFile(path.join(outputDir, `${fileName}.jpg`));
      } else if (ext === '.png') {
        await sharp(inputPath)
          .png({ quality: 85, compressionLevel: 9 })
          .toFile(path.join(outputDir, `${fileName}.png`));
      }
      
      // Generate responsive sizes for key images
      if (fileName.includes('hero') || fileName.includes('profile')) {
        const sizes = [300, 600, 900, 1200];
        
        for (const size of sizes) {
          await sharp(inputPath)
            .resize(size, null, { 
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: 85 })
            .toFile(path.join(outputDir, `${fileName}-${size}w.webp`));
        }
      }
      
      console.log(`✅ Optimized: ${file}`);
      
    } catch (error) {
      console.error(`❌ Failed to optimize ${file}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
};

optimizeImages();
```

### Responsive Image Component
```javascript
// src/components/common/OptimizedImage.jsx
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function OptimizedImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  loading = 'lazy',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate responsive srcSet
  const generateSrcSet = (baseSrc) => {
    const fileName = baseSrc.split('/').pop().split('.')[0];
    const sizes = [300, 600, 900, 1200];
    
    return sizes
      .map(size => `/images/optimized/${fileName}-${size}w.webp ${size}w`)
      .join(', ');
  };
  
  // Preload critical images
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      if (sizes) link.sizes = sizes;
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [src, sizes, priority]);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };
  
  if (error) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-100 text-gray-400",
        className
      )}>
        <span>Image unavailable</span>
      </div>
    );
  }
  
  return (
    <picture>
      {/* WebP with responsive sizes */}
      <source 
        srcSet={generateSrcSet(src)}
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        type="image/webp"
      />
      
      {/* Fallback image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading={priority ? "eager" : loading}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse",
            className
          )}
          style={{ aspectRatio: 'inherit' }}
        />
      )}
    </picture>
  );
}

// Usage examples
export function HeroImage() {
  return (
    <OptimizedImage
      src="/images/optimized/hero-background.webp"
      alt="Career coaching consultation"
      className="w-full h-64 object-cover rounded-lg"
      sizes="(max-width: 640px) 100vw, 50vw"
      priority={true}  // Above-the-fold image
    />
  );
}

export function ProfileImage() {
  return (
    <OptimizedImage
      src="/images/optimized/profile-image.webp"
      alt="Benson Wong - Career Coach"
      className="w-32 h-32 rounded-full object-cover"
      sizes="128px"
    />
  );
}
```

## ⚡ Code Splitting & Lazy Loading

### Component-Based Code Splitting
```javascript
// src/components/LazyComponents.js
import { lazy, Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

// Lazy load non-critical sections
export const LazyTestimonials = lazy(() => 
  import('./sections/Testimonials').then(module => ({
    default: module.Testimonials
  }))
);

export const LazyPricing = lazy(() =>
  import('./sections/Pricing').then(module => ({
    default: module.Pricing
  }))
);

export const LazyContact = lazy(() =>
  import('./sections/Contact').then(module => ({
    default: module.Contact  
  }))
);

// Lazy wrapper component with loading state
export function LazySection({ children, fallback }) {
  return (
    <Suspense fallback={
      fallback || (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      )
    }>
      {children}
    </Suspense>
  );
}

// Usage in main App component
export function App() {
  return (
    <div>
      {/* Critical above-the-fold content loads immediately */}
      <Header />
      <Hero />
      <About />
      <Services />
      
      {/* Non-critical content loads lazily */}
      <LazySection>
        <LazyTestimonials />
      </LazySection>
      
      <LazySection>
        <LazyPricing />
      </LazySection>
      
      <LazySection>
        <LazyContact />
      </LazySection>
      
      <Footer />
    </div>
  );
}
```

### Intersection Observer for Progressive Loading
```javascript
// src/hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, options]);
  
  return { elementRef, isIntersecting, hasIntersected };
}

// Progressive loading component
export function ProgressiveSection({ children, className, fallback }) {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  
  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? children : (
        fallback || <div className="h-64 bg-gray-100 animate-pulse rounded" />
      )}
    </div>
  );
}
```

## 🚀 Performance Optimization Techniques

### Critical CSS Extraction
```javascript
// Critical CSS inline in HTML head
const criticalCSS = `
  /* Above-the-fold styles */
  body { margin: 0; font-family: system-ui, sans-serif; }
  .hero-section { 
    min-height: 50vh; 
    background: linear-gradient(135deg, #3b117b 0%, #240a4a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 2rem 1rem;
  }
  .hero-title { 
    font-size: 2.5rem; 
    font-weight: 700; 
    margin-bottom: 1rem; 
  }
  @media (max-width: 640px) {
    .hero-title { font-size: 2rem; }
  }
`;

// Inject critical CSS
const style = document.createElement('style');
style.textContent = criticalCSS;
document.head.appendChild(style);
```

### Font Loading Optimization
```css
/* Font loading with fallbacks */
@font-face {
  font-family: 'PingFang SC';
  font-display: swap;           /* Prevent invisible text */
  src: local('PingFang SC Regular'),
       local('PingFang SC');
}

/* System font stack with Chinese support */
.font-optimized {
  font-family: 
    system-ui,                  /* Modern system fonts */
    -apple-system,              /* iOS/macOS */
    'PingFang SC',              /* macOS Chinese */
    'Hiragino Sans GB',         /* macOS Chinese fallback */
    'Microsoft YaHei',          /* Windows Chinese */
    'Segoe UI',                 /* Windows */
    Roboto,                     /* Android */
    sans-serif;                 /* Ultimate fallback */
}

/* Preload critical fonts */
/* <link rel="preload" href="/fonts/system-font.woff2" as="font" type="font/woff2" crossorigin> */
```

### JavaScript Optimization Patterns
```javascript
// Optimize event listeners
export const optimizedEventHandlers = {
  // Debounced scroll handler
  useDebounceScroll: (callback, delay = 100) => {
    useEffect(() => {
      let timeoutId;
      
      const handleScroll = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', handleScroll);
      };
    }, [callback, delay]);
  },
  
  // Throttled resize handler
  useThrottleResize: (callback, delay = 250) => {
    useEffect(() => {
      let timeoutId;
      let lastExecTime = 0;
      
      const handleResize = () => {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
          callback();
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            callback();
            lastExecTime = Date.now();
          }, delay - (currentTime - lastExecTime));
        }
      };
      
      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
      };
    }, [callback, delay]);
  },
  
  // Optimized click handlers
  useOptimizedClick: (handler) => {
    return useCallback((event) => {
      // Prevent multiple rapid clicks
      if (event.detail > 1) return;
      
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        handler(event);
      });
    }, [handler]);
  }
};

// Memory leak prevention
export const memoryOptimization = {
  // Cleanup refs and timers
  useCleanup: () => {
    const cleanup = useRef([]);
    
    const addCleanup = (cleanupFn) => {
      cleanup.current.push(cleanupFn);
    };
    
    useEffect(() => {
      return () => {
        cleanup.current.forEach(cleanupFn => cleanupFn());
        cleanup.current = [];
      };
    }, []);
    
    return addCleanup;
  },
  
  // Optimize state updates
  useOptimizedState: (initialState) => {
    const [state, setState] = useState(initialState);
    
    const optimizedSetState = useCallback((newState) => {
      setState(prevState => {
        // Only update if state actually changed
        if (JSON.stringify(prevState) === JSON.stringify(newState)) {
          return prevState;
        }
        return newState;
      });
    }, []);
    
    return [state, optimizedSetState];
  }
};
```

## 📊 Performance Monitoring & Analytics

### Real User Monitoring (RUM)
```javascript
// src/lib/performance-monitoring.js
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.initializeMonitoring();
  }
  
  initializeMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vitals' in window || typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(this.handleMetric.bind(this));
        getFID(this.handleMetric.bind(this));
        getFCP(this.handleMetric.bind(this));
        getLCP(this.handleMetric.bind(this));
        getTTFB(this.handleMetric.bind(this));
      });
    }
    
    // Monitor custom metrics
    this.monitorResourceTiming();
    this.monitorUserInteractions();
    this.monitorErrorRate();
  }
  
  handleMetric(metric) {
    this.metrics.set(metric.name, metric);
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vital', {
        'metric_name': metric.name,
        'metric_value': Math.round(metric.value),
        'metric_rating': metric.rating,
        'page_url': window.location.href
      });
    }
    
    // Check against performance budgets
    this.checkPerformanceBudget(metric);
  }
  
  checkPerformanceBudget(metric) {
    const budgets = {
      CLS: 0.1,
      FID: 100,
      FCP: 1500,
      LCP: 2500,
      TTFB: 600
    };
    
    if (metric.value > budgets[metric.name]) {
      console.warn(`⚠️ Performance budget exceeded for ${metric.name}: ${metric.value} > ${budgets[metric.name]}`);
      
      // Report performance issue
      this.reportPerformanceIssue(metric);
    }
  }
  
  monitorResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.transferSize > 100000) { // > 100KB
            console.warn(`Large resource detected: ${entry.name} (${(entry.transferSize / 1024).toFixed(1)}KB)`);
          }
        }
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }
  
  monitorUserInteractions() {
    // Track slow interactions
    let interactionStart = 0;
    
    ['click', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionStart = performance.now();
      }, { passive: true });
    });
    
    ['click', 'keyup', 'touchend'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        const interactionTime = performance.now() - interactionStart;
        
        if (interactionTime > 100) { // > 100ms
          console.warn(`Slow interaction detected: ${interactionTime.toFixed(1)}ms`);
        }
      }, { passive: true });
    });
  }
  
  monitorErrorRate() {
    let errorCount = 0;
    let pageViews = 1;
    
    window.addEventListener('error', () => {
      errorCount++;
      const errorRate = (errorCount / pageViews) * 100;
      
      if (errorRate > 5) { // > 5% error rate
        console.error(`High error rate detected: ${errorRate.toFixed(1)}%`);
      }
    });
  }
  
  reportPerformanceIssue(metric) {
    // Send performance issue report
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_issue', {
        'metric_name': metric.name,
        'metric_value': metric.value,
        'user_agent': navigator.userAgent,
        'connection_type': navigator.connection?.effectiveType,
        'page_url': window.location.href
      });
    }
  }
  
  generatePerformanceReport() {
    const report = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: navigator.connection?.effectiveType,
      metrics: Object.fromEntries(this.metrics),
      resourceTiming: performance.getEntriesByType('resource').slice(-10), // Last 10 resources
      memoryUsage: performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize
      } : null
    };
    
    return report;
  }
}

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor();
```

### Performance Dashboard Integration
```javascript
// Performance dashboard for development
export const performanceDashboard = {
  createDashboard: () => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const dashboard = document.createElement('div');
    dashboard.id = 'performance-dashboard';
    dashboard.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      min-width: 200px;
    `;
    
    document.body.appendChild(dashboard);
    
    return dashboard;
  },
  
  updateDashboard: (metrics) => {
    const dashboard = document.getElementById('performance-dashboard');
    if (!dashboard) return;
    
    const metricsHTML = Object.entries(metrics)
      .map(([name, metric]) => {
        const value = typeof metric === 'object' ? metric.value : metric;
        const rating = typeof metric === 'object' ? metric.rating : 'unknown';
        const color = rating === 'good' ? 'green' : rating === 'poor' ? 'red' : 'yellow';
        
        return `<div style="color: ${color}">${name}: ${Math.round(value)}${name === 'CLS' ? '' : 'ms'}</div>`;
      })
      .join('');
    
    dashboard.innerHTML = `
      <div><strong>Performance Metrics</strong></div>
      ${metricsHTML}
      <div style="margin-top: 10px; font-size: 10px;">
        Bundle: ${(document.querySelectorAll('script[src]').length)} JS files<br>
        Images: ${document.querySelectorAll('img').length}<br>
        Network: ${navigator.connection?.effectiveType || 'unknown'}
      </div>
    `;
  }
};
```

## 🔧 Production Optimization Checklist

### Pre-Deployment Checklist
- [ ] Bundle size under 500KB (gzipped)
- [ ] Core Web Vitals meet targets
- [ ] Images optimized with WebP + fallbacks
- [ ] Critical CSS inlined
- [ ] Non-critical resources lazy loaded
- [ ] Font loading optimized
- [ ] Service Worker implemented (if applicable)
- [ ] Compression enabled (Gzip/Brotli)

### Performance Testing Tools
```bash
# Lighthouse CLI audit
npx lighthouse https://yoursite.com --output=html --output-path=./lighthouse-report.html

# WebPageTest API
curl "https://www.webpagetest.org/runtest.php?url=https://yoursite.com&k=YOUR_API_KEY"

# Bundle analyzer
npm run build:analyze

# Performance budget check  
npm run measure:build
```

## 🔗 Related Documentation
- **[Wix Deployment](./wix-deployment.md)**: Platform-specific optimization requirements
- **[Architecture](../technical/architecture.md)**: Technical configuration affecting performance
- **[Success Metrics](../business/success-metrics.md)**: Performance measurement and business impact
- **[Testing & QA](../operations/testing-qa.md)**: Performance testing procedures