import { useState, useCallback, useRef, useEffect, RefObject } from 'react';

export interface DragState {
  isDragging: boolean;
  isReleasing: boolean;
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
  velocity: { x: number; y: number };
}

export interface DragConstraints {
  left: number;
  right: number;
  top: number;
  bottom: number;
  elasticity: number;
}

export interface DragGestureHandlers {
  onPointerDown: (event: PointerEvent) => void;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: (event: PointerEvent) => void;
  onPointerCancel: (event: PointerEvent) => void;
}

const initialDragState: DragState = {
  isDragging: false,
  isReleasing: false,
  startPosition: { x: 0, y: 0 },
  currentPosition: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 }
};

// Calculate velocity between two points over time
const calculateVelocity = (
  current: { x: number; y: number },
  previous: { x: number; y: number },
  deltaTime: number
): { x: number; y: number } => {
  const dt = Math.max(deltaTime, 1); // Prevent division by zero
  return {
    x: (current.x - previous.x) / dt * 1000, // Convert to pixels per second
    y: (current.y - previous.y) / dt * 1000
  };
};

// Apply elastic constraints - values beyond bounds are dampened
const applyElasticConstraints = (
  value: number,
  min: number,
  max: number,
  elasticity: number = 0.2
): number => {
  if (value < min) {
    return min - (min - value) * elasticity;
  }
  if (value > max) {
    return max + (value - max) * elasticity;
  }
  return value;
};

// Calculate where element should go after release based on velocity
const calculateReleaseDestination = (
  currentPos: { x: number; y: number },
  velocity: { x: number; y: number },
  constraints: DragConstraints
) => {
  // Project movement based on velocity (dampened)
  const projection = {
    x: currentPos.x + velocity.x * 0.1, // Reduced momentum
    y: currentPos.y + velocity.y * 0.1
  };

  // Clamp to constraints - no elastic overshoot on release
  const clamped = {
    x: Math.max(constraints.left, Math.min(constraints.right, projection.x)),
    y: Math.max(constraints.top, Math.min(constraints.bottom, projection.y))
  };

  return clamped;
};

// Get position from pointer event (unified for mouse/touch)
const getEventPosition = (event: PointerEvent): { x: number; y: number } => {
  return { x: event.clientX, y: event.clientY };
};

export const useDragInteraction = (
  elementRef: RefObject<HTMLElement>,
  constraints: DragConstraints
) => {
  const [dragState, setDragState] = useState<DragState>(initialDragState);
  const lastMoveTime = useRef<number>(Date.now());
  const animationFrame = useRef<number | null>(null);
  const capturedPointer = useRef<number | null>(null);

  // Cleanup function for animations and events
  const cleanup = useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    if (capturedPointer.current !== null && elementRef.current) {
      try {
        elementRef.current.releasePointerCapture(capturedPointer.current);
      } catch (e) {
        // Ignore if pointer was already released
      }
      capturedPointer.current = null;
    }
  }, [elementRef]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Drag start handler
  const handleDragStart = useCallback((event: PointerEvent) => {
    if (!elementRef.current) return;

    event.preventDefault();
    const position = getEventPosition(event);

    setDragState({
      isDragging: true,
      isReleasing: false,
      startPosition: position,
      currentPosition: position,
      velocity: { x: 0, y: 0 }
    });

    // Capture pointer for consistent tracking across the screen
    try {
      elementRef.current.setPointerCapture(event.pointerId);
      capturedPointer.current = event.pointerId;
    } catch (e) {
      // Fallback if pointer capture fails
      console.warn('Pointer capture failed:', e);
    }

    lastMoveTime.current = Date.now();

    // Dispatch custom event for coordination with other systems
    window.dispatchEvent(new CustomEvent('logo:dragStart', {
      detail: { position, elementRef: elementRef.current }
    }));
  }, [elementRef]);

  // Drag move handler with constraint checking
  const handleDragMove = useCallback((event: PointerEvent) => {
    if (!dragState.isDragging || !elementRef.current) return;

    event.preventDefault();
    const position = getEventPosition(event);
    const now = Date.now();
    const deltaTime = now - lastMoveTime.current;

    // Calculate relative position from start
    const relativePosition = {
      x: position.x - dragState.startPosition.x,
      y: position.y - dragState.startPosition.y
    };

    // Apply elastic constraints
    const constrainedPosition = {
      x: applyElasticConstraints(relativePosition.x, constraints.left, constraints.right, constraints.elasticity),
      y: applyElasticConstraints(relativePosition.y, constraints.top, constraints.bottom, constraints.elasticity)
    };

    // Calculate velocity for physics
    const velocity = deltaTime > 0
      ? calculateVelocity(constrainedPosition, dragState.currentPosition, deltaTime)
      : dragState.velocity;

    setDragState(prev => ({
      ...prev,
      currentPosition: constrainedPosition,
      velocity
    }));

    lastMoveTime.current = now;

    // Dispatch move event for coordination
    window.dispatchEvent(new CustomEvent('logo:dragMove', {
      detail: { position: constrainedPosition, velocity }
    }));
  }, [dragState.isDragging, dragState.startPosition, dragState.currentPosition, constraints, elementRef]);

  // Drag end with physics-based release
  const handleDragEnd = useCallback((event: PointerEvent) => {
    if (!dragState.isDragging || !elementRef.current) return;

    event.preventDefault();

    const destination = calculateReleaseDestination(
      dragState.currentPosition,
      dragState.velocity,
      constraints
    );

    setDragState(prev => ({
      ...prev,
      isDragging: false,
      isReleasing: true
    }));

    // Release pointer capture
    if (capturedPointer.current !== null) {
      try {
        elementRef.current.releasePointerCapture(capturedPointer.current);
      } catch (e) {
        // Ignore if already released
      }
      capturedPointer.current = null;
    }

    // Dispatch end event with destination for animation coordination
    window.dispatchEvent(new CustomEvent('logo:dragEnd', {
      detail: {
        destination,
        velocity: dragState.velocity,
        wasReleased: true
      }
    }));

    // Reset releasing state after animation completes (estimate)
    setTimeout(() => {
      setDragState(prev => ({ ...prev, isReleasing: false }));
    }, 500); // Should match spring animation duration

  }, [dragState.isDragging, dragState.currentPosition, dragState.velocity, constraints, elementRef]);

  // Handle pointer cancel (e.g., when user leaves screen)
  const handleDragCancel = useCallback((_event: PointerEvent) => {
    if (!dragState.isDragging) return;

    // Same as drag end but without velocity-based destination
    setDragState(prev => ({
      ...prev,
      isDragging: false,
      isReleasing: true
    }));

    // Release pointer capture
    if (capturedPointer.current !== null && elementRef.current) {
      try {
        elementRef.current.releasePointerCapture(capturedPointer.current);
      } catch (e) {
        // Ignore if already released
      }
      capturedPointer.current = null;
    }

    // Return to center on cancel
    window.dispatchEvent(new CustomEvent('logo:dragEnd', {
      detail: {
        destination: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        wasReleased: false
      }
    }));

    setTimeout(() => {
      setDragState(prev => ({ ...prev, isReleasing: false }));
    }, 500);
  }, [dragState.isDragging, elementRef]);

  const handlers: DragGestureHandlers = {
    onPointerDown: handleDragStart,
    onPointerMove: handleDragMove,
    onPointerUp: handleDragEnd,
    onPointerCancel: handleDragCancel
  };

  return {
    dragState,
    handlers,
    cleanup
  };
};