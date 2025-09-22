# Integration Example: Draggable Hero Logo

## Overview
This document provides step-by-step instructions for integrating the drag interaction system into the existing HeroSection component.

## Step 1: Import the New Component

Update the imports in `HeroSection.tsx`:

```typescript
// Add this import
import DraggableHeroLogo from "@/components/DraggableHeroLogo";

// Existing imports remain
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Award, TrendingUp, Users } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";
import type { Language } from "@/data/content";
```

## Step 2: Replace the Static Logo

In `HeroSection.tsx`, replace the existing logo section (lines 177-186):

### Old Code (Remove):
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

### New Code (Replace with):
```jsx
{/* Right Side - Interactive Draggable Logo */}
<div className="flex justify-center lg:justify-end">
  <DraggableHeroLogo
    src="/images/benson-logo.png"
    alt="Benson Wong Career Coaching Logo"
    language={language}
    size={{
      mobile: "w-80 h-80",
      tablet: "w-96 h-96",
      desktop: "w-[28rem] h-[28rem]"
    }}
    className="fade-in-up stagger-2"
    onDragStart={() => {
      // Optional: Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'logo_drag_start', {
          event_category: 'engagement',
          event_label: 'hero_logo'
        });
      }
    }}
    onDragEnd={() => {
      // Optional: Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'logo_drag_end', {
          event_category: 'engagement',
          event_label: 'hero_logo'
        });
      }
    }}
  />
</div>
```

## Step 3: Coordination with Anime.js (Specialist A)

If Specialist A has implemented anime.js animations, add coordination logic:

```typescript
// Add to HeroSection component
export default function HeroSection({ content, language }: HeroSectionProps) {
  const [isLogoDragActive, setIsLogoDragActive] = useState(false);

  // Listen for logo drag events to coordinate with anime.js
  useEffect(() => {
    const handleLogoDragStart = () => {
      setIsLogoDragActive(true);
      // Signal to anime.js system to pause hover animations
      window.dispatchEvent(new CustomEvent('logo:pauseAnimeAnimations'));
    };

    const handleLogoDragEnd = () => {
      setIsLogoDragActive(false);
      // Signal to anime.js system to resume animations
      window.dispatchEvent(new CustomEvent('logo:resumeAnimeAnimations'));
    };

    window.addEventListener('logo:dragStart', handleLogoDragStart);
    window.addEventListener('logo:dragEnd', handleLogoDragEnd);

    return () => {
      window.removeEventListener('logo:dragStart', handleLogoDragStart);
      window.removeEventListener('logo:dragEnd', handleLogoDragEnd);
    };
  }, []);

  // Rest of component...

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Existing content... */}

      {/* Updated logo with coordination */}
      <div className="flex justify-center lg:justify-end">
        <DraggableHeroLogo
          src="/images/benson-logo.png"
          alt="Benson Wong Career Coaching Logo"
          language={language}
          size={{
            mobile: "w-80 h-80",
            tablet: "w-96 h-96",
            desktop: "w-[28rem] h-[28rem]"
          }}
          className="fade-in-up stagger-2"
          onDragStart={() => setIsLogoDragActive(true)}
          onDragEnd={() => setIsLogoDragActive(false)}
          // Disable if anime.js is actively animating
          disabled={false} // Set based on anime.js state if needed
        />
      </div>
    </section>
  );
}
```

## Step 4: CSS Considerations

Add these CSS classes to your global styles if not already present:

```css
/* For screen reader only content */
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

/* Focus indicator for keyboard navigation */
.focus-within\:opacity-50:focus-within {
  opacity: 0.5;
}

/* Ensure drag cursor shows properly */
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

/* Performance optimization for dragging */
.dragging * {
  pointer-events: none;
  user-select: none;
}
```

## Step 5: TypeScript Configuration

Ensure your `tsconfig.json` includes the new hook files:

```json
{
  "compilerOptions": {
    // ... existing options
  },
  "include": [
    "src/**/*",
    "src/hooks/**/*",
    "src/components/**/*"
  ]
}
```

## Step 6: Testing Integration

Add a simple integration test:

```typescript
// __tests__/HeroSection.integration.test.tsx
import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

const mockContent = {
  title: "Test Title",
  subtitle: "Test Subtitle",
  description: "Test Description",
  credentials: ["Test Credential"],
  cta: {
    primary: "Test Primary",
    secondary: "Test Secondary"
  }
};

test('HeroSection renders with draggable logo', () => {
  render(<HeroSection content={mockContent} language="en" />);

  const logo = screen.getByRole('img');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('role', 'button'); // From accessibility
});
```

## Step 7: Analytics Integration (Optional)

Track drag interactions for engagement metrics:

```typescript
// In DraggableHeroLogo component callbacks
const trackDragEngagement = () => {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'logo_interaction', {
      event_category: 'engagement',
      event_label: 'hero_logo_drag',
      value: 1
    });
  }

  // Adobe Analytics
  if (typeof s !== 'undefined') {
    s.linkTrackVars = 'events';
    s.linkTrackEvents = 'event1';
    s.events = 'event1';
    s.tl(true, 'o', 'Logo Drag Interaction');
  }

  // Custom analytics
  fetch('/api/analytics/logo-interaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'logo_drag',
      timestamp: Date.now(),
      language: language,
      page: 'hero'
    })
  });
};
```

## Step 8: Performance Monitoring

Add performance monitoring for the drag system:

```typescript
// Optional: Performance monitoring
useEffect(() => {
  const monitor = createPerformanceMonitor();

  const handleDragStart = () => monitor.start();
  const handleDragEnd = () => {
    const duration = monitor.end();
    console.log(`Drag interaction took ${duration}ms`);

    // Report to performance monitoring service
    if (duration > 100) { // Report slow interactions
      console.warn('Slow drag interaction detected');
    }
  };

  window.addEventListener('logo:dragStart', handleDragStart);
  window.addEventListener('logo:dragEnd', handleDragEnd);

  return () => {
    window.removeEventListener('logo:dragStart', handleDragStart);
    window.removeEventListener('logo:dragEnd', handleDragEnd);
  };
}, []);
```

## Step 9: Accessibility Testing

Test the accessibility features:

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/react jest-axe

# Run accessibility tests
npm test -- --testNamePattern="accessibility"
```

## Step 10: Cross-Browser Testing

Test the implementation across different browsers:

1. **Desktop**: Chrome, Firefox, Safari, Edge
2. **Mobile**: Safari iOS, Chrome Android
3. **Accessibility**: Test with screen readers (NVDA, JAWS, VoiceOver)
4. **Performance**: Test on lower-end devices

## Error Handling

Add error boundaries for graceful degradation:

```typescript
// ErrorBoundary for logo component
class LogoErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Logo drag system error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback to static logo
      return (
        <img
          src="/images/benson-logo.png"
          alt="Benson Wong Career Coaching Logo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      );
    }

    return this.props.children;
  }
}

// Wrap the draggable logo
<LogoErrorBoundary>
  <DraggableHeroLogo {...props} />
</LogoErrorBoundary>
```

## Deployment Checklist

Before deploying to production:

- [ ] All TypeScript errors resolved
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Accessibility tests passing
- [ ] Cross-browser testing completed
- [ ] Performance benchmarks met
- [ ] Analytics tracking verified
- [ ] Error handling tested
- [ ] Fallback behavior confirmed
- [ ] Wix platform compatibility verified

## Rollback Plan

If issues arise in production:

1. **Quick Fix**: Set `disabled={true}` on DraggableHeroLogo
2. **Full Rollback**: Revert to static logo implementation
3. **Monitoring**: Watch error rates and performance metrics

```typescript
// Feature flag for quick disable
const ENABLE_LOGO_DRAG = process.env.REACT_APP_ENABLE_LOGO_DRAG !== 'false';

<DraggableHeroLogo
  {...props}
  disabled={!ENABLE_LOGO_DRAG}
/>
```

This integration approach ensures a smooth transition from static to interactive logo while maintaining all existing functionality and accessibility standards.