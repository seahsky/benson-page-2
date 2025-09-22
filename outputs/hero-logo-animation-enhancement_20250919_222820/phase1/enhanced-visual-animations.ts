/**
 * Enhanced Visual Animation System for Hero Logo
 * Specialist A - Visual Enhancement Expert
 * Brand-aligned, performance-optimized visual effects
 */

import { animate, utils as animeUtils } from 'animejs';

// Brand-aligned color system
export const BRAND_COLORS = {
  primary: {
    base: 'hsl(271, 81%, 29%)',
    light: 'hsl(271, 81%, 35%)',
    dark: 'hsl(271, 81%, 25%)',
    rgba: 'rgba(95, 46, 187, 0.8)',
    rgbaLight: 'rgba(95, 46, 187, 0.4)',
  },
  secondary: {
    base: 'hsl(53, 100%, 65%)',
    light: 'hsl(53, 100%, 70%)',
    dark: 'hsl(53, 100%, 60%)',
    rgba: 'rgba(255, 231, 76, 0.8)',
    rgbaLight: 'rgba(255, 231, 76, 0.4)',
  },
  accent: {
    base: 'hsl(220, 73%, 61%)',
    light: 'hsl(220, 73%, 65%)',
    rgba: 'rgba(74, 144, 226, 0.6)',
  },
  neutral: {
    white: 'hsl(0, 0%, 100%)',
    lightGray: 'hsl(0, 0%, 96%)',
    mediumGray: 'hsl(0, 0%, 45%)',
  }
} as const;

// Brand-aligned gradient definitions
export const BRAND_GRADIENTS = {
  primary: `linear-gradient(135deg, ${BRAND_COLORS.primary.base} 0%, ${BRAND_COLORS.primary.light} 100%)`,
  secondary: `linear-gradient(135deg, ${BRAND_COLORS.secondary.base} 0%, ${BRAND_COLORS.secondary.light} 100%)`,
  energy: `radial-gradient(circle at center, ${BRAND_COLORS.primary.rgba} 0%, ${BRAND_COLORS.accent.rgba} 70%, transparent 100%)`,
  success: `conic-gradient(from 0deg, ${BRAND_COLORS.primary.base}, ${BRAND_COLORS.secondary.base}, ${BRAND_COLORS.primary.base})`,
  professional: `linear-gradient(45deg, ${BRAND_COLORS.primary.base} 0%, ${BRAND_COLORS.primary.light} 50%, ${BRAND_COLORS.secondary.base} 100%)`,
  subtle: `linear-gradient(135deg, ${BRAND_COLORS.primary.rgbaLight} 0%, ${BRAND_COLORS.secondary.rgbaLight} 100%)`
} as const;

// Enhanced animation configurations with professional timing
export const ENHANCED_ANIMATION_CONFIGS = {
  entrance: {
    sophisticated: {
      duration: 1400,
      easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
      delay: 200,
      stagger: 150,
    },
    professional: {
      duration: 1000,
      easing: 'outExpo',
      transformOrigin: 'center center'
    }
  },

  hover: {
    sophisticated: {
      duration: 450,
      easing: 'outBack(1.2)',
      transformOrigin: 'center center'
    },
    microInteraction: {
      duration: 250,
      easing: 'outQuart'
    },
    glow: {
      duration: 600,
      easing: 'inOutQuart'
    }
  },

  energy: {
    build: {
      duration: 300,
      easing: 'outQuart'
    },
    release: {
      duration: 800,
      easing: 'outExpo'
    },
    pulse: {
      duration: 1200,
      easing: 'inOutSine'
    }
  },

  celebration: {
    burst: {
      duration: 1000,
      easing: 'outExpo'
    },
    sparkle: {
      duration: 1500,
      easing: 'outQuint'
    },
    achievement: {
      duration: 2000,
      easing: 'outElastic(1, 0.8)'
    }
  }
} as const;

// Enhanced visual effects class
export class EnhancedVisualEffects {
  private element: HTMLElement;
  private container?: HTMLElement;
  private activeAnimations: Map<string, any> = new Map();
  private particleCanvas?: HTMLCanvasElement;
  private particleContext?: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private rafId?: number;

  constructor(element: HTMLElement, container?: HTMLElement) {
    this.element = element;
    this.container = container;
    this.initializeParticleSystem();
  }

  // Initialize particle system for advanced effects
  private initializeParticleSystem() {
    if (!this.container) return;

    this.particleCanvas = document.createElement('canvas');
    this.particleCanvas.style.position = 'absolute';
    this.particleCanvas.style.top = '0';
    this.particleCanvas.style.left = '0';
    this.particleCanvas.style.pointerEvents = 'none';
    this.particleCanvas.style.zIndex = '2';

    this.particleContext = this.particleCanvas.getContext('2d');
    this.container.appendChild(this.particleCanvas);

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    if (!this.particleCanvas || !this.container) return;

    const rect = this.container.getBoundingClientRect();
    this.particleCanvas.width = rect.width;
    this.particleCanvas.height = rect.height;
  }

  // Enhanced entrance animation with sophisticated stagger
  createSophisticatedEntrance(): any {
    const config = ENHANCED_ANIMATION_CONFIGS.entrance.sophisticated;

    // Set initial state with brand-aware properties
    animeUtils.set(this.element, {
      opacity: 0,
      scale: 0.85,
      rotate: -8,
      filter: 'brightness(0.8) saturate(0.8)'
    });

    const animation = animate(this.element, {
      opacity: [0, 1],
      scale: [0.85, 1.08, 1],
      rotate: [-8, 2, 0],
      filter: [
        'brightness(0.8) saturate(0.8)',
        'brightness(1.1) saturate(1.2)',
        'brightness(1) saturate(1)'
      ],
      ...config,
      complete: () => {
        this.createIdleBreathing();
      }
    });

    this.activeAnimations.set('entrance', animation);
    return animation;
  }

  // Subtle breathing animation for idle state
  createIdleBreathing(): any {
    const animation = animate(this.element, {
      scale: [1, 1.02, 1],
      filter: [
        'brightness(1) saturate(1)',
        'brightness(1.02) saturate(1.05)',
        'brightness(1) saturate(1)'
      ],
      duration: 3000,
      easing: 'inOutSine',
      loop: true,
      direction: 'alternate'
    });

    this.activeAnimations.set('breathing', animation);
    return animation;
  }

  // Enhanced hover effects with brand-aligned multi-layered glow
  createSophisticatedHover(): {
    enter: () => void;
    leave: () => void;
  } {
    return {
      enter: () => {
        // Stop breathing animation
        this.stopAnimation('breathing');

        // Multi-layered hover effect
        const scaleAnimation = animate(this.element, {
          scale: [1, 1.12],
          rotate: [0, 3],
          ...ENHANCED_ANIMATION_CONFIGS.hover.sophisticated,
          autoplay: false
        });

        // Brand-aligned glow system
        if (this.container) {
          const glowAnimation = animate(this.container, {
            boxShadow: [
              '0 10px 30px rgba(95, 46, 187, 0.15)',
              '0 25px 60px rgba(95, 46, 187, 0.35), 0 0 30px rgba(255, 231, 76, 0.2)'
            ],
            ...ENHANCED_ANIMATION_CONFIGS.hover.glow,
            autoplay: false
          });

          this.activeAnimations.set('hover-glow', glowAnimation);
          glowAnimation.play();
        }

        // Professional shimmer effect
        const shimmerAnimation = animate(this.element, {
          filter: [
            'brightness(1) saturate(1)',
            'brightness(1.08) saturate(1.15)',
            'brightness(1.05) saturate(1.1)'
          ],
          ...ENHANCED_ANIMATION_CONFIGS.hover.microInteraction,
          autoplay: false
        });

        this.activeAnimations.set('hover-scale', scaleAnimation);
        this.activeAnimations.set('hover-shimmer', shimmerAnimation);

        scaleAnimation.play();
        shimmerAnimation.play();

        // Add subtle particle burst
        this.createHoverParticles();
      },

      leave: () => {
        // Reverse all hover animations
        const animations = ['hover-scale', 'hover-glow', 'hover-shimmer'];
        animations.forEach(key => {
          const animation = this.activeAnimations.get(key);
          if (animation?.reverse) {
            animation.reverse();
          }
        });

        // Restart breathing after delay
        setTimeout(() => {
          if (!this.activeAnimations.has('hover-scale')) {
            this.createIdleBreathing();
          }
        }, 500);
      }
    };
  }

  // Energy-based visual effects during interactions
  createEnergyVisualization(energy: number): void {
    const intensity = Math.min(1, energy);

    // Dynamic glow based on energy
    const energyGlow = `drop-shadow(0 0 ${intensity * 25}px ${BRAND_COLORS.primary.rgba})`;
    const secondaryGlow = intensity > 0.5 ?
      `, drop-shadow(0 0 ${(intensity - 0.5) * 30}px ${BRAND_COLORS.secondary.rgba})` : '';

    animeUtils.set(this.element, {
      filter: `${energyGlow}${secondaryGlow} brightness(${1 + intensity * 0.1}) saturate(${1 + intensity * 0.2})`
    });

    // Create energy particles
    if (intensity > 0.3) {
      this.createEnergyParticles(intensity);
    }
  }

  // Advanced celebration animation with particle burst
  createCelebrationEffect(intensity: 'subtle' | 'medium' | 'strong' = 'medium'): any {
    const config = ENHANCED_ANIMATION_CONFIGS.celebration;

    const intensityMap = {
      subtle: { scale: 1.15, particles: 8, duration: 800 },
      medium: { scale: 1.25, particles: 16, duration: 1000 },
      strong: { scale: 1.35, particles: 24, duration: 1200 }
    };

    const settings = intensityMap[intensity];

    // Main celebration animation
    const celebrationAnimation = animate(this.element, {
      scale: [1, settings.scale, 1.08, 1],
      rotate: [0, -6, 6, 0],
      filter: [
        'brightness(1) saturate(1)',
        'brightness(1.2) saturate(1.4)',
        'brightness(1.1) saturate(1.2)',
        'brightness(1) saturate(1)'
      ],
      duration: settings.duration,
      easing: config.achievement.easing
    });

    // Particle burst effect
    this.createCelebrationParticles(settings.particles, settings.duration);

    // Container glow burst
    if (this.container) {
      animate(this.container, {
        boxShadow: [
          '0 10px 30px rgba(95, 46, 187, 0.15)',
          `0 35px 80px rgba(95, 46, 187, 0.5), 0 0 50px rgba(255, 231, 76, 0.4)`,
          '0 20px 50px rgba(95, 46, 187, 0.25)',
          '0 10px 30px rgba(95, 46, 187, 0.15)'
        ],
        duration: settings.duration,
        easing: config.burst.easing
      });
    }

    this.activeAnimations.set('celebration', celebrationAnimation);
    return celebrationAnimation;
  }

  // Professional context-aware adaptations
  createContextualEffects(context: 'time-of-day' | 'scroll-position' | 'interaction-count') {
    switch (context) {
      case 'time-of-day':
        this.applyTimeBasedTheme();
        break;
      case 'scroll-position':
        this.applyScrollBasedEffects();
        break;
      case 'interaction-count':
        this.applyInteractionBasedRewards();
        break;
    }
  }

  private applyTimeBasedTheme() {
    const hour = new Date().getHours();
    let themeGradient = BRAND_GRADIENTS.primary;

    if (hour >= 6 && hour < 12) {
      // Morning: Energetic gold accents
      themeGradient = BRAND_GRADIENTS.secondary;
    } else if (hour >= 12 && hour < 18) {
      // Afternoon: Professional primary
      themeGradient = BRAND_GRADIENTS.professional;
    } else if (hour >= 18 && hour < 22) {
      // Evening: Success gradient
      themeGradient = BRAND_GRADIENTS.success;
    } else {
      // Night: Subtle tones
      themeGradient = BRAND_GRADIENTS.subtle;
    }

    // Apply subtle background influence
    if (this.container) {
      this.container.style.background = `radial-gradient(circle at center, transparent 60%, ${themeGradient.split(', ')[1]} 100%)`;
      this.container.style.backgroundSize = '200% 200%';
      this.container.style.backgroundPosition = 'center';
    }
  }

  private applyScrollBasedEffects() {
    const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const glowIntensity = Math.min(0.4, scrollProgress * 0.6);

    animeUtils.set(this.element, {
      filter: `drop-shadow(0 0 ${glowIntensity * 20}px ${BRAND_COLORS.primary.rgba}) brightness(${1 + glowIntensity * 0.1})`
    });
  }

  private applyInteractionBasedRewards() {
    // Progressive enhancement based on interaction history
    const interactionCount = this.getInteractionCount();

    if (interactionCount > 5) {
      this.element.style.filter += ` saturate(${1 + Math.min(0.2, interactionCount * 0.02)})`;
    }
  }

  // Particle system methods
  private createHoverParticles() {
    if (!this.particleContext) return;

    const rect = this.element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < 6; i++) {
      this.particles.push(new Particle({
        x: centerX + (Math.random() - 0.5) * 20,
        y: centerY + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 60,
        color: BRAND_COLORS.primary.rgba,
        size: Math.random() * 3 + 1,
        type: 'sparkle'
      }));
    }

    this.startParticleAnimation();
  }

  private createEnergyParticles(intensity: number) {
    if (!this.particleContext) return;

    const rect = this.element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const particleCount = Math.floor(intensity * 12);

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      this.particles.push(new Particle({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * intensity * 3,
        vy: Math.sin(angle) * intensity * 3,
        life: 45,
        color: intensity > 0.7 ? BRAND_COLORS.secondary.rgba : BRAND_COLORS.primary.rgba,
        size: Math.random() * 2 + 1,
        type: 'energy'
      }));
    }

    this.startParticleAnimation();
  }

  private createCelebrationParticles(count: number, duration: number) {
    if (!this.particleContext) return;

    const rect = this.element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = Math.random() * 4 + 2;

      this.particles.push(new Particle({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.floor(duration / 16), // Convert to frames
        color: i % 2 === 0 ? BRAND_COLORS.primary.rgba : BRAND_COLORS.secondary.rgba,
        size: Math.random() * 4 + 2,
        type: 'celebration'
      }));
    }

    this.startParticleAnimation();
  }

  private startParticleAnimation() {
    if (this.rafId) return; // Already running

    const animate = () => {
      this.updateParticles();
      this.renderParticles();

      if (this.particles.length > 0) {
        this.rafId = requestAnimationFrame(animate);
      } else {
        this.rafId = undefined;
      }
    };

    this.rafId = requestAnimationFrame(animate);
  }

  private updateParticles() {
    this.particles = this.particles.filter(particle => {
      particle.update();
      return particle.life > 0;
    });
  }

  private renderParticles() {
    if (!this.particleContext || !this.particleCanvas) return;

    this.particleContext.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

    this.particles.forEach(particle => {
      particle.render(this.particleContext!);
    });
  }

  // Utility methods
  private getInteractionCount(): number {
    const stored = localStorage.getItem('heroLogoInteractions');
    return stored ? parseInt(stored, 10) : 0;
  }

  private incrementInteractionCount() {
    const current = this.getInteractionCount();
    localStorage.setItem('heroLogoInteractions', (current + 1).toString());
  }

  // Animation management
  stopAnimation(key: string) {
    const animation = this.activeAnimations.get(key);
    if (animation?.pause) {
      animation.pause();
    }
    this.activeAnimations.delete(key);
  }

  stopAllAnimations() {
    this.activeAnimations.forEach((animation, key) => {
      if (animation?.pause) {
        animation.pause();
      }
    });
    this.activeAnimations.clear();

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
    }
  }

  // Cleanup
  destroy() {
    this.stopAllAnimations();
    this.particles = [];

    if (this.particleCanvas && this.container) {
      this.container.removeChild(this.particleCanvas);
    }
  }
}

// Particle class for visual effects
class Particle {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public life: number;
  public maxLife: number;
  public color: string;
  public size: number;
  public type: 'sparkle' | 'energy' | 'celebration';

  constructor(config: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
    type: 'sparkle' | 'energy' | 'celebration';
  }) {
    this.x = config.x;
    this.y = config.y;
    this.vx = config.vx;
    this.vy = config.vy;
    this.life = config.life;
    this.maxLife = config.life;
    this.color = config.color;
    this.size = config.size;
    this.type = config.type;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;

    // Apply gravity and air resistance
    if (this.type === 'celebration') {
      this.vy += 0.1; // Gravity
      this.vx *= 0.99; // Air resistance
      this.vy *= 0.99;
    } else if (this.type === 'energy') {
      this.vx *= 0.95;
      this.vy *= 0.95;
    } else {
      this.vx *= 0.98;
      this.vy *= 0.98;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    const alpha = this.life / this.maxLife;
    const currentSize = this.size * alpha;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;

    if (this.type === 'sparkle') {
      this.renderStar(ctx, currentSize);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  private renderStar(ctx: CanvasRenderingContext2D, size: number) {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.5;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = this.x + Math.cos(angle) * radius;
      const y = this.y + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
  }
}

export default EnhancedVisualEffects;