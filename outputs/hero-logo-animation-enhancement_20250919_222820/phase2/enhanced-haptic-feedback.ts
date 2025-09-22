/**
 * Enhanced Haptic Feedback System
 * Sophisticated haptic patterns for enhanced user experience
 */

export interface HapticPattern {
  pattern: number[];
  intensity?: number;
  description: string;
}

export interface HapticConfig {
  enabled: boolean;
  intensity: number; // 0.0 to 1.0
  respectReducedMotion: boolean;
  adaptToDevice: boolean;
}

export interface DeviceCapabilities {
  supportsVibration: boolean;
  supportsWebkitVibration: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  supportsGamepad: boolean;
}

export class EnhancedHapticFeedback {
  private config: HapticConfig;
  private capabilities: DeviceCapabilities;
  private lastHapticTime: number = 0;
  private hapticThrottleMs: number = 50; // Prevent haptic spam

  // Predefined haptic patterns
  private patterns: Record<string, HapticPattern> = {
    // Basic interactions
    light: {
      pattern: [10],
      intensity: 0.3,
      description: 'Light tap for hover, focus, or gentle feedback'
    },
    medium: {
      pattern: [25],
      intensity: 0.6,
      description: 'Medium pulse for button press or drag start'
    },
    heavy: {
      pattern: [40],
      intensity: 0.9,
      description: 'Strong feedback for important actions'
    },

    // Drag interactions
    dragStart: {
      pattern: [15, 10, 20],
      intensity: 0.5,
      description: 'Drag initiation with anticipation'
    },
    dragEnd: {
      pattern: [30, 15, 15],
      intensity: 0.7,
      description: 'Drag completion with satisfaction'
    },
    dragBounce: {
      pattern: [25, 5, 15, 5, 10],
      intensity: 0.8,
      description: 'Elastic boundary collision'
    },

    // Energy-based interactions
    lowEnergy: {
      pattern: [8, 5, 8],
      intensity: 0.3,
      description: 'Gentle movement or low-energy state'
    },
    mediumEnergy: {
      pattern: [20, 10, 15],
      intensity: 0.6,
      description: 'Moderate energy movement'
    },
    highEnergy: {
      pattern: [35, 15, 25, 10, 20],
      intensity: 0.9,
      description: 'High-energy movement or celebration'
    },

    // Gesture patterns
    pinchStart: {
      pattern: [12, 8, 12],
      intensity: 0.4,
      description: 'Pinch gesture initiation'
    },
    pinchEnd: {
      pattern: [20, 10, 15],
      intensity: 0.6,
      description: 'Pinch gesture completion'
    },
    rotation: {
      pattern: [15, 5, 10, 5, 15],
      intensity: 0.5,
      description: 'Rotational movement feedback'
    },

    // Celebration and success
    celebration: {
      pattern: [50, 20, 30, 15, 40, 10, 25],
      intensity: 1.0,
      description: 'Success celebration with flourish'
    },
    achievement: {
      pattern: [60, 30, 40, 20, 50],
      intensity: 0.9,
      description: 'Achievement unlocked feeling'
    },

    // Error and warning
    error: {
      pattern: [30, 15, 30],
      intensity: 0.8,
      description: 'Error or invalid action'
    },
    warning: {
      pattern: [15, 10, 15, 10, 15],
      intensity: 0.6,
      description: 'Warning or caution'
    },

    // Context-specific patterns
    keyboardNav: {
      pattern: [8],
      intensity: 0.2,
      description: 'Subtle feedback for keyboard navigation'
    },
    boundaryWarning: {
      pattern: [20, 10, 15, 10, 20],
      intensity: 0.7,
      description: 'Approaching boundary limits'
    },
    snapToCenter: {
      pattern: [25, 15, 35],
      intensity: 0.8,
      description: 'Snapping back to center position'
    }
  };

  constructor(config: Partial<HapticConfig> = {}) {
    this.config = {
      enabled: true,
      intensity: 1.0,
      respectReducedMotion: true,
      adaptToDevice: true,
      ...config
    };

    this.capabilities = this.detectDeviceCapabilities();
    this.adaptToDevice();
  }

  /**
   * Detect device haptic capabilities
   */
  private detectDeviceCapabilities(): DeviceCapabilities {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = isIOS || isAndroid || /mobile/.test(userAgent);

    return {
      supportsVibration: 'vibrate' in navigator,
      supportsWebkitVibration: 'webkitVibrate' in navigator,
      isIOS,
      isAndroid,
      isMobile,
      supportsGamepad: 'getGamepads' in navigator
    };
  }

  /**
   * Adapt haptic settings to device capabilities
   */
  private adaptToDevice(): void {
    if (!this.config.adaptToDevice) return;

    // iOS devices generally have better haptic engines
    if (this.capabilities.isIOS) {
      this.hapticThrottleMs = 30; // More responsive on iOS
    }

    // Android devices vary widely in haptic quality
    if (this.capabilities.isAndroid) {
      this.hapticThrottleMs = 80; // More conservative on Android
      // Reduce intensity for Android devices
      Object.keys(this.patterns).forEach(key => {
        this.patterns[key].intensity = Math.max(0.1, this.patterns[key].intensity * 0.8);
      });
    }

    // Desktop devices might not have haptics
    if (!this.capabilities.isMobile) {
      this.config.enabled = false;
    }
  }

  /**
   * Check if haptics should be enabled
   */
  private shouldProvideHaptic(): boolean {
    if (!this.config.enabled) return false;
    if (!this.isSupported()) return false;

    // Respect reduced motion preference
    if (this.config.respectReducedMotion) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return false;
    }

    // Throttle haptic feedback
    const now = performance.now();
    if (now - this.lastHapticTime < this.hapticThrottleMs) return false;

    return true;
  }

  /**
   * Execute haptic pattern
   */
  private executePattern(pattern: number[], intensity: number): void {
    if (!this.shouldProvideHaptic()) return;

    const adjustedPattern = pattern.map(duration =>
      Math.round(duration * intensity * this.config.intensity)
    );

    try {
      if (navigator.vibrate) {
        navigator.vibrate(adjustedPattern);
      } else if ((navigator as any).webkitVibrate) {
        (navigator as any).webkitVibrate(adjustedPattern);
      }
      this.lastHapticTime = performance.now();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  /**
   * Public haptic methods
   */

  light(): void {
    this.executePattern(this.patterns.light.pattern, this.patterns.light.intensity!);
  }

  medium(): void {
    this.executePattern(this.patterns.medium.pattern, this.patterns.medium.intensity!);
  }

  heavy(): void {
    this.executePattern(this.patterns.heavy.pattern, this.patterns.heavy.intensity!);
  }

  /**
   * Contextual haptic feedback based on interaction type
   */
  dragStart(): void {
    this.executePattern(this.patterns.dragStart.pattern, this.patterns.dragStart.intensity!);
  }

  dragEnd(): void {
    this.executePattern(this.patterns.dragEnd.pattern, this.patterns.dragEnd.intensity!);
  }

  dragBounce(): void {
    this.executePattern(this.patterns.dragBounce.pattern, this.patterns.dragBounce.intensity!);
  }

  /**
   * Energy-based haptic feedback
   */
  energyFeedback(energy: number): void {
    if (energy < 0.3) {
      this.executePattern(this.patterns.lowEnergy.pattern, this.patterns.lowEnergy.intensity!);
    } else if (energy < 0.7) {
      this.executePattern(this.patterns.mediumEnergy.pattern, this.patterns.mediumEnergy.intensity!);
    } else {
      this.executePattern(this.patterns.highEnergy.pattern, this.patterns.highEnergy.intensity!);
    }
  }

  /**
   * Gesture-specific haptic feedback
   */
  pinchStart(): void {
    this.executePattern(this.patterns.pinchStart.pattern, this.patterns.pinchStart.intensity!);
  }

  pinchEnd(): void {
    this.executePattern(this.patterns.pinchEnd.pattern, this.patterns.pinchEnd.intensity!);
  }

  rotation(): void {
    this.executePattern(this.patterns.rotation.pattern, this.patterns.rotation.intensity!);
  }

  /**
   * Celebration haptics
   */
  celebration(): void {
    this.executePattern(this.patterns.celebration.pattern, this.patterns.celebration.intensity!);
  }

  achievement(): void {
    this.executePattern(this.patterns.achievement.pattern, this.patterns.achievement.intensity!);
  }

  /**
   * Error and warning haptics
   */
  error(): void {
    this.executePattern(this.patterns.error.pattern, this.patterns.error.intensity!);
  }

  warning(): void {
    this.executePattern(this.patterns.warning.pattern, this.patterns.warning.intensity!);
  }

  /**
   * Context-specific haptics
   */
  keyboardNav(): void {
    this.executePattern(this.patterns.keyboardNav.pattern, this.patterns.keyboardNav.intensity!);
  }

  boundaryWarning(): void {
    this.executePattern(this.patterns.boundaryWarning.pattern, this.patterns.boundaryWarning.intensity!);
  }

  snapToCenter(): void {
    this.executePattern(this.patterns.snapToCenter.pattern, this.patterns.snapToCenter.intensity!);
  }

  /**
   * Custom haptic pattern
   */
  custom(pattern: number[], intensity: number = 0.5): void {
    this.executePattern(pattern, intensity);
  }

  /**
   * Advanced haptic feedback based on physics state
   */
  physicsBasedFeedback(
    velocity: { x: number; y: number },
    energy: number,
    collisionType?: 'boundary' | 'elastic' | 'none'
  ): void {
    if (!this.shouldProvideHaptic()) return;

    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

    if (collisionType === 'boundary') {
      this.dragBounce();
    } else if (collisionType === 'elastic') {
      this.dragBounce();
    } else if (energy > 0.8) {
      this.energyFeedback(energy);
    } else if (speed > 500) {
      this.medium();
    } else if (speed > 100) {
      this.light();
    }
  }

  /**
   * Hover feedback with adaptive intensity
   */
  hoverFeedback(intensity: number = 0.3): void {
    if (!this.shouldProvideHaptic()) return;

    const adaptedIntensity = Math.max(0.1, Math.min(1.0, intensity * this.config.intensity));
    this.executePattern([Math.round(10 * adaptedIntensity)], adaptedIntensity);
  }

  /**
   * Focus feedback for accessibility
   */
  focusFeedback(): void {
    this.keyboardNav();
  }

  /**
   * Utility methods
   */
  isSupported(): boolean {
    return this.capabilities.supportsVibration || this.capabilities.supportsWebkitVibration;
  }

  getCapabilities(): DeviceCapabilities {
    return { ...this.capabilities };
  }

  updateConfig(newConfig: Partial<HapticConfig>): void {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.adaptToDevice !== undefined) {
      this.adaptToDevice();
    }
  }

  /**
   * Get available patterns for debugging
   */
  getAvailablePatterns(): Record<string, HapticPattern> {
    return { ...this.patterns };
  }

  /**
   * Test haptic pattern (development only)
   */
  testPattern(patternName: string): void {
    if (process.env.NODE_ENV === 'development') {
      const pattern = this.patterns[patternName];
      if (pattern) {
        console.log(`Testing haptic pattern: ${patternName} - ${pattern.description}`);
        this.executePattern(pattern.pattern, pattern.intensity!);
      } else {
        console.warn(`Haptic pattern '${patternName}' not found`);
      }
    }
  }

  /**
   * Disable haptics (useful for accessibility preferences)
   */
  disable(): void {
    this.config.enabled = false;
  }

  /**
   * Enable haptics
   */
  enable(): void {
    this.config.enabled = true;
  }
}

// Singleton instance for global use
export const hapticFeedback = new EnhancedHapticFeedback();

export default EnhancedHapticFeedback;