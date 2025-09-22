# Hero Logo Drag Interaction System - Specialist B

## Overview
**Project**: Benson Wong Career Coaching Landing Page
**Component**: Hero Section Logo Drag Interaction
**Tech Stack**: React 18 + Framer Motion + TypeScript + Tailwind CSS
**Objective**: Create intuitive drag interactions with physics-based animations for desktop and mobile

## Current State Analysis

### Existing Logo Implementation
```jsx
// Location: /src/pages/executive-wisdom/components/HeroSection.tsx (lines 177-186)
<div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] flex items-center justify-center">
  <img
    src="/images/benson-logo.png"
    alt="Benson Wong Career Coaching Logo"
    className="w-full h-full object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 hover:scale-105"
  />
</div>
```

### Available Dependencies
- ✅ **Framer Motion** (v11.3.28) - Perfect for drag interactions and physics
- ✅ **Tailwind CSS** - For responsive styling and constraints
- ✅ **TypeScript** - Type safety for event handling
- ✅ **React 18** - Modern hooks and concurrent features

## 1. Drag System Architecture

### Core Components Structure
```typescript
// Hook-based architecture for reusability and testing
├── useDragInteraction.ts      // Main drag logic hook
├── useDragConstraints.ts      // Boundary and physics constraints
├── useDragGestures.ts         // Unified mouse/touch event handling
├── useDragAnimation.ts        // Spring animations and easing
└── DraggableHeroLogo.tsx      // Main component wrapper
```

### Event Flow Architecture
```typescript
interface DragEventFlow {
  1. Gesture Detection    → useDragGestures
  2. Constraint Validation → useDragConstraints
  3. Position Update      → useDragInteraction
  4. Animation Trigger    → useDragAnimation
  5. State Management     → React state + refs
}
```

### Core Interfaces
```typescript
interface DragState {
  isDragging: boolean;
  isReleasing: boolean;
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
  velocity: { x: number; y: number };
  constraints: DragConstraints;
}

interface DragConstraints {
  left: number;
  right: number;
  top: number;
  bottom: number;
  elasticity: number; // Bounce-back strength
}

interface DragGestureHandlers {
  onDragStart: (event: MouseEvent | TouchEvent) => void;
  onDragMove: (event: MouseEvent | TouchEvent) => void;
  onDragEnd: (event: MouseEvent | TouchEvent) => void;
}
```

## 2. Physics Implementation

### Constraint System
```typescript
// Dynamic constraint calculation based on viewport
const useDragConstraints = (containerRef: RefObject<HTMLElement>) => {
  const [constraints, setConstraints] = useState<DragConstraints>({
    left: -100,
    right: 100,
    top: -50,
    bottom: 50,
    elasticity: 0.2
  });

  useEffect(() => {
    const updateConstraints = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Calculate safe drag area (30% of container size)
      const maxDragX = rect.width * 0.15;
      const maxDragY = rect.height * 0.1;

      setConstraints({
        left: -maxDragX,
        right: maxDragX,
        top: -maxDragY,
        bottom: maxDragY,
        elasticity: 0.2
      });
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [containerRef]);

  return constraints;
};
```

### Spring Animation Physics
```typescript
// Framer Motion spring configuration for natural movement
const springConfig = {
  // Drag follow (while dragging)
  dragFollow: {
    type: "spring" as const,
    damping: 25,
    stiffness: 700,
    mass: 1
  },

  // Snap back (after release)
  snapBack: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
    mass: 0.8
  },

  // Boundary bounce (hitting constraints)
  boundaryBounce: {
    type: "spring" as const,
    damping: 15,
    stiffness: 400,
    mass: 1.2
  }
};
```

### Velocity-Based Release Animation
```typescript
const calculateReleaseDestination = (
  currentPos: { x: number; y: number },
  velocity: { x: number; y: number },
  constraints: DragConstraints
) => {
  // Project movement based on velocity
  const projection = {
    x: currentPos.x + velocity.x * 0.3,
    y: currentPos.y + velocity.y * 0.3
  };

  // Clamp to constraints with elastic overshoot
  const clamped = {
    x: Math.max(constraints.left, Math.min(constraints.right, projection.x)),
    y: Math.max(constraints.top, Math.min(constraints.bottom, projection.y))
  };

  return clamped;
};
```

## 3. Mobile Strategy

### Touch Event Optimization
```typescript
const useDragGestures = () => {
  const [dragState, setDragState] = useState<DragState>(initialState);

  // Unified event handling for mouse and touch
  const getEventPosition = (event: MouseEvent | TouchEvent) => {
    if ('touches' in event) {
      const touch = event.touches[0] || event.changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: event.clientX, y: event.clientY };
  };

  // Prevent default touch behaviors that conflict with drag
  const handleTouchStart = useCallback((event: TouchEvent) => {
    event.preventDefault(); // Prevent scroll/zoom
    const position = getEventPosition(event);

    setDragState(prev => ({
      ...prev,
      isDragging: true,
      startPosition: position,
      currentPosition: position
    }));
  }, []);

  // Optimized touch move with throttling
  const handleTouchMove = useCallback(
    throttle((event: TouchEvent) => {
      if (!dragState.isDragging) return;
      event.preventDefault();

      const position = getEventPosition(event);
      const velocity = calculateVelocity(position, dragState.currentPosition);

      setDragState(prev => ({
        ...prev,
        currentPosition: position,
        velocity
      }));
    }, 16), // 60fps throttling
    [dragState.isDragging, dragState.currentPosition]
  );

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
```

### Responsive Constraint Adaptation
```typescript
// Constraints adapt to different screen sizes
const getResponsiveConstraints = (screenWidth: number): DragConstraints => {
  if (screenWidth < 640) { // Mobile
    return {
      left: -30, right: 30,
      top: -20, bottom: 20,
      elasticity: 0.15
    };
  } else if (screenWidth < 1024) { // Tablet
    return {
      left: -60, right: 60,
      top: -30, bottom: 30,
      elasticity: 0.18
    };
  } else { // Desktop
    return {
      left: -100, right: 100,
      top: -50, bottom: 50,
      elasticity: 0.2
    };
  }
};
```

### Touch Performance Optimization
```typescript
// Passive event listeners for better scroll performance
useEffect(() => {
  const element = elementRef.current;
  if (!element) return;

  const options = { passive: false }; // Non-passive for preventDefault

  element.addEventListener('touchstart', handleTouchStart, options);
  element.addEventListener('touchmove', handleTouchMove, options);
  element.addEventListener('touchend', handleTouchEnd, options);

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}, [handleTouchStart, handleTouchMove, handleTouchEnd]);
```

## 4. Event Management

### Main Drag Interaction Hook
```typescript
const useDragInteraction = (elementRef: RefObject<HTMLElement>) => {
  const [dragState, setDragState] = useState<DragState>(initialDragState);
  const constraints = useDragConstraints(elementRef);
  const gestures = useDragGestures();

  // Drag start handler
  const handleDragStart = useCallback((event: PointerEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const position = getEventPosition(event);

    setDragState({
      isDragging: true,
      isReleasing: false,
      startPosition: position,
      currentPosition: position,
      velocity: { x: 0, y: 0 },
      constraints
    });

    // Capture pointer for consistent tracking
    elementRef.current.setPointerCapture(event.pointerId);
  }, [constraints]);

  // Drag move handler with constraint checking
  const handleDragMove = useCallback((event: PointerEvent) => {
    if (!dragState.isDragging) return;

    const position = getEventPosition(event);
    const deltaTime = Date.now() - lastMoveTime.current;
    const velocity = calculateVelocity(position, dragState.currentPosition, deltaTime);

    // Apply constraint elasticity
    const constrainedPosition = applyElasticConstraints(position, constraints);

    setDragState(prev => ({
      ...prev,
      currentPosition: constrainedPosition,
      velocity
    }));

    lastMoveTime.current = Date.now();
  }, [dragState.isDragging, dragState.currentPosition, constraints]);

  // Drag end with physics-based release
  const handleDragEnd = useCallback((event: PointerEvent) => {
    if (!dragState.isDragging) return;

    const destination = calculateReleaseDestination(
      dragState.currentPosition,
      dragState.velocity,
      constraints
    );

    setDragState(prev => ({
      ...prev,
      isDragging: false,
      isReleasing: true
    }));

    // Animate to final position
    animateToPosition(destination, () => {
      setDragState(prev => ({ ...prev, isReleasing: false }));
    });
  }, [dragState.isDragging, dragState.currentPosition, dragState.velocity, constraints]);

  return {
    dragState,
    handlers: {
      onPointerDown: handleDragStart,
      onPointerMove: handleDragMove,
      onPointerUp: handleDragEnd,
      onPointerCancel: handleDragEnd
    }
  };
};
```

### Memory Management and Cleanup
```typescript
const useDragCleanup = () => {
  const cleanup = useCallback(() => {
    // Cancel any pending animations
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    // Clear any timeouts
    if (releaseTimeout.current) {
      clearTimeout(releaseTimeout.current);
    }

    // Reset pointer capture
    if (capturedPointer.current) {
      document.releasePointerCapture(capturedPointer.current);
    }
  }, []);

  useEffect(() => {
    return cleanup; // Cleanup on unmount
  }, [cleanup]);

  return cleanup;
};
```

## 5. Accessibility Compliance

### Keyboard Support
```typescript
const useKeyboardDragSupport = () => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isDragModeActive) return;

    const step = event.shiftKey ? 20 : 10; // Fine vs coarse movement
    let deltaX = 0, deltaY = 0;

    switch (event.key) {
      case 'ArrowLeft':
        deltaX = -step;
        break;
      case 'ArrowRight':
        deltaX = step;
        break;
      case 'ArrowUp':
        deltaY = -step;
        break;
      case 'ArrowDown':
        deltaY = step;
        break;
      case 'Home':
        // Return to center
        animateToPosition({ x: 0, y: 0 });
        return;
      case 'Escape':
        // Exit drag mode
        setIsDragModeActive(false);
        return;
      default:
        return;
    }

    event.preventDefault();
    moveByDelta(deltaX, deltaY);
  }, [isDragModeActive]);

  return { handleKeyDown };
};
```

### Screen Reader Support
```typescript
const accessibilityProps = {
  role: "button",
  tabIndex: 0,
  "aria-label": language === "zh"
    ? "可拖拽的Logo - 按空格鍵進入拖拽模式，方向鍵移動，Home鍵回到中心，Escape鍵退出"
    : "Draggable Logo - Press Space to enter drag mode, arrow keys to move, Home to center, Escape to exit",
  "aria-pressed": isDragModeActive,
  "aria-describedby": "drag-instructions",
  onKeyDown: handleKeyDown,
  onFocus: handleFocus,
  onBlur: handleBlur
};

// Hidden instructions for screen readers
const hiddenInstructions = (
  <div id="drag-instructions" className="sr-only">
    {language === "zh"
      ? "這是一個可互動的Logo。按空格鍵進入拖拽模式，使用方向鍵移動Logo，按Home鍵回到中心位置，按Escape鍵退出拖拽模式。"
      : "This is an interactive logo. Press Space to enter drag mode, use arrow keys to move the logo, press Home to return to center, press Escape to exit drag mode."
    }
  </div>
);
```

### Focus Management
```typescript
const useFocusManagement = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDragModeActive, setIsDragModeActive] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    // Announce drag capability
    if (announceRef.current) {
      announceRef.current.textContent = language === "zh"
        ? "Logo已聚焦，按空格鍵開始拖拽"
        : "Logo focused, press Space to start dragging";
    }
  }, [language]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsDragModeActive(false);
  }, []);

  return {
    isFocused,
    isDragModeActive,
    setIsDragModeActive,
    handleFocus,
    handleBlur
  };
};
```

## 6. Code Implementation

### Main Draggable Component
```typescript
// src/components/DraggableHeroLogo.tsx
import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DraggableHeroLogoProps {
  src: string;
  alt: string;
  className?: string;
  language: 'en' | 'zh';
  size: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export const DraggableHeroLogo: React.FC<DraggableHeroLogoProps> = ({
  src,
  alt,
  className,
  language,
  size
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Framer Motion values for smooth animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for natural movement
  const springX = useSpring(x, springConfig.dragFollow);
  const springY = useSpring(y, springConfig.dragFollow);

  // Drag interaction state
  const dragState = useDragInteraction(containerRef);
  const constraints = useDragConstraints(containerRef);
  const accessibility = useFocusManagement();

  // Main drag handlers
  const handleDrag = useCallback((event, info) => {
    // Apply constraints with elasticity
    const constrainedX = applyElasticConstraints(info.point.x, constraints.left, constraints.right);
    const constrainedY = applyElasticConstraints(info.point.y, constraints.top, constraints.bottom);

    x.set(constrainedX);
    y.set(constrainedY);
  }, [x, y, constraints]);

  const handleDragEnd = useCallback((event, info) => {
    // Calculate release destination based on velocity
    const destination = calculateReleaseDestination(
      { x: info.point.x, y: info.point.y },
      { x: info.velocity.x, y: info.velocity.y },
      constraints
    );

    // Animate to final position
    x.start(destination.x, springConfig.snapBack);
    y.start(destination.y, springConfig.snapBack);
  }, [x, y, constraints]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center",
        size.mobile,
        `md:${size.tablet}`,
        `lg:${size.desktop}`,
        className
      )}
    >
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing"
        style={{ x: springX, y: springY }}
        drag
        dragConstraints={constraints}
        dragElastic={0.2}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, zIndex: 10 }}
        whileTap={{ scale: 0.95 }}
        {...accessibility.accessibilityProps}
      />

      {/* Hidden accessibility instructions */}
      {accessibility.hiddenInstructions}

      {/* Screen reader announcements */}
      <div ref={accessibility.announceRef} className="sr-only" aria-live="polite" />
    </div>
  );
};
```

### Utility Functions
```typescript
// src/lib/dragUtils.ts
export const applyElasticConstraints = (
  value: number,
  min: number,
  max: number,
  elasticity: number = 0.2
): number => {
  if (value < min) {
    return min - (min - value) * elasticity;
  }
  if (value > max) {
    return max + (value - max) * elasticity;
  }
  return value;
};

export const calculateVelocity = (
  current: { x: number; y: number },
  previous: { x: number; y: number },
  deltaTime: number
): { x: number; y: number } => {
  const dt = Math.max(deltaTime, 1); // Prevent division by zero
  return {
    x: (current.x - previous.x) / dt,
    y: (current.y - previous.y) / dt
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
};
```

## 7. Integration Guide

### Integration with Specialist A (anime.js)
```typescript
// Coordination between drag system and anime.js animations
interface AnimationCoordination {
  // Disable anime.js hover effects during drag
  pauseHoverAnimations: () => void;
  resumeHoverAnimations: () => void;

  // Trigger anime.js effects on drag events
  triggerDragStartEffect: () => void;
  triggerDragEndEffect: () => void;

  // Sync animation states
  isDragActive: boolean;
  isAnimeActive: boolean;
}

const useAnimationCoordination = () => {
  const [dragActive, setDragActive] = useState(false);

  // Notify anime.js system of drag state changes
  const handleDragStart = useCallback(() => {
    setDragActive(true);
    // Signal to anime.js to pause conflicting animations
    window.dispatchEvent(new CustomEvent('logo:dragStart'));
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragActive(false);
    // Signal to anime.js to resume/trigger effects
    window.dispatchEvent(new CustomEvent('logo:dragEnd'));
  }, []);

  return {
    dragActive,
    handleDragStart,
    handleDragEnd
  };
};
```

### HeroSection Integration
```typescript
// Updated HeroSection.tsx integration
export default function HeroSection({ content, language }: HeroSectionProps) {
  // ... existing code ...

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* ... existing content ... */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="space-y-8">
          {/* ... existing content ... */}
        </div>

        {/* Right Side - Enhanced Draggable Logo */}
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
          />
        </div>
      </div>

      {/* ... existing content ... */}
    </section>
  );
}
```

## 8. Performance Optimization

### Render Optimization
```typescript
// Memoized component to prevent unnecessary re-renders
export const DraggableHeroLogo = React.memo<DraggableHeroLogoProps>(({
  src,
  alt,
  className,
  language,
  size
}) => {
  // ... implementation
}, (prevProps, nextProps) => {
  // Custom comparison for performance
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.language === nextProps.language &&
    JSON.stringify(prevProps.size) === JSON.stringify(nextProps.size)
  );
});
```

### Animation Performance
```typescript
// Use transform instead of layout properties for better performance
const motionProps = {
  style: {
    x: springX,
    y: springY,
    transform: 'translateZ(0)' // Force GPU acceleration
  },
  transition: {
    type: "spring",
    damping: 25,
    stiffness: 700,
    mass: 1
  }
};
```

## 9. Testing Strategy

### Unit Tests
```typescript
// __tests__/DraggableHeroLogo.test.tsx
describe('DraggableHeroLogo', () => {
  it('should handle mouse drag correctly', () => {
    // Test mouse event handling
  });

  it('should handle touch events on mobile', () => {
    // Test touch event handling
  });

  it('should respect drag constraints', () => {
    // Test boundary enforcement
  });

  it('should be keyboard accessible', () => {
    // Test keyboard navigation
  });

  it('should announce changes to screen readers', () => {
    // Test accessibility announcements
  });
});
```

### Integration Tests
```typescript
// __tests__/HeroSection.integration.test.tsx
describe('HeroSection with Draggable Logo', () => {
  it('should not interfere with page scrolling', () => {
    // Test scroll behavior
  });

  it('should coordinate with anime.js animations', () => {
    // Test animation coordination
  });

  it('should maintain responsive behavior', () => {
    // Test across breakpoints
  });
});
```

## 10. Success Criteria Checklist

### ✅ User Experience
- [ ] Intuitive drag behavior with natural physics
- [ ] Smooth performance on desktop (60fps)
- [ ] Smooth performance on mobile devices
- [ ] No interference with page scroll/touch
- [ ] Visual feedback during interactions

### ✅ Technical Requirements
- [ ] Clean React/TypeScript implementation
- [ ] Framer Motion integration
- [ ] Memory leak prevention
- [ ] Event cleanup on unmount
- [ ] Cross-browser compatibility

### ✅ Accessibility Compliance
- [ ] Keyboard navigation support
- [ ] Screen reader announcements
- [ ] Focus management
- [ ] WCAG 2.1 AA compliance
- [ ] Bilingual accessibility

### ✅ Integration Compatibility
- [ ] Works with existing Tailwind classes
- [ ] Compatible with Wix deployment
- [ ] Coordinates with anime.js system
- [ ] Maintains responsive breakpoints
- [ ] No conflict with existing interactions

---

## Summary

This drag interaction system provides:

1. **Natural Physics**: Spring-based animations with elastic constraints
2. **Cross-Platform**: Unified mouse/touch handling for desktop/mobile
3. **Accessibility**: Full keyboard support and screen reader compatibility
4. **Performance**: Optimized rendering and memory management
5. **Integration**: Seamless coordination with anime.js and existing components

The implementation uses Framer Motion for smooth animations, provides comprehensive accessibility support, and maintains the existing responsive design while adding engaging drag interactions that enhance the user experience without interfering with core website functionality.