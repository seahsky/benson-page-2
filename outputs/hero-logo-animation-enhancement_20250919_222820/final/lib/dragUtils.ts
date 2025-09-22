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

// Enhanced physics-based momentum calculation with realistic physics
export const calculateMomentumDestination = (
  currentPos: { x: number; y: number },
  velocity: { x: number; y: number },
  options: {
    friction?: number;
    elasticity?: number;
    momentumScale?: number;
    minVelocity?: number;
  } = {},
  bounds?: { left: number; right: number; top: number; bottom: number }
): { destination: { x: number; y: number }; bounceback?: { x: number; y: number } } => {
  const {
    friction = 0.85,
    elasticity = 0.3,
    momentumScale = 0.15,
    minVelocity = 50
  } = options;

  // Filter out low velocity to prevent micro-movements
  const filteredVelocity = {
    x: Math.abs(velocity.x) < minVelocity ? 0 : velocity.x,
    y: Math.abs(velocity.y) < minVelocity ? 0 : velocity.y
  };

  // Apply natural physics friction curve
  const dampedVelocity = {
    x: filteredVelocity.x * friction,
    y: filteredVelocity.y * friction
  };

  // Calculate momentum-based destination with physics
  const momentumDestination = {
    x: currentPos.x + dampedVelocity.x * momentumScale,
    y: currentPos.y + dampedVelocity.y * momentumScale
  };

  if (!bounds) {
    return { destination: momentumDestination };
  }

  // Check for boundary collision and calculate bounceback
  const isOutOfBounds = {
    x: momentumDestination.x < bounds.left || momentumDestination.x > bounds.right,
    y: momentumDestination.y < bounds.top || momentumDestination.y > bounds.bottom
  };

  if (isOutOfBounds.x || isOutOfBounds.y) {
    // Calculate clamped position
    const clampedDestination = clampPointToBounds(momentumDestination, bounds);

    // Calculate bounceback effect based on excess velocity
    const excess = {
      x: momentumDestination.x - clampedDestination.x,
      y: momentumDestination.y - clampedDestination.y
    };

    const bounceback = {
      x: clampedDestination.x - excess.x * elasticity,
      y: clampedDestination.y - excess.y * elasticity
    };

    return {
      destination: clampedDestination,
      bounceback: clampPointToBounds(bounceback, bounds)
    };
  }

  return { destination: momentumDestination };
};

// Enhanced spring physics for elastic constraints
export const calculateSpringForce = (
  position: number,
  min: number,
  max: number,
  springConstant: number = 0.1,
  damping: number = 0.8
): number => {
  if (position < min) {
    const distance = min - position;
    return distance * springConstant * damping;
  }
  if (position > max) {
    const distance = position - max;
    return -distance * springConstant * damping;
  }
  return 0;
};

// Natural easing function for smooth transitions
export const easeOutElastic = (t: number): number => {
  const p = 0.3;
  return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
};

// Frame-rate independent drag calculation
export const calculateFrameIndependentPosition = (
  currentPos: { x: number; y: number },
  targetPos: { x: number; y: number },
  deltaTime: number,
  stiffness: number = 0.15
): { x: number; y: number } => {
  // Normalize deltaTime to 16.67ms (60fps)
  const normalizedDelta = deltaTime / 16.67;
  const adjustedStiffness = stiffness * normalizedDelta;

  return {
    x: lerp(currentPos.x, targetPos.x, adjustedStiffness),
    y: lerp(currentPos.y, targetPos.y, adjustedStiffness)
  };
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

// Enhanced RAF with performance monitoring
export const createOptimizedRAF = () => {
  let rafId: number | null = null;
  let isRunning = false;
  let frameCount = 0;
  let lastTime = 0;
  let fps = 60;

  const start = (callback: (deltaTime: number, fps: number) => void) => {
    if (isRunning) return;
    isRunning = true;
    frameCount = 0;
    lastTime = performance.now();

    const frame = (currentTime: number) => {
      if (!isRunning) return;

      const deltaTime = currentTime - lastTime;
      frameCount++;

      // Calculate FPS every 60 frames
      if (frameCount % 60 === 0) {
        fps = Math.round(1000 / (deltaTime / 60));
      }

      callback(deltaTime, fps);
      lastTime = currentTime;
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
  };

  const stop = () => {
    isRunning = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const getFPS = () => fps;

  return { start, stop, getFPS };
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

// Multi-touch gesture detection utilities
export const detectGestures = (() => {
  const PINCH_THRESHOLD = 0.1;
  const ROTATION_THRESHOLD = 5; // degrees

  return {
    detectPinch: (touches: TouchList, previousTouches: { distance: number }): {
      scale: number;
      center: { x: number; y: number };
      isPinching: boolean;
    } => {
      if (touches.length !== 2) {
        return { scale: 1, center: { x: 0, y: 0 }, isPinching: false };
      }

      const touch1 = touches[0];
      const touch2 = touches[1];

      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      const scale = previousTouches.distance > 0 ? currentDistance / previousTouches.distance : 1;
      const isPinching = Math.abs(scale - 1) > PINCH_THRESHOLD;

      const center = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      };

      return { scale, center, isPinching };
    },

    detectRotation: (touches: TouchList, previousTouches: { angle: number }): {
      rotation: number;
      center: { x: number; y: number };
      isRotating: boolean;
    } => {
      if (touches.length !== 2) {
        return { rotation: 0, center: { x: 0, y: 0 }, isRotating: false };
      }

      const touch1 = touches[0];
      const touch2 = touches[1];

      const currentAngle = Math.atan2(
        touch2.clientY - touch1.clientY,
        touch2.clientX - touch1.clientX
      ) * (180 / Math.PI);

      const rotation = previousTouches.angle !== 0 ? currentAngle - previousTouches.angle : 0;
      const isRotating = Math.abs(rotation) > ROTATION_THRESHOLD;

      const center = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      };

      return { rotation, center, isRotating };
    }
  };
})();

// Haptic feedback utilities for supported devices
export const hapticFeedback = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 10, 30]);
    }
  },
  isSupported: () => 'vibrate' in navigator
};

// Performance-optimized viewport utilities
export const viewportUtils = {
  getViewportSize: () => ({
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  }),

  isElementInViewport: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    const viewport = viewportUtils.getViewportSize();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewport.height &&
      rect.right <= viewport.width
    );
  },

  getElementVisibility: (element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    const viewport = viewportUtils.getViewportSize();

    const visibleWidth = Math.min(rect.right, viewport.width) - Math.max(rect.left, 0);
    const visibleHeight = Math.min(rect.bottom, viewport.height) - Math.max(rect.top, 0);

    if (visibleWidth <= 0 || visibleHeight <= 0) return 0;

    const visibleArea = visibleWidth * visibleHeight;
    const totalArea = rect.width * rect.height;

    return totalArea > 0 ? visibleArea / totalArea : 0;
  }
};