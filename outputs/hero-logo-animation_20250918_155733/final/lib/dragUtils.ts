/**
 * Utility functions for drag interactions
 * Provides common mathematical and helper functions for drag system
 */

// Throttle function for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
};

// Debounce function for resize handlers
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

// Apply elastic constraints - values beyond bounds are dampened
export const applyElasticConstraints = (
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

// Calculate velocity between two points over time
export const calculateVelocity = (
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

// Calculate distance between two points
export const calculateDistance = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Calculate angle between two points in radians
export const calculateAngle = (
  from: { x: number; y: number },
  to: { x: number; y: number }
): number => {
  return Math.atan2(to.y - from.y, to.x - from.x);
};

// Linear interpolation between two values
export const lerp = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

// Smooth step interpolation (ease in/out)
export const smoothStep = (start: number, end: number, progress: number): number => {
  const smoothProgress = progress * progress * (3 - 2 * progress);
  return lerp(start, end, smoothProgress);
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Normalize value from one range to another
export const normalize = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number = 0,
  toMax: number = 1
): number => {
  const normalized = (value - fromMin) / (fromMax - fromMin);
  return toMin + normalized * (toMax - toMin);
};

// Check if point is within rectangular bounds
export const isPointInBounds = (
  point: { x: number; y: number },
  bounds: { left: number; right: number; top: number; bottom: number }
): boolean => {
  return (
    point.x >= bounds.left &&
    point.x <= bounds.right &&
    point.y >= bounds.top &&
    point.y <= bounds.bottom
  );
};

// Calculate the closest point within bounds
export const clampPointToBounds = (
  point: { x: number; y: number },
  bounds: { left: number; right: number; top: number; bottom: number }
): { x: number; y: number } => {
  return {
    x: clamp(point.x, bounds.left, bounds.right),
    y: clamp(point.y, bounds.top, bounds.bottom)
  };
};

// Get spring animation configuration based on interaction type
export const getSpringConfig = (type: 'drag' | 'release' | 'hover' | 'bounce') => {
  const configs = {
    drag: {
      type: "spring" as const,
      damping: 25,
      stiffness: 700,
      mass: 1
    },
    release: {
      type: "spring" as const,
      damping: 20,
      stiffness: 300,
      mass: 0.8
    },
    hover: {
      type: "spring" as const,
      damping: 30,
      stiffness: 400,
      mass: 0.6
    },
    bounce: {
      type: "spring" as const,
      damping: 15,
      stiffness: 400,
      mass: 1.2
    }
  };

  return configs[type];
};

// Calculate momentum-based destination after release
export const calculateMomentumDestination = (
  currentPos: { x: number; y: number },
  velocity: { x: number; y: number },
  friction: number = 0.95,
  bounds?: { left: number; right: number; top: number; bottom: number }
): { x: number; y: number } => {
  // Apply friction to velocity
  const dampedVelocity = {
    x: velocity.x * friction,
    y: velocity.y * friction
  };

  // Project final position based on dampened velocity
  const destination = {
    x: currentPos.x + dampedVelocity.x * 0.1, // Scale down the momentum effect
    y: currentPos.y + dampedVelocity.y * 0.1
  };

  // Clamp to bounds if provided
  if (bounds) {
    return clampPointToBounds(destination, bounds);
  }

  return destination;
};

// Get unified event position from mouse or touch event
export const getEventPosition = (event: MouseEvent | TouchEvent | PointerEvent): { x: number; y: number } => {
  if ('touches' in event && event.touches.length > 0) {
    const touch = event.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  }

  if ('changedTouches' in event && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }

  return { x: (event as MouseEvent | PointerEvent).clientX, y: (event as MouseEvent | PointerEvent).clientY };
};

// Check if device supports touch
export const isTouchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - for older browsers
    navigator.msMaxTouchPoints > 0
  );
};

// Get device pixel ratio for high-DPI displays
export const getDevicePixelRatio = (): number => {
  return window.devicePixelRatio || 1;
};

// Convert relative position to absolute based on element
export const relativeToAbsolute = (
  relativePos: { x: number; y: number },
  element: HTMLElement
): { x: number; y: number } => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + relativePos.x,
    y: rect.top + relativePos.y
  };
};

// Convert absolute position to relative based on element
export const absoluteToRelative = (
  absolutePos: { x: number; y: number },
  element: HTMLElement
): { x: number; y: number } => {
  const rect = element.getBoundingClientRect();
  return {
    x: absolutePos.x - rect.left,
    y: absolutePos.y - rect.top
  };
};

// Performance monitoring utilities
export const createPerformanceMonitor = () => {
  let startTime = 0;
  const measurements: number[] = [];

  return {
    start: () => {
      startTime = performance.now();
    },
    end: () => {
      const duration = performance.now() - startTime;
      measurements.push(duration);
      return duration;
    },
    getAverage: () => {
      if (measurements.length === 0) return 0;
      const sum = measurements.reduce((a, b) => a + b, 0);
      return sum / measurements.length;
    },
    getStats: () => ({
      count: measurements.length,
      average: measurements.length > 0 ? measurements.reduce((a, b) => a + b, 0) / measurements.length : 0,
      min: measurements.length > 0 ? Math.min(...measurements) : 0,
      max: measurements.length > 0 ? Math.max(...measurements) : 0,
      latest: measurements[measurements.length - 1] || 0
    }),
    reset: () => {
      measurements.length = 0;
    }
  };
};

// Request animation frame with fallback
export const requestFrame = (callback: () => void): number => {
  if (typeof requestAnimationFrame !== 'undefined') {
    return requestAnimationFrame(callback);
  }
  // Fallback for environments without requestAnimationFrame
  return setTimeout(callback, 16) as unknown as number;
};

// Cancel animation frame with fallback
export const cancelFrame = (id: number): void => {
  if (typeof cancelAnimationFrame !== 'undefined') {
    cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
};