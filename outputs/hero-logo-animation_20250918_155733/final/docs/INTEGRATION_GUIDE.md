# Hero Logo Animation - Integration Guide

**Quick Start**: Replace the existing static logo with animated version in under 5 minutes.

## 🚀 **Immediate Integration (Recommended)**

### Step 1: Verify Dependencies
```bash
# Check that anime.js is installed (should be included in package.json)
npm list animejs
# Should show: animejs@4.1.3
```

### Step 2: Replace Logo Component
In `/src/pages/executive-wisdom/components/HeroSection.tsx`:

**BEFORE** (lines 177-186):
```jsx
{/* Right Side - Logo */}
<div className="flex justify-center lg:justify-end">
  <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] flex items-center justify-center">
    <img
      src="/images/benson-logo.png"
      alt="Benson Wong Career Coaching Logo"
      className="w-full h-full object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 hover:scale-105"
    />
  </div>
</div>
```

**AFTER** (already implemented):
```jsx
{/* Right Side - Animated Logo with anime.js */}
<div className="flex justify-center lg:justify-end">
  <AnimatedHeroLogo
    src="/images/benson-logo.png"
    alt="Benson Wong Career Coaching Logo"
    size={448} // lg:w-[28rem] = 448px
    className="drop-shadow-lg"
    enableHoverEffects={true}
    reduceMotion={false}
  />
</div>
```

### Step 3: Verify Implementation
```bash
# Build to ensure no errors
npm run build

# Start development server
npm run dev

# Open http://localhost:3001 and test logo hover effects
```

## ✅ **Current Status: ALREADY INTEGRATED**

The AnimatedHeroLogo is already integrated and working in the project! The static logo has been replaced with the anime.js powered animated version.

## 🎛️ **Configuration Options**

### AnimatedHeroLogo Props
```typescript
interface AnimatedHeroLogoProps {
  src: string;                    // Image source path
  alt: string;                    // Alt text for accessibility
  size?: number;                  // Size in pixels (default: 384)
  className?: string;             // Additional CSS classes
  enableHoverEffects?: boolean;   // Enable hover animations (default: true)
  reduceMotion?: boolean;         // Respect reduced motion preferences (default: false)
  onLoad?: () => void;           // Callback when image loads
  onError?: () => void;          // Callback on image error
  priority?: boolean;            // Preload image (default: true)
}
```

### Example Configurations

**Minimal Setup**:
```jsx
<AnimatedHeroLogo
  src="/images/benson-logo.png"
  alt="Logo"
/>
```

**Full Configuration**:
```jsx
<AnimatedHeroLogo
  src="/images/benson-logo.png"
  alt="Benson Wong Career Coaching Logo"
  size={512}
  className="drop-shadow-xl"
  enableHoverEffects={true}
  reduceMotion={false}
  onLoad={() => console.log('Logo loaded')}
  onError={() => console.log('Logo failed to load')}
  priority={true}
/>
```

**Accessibility-First (Reduced Motion)**:
```jsx
<AnimatedHeroLogo
  src="/images/benson-logo.png"
  alt="Benson Wong Career Coaching Logo"
  size={448}
  reduceMotion={true}  // Respects user's motion preferences
  enableHoverEffects={false}  // Minimal animations only
/>
```

## 🚀 **Advanced Integration: Drag Functionality**

For clients who want the full interactive drag experience:

### Implementation
```jsx
import { DraggableHeroLogo } from "@/components/DraggableHeroLogo";

<DraggableHeroLogo
  src="/images/benson-logo.png"
  alt="Benson Wong Career Coaching Logo"
  language="en" // or "zh" for Chinese
  size={{
    mobile: "20rem",
    tablet: "24rem",
    desktop: "28rem"
  }}
  onDragStart={() => console.log('Drag started')}
  onDragEnd={() => console.log('Drag ended')}
  disabled={false}
/>
```

### DraggableHeroLogo Features
- ✅ Physics-based drag interactions
- ✅ Mobile touch and desktop mouse support
- ✅ Keyboard navigation (Space, arrows, Home, Escape)
- ✅ Screen reader announcements in English and Chinese
- ✅ Elastic boundary constraints
- ✅ Spring release animations

## 🧪 **Testing Your Integration**

### Quick Visual Test
1. **Hover Effect**: Move mouse over logo - should see smooth scale and glow
2. **Entrance Animation**: Refresh page - logo should animate in with elastic effect
3. **Responsive**: Resize browser - logo should maintain proportions
4. **Accessibility**: Tab to logo, press Enter - should activate

### Automated Testing
```bash
# Run all tests
npm test

# Test accessibility compliance
npm run test:accessibility

# Test mobile performance
npm run test:mobile

# Test with headed browser (visual debugging)
npm run test:headed
```

### Manual Testing Checklist
- [ ] Logo loads correctly
- [ ] Hover effects work smoothly
- [ ] Entrance animation plays on page load
- [ ] Responsive sizing works across breakpoints
- [ ] Reduced motion preference respected
- [ ] Keyboard navigation functional
- [ ] Screen reader announcements work

## 🔧 **Troubleshooting**

### Common Issues

**Issue**: "Cannot find module 'animejs'"
```bash
# Solution: Install anime.js
npm install animejs@4.1.3 @types/animejs@3.1.13
```

**Issue**: TypeScript compilation errors
```bash
# Solution: Check import syntax
import anime from 'animejs/lib/anime.es.js';  // ✅ Correct
import * as anime from 'animejs';             // ❌ Incorrect
```

**Issue**: Animations not working
```bash
# Solution: Check browser developer tools console for errors
# Ensure anime.js is loaded: console.log(anime)
```

**Issue**: Performance concerns
```bash
# Check bundle size
npm run build
# Should show total bundle under 500KB
```

### Debug Mode

Enable detailed logging:
```jsx
<AnimatedHeroLogo
  src="/images/benson-logo.png"
  alt="Logo"
  onLoad={() => console.log('✅ Logo loaded successfully')}
  onError={() => console.error('❌ Logo failed to load')}
/>
```

## 📱 **Mobile Considerations**

### Touch Interactions (DraggableHeroLogo only)
- Automatically detects touch devices
- Optimizes touch target sizes
- Handles both single-touch and multi-touch scenarios
- Prevents scroll conflicts during drag

### Performance on Mobile
- GPU-accelerated animations
- Efficient event handling
- Optimized for 60fps on mobile devices
- Network-aware loading for slower connections

## 🎨 **Customization**

### Animation Timing
```jsx
// Fast animations (for energetic brands)
<AnimatedHeroLogo enableHoverEffects={true} />

// Subtle animations (for professional brands)
<AnimatedHeroLogo enableHoverEffects={true} reduceMotion={true} />

// No animations (static logo with accessibility)
<AnimatedHeroLogo enableHoverEffects={false} />
```

### Styling Integration
```jsx
// Integrates with existing Tailwind classes
<AnimatedHeroLogo
  className="drop-shadow-2xl ring-4 ring-primary/20"
  src="/images/benson-logo.png"
  alt="Logo"
/>
```

### Brand Color Integration
The logo animation automatically inherits CSS custom properties:
```css
:root {
  --primary: 239 68 68;        /* Tailwind red-500 */
  --primary-foreground: 255 255 255;
}
```

## 🔄 **Migration Path**

### From Static to Animated (Current State)
✅ **COMPLETE** - Already migrated to AnimatedHeroLogo

### Future: From Animated to Draggable
If client requests full drag functionality:

1. Import DraggableHeroLogo
2. Replace AnimatedHeroLogo with DraggableHeroLogo
3. Add language prop ("en" or "zh")
4. Test accessibility with keyboard navigation

### Rollback Plan
If issues arise, quickly rollback to static:
```jsx
// Emergency rollback to static logo
<img
  src="/images/benson-logo.png"
  alt="Benson Wong Career Coaching Logo"
  className="w-full h-full object-contain drop-shadow-lg"
/>
```

## 📊 **Performance Monitoring**

### Key Metrics to Watch
- **Bundle Size**: Keep under 500KB total
- **Animation FPS**: Maintain 60fps
- **Load Time**: Logo should appear in <2s
- **Accessibility Score**: Maintain WCAG 2.1 AA

### Monitoring Tools
```bash
# Bundle analysis
npm run build

# Performance testing
npm run test:performance

# Accessibility validation
npm run test:accessibility
```

## 🆘 **Support**

### Quick Help
- **Documentation**: `/docs/hero-logo-animation/`
- **Test Suite**: `npm test`
- **Build Issues**: `npm run build` for error details

### Common Solutions
1. **Clear cache**: `npm run build` and hard refresh browser
2. **Reinstall dependencies**: `rm -rf node_modules && npm install`
3. **Check console**: Browser developer tools for JavaScript errors
4. **Verify assets**: Ensure `/images/benson-logo.png` exists

**The AnimatedHeroLogo is production-ready and already integrated! 🚀**