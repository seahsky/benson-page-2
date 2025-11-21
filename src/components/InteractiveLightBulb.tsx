import React, { useRef, useCallback, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animate } from 'animejs';
import { accessibleAnimations } from '@/lib/animations';

export interface InteractiveLightBulbProps {
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

/**
 * Premium Illumination Interactive Light Bulb
 *
 * A sophisticated, continuously animated light bulb with:
 * - Realistic lighting physics using brand colors (purple ambient + yellow core)
 * - Subtle breathing animation (2.5s cycle) for continuous engagement
 * - Intensified glow on hover with smooth transitions
 * - Drag interaction with spring-back physics
 * - GPU-accelerated for 60fps performance
 * - Accessibility-compliant with keyboard navigation
 */
export const InteractiveLightBulb: React.FC<InteractiveLightBulbProps> = ({
  src,
  alt,
  className,
  language,
  size,
  onDragStart,
  onDragEnd,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const dragState = useRef({
    isActive: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  // Drag constraints
  const constraints = {
    left: -50,
    right: 50,
    top: -30,
    bottom: 30,
  };

  // Initialize continuous breathing animation
  useEffect(() => {
    if (disabled || !glowLayerRef.current || !imageRef.current) return;
    if (accessibleAnimations.prefersReducedMotion()) return;

    const glowLayer = glowLayerRef.current;
    const image = imageRef.current;

    // Continuous breathing glow animation
    const breathingAnimation = animate(glowLayer, {
      opacity: [0.6, 0.85, 0.6],
      scale: [1, 1.05, 1],
      duration: 2500,
      easing: 'easeInOutSine',
      loop: true,
    });

    // Subtle image pulse for added depth
    const imagePulse = animate(image, {
      filter: [
        'brightness(1) saturate(1)',
        'brightness(1.05) saturate(1.08)',
        'brightness(1) saturate(1)',
      ],
      duration: 2500,
      easing: 'easeInOutSine',
      loop: true,
    });

    return () => {
      breathingAnimation.pause();
      imagePulse.pause();
    };
  }, [disabled]);

  // Hover effect
  useEffect(() => {
    if (disabled || !glowLayerRef.current) return;
    if (accessibleAnimations.prefersReducedMotion()) return;

    const glowLayer = glowLayerRef.current;

    if (isHovered) {
      // Intensify glow on hover
      animate(glowLayer, {
        scale: [glowLayer.style.transform.includes('scale') ? 1.05 : 1, 1.12],
        opacity: [0.85, 1],
        duration: 350,
        easing: 'easeOutQuart',
      });
    } else {
      // Return to breathing state
      animate(glowLayer, {
        scale: 1,
        opacity: 0.7,
        duration: 450,
        easing: 'easeOutQuart',
      });
    }
  }, [isHovered, disabled]);

  // Drag handlers
  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (disabled || !imageRef.current) return;

      event.preventDefault();
      onDragStart?.();

      dragState.current = {
        isActive: true,
        startX: event.clientX - position.x,
        startY: event.clientY - position.y,
        currentX: position.x,
        currentY: position.y,
      };

      imageRef.current.setPointerCapture(event.pointerId);
    },
    [disabled, position, onDragStart]
  );

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!dragState.current.isActive) return;

    event.preventDefault();

    const newX = event.clientX - dragState.current.startX;
    const newY = event.clientY - dragState.current.startY;

    const constrainedX = Math.max(constraints.left, Math.min(constraints.right, newX));
    const constrainedY = Math.max(constraints.top, Math.min(constraints.bottom, newY));

    dragState.current.currentX = constrainedX;
    dragState.current.currentY = constrainedY;

    setPosition({ x: constrainedX, y: constrainedY });
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (!dragState.current.isActive) return;

      event.preventDefault();
      dragState.current.isActive = false;

      if (imageRef.current) {
        imageRef.current.releasePointerCapture(event.pointerId);

        // Smooth elastic snap-back animation
        if (!accessibleAnimations.prefersReducedMotion()) {
          animate(imageRef.current, {
            translateX: 0,
            translateY: 0,
            duration: 650,
            easing: 'easeOutElastic(1.2, 0.75)',
          });
        }
      }

      setPosition({ x: 0, y: 0 });
      onDragEnd?.();
    },
    [onDragEnd]
  );

  const handleDoubleClick = useCallback(() => {
    if (disabled) return;
    setPosition({ x: 0, y: 0 });
  }, [disabled]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return;

      const step = 10;
      let newX = position.x;
      let newY = position.y;

      switch (event.key) {
        case 'ArrowLeft':
          newX = Math.max(constraints.left, position.x - step);
          break;
        case 'ArrowRight':
          newX = Math.min(constraints.right, position.x + step);
          break;
        case 'ArrowUp':
          newY = Math.max(constraints.top, position.y - step);
          break;
        case 'ArrowDown':
          newY = Math.min(constraints.bottom, position.y + step);
          break;
        case 'Home':
          newX = 0;
          newY = 0;
          break;
        default:
          return;
      }

      event.preventDefault();
      setPosition({ x: newX, y: newY });
    },
    [disabled, position]
  );

  const eventHandlers = disabled
    ? {}
    : {
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onDoubleClick: handleDoubleClick,
        onKeyDown: handleKeyDown,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex items-center justify-center',
        size.mobile,
        `md:${size.tablet}`,
        `lg:${size.desktop}`,
        className
      )}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Multi-layered Glow System - Premium Illumination */}

      {/* Outer Purple Ambient Glow - Atmospheric layer */}
      <div
        className={cn(
          'absolute inset-0 rounded-full pointer-events-none transition-all duration-500',
          !disabled && 'animate-pulse-slow'
        )}
        style={{
          background: 'radial-gradient(circle, rgba(59, 17, 123, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'scale(1.4)',
        }}
      />

      {/* Middle Yellow Core Glow - Filament simulation */}
      <div
        ref={glowLayerRef}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 45% 40%,
              rgba(255, 231, 76, 0.4) 0%,
              rgba(255, 231, 76, 0.2) 35%,
              rgba(59, 17, 123, 0.15) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(25px)',
          mixBlendMode: 'screen',
          willChange: 'transform, opacity',
        }}
      />

      {/* Inner Sharp Glow - Light source focus */}
      <div
        className={cn(
          'absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-60'
        )}
        style={{
          background: 'radial-gradient(circle at 45% 40%, rgba(255, 231, 76, 0.3) 0%, transparent 50%)',
          filter: 'blur(15px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Refined Edge Highlight - Designer bulb aesthetic */}
      <div
        className={cn(
          'absolute inset-0 rounded-full pointer-events-none transition-all duration-350',
          isHovered && 'scale-105'
        )}
        style={{
          boxShadow: `
            0 0 20px rgba(255, 231, 76, 0.15),
            0 0 40px rgba(59, 17, 123, 0.1),
            inset 0 0 30px rgba(255, 231, 76, 0.05)
          `,
        }}
      />

      {/* The Light Bulb Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          'relative w-full h-full object-contain z-10',
          'transition-all duration-200',
          !disabled && 'cursor-grab active:cursor-grabbing',
          disabled && 'cursor-default opacity-75',
          isHovered && !disabled && 'drop-shadow-2xl'
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center',
          filter: isHovered && !disabled
            ? 'drop-shadow(0 10px 30px rgba(255, 231, 76, 0.3)) drop-shadow(0 0 20px rgba(59, 17, 123, 0.2))'
            : 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))',
          willChange: 'transform, filter',
        }}
        {...eventHandlers}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={
          language === 'zh'
            ? '可拖拽的燈泡標誌，按方向鍵移動，Home鍵回到中心，雙擊重置'
            : 'Interactive light bulb logo - Arrow keys to move, Home to center, double-click to reset'
        }
        onDragStart={(e) => e.preventDefault()}
        loading="eager"
        decoding="sync"
      />

      {/* Hover Enhancement - Subtle brightness burst */}
      {isHovered && !disabled && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none animate-fade-in"
          style={{
            background: 'radial-gradient(circle, rgba(255, 231, 76, 0.08) 0%, transparent 60%)',
            filter: 'blur(30px)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
};

export default React.memo(InteractiveLightBulb);
