import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';
import { useDragConstraints } from '@/hooks/useDragConstraints';
import { useDragAccessibility } from '@/hooks/useDragAccessibility';
// import { animationUtils } from '@/lib/animations'; // TODO: Implement optimized animations
import { hapticFeedback, throttle } from '@/lib/dragUtils';

export interface OptimizedDraggableHeroLogoProps {
  src: string;
  alt: string;
  className?: string;
  language: 'en' | 'zh';
  size: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  onDragStart?: () => void;
  onDragEnd?: () => void;
  disabled?: boolean;
  // Performance-focused options
  enablePerformanceMode?: boolean;
  enableHapticFeedback?: boolean;
  maxScale?: number;
  debugMode?: boolean;
}

// Simplified animation configuration for performance
const optimizedAnimationConfig = {
  // Immediate drag follow
  dragFollow: {
    duration: 0,
    easing: 'linear'
  },
  // Fast, efficient snap back
  snapBack: {
    duration: 450,
    easing: 'easeOutQuart'
  },
  // Simplified hover
  hover: {
    duration: 200,
    easing: 'easeOutQuad'
  }
};

export const OptimizedDraggableHeroLogo: React.FC<OptimizedDraggableHeroLogoProps> = ({
  src,
  alt,
  className,
  language,
  size,
  onDragStart,
  onDragEnd,
  disabled = false,
  enablePerformanceMode = true,
  enableHapticFeedback = true,
  maxScale = 1.15,
  debugMode = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const currentAnimation = useRef<any | null>(null);
  const rafId = useRef<number | null>(null);

  // Simplified state management
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);

  // Drag state tracking
  const dragState = useRef({
    isActive: false,
    startPosition: { x: 0, y: 0 },
    lastMoveTime: 0,
    velocity: { x: 0, y: 0 }
  });

  // Get drag constraints
  const { constraints } = useDragConstraints(containerRef, {
    elasticity: 0.2,
    useResponsiveConstraints: true
  });

  // Throttled position updates for performance
  const throttledPositionUpdate = useMemo(
    () => throttle((newPosition: { x: number; y: number }) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (imageRef.current) {
          const transform = `translate(${newPosition.x}px, ${newPosition.y}px) scale(${scale})`;
          imageRef.current.style.transform = transform;
        }
        setPosition(newPosition);
      });
    }, enablePerformanceMode ? 16 : 8), // 60fps or 120fps
    [scale, enablePerformanceMode]
  );

  // Handle position changes from accessibility system
  const handleAccessibilityPositionChange = useCallback((newPosition: { x: number; y: number }) => {
    throttledPositionUpdate(newPosition);
    if (imageRef.current) {
      animate(imageRef.current, {
        translateX: newPosition.x,
        translateY: newPosition.y,
        ...optimizedAnimationConfig.dragFollow
      });
    }
  }, [throttledPositionUpdate]);

  // Accessibility system
  const {
    accessibilityProps,
    hiddenInstructionsProps,
    announcementsProps,
    updatePosition,
    resetPosition
  } = useDragAccessibility(
    language,
    handleAccessibilityPositionChange,
    constraints
  );

  // Simplified drag handling with performance optimizations
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    if (disabled || !imageRef.current) return;

    event.preventDefault();
    setIsDragging(true);
    onDragStart?.();

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    dragState.current = {
      isActive: true,
      startPosition: { x: event.clientX - centerX, y: event.clientY - centerY },
      lastMoveTime: Date.now(),
      velocity: { x: 0, y: 0 }
    };

    // Simplified haptic feedback
    if (enableHapticFeedback && hapticFeedback.isSupported()) {
      hapticFeedback.light();
    }

    // Set up pointer capture
    if (imageRef.current.setPointerCapture) {
      imageRef.current.setPointerCapture(event.pointerId);
    }

    // Stop any existing animations
    if (currentAnimation.current) {
      currentAnimation.current.pause();
    }

    // Performance mode optimization
    if (enablePerformanceMode && imageRef.current) {
      imageRef.current.style.willChange = 'transform';
    }
  }, [disabled, onDragStart, enableHapticFeedback, enablePerformanceMode]);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!dragState.current.isActive || !imageRef.current) return;

    event.preventDefault();
    const now = Date.now();
    const deltaTime = now - dragState.current.lastMoveTime;

    // Throttle move events for performance
    if (deltaTime < 8) return; // ~120fps cap

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newPosition = {
      x: event.clientX - centerX - dragState.current.startPosition.x,
      y: event.clientY - centerY - dragState.current.startPosition.y
    };

    // Simple constraint application
    const constrainedPosition = {
      x: Math.max(constraints.left, Math.min(constraints.right, newPosition.x)),
      y: Math.max(constraints.top, Math.min(constraints.bottom, newPosition.y))
    };

    // Calculate simple velocity for effects
    const velocity = {
      x: (constrainedPosition.x - position.x) / Math.max(deltaTime, 1) * 1000,
      y: (constrainedPosition.y - position.y) / Math.max(deltaTime, 1) * 1000
    };

    dragState.current.velocity = velocity;
    dragState.current.lastMoveTime = now;

    // Update scale based on movement energy (simplified)
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    const energy = Math.min(1, speed / 1000);
    const newScale = Math.min(maxScale, 1 + energy * 0.1);
    setScale(newScale);

    // Update position with throttling
    throttledPositionUpdate(constrainedPosition);
    updatePosition(constrainedPosition);
  }, [position, constraints, throttledPositionUpdate, updatePosition, maxScale]);

  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    if (!dragState.current.isActive) return;

    event.preventDefault();
    setIsDragging(false);
    dragState.current.isActive = false;

    // Performance mode cleanup
    if (enablePerformanceMode && imageRef.current) {
      imageRef.current.style.willChange = 'auto';
    }

    // Release pointer capture
    if (imageRef.current?.releasePointerCapture) {
      imageRef.current.releasePointerCapture(event.pointerId);
    }

    // Simple momentum calculation
    const velocity = dragState.current.velocity;
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    const hasSignificantMomentum = speed > 200;

    let destination = { x: 0, y: 0 }; // Default to center

    if (hasSignificantMomentum) {
      // Simple momentum application
      const momentumScale = 0.1;
      destination = {
        x: Math.max(constraints.left, Math.min(constraints.right, position.x + velocity.x * momentumScale)),
        y: Math.max(constraints.top, Math.min(constraints.bottom, position.y + velocity.y * momentumScale))
      };
    }

    // Animate to final position
    if (imageRef.current) {
      currentAnimation.current = animate(imageRef.current, {
        translateX: destination.x,
        translateY: destination.y,
        scale: 1,
        ...optimizedAnimationConfig.snapBack,
        complete: () => {
          setPosition(destination);
          setScale(1);
        }
      });
    }

    // Update accessibility
    updatePosition(destination);
    onDragEnd?.();

    // Haptic feedback for release
    if (enableHapticFeedback && hapticFeedback.isSupported()) {
      if (hasSignificantMomentum) {
        hapticFeedback.medium();
      } else {
        hapticFeedback.light();
      }
    }
  }, [position, constraints, updatePosition, onDragEnd, enableHapticFeedback, enablePerformanceMode]);

  // Reset when disabled
  useEffect(() => {
    if (disabled && imageRef.current) {
      currentAnimation.current = animate(imageRef.current, {
        translateX: 0,
        translateY: 0,
        scale: 1,
        ...optimizedAnimationConfig.snapBack,
        complete: () => {
          setPosition({ x: 0, y: 0 });
          setScale(1);
        }
      });
      resetPosition();
    }
  }, [disabled, resetPosition]);

  // Simplified double-click reset
  const handleDoubleClick = useCallback(() => {
    if (disabled || !imageRef.current) return;

    currentAnimation.current = animate(imageRef.current, {
      translateX: 0,
      translateY: 0,
      scale: [1, 1.1, 1],
      ...optimizedAnimationConfig.snapBack,
      complete: () => {
        setPosition({ x: 0, y: 0 });
        setScale(1);
      }
    });

    resetPosition();

    if (enableHapticFeedback) {
      hapticFeedback.medium();
    }
  }, [disabled, resetPosition, enableHapticFeedback]);

  // Simplified hover effects
  const handleMouseEnter = useCallback(() => {
    if (!disabled && !isDragging && imageRef.current) {
      const hoverScale = Math.min(maxScale * 0.7, 1.05);
      animate(imageRef.current, {
        scale: hoverScale,
        ...optimizedAnimationConfig.hover
      });
    }
  }, [disabled, isDragging, maxScale]);

  const handleMouseLeave = useCallback(() => {
    if (!disabled && !isDragging && imageRef.current) {
      animate(imageRef.current, {
        scale: 1,
        ...optimizedAnimationConfig.hover
      });
    }
  }, [disabled, isDragging]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAnimation.current) {
        currentAnimation.current.pause();
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Combine event handlers
  const eventHandlers = disabled ? {} : {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onDoubleClick: handleDoubleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };

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
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-contain transition-all duration-300",
          "drop-shadow-lg hover:drop-shadow-xl",
          !disabled && "cursor-grab active:cursor-grabbing",
          disabled && "cursor-default opacity-75"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${disabled ? 1 : scale})`,
          transformOrigin: 'center',
          willChange: enablePerformanceMode && isDragging ? 'transform' : 'auto'
        }}
        // Accessibility props
        {...(disabled ? {} : accessibilityProps)}
        // Event handlers
        {...eventHandlers}
        // Prevent native image dragging
        onDragStart={(e) => e.preventDefault()}
        // Optimized loading
        loading="eager"
        decoding="async"
      />

      {/* Hidden accessibility elements */}
      {!disabled && (
        <div {...hiddenInstructionsProps} />
      )}
      {!disabled && (
        <div {...announcementsProps} />
      )}

      {/* Simplified visual indicator */}
      {!disabled && (
        <div
          className={cn(
            "absolute inset-0 rounded-lg border-2 transition-all duration-200",
            isDragging
              ? "border-blue-400 opacity-50 shadow-md"
              : "border-primary opacity-0",
            "focus-within:opacity-30"
          )}
          aria-hidden="true"
        />
      )}

      {/* Debug information (simplified) */}
      {debugMode && !disabled && (
        <div className="absolute -bottom-12 left-0 text-xs text-gray-500 font-mono space-y-1">
          <div>State: {isDragging ? 'dragging' : 'idle'}</div>
          <div>Pos: ({Math.round(position.x)}, {Math.round(position.y)})</div>
          <div>Scale: {scale.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};

// Performance-optimized memoization
export default React.memo(OptimizedDraggableHeroLogo, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.language === nextProps.language &&
    prevProps.disabled === nextProps.disabled &&
    JSON.stringify(prevProps.size) === JSON.stringify(nextProps.size)
  );
});