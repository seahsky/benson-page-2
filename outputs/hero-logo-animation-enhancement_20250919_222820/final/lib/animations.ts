/**
 * Unified Animation System for Hero Logo Components
 * Optimized for anime.js v4.1.3 with performance-first design
 */

import { animate, utils as animeUtils } from 'animejs';

// Performance-optimized animation configurations
export const ANIMATION_CONFIGS = {
  // Entrance animations with enhanced stagger effects
  entrance: {
    duration: 1200,
    ease: 'outElastic',
    delay: 300,
    stagger: {
      duration: 800,
      ease: 'outExpo',
      staggerDelay: 150,
    },
  },

  // Enhanced hover animations with sophisticated effects
  hover: {
    scale: {
      duration: 350,
      ease: 'outQuart',
    },
    glow: {
      duration: 450,
      ease: 'outQuart',
    },
    rotation: {
      duration: 300,
      ease: 'outBack',
    },
    // New: Shimmer effect
    shimmer: {
      duration: 600,
      ease: 'linear',
    },
    // New: Particle-like micro-bounce
    microBounce: {
      duration: 200,
      ease: 'outBounce',
    },
    // New: Color transition glow
    colorGlow: {
      duration: 500,
      ease: 'inOutQuart',
    },
  },

  // Enhanced drag animations
  drag: {
    // Real-time follow during drag
    follow: {
      duration: 0,
      ease: 'linear',
    },
    // Enhanced snap back with more spring
    snapBack: {
      duration: 650,
      ease: 'outElastic(1.2, 0.75)',
    },
    // Enhanced touch feedback with elastic
    touch: {
      duration: 250,
      ease: 'outElastic(1, 0.6)',
    },
    // New: Celebration animation on click/tap
    celebration: {
      duration: 800,
      ease: 'outExpo',
    },
  },

  // New: Advanced interaction effects
  interaction: {
    // Focus state for accessibility
    focus: {
      duration: 250,
      ease: 'outQuad',
    },
    // Click/tap feedback
    click: {
      duration: 150,
      ease: 'outQuint',
    },
    // State transition animations
    transition: {
      duration: 400,
      ease: 'inOutQuart',
    },
  },
} as const;

// Centralized animation instance management
class AnimationManager {
  private instances: Map<string, any> = new Map();

  // Store animation instance for cleanup
  setInstance(key: string, animation: any): void {
    // Clean up existing instance
    if (this.instances.has(key)) {
      const existing = this.instances.get(key);
      if (existing?.pause) existing.pause();
    }
    this.instances.set(key, animation);
  }

  // Get animation instance
  getInstance(key: string): any {
    return this.instances.get(key);
  }

  // Clean up animation instance
  cleanup(key: string): void {
    const animation = this.instances.get(key);
    if (animation?.pause) animation.pause();
    this.instances.delete(key);
  }

  // Clean up all instances
  cleanupAll(): void {
    this.instances.forEach((animation) => {
      if (animation?.pause) animation.pause();
    });
    this.instances.clear();
  }
}

export const animationManager = new AnimationManager();

// Optimized animation utilities
export const animationUtils = {
  /**
   * Set initial state for element (optimized alternative to anime.set)
   */
  setInitialState: (element: HTMLElement, properties: Record<string, any>): void => {
    animeUtils.set(element, properties);
  },

  /**
   * Create entrance animation with proper cleanup
   */
  createEntranceAnimation: (
    element: HTMLElement,
    options: {
      onComplete?: () => void;
      reduceMotion?: boolean;
    } = {}
  ): any => {
    if (options.reduceMotion) {
      // Skip animation for reduced motion
      animationUtils.setInitialState(element, { opacity: 1, scale: 1, rotate: 0 });
      options.onComplete?.();
      return null;
    }

    // Set initial state
    animationUtils.setInitialState(element, {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    });

    // Create animation
    const animationParams: any = {
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [-10, 0],
      ...ANIMATION_CONFIGS.entrance,
    };

    if (options.onComplete) {
      animationParams.onComplete = options.onComplete;
    }

    const animation = animate(element, animationParams);

    animationManager.setInstance(`entrance-${element.id || 'default'}`, animation);
    return animation;
  },

  /**
   * Create enhanced hover animations with sophisticated effects
   */
  createHoverAnimations: (
    logoElement: HTMLElement,
    containerElement?: HTMLElement
  ): {
    scale: any;
    glow?: any;
    rotation: any;
    shimmer?: any;
    microBounce?: any;
    colorGlow?: any;
  } => {
    const animations = {
      // Enhanced scale with micro-bounce
      scale: animate(logoElement, {
        scale: [1, 1.08],
        ...ANIMATION_CONFIGS.hover.scale,
        autoplay: false,
      }),
      // Enhanced rotation with back easing
      rotation: animate(logoElement, {
        rotate: [0, 3],
        ...ANIMATION_CONFIGS.hover.rotation,
        autoplay: false,
      }),
      // New: Micro-bounce effect for interactive feedback
      microBounce: animate(logoElement, {
        translateY: [0, -4, 0],
        ...ANIMATION_CONFIGS.hover.microBounce,
        autoplay: false,
      }),
    };

    // Enhanced glow animation with color transitions if container is provided
    if (containerElement) {
      (animations as any).glow = animate(containerElement, {
        boxShadow: [
          '0 10px 30px rgba(59, 130, 246, 0.15)',
          '0 25px 70px rgba(59, 130, 246, 0.35)',
        ],
        ...ANIMATION_CONFIGS.hover.glow,
        autoplay: false,
      });

      // New: Color-changing glow effect
      (animations as any).colorGlow = animate(containerElement, {
        filter: [
          'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
          'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))',
        ],
        ...ANIMATION_CONFIGS.hover.colorGlow,
        autoplay: false,
      });

      // New: Shimmer effect using CSS custom properties
      (animations as any).shimmer = animate(containerElement, {
        '--shimmer-position': ['0%', '100%'],
        ...ANIMATION_CONFIGS.hover.shimmer,
        autoplay: false,
      });
    }

    // Store animations for cleanup
    const baseKey = `hover-${logoElement.id || 'default'}`;
    animationManager.setInstance(`${baseKey}-scale`, animations.scale);
    animationManager.setInstance(`${baseKey}-rotation`, animations.rotation);
    animationManager.setInstance(`${baseKey}-microBounce`, animations.microBounce);
    if ((animations as any).glow) {
      animationManager.setInstance(`${baseKey}-glow`, (animations as any).glow);
    }
    if ((animations as any).colorGlow) {
      animationManager.setInstance(`${baseKey}-colorGlow`, (animations as any).colorGlow);
    }
    if ((animations as any).shimmer) {
      animationManager.setInstance(`${baseKey}-shimmer`, (animations as any).shimmer);
    }

    return animations;
  },

  /**
   * Create drag snap-back animation
   */
  createSnapBackAnimation: (
    element: HTMLElement,
    destination: { x: number; y: number },
    options: {
      onComplete?: () => void;
      scale?: number;
    } = {}
  ): any => {
    const animationParams: any = {
      translateX: destination.x,
      translateY: destination.y,
      scale: options.scale || 1,
      ...ANIMATION_CONFIGS.drag.snapBack,
    };

    if (options.onComplete) {
      animationParams.onComplete = options.onComplete;
    }

    const animation = animate(element, animationParams);

    animationManager.setInstance(`snapback-${element.id || 'default'}`, animation);
    return animation;
  },

  /**
   * Create lightweight hover/touch feedback
   */
  createFeedbackAnimation: (
    element: HTMLElement,
    scale: number,
    type: 'hover' | 'touch' = 'hover'
  ): any => {
    const config = type === 'touch' ? ANIMATION_CONFIGS.drag.touch : ANIMATION_CONFIGS.hover.scale;

    return animate(element, {
      scale,
      ...config,
    });
  },

  /**
   * Play hover animations with error handling
   */
  playHoverAnimations: (animations: { scale?: any; glow?: any; rotation?: any }): void => {
    Object.values(animations).forEach((animation) => {
      if (animation?.play) {
        try {
          animation.play();
        } catch (error) {
          console.warn('Animation play failed:', error);
        }
      }
    });
  },

  /**
   * Reverse hover animations with error handling
   */
  reverseHoverAnimations: (animations: { scale?: any; glow?: any; rotation?: any }): void => {
    Object.values(animations).forEach((animation) => {
      if (animation?.reverse) {
        try {
          animation.reverse();
        } catch (error) {
          console.warn('Animation reverse failed:', error);
        }
      }
    });
  },

  /**
   * Create celebration animation for click/tap interaction
   */
  createCelebrationAnimation: (
    element: HTMLElement,
    options: {
      onComplete?: () => void;
      intensity?: 'subtle' | 'medium' | 'strong';
    } = {}
  ): any => {
    const intensity = options.intensity || 'medium';

    // Scale values based on intensity
    const scaleValues = {
      subtle: { from: 1, to: 1.12, back: 1.02 },
      medium: { from: 1, to: 1.18, back: 1.05 },
      strong: { from: 1, to: 1.25, back: 1.08 }
    };

    const rotateValues = {
      subtle: [-2, 2, 0],
      medium: [-4, 4, 0],
      strong: [-6, 6, 0]
    };

    const scale = scaleValues[intensity];
    const rotate = rotateValues[intensity];

    const animationParams: any = {
      scale: [scale.from, scale.to, scale.back, 1],
      rotate: rotate,
      filter: [
        'brightness(1) saturate(1)',
        'brightness(1.1) saturate(1.2)',
        'brightness(1.05) saturate(1.1)',
        'brightness(1) saturate(1)'
      ],
      ...ANIMATION_CONFIGS.drag.celebration,
      direction: 'normal',
    };

    if (options.onComplete) {
      animationParams.onComplete = options.onComplete;
    }

    const animation = animate(element, animationParams);
    animationManager.setInstance(`celebration-${element.id || 'default'}`, animation);
    return animation;
  },

  /**
   * Create focus state animation for accessibility
   */
  createFocusAnimation: (
    element: HTMLElement,
    containerElement?: HTMLElement
  ): { focus: any; glow?: any } => {
    const animations = {
      focus: animate(element, {
        scale: [1, 1.03],
        ...ANIMATION_CONFIGS.interaction.focus,
        autoplay: false,
      }),
    };

    if (containerElement) {
      (animations as any).glow = animate(containerElement, {
        boxShadow: [
          '0 0 0 0 rgba(59, 130, 246, 0)',
          '0 0 0 3px rgba(59, 130, 246, 0.3)',
        ],
        ...ANIMATION_CONFIGS.interaction.focus,
        autoplay: false,
      });
    }

    const baseKey = `focus-${element.id || 'default'}`;
    animationManager.setInstance(`${baseKey}-scale`, animations.focus);
    if ((animations as any).glow) {
      animationManager.setInstance(`${baseKey}-glow`, (animations as any).glow);
    }

    return animations;
  },

  /**
   * Create entrance animation with enhanced stagger effects
   */
  createStaggeredEntranceAnimation: (
    elements: HTMLElement[],
    options: {
      onComplete?: () => void;
      reduceMotion?: boolean;
      direction?: 'up' | 'down' | 'left' | 'right';
    } = {}
  ): any[] => {
    if (options.reduceMotion || elements.length === 0) {
      elements.forEach(el => {
        animationUtils.setInitialState(el, { opacity: 1, scale: 1, rotate: 0 });
      });
      options.onComplete?.();
      return [];
    }

    const direction = options.direction || 'up';
    const translateProperty = direction === 'up' || direction === 'down' ? 'translateY' : 'translateX';
    const translateValue = direction === 'up' || direction === 'left' ? 30 : -30;

    const animations = elements.map((element, index) => {
      // Set initial state
      animationUtils.setInitialState(element, {
        opacity: 0,
        scale: 0.95,
        [translateProperty]: translateValue,
      });

      // Create staggered animation
      const animationParams: any = {
        opacity: [0, 1],
        scale: [0.95, 1],
        [translateProperty]: [translateValue, 0],
        ...ANIMATION_CONFIGS.entrance.stagger,
        delay: ANIMATION_CONFIGS.entrance.stagger.staggerDelay * index,
      };

      if (index === elements.length - 1 && options.onComplete) {
        animationParams.onComplete = options.onComplete;
      }

      const animation = animate(element, animationParams);
      animationManager.setInstance(`stagger-${element.id || index}`, animation);
      return animation;
    });

    return animations;
  },

  /**
   * Advanced performance-optimized hover with frame throttling
   */
  createThrottledHoverAnimation: (
    element: HTMLElement,
    scale: number,
    options: {
      throttleMs?: number;
      onStart?: () => void;
      onComplete?: () => void;
    } = {}
  ): any => {
    let isThrottled = false;
    const throttleMs = options.throttleMs || 16; // ~60fps

    return {
      play: () => {
        if (isThrottled) return;
        isThrottled = true;

        options.onStart?.();

        const animation = animate(element, {
          scale: [element.style.transform.includes('scale')
            ? parseFloat(element.style.transform.match(/scale\(([^)]+)\)/)?.[1] || '1')
            : 1, scale],
          ...ANIMATION_CONFIGS.hover.scale,
          onComplete: () => {
            options.onComplete?.();
            setTimeout(() => { isThrottled = false; }, throttleMs);
          }
        });

        return animation;
      }
    };
  },

  /**
   * Cleanup animations for component unmount (enhanced)
   */
  cleanup: (elementId?: string): void => {
    if (elementId) {
      animationManager.cleanup(`entrance-${elementId}`);
      animationManager.cleanup(`hover-${elementId}-scale`);
      animationManager.cleanup(`hover-${elementId}-glow`);
      animationManager.cleanup(`hover-${elementId}-rotation`);
      animationManager.cleanup(`hover-${elementId}-microBounce`);
      animationManager.cleanup(`hover-${elementId}-colorGlow`);
      animationManager.cleanup(`hover-${elementId}-shimmer`);
      animationManager.cleanup(`snapback-${elementId}`);
      animationManager.cleanup(`celebration-${elementId}`);
      animationManager.cleanup(`focus-${elementId}-scale`);
      animationManager.cleanup(`focus-${elementId}-glow`);
      animationManager.cleanup(`stagger-${elementId}`);
    } else {
      animationManager.cleanupAll();
    }
  },
};

// Enhanced performance monitoring utilities
export const animationPerformance = {
  // Track animation memory usage
  getActiveAnimationsCount: (): number => {
    return animationManager['instances'].size;
  },

  // Monitor frame rate during animations
  startFrameRateMonitor: (): (() => number) => {
    let frames = 0;
    let lastTime = performance.now();

    const tick = () => {
      frames++;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      const currentTime = performance.now();
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      frames = 0;
      lastTime = currentTime;
      return fps;
    };
  },

  // Performance-aware animation throttling
  createAdaptiveThrottle: (targetFps: number = 60): {
    shouldThrottle: () => boolean;
    getRecommendedDelay: () => number;
  } => {
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let avgFrameTime = 16.67; // Start with 60fps baseline

    return {
      shouldThrottle: (): boolean => {
        const currentTime = performance.now();
        const frameTime = currentTime - lastFrameTime;

        // Update running average
        frameCount++;
        avgFrameTime = (avgFrameTime * (frameCount - 1) + frameTime) / frameCount;

        lastFrameTime = currentTime;

        // Throttle if we're below target fps
        const currentFps = 1000 / avgFrameTime;
        return currentFps < targetFps * 0.8; // 80% threshold
      },

      getRecommendedDelay: (): number => {
        const targetFrameTime = 1000 / targetFps;
        return Math.max(0, avgFrameTime - targetFrameTime);
      }
    };
  },

  // Memory-aware animation optimization
  optimizeForDevice: (): {
    reducedMotion: boolean;
    maxConcurrentAnimations: number;
    useGPUAcceleration: boolean;
  } => {
    // Detect device capabilities
    const isLowEndDevice = (() => {
      // Check for hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 4;

      // Check memory (if available)
      const memory = (navigator as any).deviceMemory || 8;

      // Check for high-density displays (can impact performance)
      const pixelRatio = window.devicePixelRatio || 1;

      return cores <= 2 || memory <= 4 || pixelRatio >= 3;
    })();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      reducedMotion: prefersReducedMotion,
      maxConcurrentAnimations: isLowEndDevice ? 3 : 8,
      useGPUAcceleration: !isLowEndDevice,
    };
  },

  // Track performance metrics
  trackAnimationPerformance: (animationName: string, duration: number): void => {
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark(`animation-${animationName}-start`);

      setTimeout(() => {
        performance.mark(`animation-${animationName}-end`);
        performance.measure(
          `animation-${animationName}`,
          `animation-${animationName}-start`,
          `animation-${animationName}-end`
        );
      }, duration);
    }
  },
};

// Accessibility-aware animation helpers
export const accessibleAnimations = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    return typeof window !== 'undefined' &&
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Create animation with reduced motion fallback
   */
  createAccessibleAnimation: (
    element: HTMLElement,
    properties: Record<string, any>,
    options: any = {}
  ): any => {
    if (accessibleAnimations.prefersReducedMotion()) {
      // Apply final state immediately
      animeUtils.set(element, properties);
      options.onComplete?.();
      return null;
    }

    return animate(element, {
      ...properties,
      ...options,
    });
  },
};