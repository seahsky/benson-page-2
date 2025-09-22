import { useState, useCallback, useRef, useEffect, RefObject } from 'react';
import {
  calculateMomentumDestination,
  calculateFrameIndependentPosition,
  calculateSpringForce,
  createOptimizedRAF,
  detectGestures,
  hapticFeedback,
  getEventPosition
} from '@/lib/dragUtils';

export interface EnhancedDragState {
  isDragging: boolean;
  isReleasing: boolean;
  isGesturing: boolean;
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  scale: number;
  rotation: number;
  energy: number; // For physics-based effects
}

export interface DragConstraints {
  left: number;
  right: number;
  top: number;
  bottom: number;
  elasticity: number;
}

export interface EnhancedDragOptions {
  physics: {
    friction: number;
    elasticity: number;
    springConstant: number;
    damping: number;
    momentumScale: number;
    minVelocity: number;
  };
  gestures: {
    enablePinch: boolean;
    enableRotation: boolean;
    enableHaptics: boolean;
  };
  performance: {
    useRAF: boolean;
    maxFPS: number;
    throttleMS: number;
  };
}

export interface EnhancedDragGestureHandlers {
  onPointerDown: (event: PointerEvent) => void;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: (event: PointerEvent) => void;
  onPointerCancel: (event: PointerEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}

const initialDragState: EnhancedDragState = {
  isDragging: false,
  isReleasing: false,
  isGesturing: false,
  startPosition: { x: 0, y: 0 },
  currentPosition: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  scale: 1,
  rotation: 0,
  energy: 0
};

const defaultOptions: EnhancedDragOptions = {
  physics: {
    friction: 0.85,
    elasticity: 0.3,
    springConstant: 0.1,
    damping: 0.8,
    momentumScale: 0.15,
    minVelocity: 50
  },
  gestures: {
    enablePinch: true,
    enableRotation: false,
    enableHaptics: true
  },
  performance: {
    useRAF: true,
    maxFPS: 60,
    throttleMS: 16
  }
};

export const useEnhancedDragInteraction = (
  elementRef: RefObject<HTMLElement>,
  constraints: DragConstraints,
  options: Partial<EnhancedDragOptions> = {}
) => {
  const opts = { ...defaultOptions, ...options };
  const [dragState, setDragState] = useState<EnhancedDragState>(initialDragState);

  // Performance tracking
  const lastMoveTime = useRef<number>(Date.now());
  const lastPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityHistory = useRef<Array<{ x: number; y: number; time: number }>>([]);
  const frameManager = useRef(createOptimizedRAF());

  // Gesture tracking
  const capturedPointers = useRef<Set<number>>(new Set());
  const gestureState = useRef({
    pinch: { distance: 0, scale: 1 },
    rotation: { angle: 0, rotation: 0 },
    center: { x: 0, y: 0 }
  });

  // Touch tracking for multi-touch gestures
  const touchHistory = useRef<{ [key: string]: Touch }>({});

  // Calculate physics-based acceleration
  const calculateAcceleration = useCallback((
    currentVel: { x: number; y: number },
    previousVel: { x: number; y: number },
    deltaTime: number
  ): { x: number; y: number } => {
    const dt = Math.max(deltaTime, 1);
    return {
      x: (currentVel.x - previousVel.x) / dt * 1000,
      y: (currentVel.y - previousVel.y) / dt * 1000
    };
  }, []);

  // Enhanced velocity calculation with smoothing
  const calculateSmoothedVelocity = useCallback((
    current: { x: number; y: number }
  ): { x: number; y: number } => {
    const now = Date.now();

    // Add current position to history
    velocityHistory.current.push({ ...current, time: now });

    // Keep only last 100ms of history for smoothing
    velocityHistory.current = velocityHistory.current.filter(
      entry => now - entry.time <= 100
    );

    if (velocityHistory.current.length < 2) {
      return { x: 0, y: 0 };
    }

    // Calculate average velocity over recent history
    const samples = velocityHistory.current.slice(-5); // Use last 5 samples
    let totalVelX = 0;
    let totalVelY = 0;
    let weightSum = 0;

    for (let i = 1; i < samples.length; i++) {
      const dt = samples[i].time - samples[i - 1].time;
      if (dt > 0) {
        const weight = 1 / dt; // More recent = higher weight
        const velX = (samples[i].x - samples[i - 1].x) / dt * 1000;
        const velY = (samples[i].y - samples[i - 1].y) / dt * 1000;

        totalVelX += velX * weight;
        totalVelY += velY * weight;
        weightSum += weight;
      }
    }

    return weightSum > 0 ? {
      x: totalVelX / weightSum,
      y: totalVelY / weightSum
    } : { x: 0, y: 0 };
  }, []);

  // Apply enhanced elastic constraints with spring physics
  const applyEnhancedConstraints = useCallback((
    position: { x: number; y: number }
  ): { position: { x: number; y: number }; force: { x: number; y: number } } => {
    const springForce = {
      x: calculateSpringForce(position.x, constraints.left, constraints.right, opts.physics.springConstant, opts.physics.damping),
      y: calculateSpringForce(position.y, constraints.top, constraints.bottom, opts.physics.springConstant, opts.physics.damping)
    };

    // Apply spring force to position
    const adjustedPosition = {
      x: position.x + springForce.x,
      y: position.y + springForce.y
    };

    return { position: adjustedPosition, force: springForce };
  }, [constraints, opts.physics]);

  // Cleanup function
  const cleanup = useCallback(() => {
    frameManager.current.stop();
    capturedPointers.current.clear();
    velocityHistory.current = [];
    touchHistory.current = {};
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Enhanced drag start with gesture detection
  const handleDragStart = useCallback((event: PointerEvent | TouchEvent) => {
    if (!elementRef.current) return;

    event.preventDefault();

    let position: { x: number; y: number };

    if ('touches' in event) {
      // Touch event
      if (event.touches.length === 0) return;
      const touch = event.touches[0];
      position = { x: touch.clientX, y: touch.clientY };

      // Store touch for gesture tracking
      Array.from(event.touches).forEach(touch => {
        touchHistory.current[touch.identifier] = touch;
      });
    } else {
      // Pointer event
      position = getEventPosition(event);
      capturedPointers.current.add(event.pointerId);

      try {
        elementRef.current.setPointerCapture(event.pointerId);
      } catch (e) {
        console.warn('Pointer capture failed:', e);
      }
    }

    // Haptic feedback
    if (opts.gestures.enableHaptics && hapticFeedback.isSupported()) {
      hapticFeedback.light();
    }

    setDragState(prev => ({
      ...prev,
      isDragging: true,
      isReleasing: false,
      startPosition: position,
      currentPosition: position,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      energy: 0
    }));

    lastMoveTime.current = Date.now();
    lastPosition.current = position;
    velocityHistory.current = [{ ...position, time: Date.now() }];

    // Start RAF-based animation loop if enabled
    if (opts.performance.useRAF) {
      frameManager.current.start((_, fps) => {
        // Monitor performance and adjust if needed
        if (fps < opts.performance.maxFPS * 0.8) {
          console.warn(`Performance degradation detected: ${fps}fps`);
        }
      });
    }

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('logo:dragStart', {
      detail: { position, elementRef: elementRef.current }
    }));
  }, [elementRef, opts]);

  // Enhanced drag move with physics and gestures
  const handleDragMove = useCallback((event: PointerEvent | TouchEvent) => {
    if (!dragState.isDragging || !elementRef.current) return;

    event.preventDefault();
    const now = Date.now();
    const deltaTime = now - lastMoveTime.current;

    // Handle multi-touch gestures
    if ('touches' in event && opts.gestures.enablePinch && event.touches.length === 2) {
      const pinchData = detectGestures.detectPinch(event.touches, gestureState.current.pinch);

      if (pinchData.isPinching) {
        setDragState(prev => ({
          ...prev,
          isGesturing: true,
          scale: Math.max(0.5, Math.min(2, prev.scale * pinchData.scale))
        }));

        gestureState.current.pinch.distance = Math.sqrt(
          Math.pow(event.touches[1].clientX - event.touches[0].clientX, 2) +
          Math.pow(event.touches[1].clientY - event.touches[0].clientY, 2)
        );

        // Haptic feedback for pinch
        if (opts.gestures.enableHaptics) {
          hapticFeedback.light();
        }
        return;
      }
    }

    // Get current position
    let position: { x: number; y: number };
    if ('touches' in event && event.touches.length > 0) {
      const touch = event.touches[0];
      position = { x: touch.clientX, y: touch.clientY };
    } else {
      position = getEventPosition(event as PointerEvent);
    }

    // Calculate relative position from start
    const relativePosition = {
      x: position.x - dragState.startPosition.x,
      y: position.y - dragState.startPosition.y
    };

    // Calculate velocity with smoothing
    const velocity = calculateSmoothedVelocity(relativePosition);

    // Calculate acceleration
    const acceleration = calculateAcceleration(velocity, dragState.velocity, deltaTime);

    // Apply enhanced constraints with spring physics
    const { position: constrainedPosition, force } = applyEnhancedConstraints(relativePosition);

    // Calculate energy for visual effects
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    const energy = Math.min(1, speed / 1000); // Normalize to 0-1

    // Frame-rate independent position calculation
    const smoothPosition = opts.performance.useRAF
      ? calculateFrameIndependentPosition(
          dragState.currentPosition,
          constrainedPosition,
          deltaTime,
          0.15
        )
      : constrainedPosition;

    setDragState(prev => ({
      ...prev,
      currentPosition: smoothPosition,
      velocity,
      acceleration,
      energy,
      scale: Math.max(0.98, Math.min(1.1, 1 + energy * 0.05)) // Dynamic scaling based on energy
    }));

    lastMoveTime.current = now;
    lastPosition.current = relativePosition;

    // Dispatch move event with physics data
    window.dispatchEvent(new CustomEvent('logo:dragMove', {
      detail: {
        position: smoothPosition,
        velocity,
        acceleration,
        energy,
        scale: dragState.scale,
        springForce: force
      }
    }));
  }, [dragState, opts, calculateSmoothedVelocity, calculateAcceleration, applyEnhancedConstraints, elementRef]);

  // Enhanced drag end with momentum physics
  const handleDragEnd = useCallback((event: PointerEvent | TouchEvent) => {
    if (!dragState.isDragging || !elementRef.current) return;

    event.preventDefault();

    // Stop RAF loop
    frameManager.current.stop();

    // Calculate momentum-based destination
    const momentumResult = calculateMomentumDestination(
      dragState.currentPosition,
      dragState.velocity,
      {
        friction: opts.physics.friction,
        elasticity: opts.physics.elasticity,
        momentumScale: opts.physics.momentumScale,
        minVelocity: opts.physics.minVelocity
      },
      constraints
    );

    // Clean up pointer/touch tracking
    if ('pointerId' in event) {
      capturedPointers.current.delete(event.pointerId);
      try {
        elementRef.current.releasePointerCapture(event.pointerId);
      } catch (e) {
        // Ignore if already released
      }
    } else {
      touchHistory.current = {};
    }

    // Haptic feedback for release
    if (opts.gestures.enableHaptics && hapticFeedback.isSupported()) {
      if (dragState.energy > 0.5) {
        hapticFeedback.medium(); // Strong release
      } else {
        hapticFeedback.light(); // Gentle release
      }
    }

    setDragState(prev => ({
      ...prev,
      isDragging: false,
      isReleasing: true,
      isGesturing: false
    }));

    // Dispatch end event with enhanced physics data
    window.dispatchEvent(new CustomEvent('logo:dragEnd', {
      detail: {
        destination: momentumResult.destination,
        bounceback: momentumResult.bounceback,
        velocity: dragState.velocity,
        energy: dragState.energy,
        wasReleased: true,
        physicsData: {
          momentum: dragState.velocity,
          springForce: applyEnhancedConstraints(dragState.currentPosition).force
        }
      }
    }));

    // Reset releasing state after animation completes
    setTimeout(() => {
      setDragState(prev => ({
        ...prev,
        isReleasing: false,
        scale: 1,
        rotation: 0,
        energy: 0
      }));
    }, 650); // Match enhanced snap-back duration

  }, [dragState, constraints, opts, applyEnhancedConstraints, elementRef]);

  // Handle pointer/touch cancel
  const handleDragCancel = useCallback((event: PointerEvent | TouchEvent) => {
    if (!dragState.isDragging) return;

    frameManager.current.stop();

    // Clean up tracking
    if ('pointerId' in event) {
      capturedPointers.current.delete(event.pointerId);
      try {
        elementRef.current?.releasePointerCapture(event.pointerId);
      } catch (e) {
        // Ignore
      }
    } else {
      touchHistory.current = {};
    }

    setDragState(prev => ({
      ...prev,
      isDragging: false,
      isReleasing: true,
      isGesturing: false
    }));

    // Return to center on cancel
    window.dispatchEvent(new CustomEvent('logo:dragEnd', {
      detail: {
        destination: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        energy: 0,
        wasReleased: false
      }
    }));

    setTimeout(() => {
      setDragState(prev => ({
        ...prev,
        isReleasing: false,
        scale: 1,
        rotation: 0,
        energy: 0
      }));
    }, 650);
  }, [dragState.isDragging, elementRef]);

  const handlers: EnhancedDragGestureHandlers = {
    onPointerDown: handleDragStart,
    onPointerMove: handleDragMove,
    onPointerUp: handleDragEnd,
    onPointerCancel: handleDragCancel,
    onTouchStart: handleDragStart,
    onTouchMove: handleDragMove,
    onTouchEnd: handleDragEnd
  };

  // Performance monitoring
  const getPerformanceMetrics = useCallback(() => ({
    fps: frameManager.current.getFPS(),
    activePointers: capturedPointers.current.size,
    velocityHistorySize: velocityHistory.current.length,
    isRAFActive: opts.performance.useRAF,
    currentEnergy: dragState.energy,
    gestureState: gestureState.current
  }), [dragState.energy, opts.performance.useRAF]);

  return {
    dragState,
    handlers,
    cleanup,
    getPerformanceMetrics,
    // Advanced control methods
    resetPhysics: () => {
      velocityHistory.current = [];
      setDragState(prev => ({
        ...prev,
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 },
        energy: 0
      }));
    },
    updateConstraints: (newConstraints: DragConstraints) => {
      // Constraints are managed by parent, but we can validate
      const isValid =
        newConstraints.left < newConstraints.right &&
        newConstraints.top < newConstraints.bottom &&
        newConstraints.elasticity >= 0 && newConstraints.elasticity <= 1;

      if (!isValid) {
        console.warn('Invalid constraints provided to enhanced drag interaction');
      }
    }
  };
};