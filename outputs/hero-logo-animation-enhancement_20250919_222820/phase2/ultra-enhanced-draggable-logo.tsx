/**
 * Ultra-Enhanced Draggable Hero Logo
 * Integration of all interactivity enhancements for the ultimate user experience
 */

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';

// Import our enhanced systems
import EnhancedPhysicsEngine from './enhanced-drag-physics';
import { EnhancedHapticFeedback } from './enhanced-haptic-feedback';
import EnhancedHoverSystem from './enhanced-hover-system';
import EnhancedKeyboardNavigation from './enhanced-keyboard-navigation';
import PerformanceOptimizationSystem from './performance-optimization-system';

// Import existing systems
import { useDragConstraints } from '@/hooks/useDragConstraints';
import { useDragAccessibility } from '@/hooks/useDragAccessibility';
import { animationUtils } from '@/lib/animations';

export interface UltraEnhancedDraggableLogoProps {
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

  // Enhanced configuration
  enableAdvancedPhysics?: boolean;
  enableHapticFeedback?: boolean;
  enableAdvancedHover?: boolean;
  enableEnhancedKeyboard?: boolean;
  enablePerformanceOptimization?: boolean;
  enableMultiTouchGestures?: boolean;

  // Physics configuration
  physicsConfig?: {
    friction?: number;
    elasticity?: number;
    springConstant?: number;
    damping?: number;
    momentumScale?: number;
    restitution?: number;
  };

  // Performance configuration
  performanceConfig?: {
    targetFPS?: number;
    enableAdaptiveOptimization?: boolean;
    enableBatteryOptimization?: boolean;
  };

  // Interaction configuration
  interactionConfig?: {
    enableCelebrationEffects?: boolean;
    enableEnergyVisualization?: boolean;
    enableTrailEffects?: boolean;
    maxScale?: number;
  };

  // Debug and development
  debugMode?: boolean;
  enableMetrics?: boolean;
}

export const UltraEnhancedDraggableHeroLogo: React.FC<UltraEnhancedDraggableLogoProps> = ({
  src,
  alt,
  className,
  language,
  size,
  onDragStart,
  onDragEnd,
  disabled = false,
  enableAdvancedPhysics = true,
  enableHapticFeedback = true,
  enableAdvancedHover = true,
  enableEnhancedKeyboard = true,
  enablePerformanceOptimization = true,
  enableMultiTouchGestures = true,
  physicsConfig = {},
  performanceConfig = {},
  interactionConfig = {},
  debugMode = false,
  enableMetrics = true
}) => {
  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Enhanced systems
  const physicsEngine = useRef<EnhancedPhysicsEngine | null>(null);
  const hapticSystem = useRef<EnhancedHapticFeedback | null>(null);
  const hoverSystem = useRef<EnhancedHoverSystem | null>(null);
  const keyboardNav = useRef<EnhancedKeyboardNavigation | null>(null);
  const performanceSystem = useRef<PerformanceOptimizationSystem | null>(null);

  // Animation and interaction state
  const currentAnimation = useRef<any | null>(null);
  const isInitialized = useRef(false);

  // Enhanced state management
  const [interactionState, setInteractionState] = useState({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    energy: 0,
    scale: 1,
    rotation: 0,
    isDragging: false,
    isHovered: false,
    isFocused: false,
    isGesturing: false,
    lastInteractionType: 'none' as 'none' | 'mouse' | 'touch' | 'keyboard' | 'gesture'
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    latency: 0,
    optimizationLevel: 1.0,
    adaptiveQuality: 1.0
  });

  // Get drag constraints
  const { constraints } = useDragConstraints(containerRef, {
    elasticity: physicsConfig.elasticity || 0.3,
    useResponsiveConstraints: true
  });

  // Accessibility system
  const {
    accessibilityProps,
    hiddenInstructionsProps,
    announcementsProps,
    updatePosition,
    resetPosition
  } = useDragAccessibility(
    language,
    useCallback((newPosition: { x: number; y: number }) => {
      setInteractionState(prev => ({ ...prev, position: newPosition }));
      if (imageRef.current) {
        animate(imageRef.current, {
          translateX: newPosition.x,
          translateY: newPosition.y,
          duration: 200,
          easing: 'easeOutQuart'
        });
      }
    }, []),
    constraints
  );

  /**
   * Initialize all enhanced systems
   */
  const initializeEnhancedSystems = useCallback(() => {
    if (!containerRef.current || !imageRef.current || isInitialized.current) return;

    // Initialize physics engine
    if (enableAdvancedPhysics) {
      physicsEngine.current = new EnhancedPhysicsEngine({
        friction: 0.92,
        elasticity: 0.35,
        springConstant: 0.15,
        damping: 0.88,
        momentumScale: 0.2,
        restitution: 0.7,
        ...physicsConfig
      });
    }

    // Initialize haptic feedback
    if (enableHapticFeedback) {
      hapticSystem.current = new EnhancedHapticFeedback({
        enabled: true,
        intensity: 1.0,
        respectReducedMotion: true,
        adaptToDevice: true
      });
    }

    // Initialize hover system
    if (enableAdvancedHover) {
      hoverSystem.current = new EnhancedHoverSystem({
        enableMicroAnimations: true,
        enableGlowEffects: true,
        enableMagneticEffect: true,
        enableParticleEffects: false, // Can be enabled for high-end devices
        responsiveIntensity: true,
        respectReducedMotion: true
      });
    }

    // Initialize keyboard navigation
    if (enableEnhancedKeyboard) {
      keyboardNav.current = new EnhancedKeyboardNavigation({
        enabled: true,
        moveDistance: 20,
        fineMoveDistance: 5,
        animationDuration: 200,
        enableSpatialNavigation: true,
        enableKeyboardShortcuts: true,
        enableVisualFeedback: true,
        respectUserPreferences: true
      });
      keyboardNav.current.initialize(imageRef.current, constraints);
    }

    // Initialize performance optimization
    if (enablePerformanceOptimization) {
      performanceSystem.current = new PerformanceOptimizationSystem({
        targetFPS: 60,
        maxMemoryMB: 100,
        enableAdaptiveOptimization: true,
        enablePredictiveOptimization: true,
        enableBatteryOptimization: true,
        enableLogging: debugMode,
        enableMetrics,
        ...performanceConfig
      });

      performanceSystem.current.startMonitoring();
      performanceSystem.current.observeElement(containerRef.current);
    }

    isInitialized.current = true;
  }, [
    enableAdvancedPhysics,
    enableHapticFeedback,
    enableAdvancedHover,
    enableEnhancedKeyboard,
    enablePerformanceOptimization,
    physicsConfig,
    performanceConfig,
    constraints,
    debugMode,
    enableMetrics
  ]);

  /**
   * Enhanced drag start handler
   */
  const handleEnhancedDragStart = useCallback((event: PointerEvent | TouchEvent | MouseEvent) => {
    if (disabled) return;

    const interactionId = `drag-${Date.now()}`;

    // Track performance
    if (performanceSystem.current) {
      performanceSystem.current.trackInteractionStart(interactionId);
    }

    // Haptic feedback
    if (hapticSystem.current) {
      hapticSystem.current.dragStart();
    }

    // Update state
    setInteractionState(prev => ({
      ...prev,
      isDragging: true,
      lastInteractionType: 'touches' in event ? 'touch' : 'mouse'
    }));

    onDragStart?.();

    // Enhanced visual feedback
    if (imageRef.current && interactionConfig.enableCelebrationEffects) {
      animationUtils.createFeedbackAnimation(imageRef.current, 0.95, 'drag');
    }
  }, [disabled, onDragStart, interactionConfig.enableCelebrationEffects]);

  /**
   * Enhanced drag move handler with physics
   */
  const handleEnhancedDragMove = useCallback((
    position: { x: number; y: number },
    velocity: { x: number; y: number },
    event: PointerEvent | TouchEvent | MouseEvent
  ) => {
    if (disabled || !interactionState.isDragging) return;

    // Update physics state
    if (physicsEngine.current) {
      const deltaTime = 16.67; // Assume 60fps
      const physicsState = physicsEngine.current.updatePhysicsState(position, velocity, deltaTime);

      // Enhanced spring forces
      const springForce = physicsEngine.current.calculateEnhancedSpringForce(position, constraints);

      // Apply spring force visual feedback
      if (imageRef.current && (Math.abs(springForce.x) > 0.1 || Math.abs(springForce.y) > 0.1)) {
        const rotationAngle = Math.atan2(springForce.y, springForce.x) * (180 / Math.PI) * 0.05;
        setInteractionState(prev => ({ ...prev, rotation: rotationAngle }));
      }
    }

    // Energy-based visual effects
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    const energy = Math.min(1, speed / 1000);

    // Dynamic scaling based on energy
    const dynamicScale = Math.max(0.98, Math.min(interactionConfig.maxScale || 1.12, 1 + energy * 0.08));

    // Energy visualization
    if (interactionConfig.enableEnergyVisualization && imageRef.current) {
      const glowIntensity = energy * 15;
      imageRef.current.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(59, 130, 246, ${energy * 0.4}))`;
    }

    // Update state
    setInteractionState(prev => ({
      ...prev,
      position,
      velocity,
      energy,
      scale: dynamicScale
    }));

    // Real-time visual update
    if (imageRef.current) {
      const transform = `translate(${position.x}px, ${position.y}px) scale(${dynamicScale}) rotate(${interactionState.rotation}deg)`;
      imageRef.current.style.transform = transform;
    }

    // Energy-based haptic feedback
    if (hapticSystem.current && energy > 0.3) {
      hapticSystem.current.energyFeedback(energy);
    }

    updatePosition(position);
  }, [
    disabled,
    interactionState.isDragging,
    interactionState.rotation,
    constraints,
    interactionConfig.maxScale,
    interactionConfig.enableEnergyVisualization,
    updatePosition
  ]);

  /**
   * Enhanced drag end handler with advanced physics
   */
  const handleEnhancedDragEnd = useCallback((
    finalPosition: { x: number; y: number },
    finalVelocity: { x: number; y: number },
    event: PointerEvent | TouchEvent | MouseEvent
  ) => {
    if (disabled) return;

    const interactionId = `drag-${Date.now()}`;

    // Track performance
    if (performanceSystem.current) {
      performanceSystem.current.trackInteractionEnd(interactionId);
    }

    // Enhanced momentum calculation
    let destination = finalPosition;
    let bounceSequence: Array<{ x: number; y: number; energy: number }> = [];

    if (physicsEngine.current) {
      const momentumResult = physicsEngine.current.calculateEnhancedMomentum(
        finalPosition,
        finalVelocity,
        16.67, // Delta time
        constraints
      );
      destination = momentumResult.destination;
      bounceSequence = momentumResult.bounceSequence;
    }

    // Enhanced animation with physics
    if (imageRef.current) {
      const energy = interactionState.energy;
      const hasHighEnergy = energy > 0.5;

      if (hasHighEnergy && bounceSequence.length > 0) {
        // Multi-bounce animation
        const keyframes = [finalPosition, ...bounceSequence, destination];
        const keyframeData = {
          translateX: keyframes.map(p => p.x),
          translateY: keyframes.map(p => p.y),
          scale: [interactionState.scale, 1.05, ...bounceSequence.map(() => 1.02), 1],
          rotate: [interactionState.rotation, 0],
          duration: 800,
          easing: 'easeOutElastic(1.2, 0.75)'
        };

        currentAnimation.current = animate(imageRef.current, keyframeData);

        // Enhanced haptic for high energy release
        if (hapticSystem.current) {
          hapticSystem.current.celebration();
        }
      } else {
        // Standard snap-back
        currentAnimation.current = animate(imageRef.current, {
          translateX: destination.x,
          translateY: destination.y,
          scale: 1,
          rotate: 0,
          filter: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
          duration: 650,
          easing: 'easeOutElastic(1.2, 0.75)'
        });

        if (hapticSystem.current) {
          hapticSystem.current.dragEnd();
        }
      }
    }

    // Update state
    setInteractionState(prev => ({
      ...prev,
      isDragging: false,
      position: destination,
      velocity: { x: 0, y: 0 },
      energy: 0,
      scale: 1,
      rotation: 0
    }));

    updatePosition(destination);
    onDragEnd?.();
  }, [
    disabled,
    constraints,
    interactionState.energy,
    interactionState.scale,
    interactionState.rotation,
    updatePosition,
    onDragEnd
  ]);

  /**
   * Enhanced hover handlers
   */
  const handleEnhancedMouseEnter = useCallback((event: MouseEvent) => {
    if (disabled || interactionState.isDragging) return;

    setInteractionState(prev => ({ ...prev, isHovered: true, lastInteractionType: 'mouse' }));

    if (hoverSystem.current) {
      const intensity = interactionState.energy > 0 ? 0.8 : 0.6;
      hoverSystem.current.startHover(imageRef.current!, event, intensity);
    }

    if (hapticSystem.current) {
      hapticSystem.current.hoverFeedback(0.3);
    }
  }, [disabled, interactionState.isDragging, interactionState.energy]);

  const handleEnhancedMouseMove = useCallback((event: MouseEvent) => {
    if (disabled || interactionState.isDragging || !interactionState.isHovered) return;

    if (hoverSystem.current) {
      hoverSystem.current.updateHover(imageRef.current!, event);
    }
  }, [disabled, interactionState.isDragging, interactionState.isHovered]);

  const handleEnhancedMouseLeave = useCallback(() => {
    if (disabled) return;

    setInteractionState(prev => ({ ...prev, isHovered: false }));

    if (hoverSystem.current) {
      hoverSystem.current.endHover(imageRef.current!);
    }
  }, [disabled]);

  /**
   * Enhanced focus handlers
   */
  const handleEnhancedFocus = useCallback(() => {
    if (disabled) return;

    setInteractionState(prev => ({ ...prev, isFocused: true, lastInteractionType: 'keyboard' }));

    if (hapticSystem.current) {
      hapticSystem.current.focusFeedback();
    }
  }, [disabled]);

  const handleEnhancedBlur = useCallback(() => {
    if (disabled) return;

    setInteractionState(prev => ({ ...prev, isFocused: false }));
  }, [disabled]);

  /**
   * Enhanced gesture handlers
   */
  const handleGestureStart = useCallback(() => {
    if (disabled) return;

    setInteractionState(prev => ({ ...prev, isGesturing: true, lastInteractionType: 'gesture' }));

    if (hapticSystem.current) {
      hapticSystem.current.pinchStart();
    }
  }, [disabled]);

  const handleGestureEnd = useCallback(() => {
    if (disabled) return;

    setInteractionState(prev => ({ ...prev, isGesturing: false }));

    if (hapticSystem.current) {
      hapticSystem.current.pinchEnd();
    }
  }, [disabled]);

  /**
   * Enhanced double-click with celebration
   */
  const handleEnhancedDoubleClick = useCallback(() => {
    if (disabled) return;

    // Celebration animation
    if (imageRef.current && interactionConfig.enableCelebrationEffects) {
      animationUtils.createCelebrationAnimation(imageRef.current, {
        intensity: 'strong',
        onComplete: () => {
          setInteractionState(prev => ({
            ...prev,
            position: { x: 0, y: 0 },
            energy: 0,
            scale: 1,
            rotation: 0
          }));
        }
      });
    }

    // Enhanced haptic celebration
    if (hapticSystem.current) {
      hapticSystem.current.achievement();
    }

    // Reset physics
    if (physicsEngine.current) {
      physicsEngine.current.reset();
    }

    resetPosition();

    // Announce to screen readers
    const message = language === 'zh'
      ? 'Logo已回到中心位置，带有庆祝效果'
      : 'Logo returned to center with celebration effect';
    window.dispatchEvent(new CustomEvent('logo:announce', { detail: { message } }));
  }, [disabled, language, resetPosition, interactionConfig.enableCelebrationEffects]);

  /**
   * Performance optimization listener
   */
  useEffect(() => {
    const handlePerformanceOptimization = (event: CustomEvent) => {
      const { recommendations, metrics, optimizationLevel } = event.detail;

      setPerformanceMetrics(prev => ({
        ...prev,
        fps: metrics.fps,
        latency: metrics.interactionLatency,
        optimizationLevel,
        adaptiveQuality: recommendations.qualityLevel
      }));

      // Apply optimizations to systems
      if (hoverSystem.current && recommendations.enableReducedMotion) {
        hoverSystem.current.updateConfig({
          enableMicroAnimations: false,
          enableParticleEffects: false
        });
      }

      if (keyboardNav.current) {
        keyboardNav.current.updateConfig({
          animationDuration: recommendations.enableReducedMotion ? 100 : 200
        });
      }
    };

    window.addEventListener('performance:optimization', handlePerformanceOptimization as EventListener);

    return () => {
      window.removeEventListener('performance:optimization', handlePerformanceOptimization as EventListener);
    };
  }, []);

  /**
   * Initialize systems on mount
   */
  useEffect(() => {
    initializeEnhancedSystems();

    return () => {
      // Cleanup all systems
      if (physicsEngine.current) physicsEngine.current.reset();
      if (hoverSystem.current) hoverSystem.current.cleanup();
      if (keyboardNav.current) keyboardNav.current.cleanup();
      if (performanceSystem.current) {
        performanceSystem.current.unobserveElement(containerRef.current!);
        performanceSystem.current.cleanup();
      }
      if (currentAnimation.current) currentAnimation.current.pause();
    };
  }, [initializeEnhancedSystems]);

  /**
   * Reset when disabled
   */
  useEffect(() => {
    if (disabled && imageRef.current) {
      currentAnimation.current = animate(imageRef.current, {
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotate: 0,
        filter: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
        duration: 400,
        easing: 'easeOutQuart'
      });

      setInteractionState({
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        energy: 0,
        scale: 1,
        rotation: 0,
        isDragging: false,
        isHovered: false,
        isFocused: false,
        isGesturing: false,
        lastInteractionType: 'none'
      });

      if (physicsEngine.current) physicsEngine.current.reset();
      resetPosition();
    }
  }, [disabled, resetPosition]);

  // Combine all event handlers
  const eventHandlers = disabled ? {} : {
    onMouseEnter: handleEnhancedMouseEnter,
    onMouseMove: handleEnhancedMouseMove,
    onMouseLeave: handleEnhancedMouseLeave,
    onFocus: handleEnhancedFocus,
    onBlur: handleEnhancedBlur,
    onDoubleClick: handleEnhancedDoubleClick,
    // Gesture handlers would be added here based on touch events
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center",
        "hero-logo-container gpu-accelerated",
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
          "hero-logo-glow gpu-accelerated",
          "drop-shadow-lg hover:drop-shadow-xl",
          !disabled && "cursor-grab active:cursor-grabbing",
          disabled && "cursor-default opacity-75",
          interactionState.isHovered && !disabled && "hero-logo-shimmer",
          interactionState.isFocused && !disabled && "ring-2 ring-primary ring-offset-2"
        )}
        style={{
          transform: `translate(${interactionState.position.x}px, ${interactionState.position.y}px) scale(${disabled ? 1 : interactionState.scale}) rotate(${interactionState.rotation}deg)`,
          transformOrigin: 'center',
          willChange: performanceMetrics.optimizationLevel < 0.8 ? 'transform' : 'auto'
        }}
        // Accessibility props
        {...(disabled ? {} : accessibilityProps)}
        // Enhanced event handlers
        {...eventHandlers}
        // Prevent native image dragging
        onDragStart={(e) => e.preventDefault()}
        // Optimized loading
        loading="eager"
        decoding="async"
      />

      {/* Hidden accessibility elements */}
      {!disabled && (
        <>
          <div {...hiddenInstructionsProps} />
          <div {...announcementsProps} />
        </>
      )}

      {/* Enhanced visual indicators */}
      {!disabled && interactionState.isDragging && (
        <div
          className={cn(
            "absolute inset-0 rounded-lg transition-all duration-300 pointer-events-none",
            "border-2 border-blue-400 opacity-60 shadow-lg shadow-blue-400/25"
          )}
          aria-hidden="true"
        />
      )}

      {/* Energy visualization */}
      {!disabled && interactionState.energy > 0.3 && interactionConfig.enableEnergyVisualization && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200"
          style={{
            opacity: Math.min(0.4, interactionState.energy * 0.6),
            background: `radial-gradient(circle at center, rgba(59, 130, 246, ${interactionState.energy * 0.15}) 0%, transparent 70%)`
          }}
          aria-hidden="true"
        />
      )}

      {/* Debug information */}
      {debugMode && !disabled && (
        <div className="absolute -bottom-20 left-0 text-xs text-gray-500 font-mono space-y-1">
          <div>
            State: {interactionState.isDragging ? 'dragging' : interactionState.isHovered ? 'hovered' : interactionState.isFocused ? 'focused' : 'idle'}
            {' | '}
            Type: {interactionState.lastInteractionType}
          </div>
          <div>
            Pos: ({Math.round(interactionState.position.x)}, {Math.round(interactionState.position.y)})
            {' | '}
            Scale: {interactionState.scale.toFixed(2)}
            {' | '}
            Energy: {interactionState.energy.toFixed(2)}
          </div>
          <div>
            FPS: {performanceMetrics.fps}
            {' | '}
            Latency: {performanceMetrics.latency.toFixed(1)}ms
            {' | '}
            Opt: {(performanceMetrics.optimizationLevel * 100).toFixed(0)}%
          </div>
          <div>
            Quality: {(performanceMetrics.adaptiveQuality * 100).toFixed(0)}%
            {' | '}
            Rotation: {interactionState.rotation.toFixed(1)}°
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced memoization with comprehensive comparison
export default React.memo(UltraEnhancedDraggableHeroLogo, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.language === nextProps.language &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.enableAdvancedPhysics === nextProps.enableAdvancedPhysics &&
    prevProps.enableHapticFeedback === nextProps.enableHapticFeedback &&
    prevProps.enableAdvancedHover === nextProps.enableAdvancedHover &&
    prevProps.enableEnhancedKeyboard === nextProps.enableEnhancedKeyboard &&
    prevProps.enablePerformanceOptimization === nextProps.enablePerformanceOptimization &&
    prevProps.enableMultiTouchGestures === nextProps.enableMultiTouchGestures &&
    JSON.stringify(prevProps.size) === JSON.stringify(nextProps.size) &&
    JSON.stringify(prevProps.physicsConfig) === JSON.stringify(nextProps.physicsConfig) &&
    JSON.stringify(prevProps.performanceConfig) === JSON.stringify(nextProps.performanceConfig) &&
    JSON.stringify(prevProps.interactionConfig) === JSON.stringify(nextProps.interactionConfig)
  );
});