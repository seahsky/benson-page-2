import React, { useRef, useCallback, useEffect, useState } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';
import { useDragInteraction } from '@/hooks/useDragInteraction';
import { useDragConstraints } from '@/hooks/useDragConstraints';
import { useDragAccessibility } from '@/hooks/useDragAccessibility';
import { animationUtils, animationPerformance } from '@/lib/animations';

export interface DraggableHeroLogoProps {
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
}

// Performance optimization and device capabilities
const deviceOptimization = animationPerformance.optimizeForDevice();
const adaptiveThrottle = animationPerformance.createAdaptiveThrottle(60);

// Enhanced animation configuration with sophisticated effects
const animationConfig = {
  // Smooth follow during drag
  dragFollow: {
    duration: 0, // Real-time follow, no animation
    easing: 'linear'
  },
  // Enhanced snap back with more spring
  snapBack: {
    duration: deviceOptimization.reducedMotion ? 300 : 650,
    easing: 'easeOutElastic(1.2, 0.75)'
  },
  // Enhanced hover with sophisticated effects
  hover: {
    duration: deviceOptimization.reducedMotion ? 200 : 350,
    easing: 'easeOutQuart'
  },
  // Enhanced scale with elastic feedback
  scale: {
    duration: deviceOptimization.reducedMotion ? 150 : 250,
    easing: 'easeOutElastic(1, 0.6)'
  },
  // New: Celebration animation
  celebration: {
    duration: deviceOptimization.reducedMotion ? 400 : 800,
    easing: 'easeOutExpo'
  },
  // New: Focus animation for accessibility
  focus: {
    duration: 250,
    easing: 'easeOutQuad'
  }
};

export const DraggableHeroLogo: React.FC<DraggableHeroLogoProps> = ({
  src,
  alt,
  className,
  language,
  size,
  onDragStart,
  onDragEnd,
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const currentAnimation = useRef<any | null>(null);

  // State for animation values
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Enhanced animation references
  const hoverAnimationsRef = useRef<any>(null);
  const focusAnimationsRef = useRef<any>(null);
  const lastInteractionTime = useRef<number>(0);

  // Get drag constraints
  const { constraints } = useDragConstraints(containerRef, {
    elasticity: 0.2,
    useResponsiveConstraints: true
  });

  // Get drag interaction handlers
  const { handlers: dragHandlers } = useDragInteraction(
    imageRef,
    constraints
  );

  // Handle position changes from accessibility system
  const handleAccessibilityPositionChange = useCallback((newPosition: { x: number; y: number }) => {
    setPosition(newPosition);
    if (imageRef.current) {
      animate(imageRef.current, {
        translateX: newPosition.x,
        translateY: newPosition.y,
        ...animationConfig.dragFollow
      });
    }
  }, []);

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

  // Listen for custom events from the drag system
  useEffect(() => {
    const handleDragStart = () => {
      setIsDragging(true);
      onDragStart?.();
      // Stop any existing animations
      if (currentAnimation.current) {
        currentAnimation.current.pause();
      }
    };

    const handleDragMove = (event: CustomEvent) => {
      const { position } = event.detail;
      setPosition(position);

      // Real-time follow during drag - no animation, just direct update
      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;

        // Calculate scale based on drag distance
        const distance = Math.sqrt(position.x * position.x + position.y * position.y);
        const newScale = Math.min(1.05, 1 + (distance / 1000));
        setScale(newScale);
        imageRef.current.style.scale = newScale.toString();
      }

      // Update accessibility system with current position
      updatePosition(position);
    };

    const handleDragEnd = (event: CustomEvent) => {
      const { destination } = event.detail;
      setIsDragging(false);

      // Animate to destination with spring-like easing
      if (imageRef.current) {
        currentAnimation.current = animate(imageRef.current, {
          translateX: destination.x,
          translateY: destination.y,
          scale: 1, // Return to normal scale
          ...animationConfig.snapBack,
          complete: () => {
            setPosition(destination);
            setScale(1);
          }
        });
      }

      // Update accessibility system
      updatePosition(destination);
      onDragEnd?.();
    };

    window.addEventListener('logo:dragStart', handleDragStart);
    window.addEventListener('logo:dragMove', handleDragMove as EventListener);
    window.addEventListener('logo:dragEnd', handleDragEnd as EventListener);

    return () => {
      window.removeEventListener('logo:dragStart', handleDragStart);
      window.removeEventListener('logo:dragMove', handleDragMove as EventListener);
      window.removeEventListener('logo:dragEnd', handleDragEnd as EventListener);
      if (currentAnimation.current) {
        currentAnimation.current.pause();
      }
    };
  }, [updatePosition, onDragStart, onDragEnd]);

  // Reset position when disabled with enhanced animation
  useEffect(() => {
    if (disabled && imageRef.current) {
      // Clean up any existing hover/focus animations
      if (hoverAnimationsRef.current) {
        animationUtils.reverseHoverAnimations(hoverAnimationsRef.current);
        hoverAnimationsRef.current = null;
      }
      if (focusAnimationsRef.current) {
        Object.values(focusAnimationsRef.current).forEach((animation: any) => {
          if (animation?.reverse) animation.reverse();
        });
        focusAnimationsRef.current = null;
      }

      // Enhanced reset animation
      currentAnimation.current = animationUtils.createSnapBackAnimation(
        imageRef.current,
        { x: 0, y: 0 },
        {
          scale: 1,
          onComplete: () => {
            setPosition({ x: 0, y: 0 });
            setScale(1);
            setIsHovered(false);
            setIsFocused(false);
          }
        }
      );
      resetPosition();
    }
  }, [disabled, resetPosition]);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      const elementId = imageRef.current?.id || 'draggable-hero-logo';
      animationUtils.cleanup(elementId);

      // Clean up hover and focus animations
      if (hoverAnimationsRef.current) {
        Object.values(hoverAnimationsRef.current).forEach((animation: any) => {
          if (animation?.pause) animation.pause();
        });
      }
      if (focusAnimationsRef.current) {
        Object.values(focusAnimationsRef.current).forEach((animation: any) => {
          if (animation?.pause) animation.pause();
        });
      }
    };
  }, []);

  // Enhanced double-click/tap to return to center with celebration
  const handleDoubleClick = useCallback(() => {
    if (disabled || !imageRef.current) return;

    // First, play celebration animation
    animationUtils.createCelebrationAnimation(imageRef.current, {
      intensity: 'strong',
      onComplete: () => {
        // Then snap back to center
        currentAnimation.current = animationUtils.createSnapBackAnimation(
          imageRef.current!,
          { x: 0, y: 0 },
          {
            scale: 1,
            onComplete: () => {
              setPosition({ x: 0, y: 0 });
              setScale(1);
            }
          }
        );
      }
    });

    resetPosition();

    // Announce to screen readers
    const message = language === 'zh' ? 'Logo已回到中心位置' : 'Logo returned to center';
    window.dispatchEvent(new CustomEvent('logo:announce', { detail: { message } }));

    // Track analytics
    animationPerformance.trackAnimationPerformance('double-click-reset', animationConfig.celebration.duration + animationConfig.snapBack.duration);
  }, [disabled, resetPosition, language]);

  // Combine event handlers
  const eventHandlers = disabled ? {} : {
    ...dragHandlers,
    onDoubleClick: handleDoubleClick
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "hero-logo-container relative flex items-center justify-center",
        "gpu-accelerated focus-ring",
        size.mobile,
        `md:${size.tablet}`,
        `lg:${size.desktop}`,
        className
      )}
    >
      <img
        ref={imageRef}
        id="draggable-hero-logo"
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-contain",
          "hero-logo-glow gpu-accelerated",
          "drop-shadow-lg hover:drop-shadow-xl",
          "transition-all duration-300 ease-out",
          !disabled && "cursor-grab active:cursor-grabbing",
          disabled && "cursor-default opacity-75",
          isHovered && !disabled && "hero-logo-shimmer",
          isFocused && !disabled && "ring-2 ring-primary ring-offset-2"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${disabled ? 1 : scale})`,
          transformOrigin: 'center'
        }}
        // Accessibility props
        {...(disabled ? {} : accessibilityProps)}
        // Event handlers
        {...eventHandlers}
        // Enhanced mouse events with sophisticated hover effects
        onMouseEnter={() => {
          if (!disabled && !isDragging && imageRef.current && containerRef.current) {
            setIsHovered(true);

            // Performance throttling check
            if (adaptiveThrottle.shouldThrottle()) {
              return;
            }

            // Create enhanced hover animations
            if (!hoverAnimationsRef.current) {
              hoverAnimationsRef.current = animationUtils.createHoverAnimations(
                imageRef.current,
                containerRef.current
              );
            }

            // Play all hover animations
            animationUtils.playHoverAnimations(hoverAnimationsRef.current);

            // Track performance
            animationPerformance.trackAnimationPerformance('hover-enter', animationConfig.hover.duration);
          }
        }}
        onMouseLeave={() => {
          if (!disabled && !isDragging && imageRef.current) {
            setIsHovered(false);

            // Reverse hover animations
            if (hoverAnimationsRef.current) {
              animationUtils.reverseHoverAnimations(hoverAnimationsRef.current);
            }

            // Track performance
            animationPerformance.trackAnimationPerformance('hover-leave', animationConfig.hover.duration);
          }
        }}
        // Enhanced touch events with celebration effects
        onTouchStart={() => {
          if (!disabled && imageRef.current) {
            lastInteractionTime.current = Date.now();
            animationUtils.createFeedbackAnimation(imageRef.current, 0.95, 'touch');
          }
        }}
        onTouchEnd={() => {
          if (!disabled && imageRef.current) {
            const touchDuration = Date.now() - lastInteractionTime.current;

            // Quick tap = celebration animation
            if (touchDuration < 200) {
              animationUtils.createCelebrationAnimation(imageRef.current, {
                intensity: 'medium',
                onComplete: () => {
                  animationPerformance.trackAnimationPerformance('celebration', animationConfig.celebration.duration);
                }
              });
            } else {
              // Normal touch feedback
              animationUtils.createFeedbackAnimation(imageRef.current, 1, 'touch');
            }
          }
        }}

        // Enhanced focus events for accessibility
        onFocus={() => {
          if (!disabled && imageRef.current && containerRef.current) {
            setIsFocused(true);

            if (!focusAnimationsRef.current) {
              focusAnimationsRef.current = animationUtils.createFocusAnimation(
                imageRef.current,
                containerRef.current
              );
            }

            // Play focus animations
            Object.values(focusAnimationsRef.current).forEach((animation: any) => {
              if (animation?.play) animation.play();
            });

            animationPerformance.trackAnimationPerformance('focus', animationConfig.focus.duration);
          }
        }}
        onBlur={() => {
          if (!disabled && imageRef.current) {
            setIsFocused(false);

            // Reverse focus animations
            if (focusAnimationsRef.current) {
              Object.values(focusAnimationsRef.current).forEach((animation: any) => {
                if (animation?.reverse) animation.reverse();
              });
            }
          }
        }}

        // Enhanced click handler with celebration
        onClick={() => {
          if (!disabled && imageRef.current) {
            animationUtils.createCelebrationAnimation(imageRef.current, {
              intensity: 'strong',
              onComplete: () => {
                console.log('Logo celebration animation completed');
              }
            });
          }
        }}
        // Prevent native image dragging
        onDragStart={(e) => e.preventDefault()}
        // Ensure image loads properly
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

      {/* Visual indicator for drag mode (only visible when keyboard navigating) */}
      {!disabled && (
        <div
          className={cn(
            "absolute inset-0 rounded-lg border-2 border-primary opacity-0 transition-opacity duration-200",
            "focus-within:opacity-50"
          )}
          aria-hidden="true"
        />
      )}

      {/* Enhanced development indicator with animation performance */}
      {process.env.NODE_ENV === 'development' && !disabled && (
        <div className="absolute -bottom-12 left-0 text-xs text-gray-500 font-mono space-y-1">
          <div>
            State: {isDragging ? 'dragging' : isHovered ? 'hovered' : isFocused ? 'focused' : 'idle'}
            {' | '}
            Pos: ({Math.round(position.x)}, {Math.round(position.y)}) Scale: {scale.toFixed(2)}
          </div>
          <div>
            Active Animations: {animationPerformance.getActiveAnimationsCount()}
            {' | '}
            Device: {deviceOptimization.reducedMotion ? 'Reduced Motion' : 'Full Animations'}
            {' | '}
            GPU: {deviceOptimization.useGPUAcceleration ? 'ON' : 'OFF'}
          </div>
        </div>
      )}
    </div>
  );
};

// Memoized component for performance
export default React.memo(DraggableHeroLogo, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.language === nextProps.language &&
    prevProps.disabled === nextProps.disabled &&
    JSON.stringify(prevProps.size) === JSON.stringify(nextProps.size)
  );
});