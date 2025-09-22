import React, { useRef, useCallback, useEffect, useState } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';
import { useEnhancedDragInteraction, EnhancedDragOptions } from '@/hooks/useEnhancedDragInteraction';
import { useDragConstraints } from '@/hooks/useDragConstraints';
import { useDragAccessibility } from '@/hooks/useDragAccessibility';
import { animationUtils } from '@/lib/animations';
import { hapticFeedback } from '@/lib/dragUtils';

export interface EnhancedDraggableHeroLogoProps {
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
  // Enhanced configuration options
  physicsConfig?: Partial<EnhancedDragOptions['physics']>;
  enableAdvancedGestures?: boolean;
  enablePerformanceMode?: boolean;
  enableHapticFeedback?: boolean;
  maxScale?: number;
  debugMode?: boolean;
}

// Enhanced animation configuration with physics-aware timing
const enhancedAnimationConfig = {
  // Momentum-based follow during drag
  dragFollow: {
    duration: 0,
    easing: 'linear'
  },
  // Enhanced elastic snap back with physics
  snapBack: {
    duration: 650,
    easing: 'easeOutElastic(1.2, .75)'
  },
  // Physics-aware hover with micro-interactions
  hover: {
    duration: 350,
    easing: 'easeOutBack(1.5)'
  },
  // Dynamic scale based on drag energy
  energyScale: {
    duration: 150,
    easing: 'easeOutQuart'
  },
  // Celebration effects for interactions
  celebration: {
    duration: 800,
    easing: 'easeOutExpo'
  }
};

export const EnhancedDraggableHeroLogo: React.FC<EnhancedDraggableHeroLogoProps> = ({
  src,
  alt,
  className,
  language,
  size,
  onDragStart,
  onDragEnd,
  disabled = false,
  physicsConfig = {},
  enableAdvancedGestures = true,
  enablePerformanceMode = true,
  enableHapticFeedback = true,
  maxScale = 1.2,
  debugMode = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const currentAnimation = useRef<any | null>(null);
  const performanceMetrics = useRef({ fps: 60, energy: 0, gestureActive: false });

  // Enhanced state management
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visualState, setVisualState] = useState({
    scale: 1,
    rotation: 0,
    energy: 0,
    isDragging: false,
    isGesturing: false
  });

  // Get drag constraints with responsive behavior
  const { constraints } = useDragConstraints(containerRef, {
    elasticity: 0.25,
    useResponsiveConstraints: true
  });

  // Enhanced physics configuration
  const enhancedPhysicsOptions: EnhancedDragOptions = {
    physics: {
      friction: 0.88,
      elasticity: 0.3,
      springConstant: 0.12,
      damping: 0.85,
      momentumScale: 0.18,
      minVelocity: 40,
      ...physicsConfig
    },
    gestures: {
      enablePinch: enableAdvancedGestures,
      enableRotation: false, // Disabled for logo to maintain brand consistency
      enableHaptics: enableHapticFeedback && hapticFeedback.isSupported()
    },
    performance: {
      useRAF: enablePerformanceMode,
      maxFPS: 60,
      throttleMS: 16
    }
  };

  // Enhanced drag interaction system
  const {
    handlers: dragHandlers,
    cleanup,
    getPerformanceMetrics,
    resetPhysics
  } = useEnhancedDragInteraction(imageRef, constraints, enhancedPhysicsOptions);

  // Handle position changes from accessibility system
  const handleAccessibilityPositionChange = useCallback((newPosition: { x: number; y: number }) => {
    setPosition(newPosition);
    if (imageRef.current) {
      animate(imageRef.current, {
        translateX: newPosition.x,
        translateY: newPosition.y,
        ...enhancedAnimationConfig.dragFollow
      });
    }
  }, []);

  // Accessibility system with enhanced features
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

  // Enhanced drag event handling with physics integration
  useEffect(() => {
    const handleDragStart = () => {
      setVisualState(prev => ({ ...prev, isDragging: true }));
      onDragStart?.();

      // Stop any existing animations
      if (currentAnimation.current) {
        currentAnimation.current.pause();
      }

      // Performance mode optimization
      if (enablePerformanceMode && imageRef.current) {
        imageRef.current.style.willChange = 'transform';
      }

      // Haptic feedback for drag start
      if (enableHapticFeedback && hapticFeedback.isSupported()) {
        hapticFeedback.light();
      }
    };

    const handleDragMove = (event: CustomEvent) => {
      const { position, energy, scale, springForce } = event.detail;
      setPosition(position);

      // Update visual state with physics data
      setVisualState(prev => ({
        ...prev,
        energy: energy || 0,
        scale: Math.min(maxScale, scale || 1)
      }));

      // Performance-optimized real-time updates
      if (imageRef.current) {
        // Direct transform for immediate feedback
        const transform = `translate(${position.x}px, ${position.y}px) scale(${Math.min(maxScale, scale || 1)})`;
        imageRef.current.style.transform = transform;

        // Energy-based visual effects
        if (energy > 0.3) {
          // Add subtle glow effect for high-energy dragging
          imageRef.current.style.filter = `drop-shadow(0 0 ${energy * 10}px rgba(59, 130, 246, ${energy * 0.3}))`;
        } else {
          imageRef.current.style.filter = '';
        }

        // Spring force feedback (subtle rotation based on constraints)
        if (springForce && (Math.abs(springForce.x) > 0.1 || Math.abs(springForce.y) > 0.1)) {
          const rotationAngle = Math.atan2(springForce.y, springForce.x) * (180 / Math.PI) * 0.05; // Very subtle
          setVisualState(prev => ({ ...prev, rotation: rotationAngle }));
        }
      }

      // Update accessibility system
      updatePosition(position);

      // Performance monitoring
      performanceMetrics.current.energy = energy || 0;
    };

    const handleDragEnd = (event: CustomEvent) => {
      const { destination, bounceback, energy } = event.detail;
      setVisualState(prev => ({ ...prev, isDragging: false }));

      // Performance mode cleanup
      if (enablePerformanceMode && imageRef.current) {
        imageRef.current.style.willChange = 'auto';
      }

      // Enhanced snap-back animation with physics
      if (imageRef.current) {
        // If there's a bounceback effect, animate it first
        if (bounceback && energy > 0.4) {
          // High-energy release with bounceback
          currentAnimation.current = animate(imageRef.current, {
            translateX: [position.x, bounceback.x, destination.x],
            translateY: [position.y, bounceback.y, destination.y],
            scale: [visualState.scale, 1.05, 1],
            filter: [
              imageRef.current.style.filter,
              'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))',
              'drop-shadow(0 0 0px rgba(59, 130, 246, 0))'
            ],
            duration: enhancedAnimationConfig.snapBack.duration,
            easing: enhancedAnimationConfig.snapBack.easing,
            complete: () => {
              setPosition(destination);
              setVisualState(prev => ({ ...prev, scale: 1, rotation: 0, energy: 0 }));
            }
          });

          // Celebration haptic for high-energy release
          if (enableHapticFeedback) {
            hapticFeedback.medium();
          }
        } else {
          // Standard snap-back
          currentAnimation.current = animate(imageRef.current, {
            translateX: destination.x,
            translateY: destination.y,
            scale: 1,
            rotation: 0,
            filter: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
            ...enhancedAnimationConfig.snapBack,
            complete: () => {
              setPosition(destination);
              setVisualState(prev => ({ ...prev, scale: 1, rotation: 0, energy: 0 }));
            }
          });

          // Gentle haptic for normal release
          if (enableHapticFeedback) {
            hapticFeedback.light();
          }
        }
      }

      // Update accessibility
      updatePosition(destination);
      onDragEnd?.();
    };

    // Enhanced gesture handling
    const handleGestureStart = () => {
      setVisualState(prev => ({ ...prev, isGesturing: true }));
      performanceMetrics.current.gestureActive = true;
    };

    const handleGestureEnd = () => {
      setVisualState(prev => ({ ...prev, isGesturing: false }));
      performanceMetrics.current.gestureActive = false;
    };

    // Event listeners
    window.addEventListener('logo:dragStart', handleDragStart);
    window.addEventListener('logo:dragMove', handleDragMove as EventListener);
    window.addEventListener('logo:dragEnd', handleDragEnd as EventListener);
    window.addEventListener('logo:gestureStart', handleGestureStart);
    window.addEventListener('logo:gestureEnd', handleGestureEnd);

    return () => {
      window.removeEventListener('logo:dragStart', handleDragStart);
      window.removeEventListener('logo:dragMove', handleDragMove as EventListener);
      window.removeEventListener('logo:dragEnd', handleDragEnd as EventListener);
      window.removeEventListener('logo:gestureStart', handleGestureStart);
      window.removeEventListener('logo:gestureEnd', handleGestureEnd);
      if (currentAnimation.current) {
        currentAnimation.current.pause();
      }
    };
  }, [updatePosition, onDragStart, onDragEnd, position, visualState, enablePerformanceMode, enableHapticFeedback, maxScale]);

  // Reset when disabled
  useEffect(() => {
    if (disabled && imageRef.current) {
      currentAnimation.current = animate(imageRef.current, {
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotation: 0,
        filter: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
        ...enhancedAnimationConfig.snapBack,
        complete: () => {
          setPosition({ x: 0, y: 0 });
          setVisualState({ scale: 1, rotation: 0, energy: 0, isDragging: false, isGesturing: false });
          resetPhysics();
        }
      });
      resetPosition();
    }
  }, [disabled, resetPosition, resetPhysics]);

  // Enhanced double-click with celebration animation
  const handleDoubleClick = useCallback(() => {
    if (disabled || !imageRef.current) return;

    // Create celebration animation
    currentAnimation.current = animationUtils.createCelebrationAnimation(
      imageRef.current,
      {
        intensity: 'medium',
        onComplete: () => {
          setPosition({ x: 0, y: 0 });
          setVisualState({ scale: 1, rotation: 0, energy: 0, isDragging: false, isGesturing: false });
        }
      }
    );

    resetPosition();
    resetPhysics();

    // Enhanced haptic feedback for celebration
    if (enableHapticFeedback) {
      hapticFeedback.heavy();
    }

    // Announce to screen readers
    const message = language === 'zh' ? 'Logo已回到中心位置，带有庆祝效果' : 'Logo returned to center with celebration effect';
    window.dispatchEvent(new CustomEvent('logo:announce', { detail: { message } }));
  }, [disabled, resetPosition, resetPhysics, language, enableHapticFeedback]);

  // Enhanced hover effects with physics-aware scaling
  const handleMouseEnter = useCallback(() => {
    if (!disabled && !visualState.isDragging && !visualState.isGesturing && imageRef.current) {
      // Create sophisticated hover animations
      if (imageRef.current && containerRef.current) {
        const hoverAnimations = animationUtils.createHoverAnimations(imageRef.current, containerRef.current);
        // Play all hover effects
        animationUtils.playHoverAnimations(hoverAnimations);
      }

      // Subtle haptic feedback for hover (if supported and enabled)
      if (enableHapticFeedback && hapticFeedback.isSupported()) {
        hapticFeedback.light();
      }
    }
  }, [disabled, visualState.isDragging, visualState.isGesturing, enableHapticFeedback]);

  const handleMouseLeave = useCallback(() => {
    if (!disabled && !visualState.isDragging && !visualState.isGesturing && imageRef.current && containerRef.current) {
      const hoverAnimations = animationUtils.createHoverAnimations(imageRef.current, containerRef.current);
      animationUtils.reverseHoverAnimations(hoverAnimations);
    }
  }, [disabled, visualState.isDragging, visualState.isGesturing]);

  // Performance monitoring (development only)
  useEffect(() => {
    if (debugMode && typeof window !== 'undefined') {
      const interval = setInterval(() => {
        const metrics = getPerformanceMetrics();
        performanceMetrics.current.fps = metrics.fps;
        console.log('Enhanced Drag Performance:', {
          fps: metrics.fps,
          energy: performanceMetrics.current.energy,
          gestureActive: performanceMetrics.current.gestureActive,
          activePointers: metrics.activePointers,
          isRAFActive: metrics.isRAFActive
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [debugMode, getPerformanceMetrics]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      if (currentAnimation.current) {
        currentAnimation.current.pause();
      }
    };
  }, [cleanup]);

  // Combine event handlers
  const eventHandlers = disabled ? {} : {
    ...dragHandlers,
    onDoubleClick: handleDoubleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
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
          transform: `translate(${position.x}px, ${position.y}px) scale(${disabled ? 1 : visualState.scale}) rotate(${visualState.rotation}deg)`,
          transformOrigin: 'center',
          willChange: enablePerformanceMode && visualState.isDragging ? 'transform' : 'auto'
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
        <div {...hiddenInstructionsProps} />
      )}
      {!disabled && (
        <div {...announcementsProps} />
      )}

      {/* Enhanced visual indicator for drag mode */}
      {!disabled && (
        <div
          className={cn(
            "absolute inset-0 rounded-lg border-2 transition-all duration-300",
            visualState.isDragging
              ? "border-blue-400 opacity-60 shadow-lg shadow-blue-400/25"
              : "border-primary opacity-0",
            "focus-within:opacity-50 focus-within:border-blue-500"
          )}
          aria-hidden="true"
        />
      )}

      {/* Energy visualization (when dragging) */}
      {!disabled && visualState.isDragging && visualState.energy > 0.3 && (
        <div
          className={cn(
            "absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200",
            "bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10"
          )}
          style={{
            opacity: Math.min(0.4, visualState.energy * 0.6),
            background: `radial-gradient(circle at center, rgba(59, 130, 246, ${visualState.energy * 0.15}) 0%, transparent 70%)`
          }}
          aria-hidden="true"
        />
      )}

      {/* Debug information (development only) */}
      {debugMode && !disabled && (
        <div className="absolute -bottom-16 left-0 text-xs text-gray-500 font-mono space-y-1">
          <div>State: {visualState.isDragging ? 'dragging' : visualState.isGesturing ? 'gesturing' : 'idle'}</div>
          <div>Pos: ({Math.round(position.x)}, {Math.round(position.y)})</div>
          <div>Scale: {visualState.scale.toFixed(2)} | Energy: {visualState.energy.toFixed(2)}</div>
          <div>FPS: {performanceMetrics.current.fps} | Rotation: {visualState.rotation.toFixed(1)}°</div>
        </div>
      )}
    </div>
  );
};

// Enhanced memoization with performance comparison
export default React.memo(EnhancedDraggableHeroLogo, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.language === nextProps.language &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.enableAdvancedGestures === nextProps.enableAdvancedGestures &&
    prevProps.enablePerformanceMode === nextProps.enablePerformanceMode &&
    prevProps.enableHapticFeedback === nextProps.enableHapticFeedback &&
    prevProps.maxScale === nextProps.maxScale &&
    JSON.stringify(prevProps.size) === JSON.stringify(nextProps.size) &&
    JSON.stringify(prevProps.physicsConfig) === JSON.stringify(nextProps.physicsConfig)
  );
});