import React, { useRef, useEffect, useState, useCallback } from 'react';
import { animate, utils as animeUtils } from 'animejs';

interface AnimatedHeroLogoProps {
  /** Image source for the logo */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional CSS classes */
  className?: string;
  /** Logo size in pixels (square) */
  size?: number;
  /** Enable/disable hover animations */
  enableHoverEffects?: boolean;
  /** Reduced motion preference */
  reduceMotion?: boolean;
}

interface HoverAnimations {
  scale: any;
  glow: any;
  rotation: any;
}

export const AnimatedHeroLogo: React.FC<AnimatedHeroLogoProps> = ({
  src,
  alt,
  className = '',
  size = 400,
  enableHoverEffects = true,
  reduceMotion = false
}) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const hoverAnimationsRef = useRef<HoverAnimations | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = reduceMotion ||
    (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Initialize entrance animation
  useEffect(() => {
    if (!logoRef.current || prefersReducedMotion) {
      setAnimationsReady(true);
      return;
    }

    // Initial state
    animeUtils.set(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      rotate: -10
    });

    // Entrance animation
    const entranceAnimation = animate(logoRef.current, {
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [-10, 0],
      duration: 1200,
      ease: 'outElastic',
      delay: 300,
      onComplete: () => {
        setAnimationsReady(true);
      }
    });

    return () => {
      if (entranceAnimation && typeof entranceAnimation.pause === 'function') {
        entranceAnimation.pause();
      }
    };
  }, [prefersReducedMotion]);

  // Initialize hover animations
  useEffect(() => {
    if (!logoRef.current || !containerRef.current || !enableHoverEffects || prefersReducedMotion || !animationsReady) {
      return;
    }

    // Create hover animations but don't run them yet
    const scaleAnimation = animate(logoRef.current, {
      scale: [1, 1.05],
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const glowAnimation = animate(containerRef.current, {
      boxShadow: [
        '0 10px 30px rgba(59, 130, 246, 0.15)',
        '0 20px 60px rgba(59, 130, 246, 0.25)'
      ],
      duration: 300,
      easing: 'easeOutQuad',
      autoplay: false
    });

    const rotationAnimation = animate(logoRef.current, {
      rotate: [0, 2],
      duration: 200,
      easing: 'easeOutQuad',
      autoplay: false
    });

    hoverAnimationsRef.current = {
      scale: scaleAnimation,
      glow: glowAnimation,
      rotation: rotationAnimation
    };

    return () => {
      // Clean up animations
      if (hoverAnimationsRef.current) {
        Object.values(hoverAnimationsRef.current).forEach(animation => {
          if (animation && typeof animation.pause === 'function') {
            animation.pause();
          }
        });
        hoverAnimationsRef.current = null;
      }
    };
  }, [enableHoverEffects, prefersReducedMotion, animationsReady]);

  // Handle hover enter
  const handleMouseEnter = useCallback(() => {
    if (!enableHoverEffects || prefersReducedMotion || !hoverAnimationsRef.current) {
      return;
    }

    // Play hover animations
    if (hoverAnimationsRef.current.scale && typeof hoverAnimationsRef.current.scale.play === 'function') {
      hoverAnimationsRef.current.scale.play();
    }
    if (hoverAnimationsRef.current.glow && typeof hoverAnimationsRef.current.glow.play === 'function') {
      hoverAnimationsRef.current.glow.play();
    }
    if (hoverAnimationsRef.current.rotation && typeof hoverAnimationsRef.current.rotation.play === 'function') {
      hoverAnimationsRef.current.rotation.play();
    }
  }, [enableHoverEffects, prefersReducedMotion]);

  // Handle hover leave
  const handleMouseLeave = useCallback(() => {
    if (!enableHoverEffects || prefersReducedMotion || !hoverAnimationsRef.current) {
      return;
    }

    // Reverse animations
    if (hoverAnimationsRef.current.scale && typeof hoverAnimationsRef.current.scale.reverse === 'function') {
      hoverAnimationsRef.current.scale.reverse();
    }
    if (hoverAnimationsRef.current.glow && typeof hoverAnimationsRef.current.glow.reverse === 'function') {
      hoverAnimationsRef.current.glow.reverse();
    }
    if (hoverAnimationsRef.current.rotation && typeof hoverAnimationsRef.current.rotation.reverse === 'function') {
      hoverAnimationsRef.current.rotation.reverse();
    }
  }, [enableHoverEffects, prefersReducedMotion]);

  // Focus/blur handlers for accessibility
  const handleFocus = useCallback(() => {
    if (!prefersReducedMotion) {
      handleMouseEnter();
    }
  }, [handleMouseEnter, prefersReducedMotion]);

  const handleBlur = useCallback(() => {
    if (!prefersReducedMotion) {
      handleMouseLeave();
    }
  }, [handleMouseLeave, prefersReducedMotion]);

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    transition: prefersReducedMotion ? 'none' : 'box-shadow 0.3s ease-out',
    cursor: enableHoverEffects ? 'pointer' : 'default'
  };

  const logoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    userSelect: 'none' as const,
    transition: prefersReducedMotion ? 'none' : undefined
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={enableHoverEffects ? 0 : -1}
      role={enableHoverEffects ? "button" : "img"}
      aria-label={enableHoverEffects ? `${alt} - Interactive logo` : alt}
    >
      <img
        ref={logoRef}
        src={src}
        alt={alt}
        style={logoStyle}
        draggable={false}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default AnimatedHeroLogo;