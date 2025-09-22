/**
 * Enhanced Hover System
 * Sophisticated hover states with meaningful feedback and micro-interactions
 */

import { animate } from 'animejs';

export interface HoverConfig {
  enableMicroAnimations: boolean;
  enableParticleEffects: boolean;
  enableGlowEffects: boolean;
  enableMagneticEffect: boolean;
  enableSoundEffects: boolean;
  responsiveIntensity: boolean;
  respectReducedMotion: boolean;
}

export interface HoverState {
  isHovered: boolean;
  intensity: number; // 0.0 to 1.0
  position: { x: number; y: number };
  mousePosition: { x: number; y: number };
  hoverDuration: number;
  lastInteraction: number;
}

export interface HoverEffect {
  id: string;
  element: HTMLElement;
  animation: any;
  cleanup: () => void;
}

export class EnhancedHoverSystem {
  private config: HoverConfig;
  private state: HoverState;
  private activeEffects: Map<string, HoverEffect> = new Map();
  private hoverStartTime: number = 0;
  private animationFrame: number | null = null;
  private magneticRadius: number = 100;

  // Animation presets
  private animationPresets = {
    gentle: {
      scale: { min: 1.02, max: 1.05 },
      rotation: { min: -1, max: 1 },
      duration: 400,
      easing: 'easeOutQuart'
    },
    moderate: {
      scale: { min: 1.05, max: 1.08 },
      rotation: { min: -2, max: 2 },
      duration: 350,
      easing: 'easeOutBack(1.2)'
    },
    energetic: {
      scale: { min: 1.08, max: 1.12 },
      rotation: { min: -3, max: 3 },
      duration: 300,
      easing: 'easeOutElastic(1, 0.8)'
    }
  };

  constructor(config: Partial<HoverConfig> = {}) {
    this.config = {
      enableMicroAnimations: true,
      enableParticleEffects: false, // Can be resource intensive
      enableGlowEffects: true,
      enableMagneticEffect: true,
      enableSoundEffects: false,
      responsiveIntensity: true,
      respectReducedMotion: true,
      ...config
    };

    this.state = {
      isHovered: false,
      intensity: 0,
      position: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
      hoverDuration: 0,
      lastInteraction: 0
    };

    this.adaptToUserPreferences();
  }

  /**
   * Adapt to user accessibility preferences
   */
  private adaptToUserPreferences(): void {
    if (this.config.respectReducedMotion) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        this.config.enableMicroAnimations = false;
        this.config.enableParticleEffects = false;
        this.config.enableGlowEffects = false;
      }
    }
  }

  /**
   * Start hover interaction
   */
  startHover(
    element: HTMLElement,
    mouseEvent: MouseEvent,
    intensity: number = 1.0
  ): void {
    const now = performance.now();
    this.hoverStartTime = now;

    const rect = element.getBoundingClientRect();
    const position = {
      x: mouseEvent.clientX - rect.left - rect.width / 2,
      y: mouseEvent.clientY - rect.top - rect.height / 2
    };

    this.state = {
      isHovered: true,
      intensity,
      position,
      mousePosition: { x: mouseEvent.clientX, y: mouseEvent.clientY },
      hoverDuration: 0,
      lastInteraction: now
    };

    this.applyHoverEffects(element);
    this.startHoverTracking();
  }

  /**
   * Update hover state during mouse movement
   */
  updateHover(
    element: HTMLElement,
    mouseEvent: MouseEvent,
    intensity?: number
  ): void {
    if (!this.state.isHovered) return;

    const rect = element.getBoundingClientRect();
    const position = {
      x: mouseEvent.clientX - rect.left - rect.width / 2,
      y: mouseEvent.clientY - rect.top - rect.height / 2
    };

    this.state.position = position;
    this.state.mousePosition = { x: mouseEvent.clientX, y: mouseEvent.clientY };
    this.state.lastInteraction = performance.now();

    if (intensity !== undefined) {
      this.state.intensity = intensity;
    }

    this.updateMagneticEffect(element);
    this.updateGlowEffect(element);
  }

  /**
   * End hover interaction
   */
  endHover(element: HTMLElement): void {
    this.state.isHovered = false;
    this.state.hoverDuration = performance.now() - this.hoverStartTime;

    this.removeHoverEffects();
    this.stopHoverTracking();
    this.resetElementState(element);
  }

  /**
   * Apply sophisticated hover effects
   */
  private applyHoverEffects(element: HTMLElement): void {
    const intensity = this.state.intensity;
    const preset = this.getAnimationPreset(intensity);

    // Micro-animation: Scale and subtle rotation
    if (this.config.enableMicroAnimations) {
      this.createMicroAnimation(element, preset);
    }

    // Glow effect
    if (this.config.enableGlowEffects) {
      this.createGlowEffect(element, intensity);
    }

    // Magnetic effect
    if (this.config.enableMagneticEffect) {
      this.createMagneticEffect(element);
    }

    // Particle effects (optional, for high-end devices)
    if (this.config.enableParticleEffects) {
      this.createParticleEffect(element);
    }
  }

  /**
   * Create micro-animation with physics-aware easing
   */
  private createMicroAnimation(element: HTMLElement, preset: any): void {
    const scaleValue = preset.scale.min + (preset.scale.max - preset.scale.min) * this.state.intensity;
    const rotationValue = preset.rotation.min + (preset.rotation.max - preset.rotation.min) * Math.random();

    const animation = animate(element, {
      scale: scaleValue,
      rotate: `${rotationValue}deg`,
      duration: preset.duration,
      easing: preset.easing,
      direction: 'normal'
    });

    this.activeEffects.set('microAnimation', {
      id: 'microAnimation',
      element,
      animation,
      cleanup: () => animation.pause()
    });
  }

  /**
   * Create dynamic glow effect
   */
  private createGlowEffect(element: HTMLElement, intensity: number): void {
    const glowIntensity = Math.min(20, intensity * 15);
    const glowColor = this.getGlowColor(intensity);

    const glowAnimation = animate(element, {
      boxShadow: [
        element.style.boxShadow || 'none',
        `0 0 ${glowIntensity}px ${glowColor}`,
        `0 0 ${glowIntensity * 1.5}px ${glowColor}`
      ],
      duration: 600,
      easing: 'easeOutQuad',
      loop: true,
      direction: 'alternate'
    });

    this.activeEffects.set('glow', {
      id: 'glow',
      element,
      animation: glowAnimation,
      cleanup: () => {
        glowAnimation.pause();
        element.style.boxShadow = '';
      }
    });
  }

  /**
   * Create magnetic effect that subtly follows cursor
   */
  private createMagneticEffect(element: HTMLElement): void {
    if (!this.animationFrame) {
      const updateMagnetic = () => {
        if (!this.state.isHovered) return;

        const magneticStrength = 0.1 * this.state.intensity;
        const targetX = this.state.position.x * magneticStrength;
        const targetY = this.state.position.y * magneticStrength;

        // Smooth transition to magnetic position
        const currentTransform = element.style.transform || '';
        const newTransform = `${currentTransform} translate(${targetX}px, ${targetY}px)`;

        element.style.transform = newTransform;

        this.animationFrame = requestAnimationFrame(updateMagnetic);
      };

      this.animationFrame = requestAnimationFrame(updateMagnetic);
    }
  }

  /**
   * Update magnetic effect during hover
   */
  private updateMagneticEffect(element: HTMLElement): void {
    // Magnetic effect is handled in the RAF loop
    // This method could be used for additional magnetic logic
  }

  /**
   * Update glow effect intensity based on hover state
   */
  private updateGlowEffect(element: HTMLElement): void {
    const glowEffect = this.activeEffects.get('glow');
    if (glowEffect && this.config.responsiveIntensity) {
      const newGlowIntensity = Math.min(20, this.state.intensity * 15);
      const glowColor = this.getGlowColor(this.state.intensity);

      // Update glow dynamically (simplified approach)
      element.style.filter = `drop-shadow(0 0 ${newGlowIntensity}px ${glowColor})`;
    }
  }

  /**
   * Create particle effect for enhanced visual feedback
   */
  private createParticleEffect(element: HTMLElement): void {
    // This would create small animated particles around the element
    // Implementation would depend on specific design requirements
    const particleContainer = document.createElement('div');
    particleContainer.className = 'hover-particles';
    particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
    `;

    element.appendChild(particleContainer);

    // Create multiple particle elements
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(59, 130, 246, 0.6);
        border-radius: 50%;
        top: 50%;
        left: 50%;
      `;

      const angle = (i / 6) * Math.PI * 2;
      const distance = 20 + Math.random() * 10;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const particleAnimation = animate(particle, {
        translateX: x,
        translateY: y,
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
        duration: 1000 + Math.random() * 500,
        easing: 'easeOutQuart',
        loop: true
      });

      particleContainer.appendChild(particle);
    }

    this.activeEffects.set('particles', {
      id: 'particles',
      element,
      animation: null,
      cleanup: () => {
        if (particleContainer.parentNode) {
          particleContainer.parentNode.removeChild(particleContainer);
        }
      }
    });
  }

  /**
   * Get animation preset based on intensity
   */
  private getAnimationPreset(intensity: number): any {
    if (intensity < 0.4) return this.animationPresets.gentle;
    if (intensity < 0.8) return this.animationPresets.moderate;
    return this.animationPresets.energetic;
  }

  /**
   * Get glow color based on intensity
   */
  private getGlowColor(intensity: number): string {
    if (intensity < 0.3) return 'rgba(59, 130, 246, 0.3)'; // Light blue
    if (intensity < 0.7) return 'rgba(147, 51, 234, 0.4)'; // Purple
    return 'rgba(245, 158, 11, 0.5)'; // Gold for high intensity
  }

  /**
   * Start hover duration tracking
   */
  private startHoverTracking(): void {
    const trackDuration = () => {
      if (this.state.isHovered) {
        this.state.hoverDuration = performance.now() - this.hoverStartTime;
        setTimeout(trackDuration, 100);
      }
    };
    trackDuration();
  }

  /**
   * Stop hover tracking
   */
  private stopHoverTracking(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Remove all hover effects
   */
  private removeHoverEffects(): void {
    this.activeEffects.forEach(effect => {
      effect.cleanup();
    });
    this.activeEffects.clear();
  }

  /**
   * Reset element to original state
   */
  private resetElementState(element: HTMLElement): void {
    const resetAnimation = animate(element, {
      scale: 1,
      rotate: '0deg',
      translateX: 0,
      translateY: 0,
      boxShadow: 'none',
      filter: 'none',
      duration: 300,
      easing: 'easeOutQuart'
    });

    // Clean up after reset
    setTimeout(() => {
      element.style.transform = '';
      element.style.boxShadow = '';
      element.style.filter = '';
    }, 300);
  }

  /**
   * Create hover effect for specific interaction types
   */
  createContextualHover(
    element: HTMLElement,
    mouseEvent: MouseEvent,
    context: 'drag' | 'click' | 'navigation' | 'disabled'
  ): void {
    let intensity = 1.0;
    let customConfig = { ...this.config };

    switch (context) {
      case 'drag':
        intensity = 0.8;
        customConfig.enableMagneticEffect = true;
        customConfig.enableGlowEffects = true;
        break;
      case 'click':
        intensity = 0.6;
        customConfig.enableMicroAnimations = true;
        break;
      case 'navigation':
        intensity = 0.4;
        customConfig.enableGlowEffects = false;
        customConfig.enableParticleEffects = false;
        break;
      case 'disabled':
        intensity = 0.2;
        customConfig.enableMicroAnimations = false;
        customConfig.enableGlowEffects = false;
        customConfig.enableMagneticEffect = false;
        break;
    }

    const previousConfig = this.config;
    this.config = customConfig;
    this.startHover(element, mouseEvent, intensity);
    this.config = previousConfig;
  }

  /**
   * Get current hover state
   */
  getState(): HoverState {
    return { ...this.state };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<HoverConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.adaptToUserPreferences();
  }

  /**
   * Force cleanup all effects
   */
  cleanup(): void {
    this.removeHoverEffects();
    this.stopHoverTracking();
  }

  /**
   * Check if device supports advanced hover effects
   */
  static supportsAdvancedEffects(): boolean {
    const isHighPerformanceDevice = navigator.hardwareConcurrency >= 4;
    const hasModernBrowser = 'animate' in document.documentElement;
    const hasGoodRAM = (navigator as any).deviceMemory >= 4 || true; // Default to true if unknown

    return isHighPerformanceDevice && hasModernBrowser && hasGoodRAM;
  }
}

export default EnhancedHoverSystem;