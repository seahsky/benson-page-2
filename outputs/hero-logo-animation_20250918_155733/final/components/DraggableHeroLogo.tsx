import React, { useRef, useCallback, useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '@/lib/utils';
import { useDragInteraction } from '@/hooks/useDragInteraction';
import { useDragConstraints } from '@/hooks/useDragConstraints';
import { useDragAccessibility } from '@/hooks/useDragAccessibility';

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

// Animation configuration for different interaction types
const animationConfig = {
  // Smooth follow during drag
  dragFollow: {
    duration: 0, // Real-time follow, no animation
    easing: 'linear'
  },
  // Natural snap back after release
  snapBack: {
    duration: 500,
    easing: 'easeOutElastic(1, .6)'
  },
  // Gentle hover animation
  hover: {
    duration: 300,
    easing: 'easeOutCubic'
  },
  // Scale animation
  scale: {
    duration: 200,
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
      anime({
        targets: imageRef.current,
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
        currentAnimation.current = anime({
          targets: imageRef.current,
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

  // Reset position when disabled
  useEffect(() => {
    if (disabled && imageRef.current) {
      currentAnimation.current = anime({
        targets: imageRef.current,
        translateX: 0,
        translateY: 0,
        scale: 1,
        ...animationConfig.snapBack,
        complete: () => {
          setPosition({ x: 0, y: 0 });
          setScale(1);
        }
      });
      resetPosition();
    }
  }, [disabled, resetPosition]);

  // Double-click/tap to return to center
  const handleDoubleClick = useCallback(() => {
    if (disabled || !imageRef.current) return;

    currentAnimation.current = anime({
      targets: imageRef.current,
      translateX: 0,
      translateY: 0,
      scale: 1,
      ...animationConfig.snapBack,
      complete: () => {
        setPosition({ x: 0, y: 0 });
        setScale(1);
      }
    });

    resetPosition();

    // Announce to screen readers
    const message = language === 'zh' ? 'Logo已回到中心位置' : 'Logo returned to center';
    window.dispatchEvent(new CustomEvent('logo:announce', { detail: { message } }));
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
          transformOrigin: 'center'
        }}
        // Accessibility props
        {...(disabled ? {} : accessibilityProps)}
        // Event handlers
        {...eventHandlers}
        // Mouse events for hover effects (replacing framer-motion whileHover)
        onMouseEnter={() => {
          if (!disabled && !isDragging && imageRef.current) {
            anime({
              targets: imageRef.current,
              scale: 1.05,
              ...animationConfig.hover
            });
          }
        }}
        onMouseLeave={() => {
          if (!disabled && !isDragging && imageRef.current) {
            anime({
              targets: imageRef.current,
              scale: 1,
              ...animationConfig.hover
            });
          }
        }}
        // Touch events for tap effects (replacing framer-motion whileTap)
        onTouchStart={() => {
          if (!disabled && imageRef.current) {
            anime({
              targets: imageRef.current,
              scale: 0.98,
              ...animationConfig.scale
            });
          }
        }}
        onTouchEnd={() => {
          if (!disabled && imageRef.current) {
            anime({
              targets: imageRef.current,
              scale: 1,
              ...animationConfig.scale
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

      {/* Drag state indicator for development (remove in production) */}
      {process.env.NODE_ENV === 'development' && !disabled && (
        <div className="absolute -bottom-8 left-0 text-xs text-gray-500 font-mono">
          State: {isDragging ? 'dragging' : 'idle'}
          {' | '}
          Pos: ({Math.round(position.x)}, {Math.round(position.y)}) Scale: {scale.toFixed(2)}
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