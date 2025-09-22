/**
 * Enhanced Hero Logo Component
 * Specialist A - Visual Enhancement Expert
 * Brand-aligned professional animations with sophisticated visual effects
 */

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { EnhancedVisualEffects, BRAND_COLORS, BRAND_GRADIENTS } from './enhanced-visual-animations';
import './enhanced-visual-effects.css';

export interface EnhancedHeroLogoProps {
  src: string;
  alt: string;
  className?: string;
  language: 'en' | 'zh';
  size: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  onInteraction?: (type: 'hover' | 'click' | 'drag') => void;
  disabled?: boolean;
  // Enhanced visual options
  enableSophisticatedAnimations?: boolean;
  enableParticleEffects?: boolean;
  enableContextualAdaptation?: boolean;
  energyVisualization?: boolean;
  celebrationIntensity?: 'subtle' | 'medium' | 'strong';
  theme?: 'professional' | 'energetic' | 'elegant';
}

export const EnhancedHeroLogo: React.FC<EnhancedHeroLogoProps> = ({
  src,
  alt,
  className,
  language,
  size,
  onInteraction,
  disabled = false,
  enableSophisticatedAnimations = true,
  enableParticleEffects = true,
  enableContextualAdaptation = true,
  energyVisualization = true,
  celebrationIntensity = 'medium',
  theme = 'professional'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const visualEffectsRef = useRef<EnhancedVisualEffects | null>(null);

  // Enhanced state management
  const [visualState, setVisualState] = useState({
    isHovered: false,
    isFocused: false,
    isLoaded: false,
    energyLevel: 0,
    interactionCount: 0,
    currentTheme: theme
  });

  // Performance and accessibility state
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [supportsAdvancedEffects, setSupportsAdvancedEffects] = useState(true);

  // Initialize visual effects system
  useEffect(() => {
    if (!imageRef.current || !containerRef.current || disabled) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Check device capabilities
    const checkAdvancedSupport = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const hasCanvasSupport = !!context;
      const hasRAFSupport = 'requestAnimationFrame' in window;
      const hasGoodPerformance = navigator.hardwareConcurrency > 2;

      return hasCanvasSupport && hasRAFSupport && hasGoodPerformance;
    };

    setSupportsAdvancedEffects(checkAdvancedSupport());

    // Initialize enhanced visual effects
    if (enableSophisticatedAnimations && !prefersReducedMotion) {
      visualEffectsRef.current = new EnhancedVisualEffects(
        imageRef.current,
        containerRef.current
      );

      // Create sophisticated entrance animation
      setTimeout(() => {
        visualEffectsRef.current?.createSophisticatedEntrance();
      }, 100);
    }

    return () => {
      visualEffectsRef.current?.destroy();
    };
  }, [disabled, enableSophisticatedAnimations, prefersReducedMotion]);

  // Handle contextual adaptations
  useEffect(() => {
    if (!enableContextualAdaptation || !visualEffectsRef.current) return;

    const handleTimeBasedTheme = () => {
      visualEffectsRef.current?.createContextualEffects('time-of-day');
    };

    const handleScrollEffects = () => {
      visualEffectsRef.current?.createContextualEffects('scroll-position');
    };

    // Apply time-based theme
    handleTimeBasedTheme();

    // Set up scroll listener for progressive effects
    window.addEventListener('scroll', handleScrollEffects, { passive: true });

    // Update theme every hour
    const themeInterval = setInterval(handleTimeBasedTheme, 3600000);

    return () => {
      window.removeEventListener('scroll', handleScrollEffects);
      clearInterval(themeInterval);
    };
  }, [enableContextualAdaptation]);

  // Enhanced hover handlers
  const handleMouseEnter = useCallback(() => {
    if (disabled || prefersReducedMotion) return;

    setVisualState(prev => ({ ...prev, isHovered: true }));
    onInteraction?.(&#39;hover&#39;);

    if (visualEffectsRef.current && enableSophisticatedAnimations) {
      const hoverEffects = visualEffectsRef.current.createSophisticatedHover();
      hoverEffects.enter();
    }
  }, [disabled, prefersReducedMotion, enableSophisticatedAnimations, onInteraction]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || prefersReducedMotion) return;

    setVisualState(prev => ({ ...prev, isHovered: false }));

    if (visualEffectsRef.current && enableSophisticatedAnimations) {
      const hoverEffects = visualEffectsRef.current.createSophisticatedHover();
      hoverEffects.leave();
    }
  }, [disabled, prefersReducedMotion, enableSophisticatedAnimations]);

  // Enhanced click handler with celebration
  const handleClick = useCallback(() => {
    if (disabled) return;

    setVisualState(prev => ({
      ...prev,
      interactionCount: prev.interactionCount + 1
    }));

    onInteraction?.(&#39;click&#39;);

    if (visualEffectsRef.current && enableSophisticatedAnimations && !prefersReducedMotion) {
      visualEffectsRef.current.createCelebrationEffect(celebrationIntensity);
    }

    // Track interaction for progressive enhancement
    const currentCount = visualState.interactionCount + 1;
    if (currentCount % 5 === 0 && visualEffectsRef.current) {
      // Special celebration every 5th interaction
      visualEffectsRef.current.createCelebrationEffect('strong');
    }
  }, [disabled, enableSophisticatedAnimations, prefersReducedMotion, celebrationIntensity, onInteraction, visualState.interactionCount]);

  // Enhanced focus handlers for accessibility
  const handleFocus = useCallback(() => {
    if (disabled) return;

    setVisualState(prev => ({ ...prev, isFocused: true }));

    // Add professional focus visualization
    if (containerRef.current) {
      containerRef.current.classList.add('hero-logo-professional-focus');
    }
  }, [disabled]);

  const handleBlur = useCallback(() => {
    if (disabled) return;

    setVisualState(prev => ({ ...prev, isFocused: false }));

    if (containerRef.current) {
      containerRef.current.classList.remove('hero-logo-professional-focus');
    }
  }, [disabled]);

  // Handle image load for entrance animation
  const handleImageLoad = useCallback(() => {
    setVisualState(prev => ({ ...prev, isLoaded: true }));
  }, []);

  // Energy visualization during interactions
  useEffect(() => {
    if (!energyVisualization || !visualEffectsRef.current) return;

    const energyLevel = visualState.isHovered ? 0.3 :
                      visualState.isFocused ? 0.2 : 0;

    visualEffectsRef.current.createEnergyVisualization(energyLevel);
    setVisualState(prev => ({ ...prev, energyLevel }));
  }, [energyVisualization, visualState.isHovered, visualState.isFocused]);

  // Get theme-specific classes
  const getThemeClasses = () => {
    const baseClasses = 'enhanced-hero-logo-container';
    const themeClasses = {
      professional: 'hero-logo-theme-professional',
      energetic: 'hero-logo-theme-energetic',
      elegant: 'hero-logo-theme-elegant'
    };

    return `${baseClasses} ${themeClasses[theme]}`;
  };

  // Get time-based classes for contextual adaptation
  const getTimeBasedClasses = () => {
    if (!enableContextualAdaptation) return '';

    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return 'hero-logo-time-morning';
    if (hour >= 12 && hour < 18) return 'hero-logo-time-afternoon';
    if (hour >= 18 && hour < 22) return 'hero-logo-time-evening';
    return 'hero-logo-time-night';
  };

  // Accessibility props
  const accessibilityProps = {
    role: 'img',
    tabIndex: disabled ? -1 : 0,
    'aria-label': `${alt} - ${language === 'zh' ? '互动标志' : 'Interactive logo'}`,
    'aria-describedby': 'logo-interaction-help',
    onFocus: handleFocus,
    onBlur: handleBlur
  };

  return (
    <>
      {/* Hidden accessibility description */}
      <div
        id="logo-interaction-help"
        className="sr-only"
        aria-hidden="true"
      >
        {language === 'zh'
          ? '这是一个互动标志。点击可查看动画效果，悬停可查看预览。'
          : 'This is an interactive logo. Click for animation effects, hover for preview.'
        }
      </div>

      <div
        ref={containerRef}
        className={cn(
          getThemeClasses(),
          getTimeBasedClasses(),
          // Responsive sizing
          size.mobile,
          `md:${size.tablet}`,
          `lg:${size.desktop}`,
          // Visual enhancement classes
          enableSophisticatedAnimations && !prefersReducedMotion && [
            'hero-logo-gpu-optimized',
            !visualState.isLoaded && 'hero-logo-loading',
            visualState.isLoaded && 'hero-logo-sophisticated-entrance',
            !visualState.isHovered && !visualState.isFocused && 'hero-logo-breathing'
          ],
          // Hover and interaction classes
          'hero-logo-enhanced-hover',
          'hero-logo-brand-glow',
          enableParticleEffects && supportsAdvancedEffects && 'hero-logo-professional-shimmer',
          energyVisualization && 'hero-logo-energy-indicator',
          // Accessibility and state classes
          'hero-logo-micro-feedback',
          disabled && 'opacity-75 cursor-default',
          !disabled && 'cursor-pointer',
          className
        )}
        style={{
          '--energy-level': visualState.energyLevel,
          '--interaction-count': visualState.interactionCount,
        } as React.CSSProperties}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...(!disabled ? accessibilityProps : {})}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-contain',
            'select-none pointer-events-none',
            // Brand-aligned styling
            'drop-shadow-lg transition-all duration-300',
            // Enhanced visual effects
            enableSophisticatedAnimations && !prefersReducedMotion && [
              'hero-logo-gpu-optimized'
            ]
          )}
          onLoad={handleImageLoad}
          onDragStart={(e) => e.preventDefault()}
          loading="eager"
          decoding="async"
        />

        {/* Accessibility indicator for keyboard navigation */}
        {visualState.isFocused && !disabled && (
          <div
            className="hero-logo-accessible-indicator active"
            aria-hidden="true"
          />
        )}

        {/* Development debug info */}
        {process.env.NODE_ENV === 'development' && !disabled && (
          <div className="absolute -bottom-12 left-0 text-xs text-gray-500 font-mono space-y-1">
            <div>
              Visual State: {visualState.isHovered ? 'hovered' : visualState.isFocused ? 'focused' : 'idle'}
              {' | '}Energy: {(visualState.energyLevel * 100).toFixed(0)}%
            </div>
            <div>
              Interactions: {visualState.interactionCount}
              {' | '}Theme: {theme}
              {' | '}Loaded: {visualState.isLoaded ? 'Yes' : 'No'}
            </div>
            <div>
              Reduced Motion: {prefersReducedMotion ? 'Yes' : 'No'}
              {' | '}Advanced Effects: {supportsAdvancedEffects ? 'Yes' : 'No'}
            </div>
          </div>
        )}
      </div>

      {/* Brand-aligned gradient background for enhanced visual context */}
      {enableContextualAdaptation && !prefersReducedMotion && (
        <div
          className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
          style={{
            background: BRAND_GRADIENTS.subtle,
            borderRadius: 'inherit'
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

// Performance-optimized memoization
export default React.memo(EnhancedHeroLogo, (prevProps, nextProps) => {
  // Only re-render if essential props change
  const essentialProps = [
    'src', 'alt', 'language', 'disabled', 'theme',
    'enableSophisticatedAnimations', 'enableParticleEffects',
    'enableContextualAdaptation', 'celebrationIntensity'
  ] as const;

  return essentialProps.every(prop => prevProps[prop] === nextProps[prop]) &&
         JSON.stringify(prevProps.size) === JSON.stringify(nextProps.size);
});