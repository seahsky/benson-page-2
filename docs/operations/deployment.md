# Deployment Process

> **Context**: Production deployment procedures, build processes, and monitoring strategies  
> **Audience**: DevOps engineers, developers responsible for deployments  
> **Prerequisites**: [Wix Deployment](../integration/wix-deployment.md) - Platform-specific requirements  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Wix Deployment](../integration/wix-deployment.md) - Platform-specific deployment
- [Testing & QA](./testing-qa.md) - Pre-deployment validation

---

## 🚀 Deployment Strategy Overview

### Deployment Environments
```javascript
const deploymentEnvironments = {
  development: {
    purpose: 'Active development and testing',
    url: 'http://localhost:5173',
    branch: 'feature/* branches',
    database: 'Local development data',
    monitoring: 'Browser console and dev tools',
    access: 'Developers only'
  },
  
  staging: {
    purpose: 'Pre-production testing and client review',
    url: 'https://staging.careercoachbenson.com',
    branch: 'develop or release branches',
    database: 'Staging data (anonymized production)',
    monitoring: 'Basic performance and error monitoring',
    access: 'Development team and stakeholders'
  },
  
  production: {
    purpose: 'Live site serving real users',
    url: 'https://careercoachbenson.com',
    branch: 'main branch only',
    database: 'Production data',
    monitoring: 'Full performance, uptime, and error monitoring',
    access: 'Authorized personnel only'
  }
};
```

### Deployment Pipeline
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Feature   │    │   Develop   │    │   Staging   │    │ Production  │
│  Branch     │───▶│   Branch    │───▶│ Environment │───▶│ Environment │
│             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                    │                   │                   │
      ▼                    ▼                   ▼                   ▼
 Unit Testing      Integration        User Acceptance      Production
 Code Review       Testing           Testing             Monitoring
                   Performance       Client Review       
                   Testing          
```

## 🔧 Pre-Deployment Checklist

### Code Quality Verification
```bash
#!/bin/bash
# pre-deployment-checks.sh

echo "🔍 Running pre-deployment checks..."

# 1. Code Quality
echo "📊 Checking code quality..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed"
  exit 1
fi

# 2. Type Checking (if using TypeScript)
# npm run type-check

# 3. Unit Tests
echo "🧪 Running unit tests..."
npm run test
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed"
  exit 1
fi

# 4. Build Success
echo "🏗️ Testing production build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

# 5. Bundle Size Check
echo "📦 Checking bundle size..."
npm run analyze:size
BUILD_SIZE=$(du -sk dist | cut -f1)
if [ $BUILD_SIZE -gt 1024 ]; then  # 1MB limit
  echo "⚠️ Warning: Bundle size is ${BUILD_SIZE}KB, consider optimization"
fi

# 6. Performance Budget
echo "⚡ Checking performance budget..."
npm run test:performance
if [ $? -ne 0 ]; then
  echo "⚠️ Warning: Performance budget exceeded"
fi

# 7. Accessibility Check
echo "♿ Running accessibility tests..."
npm run test:a11y
if [ $? -ne 0 ]; then
  echo "⚠️ Warning: Accessibility issues found"
fi

echo "✅ Pre-deployment checks completed successfully"
```

### Content Validation
```javascript
// Pre-deployment content validation
const contentValidation = {
  bilingualContent: [
    'All English content has Chinese translations',
    'No placeholder or Lorem ipsum text',
    'Contact information is current and accurate',
    'Pricing information matches business requirements',
    'Testimonials have proper consent for use'
  ],
  
  technicalContent: [
    'All images have proper alt text',
    'Meta descriptions within character limits',
    'No broken internal links',
    'External links open in new tabs',
    'WhatsApp integration URLs are correct'
  ],
  
  businessContent: [
    'Service descriptions are current',
    'Pricing reflects current rates',
    'Contact methods are all functional',
    'Business hours are accurate',
    'Professional credentials are up to date'
  ]
};
```

## 🏗️ Build Process

### Production Build Configuration
```javascript
// production-build.js
const fs = require('fs');
const path = require('path');

const productionBuild = async () => {
  console.log('🚀 Starting production build process...');
  
  // 1. Clean previous builds
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
    console.log('🧹 Cleaned previous build');
  }
  
  // 2. Environment validation
  if (!process.env.NODE_ENV === 'production') {
    console.log('⚠️ Setting NODE_ENV to production');
    process.env.NODE_ENV = 'production';
  }
  
  // 3. Dependency audit
  console.log('🔒 Running security audit...');
  const { execSync } = require('child_process');
  try {
    execSync('npm audit --audit-level=high', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Security vulnerabilities found, please review');
  }
  
  // 4. Build application
  console.log('🏗️ Building application...');
  try {
    execSync('vite build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
  
  // 5. Post-build optimization
  console.log('⚡ Running post-build optimizations...');
  await optimizeAssets();
  await generateSitemap();
  await validateBuild();
  
  console.log('🎉 Production build ready for deployment!');
};

const optimizeAssets = async () => {
  // Compress images, minify additional assets
  console.log('🖼️ Optimizing images and assets...');
  // Implementation would go here
};

const generateSitemap = async () => {
  // Generate sitemap.xml for SEO
  console.log('🗺️ Generating sitemap...');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://careercoachbenson.com</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync(path.join('dist', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated');
};

const validateBuild = async () => {
  console.log('✅ Validating build output...');
  
  // Check required files exist
  const requiredFiles = [
    'dist/index.html',
    'dist/assets',
    'dist/favicon.ico'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`);
    }
  }
  
  // Validate HTML
  const htmlContent = fs.readFileSync('dist/index.html', 'utf8');
  if (htmlContent.includes('undefined') || htmlContent.includes('null')) {
    throw new Error('Build contains undefined/null values');
  }
  
  console.log('✅ Build validation passed');
};

productionBuild().catch(error => {
  console.error('❌ Production build failed:', error);
  process.exit(1);
});
```

### Asset Optimization Pipeline
```javascript
// asset-optimization.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeAssets = async () => {
  const distPath = path.join(__dirname, 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  // 1. Optimize images
  console.log('🖼️ Optimizing images...');
  const imageFiles = fs.readdirSync(assetsPath)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  
  for (const imageFile of imageFiles) {
    const imagePath = path.join(assetsPath, imageFile);
    const fileName = path.parse(imageFile).name;
    
    // Generate WebP version
    await sharp(imagePath)
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(assetsPath, `${fileName}.webp`));
    
    console.log(`✅ Optimized: ${imageFile}`);
  }
  
  // 2. Compress CSS and JS (if not already done by Vite)
  console.log('📦 Compressing assets...');
  // Additional compression logic here
  
  // 3. Generate resource hints
  console.log('🔗 Generating resource hints...');
  await generateResourceHints(distPath);
};

const generateResourceHints = async (distPath) => {
  const indexPath = path.join(distPath, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Add preload hints for critical resources
  const preloadHints = `
    <link rel="preload" href="./assets/index.css" as="style">
    <link rel="preload" href="./assets/index.js" as="script">
    <link rel="preload" href="./assets/profile-image.webp" as="image">
  `;
  
  html = html.replace('<head>', `<head>${preloadHints}`);
  fs.writeFileSync(indexPath, html);
  
  console.log('✅ Resource hints added');
};
```

## 📤 Deployment Procedures

### Staging Deployment
```bash
#!/bin/bash
# deploy-staging.sh

echo "🚀 Deploying to staging environment..."

# 1. Verify branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "develop" && "$CURRENT_BRANCH" != "release/"* ]]; then
  echo "❌ Invalid branch for staging deployment: $CURRENT_BRANCH"
  exit 1
fi

# 2. Ensure clean working directory
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working directory is not clean"
  exit 1
fi

# 3. Run pre-deployment checks
./scripts/pre-deployment-checks.sh
if [ $? -ne 0 ]; then
  echo "❌ Pre-deployment checks failed"
  exit 1
fi

# 4. Build for staging
echo "🏗️ Building for staging..."
NODE_ENV=staging npm run build

# 5. Deploy to staging server
echo "📤 Uploading to staging server..."
# rsync -avz --delete dist/ staging-server:/var/www/staging/
# Or upload to staging Wix site

# 6. Post-deployment validation
echo "✅ Running post-deployment tests..."
curl -f https://staging.careercoachbenson.com
if [ $? -ne 0 ]; then
  echo "❌ Staging site not accessible"
  exit 1
fi

echo "🎉 Staging deployment completed successfully!"
echo "🌐 Staging URL: https://staging.careercoachbenson.com"
```

### Production Deployment
```bash
#!/bin/bash
# deploy-production.sh

echo "🚀 Starting production deployment..."

# 1. Verify production branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Production deployments must be from main branch"
  exit 1
fi

# 2. Tag release
echo "🏷️ Creating release tag..."
VERSION=$(node -p "require('./package.json').version")
git tag -a "v$VERSION" -m "Release version $VERSION"
git push origin "v$VERSION"

# 3. Comprehensive pre-deployment checks
echo "🔍 Running comprehensive checks..."
./scripts/pre-deployment-checks.sh
if [ $? -ne 0 ]; then
  echo "❌ Pre-deployment checks failed"
  exit 1
fi

# 4. Backup current production
echo "💾 Creating production backup..."
# Create backup of current production site
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
# Download current production files or create Wix backup

# 5. Production build
echo "🏗️ Creating production build..."
NODE_ENV=production npm run build:production

# 6. Final validation
echo "✅ Final build validation..."
npm run validate:production
if [ $? -ne 0 ]; then
  echo "❌ Production build validation failed"
  exit 1
fi

# 7. Deploy to production
echo "📤 Deploying to production..."
# Upload to Wix or production server
# ./scripts/upload-to-wix.sh dist/

# 8. Post-deployment monitoring
echo "📊 Starting post-deployment monitoring..."
./scripts/post-deployment-monitoring.sh

echo "🎉 Production deployment completed successfully!"
echo "🌐 Production URL: https://careercoachbenson.com"
echo "📊 Monitor dashboard: [monitoring URL]"
```

### Rollback Procedure
```bash
#!/bin/bash
# rollback-production.sh

echo "🔄 Starting production rollback..."

if [ -z "$1" ]; then
  echo "Usage: ./rollback-production.sh <backup-timestamp>"
  echo "Available backups:"
  ls -la backups/
  exit 1
fi

BACKUP_TIMESTAMP=$1
BACKUP_DIR="backups/$BACKUP_TIMESTAMP"

# 1. Verify backup exists
if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ Backup not found: $BACKUP_DIR"
  exit 1
fi

# 2. Create current state backup before rollback
ROLLBACK_BACKUP="backups/pre-rollback-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$ROLLBACK_BACKUP"
echo "💾 Backing up current state to $ROLLBACK_BACKUP"

# 3. Restore from backup
echo "🔄 Restoring from backup: $BACKUP_TIMESTAMP"
# Restore logic here (upload backup to production)

# 4. Verify rollback success
echo "✅ Verifying rollback..."
curl -f https://careercoachbenson.com
if [ $? -ne 0 ]; then
  echo "❌ Rollback verification failed"
  exit 1
fi

# 5. Notify stakeholders
echo "📧 Notifying stakeholders of rollback..."
# Send rollback notification

echo "✅ Rollback completed successfully"
```

## 📊 Post-Deployment Monitoring

### Automated Monitoring Setup
```javascript
// post-deployment-monitoring.js
const https = require('https');
const fs = require('fs');

class DeploymentMonitor {
  constructor() {
    this.checks = [
      { name: 'Site Accessibility', url: 'https://careercoachbenson.com', critical: true },
      { name: 'Contact Form', url: 'https://careercoachbenson.com/#contact', critical: true },
      { name: 'Language Toggle', test: this.testLanguageToggle, critical: true },
      { name: 'Performance', test: this.testPerformance, critical: false },
      { name: 'WhatsApp Links', test: this.testWhatsAppLinks, critical: true }
    ];
  }
  
  async runAllChecks() {
    console.log('📊 Starting post-deployment monitoring...');
    
    const results = [];
    
    for (const check of this.checks) {
      console.log(`🔍 Running check: ${check.name}`);
      
      try {
        let result;
        if (check.url) {
          result = await this.checkUrl(check.url);
        } else if (check.test) {
          result = await check.test();
        }
        
        results.push({
          name: check.name,
          status: 'pass',
          critical: check.critical,
          result
        });
        
        console.log(`✅ ${check.name} - PASSED`);
        
      } catch (error) {
        results.push({
          name: check.name,
          status: 'fail',
          critical: check.critical,
          error: error.message
        });
        
        console.log(`❌ ${check.name} - FAILED: ${error.message}`);
        
        if (check.critical) {
          await this.sendAlert(check.name, error.message);
        }
      }
    }
    
    // Generate monitoring report
    await this.generateReport(results);
    
    // Check for critical failures
    const criticalFailures = results.filter(r => r.status === 'fail' && r.critical);
    if (criticalFailures.length > 0) {
      console.log(`🚨 ${criticalFailures.length} critical failures detected!`);
      process.exit(1);
    }
    
    console.log('✅ All monitoring checks completed successfully');
  }
  
  async checkUrl(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve({ statusCode: response.statusCode, headers: response.headers });
        } else {
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      });
      
      request.setTimeout(10000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
      
      request.on('error', (error) => {
        reject(error);
      });
    });
  }
  
  async testLanguageToggle() {
    // Test language toggle functionality
    // This would typically use a headless browser like Puppeteer
    return { test: 'Language toggle test would go here' };
  }
  
  async testPerformance() {
    // Run Lighthouse or similar performance test
    return { performanceScore: 'Performance test would go here' };
  }
  
  async testWhatsAppLinks() {
    // Validate WhatsApp link generation
    const testMessage = 'Test message';
    const expectedUrl = `https://wa.me/85297020812?text=${encodeURIComponent(testMessage)}`;
    
    // This would test the actual WhatsApp URL generation logic
    return { expectedUrl, test: 'WhatsApp link validation' };
  }
  
  async sendAlert(checkName, errorMessage) {
    console.log(`🚨 CRITICAL ALERT: ${checkName} failed - ${errorMessage}`);
    
    // In a real implementation, this would send:
    // - Email alerts
    // - Slack notifications
    // - SMS alerts for critical issues
    // - Push notifications to monitoring dashboard
    
    const alertData = {
      timestamp: new Date().toISOString(),
      check: checkName,
      error: errorMessage,
      severity: 'critical',
      deployment: process.env.DEPLOYMENT_ID || 'unknown'
    };
    
    // Log to monitoring system
    fs.appendFileSync('deployment-alerts.log', JSON.stringify(alertData) + '\n');
  }
  
  async generateReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      deployment: process.env.DEPLOYMENT_ID || 'unknown',
      totalChecks: results.length,
      passed: results.filter(r => r.status === 'pass').length,
      failed: results.filter(r => r.status === 'fail').length,
      criticalFailures: results.filter(r => r.status === 'fail' && r.critical).length,
      results
    };
    
    // Save detailed report
    const reportFile = `monitoring-reports/deployment-${Date.now()}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    
    // Generate summary
    console.log('\n📊 Deployment Monitoring Summary');
    console.log('================================');
    console.log(`Total Checks: ${report.totalChecks}`);
    console.log(`Passed: ${report.passed}`);
    console.log(`Failed: ${report.failed}`);
    console.log(`Critical Failures: ${report.criticalFailures}`);
    console.log(`Report saved: ${reportFile}`);
  }
}

// Run monitoring
const monitor = new DeploymentMonitor();
monitor.runAllChecks().catch(error => {
  console.error('💥 Monitoring failed:', error);
  process.exit(1);
});
```

### Continuous Monitoring
```javascript
// continuous-monitoring.js
const monitoringConfig = {
  healthChecks: {
    interval: '5 minutes',
    checks: [
      { url: 'https://careercoachbenson.com', timeout: 10000 },
      { url: 'https://careercoachbenson.com/favicon.ico', timeout: 5000 }
    ]
  },
  
  performanceMonitoring: {
    interval: '1 hour',
    metrics: ['LCP', 'FID', 'CLS', 'FCP'],
    tools: ['Lighthouse CI', 'Web Vitals API']
  },
  
  errorMonitoring: {
    interval: 'real-time',
    sources: ['Console errors', 'Network failures', 'JavaScript exceptions']
  },
  
  businessMetrics: {
    interval: '1 day',
    metrics: ['Contact form submissions', 'WhatsApp clicks', 'Language usage']
  },
  
  alerting: {
    channels: ['email', 'slack', 'sms'],
    escalation: [
      { level: 'warning', response: '1 hour' },
      { level: 'critical', response: '15 minutes' },
      { level: 'emergency', response: '5 minutes' }
    ]
  }
};
```

## 🔄 Deployment Rollback Strategy

### Rollback Decision Matrix
```javascript
const rollbackDecisionMatrix = {
  immediate: {
    triggers: [
      'Site completely inaccessible',
      'Critical functionality broken (contact forms)',
      'Security vulnerability exposed',
      'Major content errors (wrong pricing, contact info)'
    ],
    timeframe: '< 15 minutes',
    approval: 'Automatic or single approver'
  },
  
  scheduled: {
    triggers: [
      'Performance degradation >50%',
      'Minor functionality issues',
      'UI/UX problems affecting user experience'
    ],
    timeframe: '< 2 hours',
    approval: 'Technical lead approval required'
  },
  
  evaluated: {
    triggers: [
      'Lower performance than expected',
      'User feedback indicating problems',
      'Analytics showing negative trends'
    ],
    timeframe: '< 24 hours',
    approval: 'Business owner + technical review'
  }
};
```

### Emergency Response Procedures
```bash
#!/bin/bash
# emergency-response.sh

echo "🚨 EMERGENCY RESPONSE ACTIVATED"

# 1. Immediate assessment
echo "📊 Assessing current situation..."
curl -I https://careercoachbenson.com
SITE_STATUS=$?

# 2. If site is completely down
if [ $SITE_STATUS -ne 0 ]; then
  echo "🚨 CRITICAL: Site is completely inaccessible"
  
  # Immediate rollback to last known good version
  echo "🔄 Initiating emergency rollback..."
  ./scripts/rollback-production.sh $(ls -t backups/ | head -1)
  
  # Notify all stakeholders
  echo "📢 Notifying emergency contacts..."
  # Emergency notification logic
fi

# 3. Check critical functionality
echo "🔍 Testing critical functionality..."
# Test contact forms, WhatsApp links, etc.

# 4. Generate incident report
echo "📋 Creating incident report..."
INCIDENT_ID="INC-$(date +%Y%m%d-%H%M%S)"
echo "Incident ID: $INCIDENT_ID"
```

## 📈 Deployment Metrics & KPIs

### Deployment Success Metrics
```javascript
const deploymentMetrics = {
  reliability: {
    successRate: 'Target: 95% successful deployments',
    rollbackRate: 'Target: <5% deployments require rollback',
    mttr: 'Mean Time To Recovery < 30 minutes',
    changeFailureRate: 'Target: <10% deployments cause issues'
  },
  
  performance: {
    deploymentTime: 'Target: <15 minutes for production deployment',
    downtime: 'Target: Zero downtime deployments',
    testCoverage: 'Target: >80% code coverage',
    automationLevel: 'Target: >90% automated deployment steps'
  },
  
  quality: {
    defectLeakage: 'Target: <2% post-deployment defects',
    customerImpact: 'Target: <1% customer-affecting issues',
    performanceRegression: 'Target: <5% performance degradation',
    accessibilityRegression: 'Target: Zero accessibility regressions'
  }
};
```

## 🔗 Related Documentation
- **[Wix Deployment](../integration/wix-deployment.md)**: Platform-specific deployment procedures
- **[Testing & QA](./testing-qa.md)**: Pre-deployment testing requirements
- **[Maintenance](./maintenance.md)**: Post-deployment maintenance procedures
- **[Performance Optimization](../integration/performance-optimization.md)**: Performance monitoring and optimization