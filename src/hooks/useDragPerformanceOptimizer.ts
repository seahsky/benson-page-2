import { useEffect, useRef, useCallback, useState } from 'react';
import { createOptimizedRAF } from '@/lib/dragUtils';

export interface PerformanceMetrics {
  fps: number;
  avgFrameTime: number;
  droppedFrames: number;
  memoryUsage: number;
  dragLatency: number;
  energyEfficiency: number;
}

export interface PerformanceRecommendations {
  enableReducedMotion: boolean;
  throttleRate: number;
  maxConcurrentAnimations: number;
  useRAF: boolean;
  enableGPUAcceleration: boolean;
  priority: 'performance' | 'quality' | 'balanced';
}

export interface DragPerformanceOptions {
  targetFPS: number;
  maxMemoryMB: number;
  enableAdaptiveOptimization: boolean;
  reportingInterval: number;
  enableLogging: boolean;
}

const defaultOptions: DragPerformanceOptions = {
  targetFPS: 60,
  maxMemoryMB: 100,
  enableAdaptiveOptimization: true,
  reportingInterval: 1000,
  enableLogging: false
};

export const useDragPerformanceOptimizer = (
  options: Partial<DragPerformanceOptions> = {}
) => {
  const opts = { ...defaultOptions, ...options };

  // Performance tracking state
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    avgFrameTime: 16.67,
    droppedFrames: 0,
    memoryUsage: 0,
    dragLatency: 0,
    energyEfficiency: 1
  });

  const [recommendations, setRecommendations] = useState<PerformanceRecommendations>({
    enableReducedMotion: false,
    throttleRate: 16,
    maxConcurrentAnimations: 6,
    useRAF: true,
    enableGPUAcceleration: true,
    priority: 'balanced'
  });

  // Performance monitoring refs
  const rafManager = useRef(createOptimizedRAF());
  const frameHistory = useRef<number[]>([]);
  const dragStartTimes = useRef<Map<string, number>>(new Map());
  const lastOptimizationTime = useRef<number>(0);

  // Memory usage tracking
  const getMemoryUsage = useCallback((): number => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      return memInfo.usedJSHeapSize / (1024 * 1024); // Convert to MB
    }
    return 0;
  }, []);

  // Device capability detection
  const detectDeviceCapabilities = useCallback(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 8;
    const pixelRatio = window.devicePixelRatio || 1;
    const isHighDPI = pixelRatio >= 2;
    const isLowEndDevice = cores <= 2 || memory <= 4;

    // Check for GPU acceleration support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!gl;

    return {
      cores,
      memory,
      pixelRatio,
      isHighDPI,
      isLowEndDevice,
      hasWebGL,
      isMobile: /Mobi|Android/i.test(navigator.userAgent)
    };
  }, []);

  // Calculate performance score based on current metrics
  const calculatePerformanceScore = useCallback((currentMetrics: PerformanceMetrics): number => {
    const fpsScore = Math.min(currentMetrics.fps / opts.targetFPS, 1);
    const memoryScore = Math.max(0, 1 - (currentMetrics.memoryUsage / opts.maxMemoryMB));
    const latencyScore = Math.max(0, 1 - (currentMetrics.dragLatency / 50)); // Target <50ms latency
    const droppedFrameScore = Math.max(0, 1 - (currentMetrics.droppedFrames / 10)); // Target <10 dropped frames per second

    return (fpsScore * 0.4 + memoryScore * 0.2 + latencyScore * 0.3 + droppedFrameScore * 0.1);
  }, [opts.targetFPS, opts.maxMemoryMB]);

  // Generate optimization recommendations based on performance data
  const generateRecommendations = useCallback((
    currentMetrics: PerformanceMetrics,
    deviceCapabilities: ReturnType<typeof detectDeviceCapabilities>
  ): PerformanceRecommendations => {
    const performanceScore = calculatePerformanceScore(currentMetrics);

    let priority: 'performance' | 'quality' | 'balanced' = 'balanced';
    let enableReducedMotion = false;
    let throttleRate = 16;
    let maxConcurrentAnimations = 6;
    let useRAF = true;
    let enableGPUAcceleration = true;

    // Adjust based on performance score
    if (performanceScore < 0.6) {
      priority = 'performance';
      enableReducedMotion = true;
      throttleRate = 33; // 30fps
      maxConcurrentAnimations = 3;
      enableGPUAcceleration = deviceCapabilities.hasWebGL;
    } else if (performanceScore < 0.8) {
      priority = 'balanced';
      throttleRate = 20; // 50fps
      maxConcurrentAnimations = 4;
    } else {
      priority = 'quality';
      throttleRate = 16; // 60fps
      maxConcurrentAnimations = 8;
    }

    // Device-specific adjustments
    if (deviceCapabilities.isLowEndDevice) {
      enableReducedMotion = true;
      throttleRate = Math.max(throttleRate, 33);
      maxConcurrentAnimations = Math.min(maxConcurrentAnimations, 2);
    }

    if (deviceCapabilities.isMobile) {
      maxConcurrentAnimations = Math.min(maxConcurrentAnimations, 4);
      throttleRate = Math.max(throttleRate, 20);
    }

    // High DPI adjustments
    if (deviceCapabilities.isHighDPI) {
      throttleRate = Math.max(throttleRate, 20);
    }

    // Memory pressure adjustments
    if (currentMetrics.memoryUsage > opts.maxMemoryMB * 0.8) {
      enableReducedMotion = true;
      maxConcurrentAnimations = Math.min(maxConcurrentAnimations, 2);
    }

    return {
      enableReducedMotion,
      throttleRate,
      maxConcurrentAnimations,
      useRAF,
      enableGPUAcceleration,
      priority
    };
  }, [calculatePerformanceScore, opts.maxMemoryMB]);

  // Start performance monitoring
  const startMonitoring = useCallback(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let droppedFrames = 0;

    rafManager.current.start((deltaTime, fps) => {
      frameCount++;

      // Track frame timing
      frameHistory.current.push(deltaTime);
      if (frameHistory.current.length > 60) {
        frameHistory.current.shift();
      }

      // Count dropped frames (frames that took longer than 20ms)
      if (deltaTime > 20) {
        droppedFrames++;
      }

      // Update metrics every second
      const now = performance.now();
      if (now - lastTime >= opts.reportingInterval) {
        const avgFrameTime = frameHistory.current.reduce((a, b) => a + b, 0) / frameHistory.current.length;
        const memoryUsage = getMemoryUsage();

        const newMetrics: PerformanceMetrics = {
          fps,
          avgFrameTime,
          droppedFrames,
          memoryUsage,
          dragLatency: metrics.dragLatency, // Updated separately
          energyEfficiency: Math.min(1, opts.targetFPS / Math.max(fps, 1))
        };

        setMetrics(newMetrics);

        // Generate new recommendations if needed
        if (opts.enableAdaptiveOptimization && now - lastOptimizationTime.current > 5000) {
          const deviceCapabilities = detectDeviceCapabilities();
          const newRecommendations = generateRecommendations(newMetrics, deviceCapabilities);
          setRecommendations(newRecommendations);
          lastOptimizationTime.current = now;

          if (opts.enableLogging) {
            console.log('Performance Optimization Update:', {
              metrics: newMetrics,
              recommendations: newRecommendations,
              score: calculatePerformanceScore(newMetrics)
            });
          }
        }

        // Reset counters
        droppedFrames = 0;
        lastTime = now;
      }
    });
  }, [opts, metrics.dragLatency, getMemoryUsage, generateRecommendations, detectDeviceCapabilities, calculatePerformanceScore]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    rafManager.current.stop();
  }, []);

  // Track drag interaction latency
  const trackDragStart = useCallback((dragId: string) => {
    dragStartTimes.current.set(dragId, performance.now());
  }, []);

  const trackDragEnd = useCallback((dragId: string) => {
    const startTime = dragStartTimes.current.get(dragId);
    if (startTime) {
      const latency = performance.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        dragLatency: latency
      }));
      dragStartTimes.current.delete(dragId);
    }
  }, []);

  // Get optimized animation settings based on current recommendations
  const getOptimizedSettings = useCallback(() => {
    return {
      animationDuration: recommendations.enableReducedMotion ? 200 : 400,
      easing: recommendations.enableReducedMotion ? 'easeOut' : 'easeOutElastic',
      useTransform3d: recommendations.enableGPUAcceleration,
      throttleMs: recommendations.throttleRate,
      maxConcurrentAnimations: recommendations.maxConcurrentAnimations,
      willChange: recommendations.priority === 'performance' ? 'transform' : 'auto'
    };
  }, [recommendations]);

  // Force performance optimization
  const forceOptimization = useCallback(() => {
    const deviceCapabilities = detectDeviceCapabilities();
    const newRecommendations = generateRecommendations(metrics, deviceCapabilities);
    setRecommendations(newRecommendations);
    lastOptimizationTime.current = performance.now();

    if (opts.enableLogging) {
      console.log('Forced Performance Optimization:', {
        metrics,
        recommendations: newRecommendations,
        score: calculatePerformanceScore(metrics)
      });
    }
  }, [metrics, generateRecommendations, detectDeviceCapabilities, calculatePerformanceScore, opts.enableLogging]);

  // Get performance report
  const getPerformanceReport = useCallback(() => {
    const deviceCapabilities = detectDeviceCapabilities();
    const performanceScore = calculatePerformanceScore(metrics);

    return {
      metrics,
      recommendations,
      deviceCapabilities,
      performanceScore,
      isOptimal: performanceScore > 0.8,
      needsOptimization: performanceScore < 0.6,
      frameHistorySize: frameHistory.current.length,
      activeDragOperations: dragStartTimes.current.size
    };
  }, [metrics, recommendations, detectDeviceCapabilities, calculatePerformanceScore]);

  // Auto-start monitoring on mount
  useEffect(() => {
    if (opts.enableAdaptiveOptimization) {
      startMonitoring();
      return stopMonitoring;
    }
  }, [opts.enableAdaptiveOptimization, startMonitoring, stopMonitoring]);

  // Initial optimization
  useEffect(() => {
    const deviceCapabilities = detectDeviceCapabilities();
    const initialRecommendations = generateRecommendations(metrics, deviceCapabilities);
    setRecommendations(initialRecommendations);
  }, []);

  return {
    // Current state
    metrics,
    recommendations,
    isMonitoring: rafManager.current !== null,

    // Control methods
    startMonitoring,
    stopMonitoring,
    forceOptimization,

    // Tracking methods
    trackDragStart,
    trackDragEnd,

    // Utility methods
    getOptimizedSettings,
    getPerformanceReport,
    calculatePerformanceScore: (m?: PerformanceMetrics) => calculatePerformanceScore(m || metrics),

    // Performance predicates
    isPerformanceOptimal: () => calculatePerformanceScore(metrics) > 0.8,
    needsOptimization: () => calculatePerformanceScore(metrics) < 0.6,
    shouldReduceMotion: () => recommendations.enableReducedMotion,
    shouldUseRAF: () => recommendations.useRAF,
    shouldEnableGPU: () => recommendations.enableGPUAcceleration
  };
};