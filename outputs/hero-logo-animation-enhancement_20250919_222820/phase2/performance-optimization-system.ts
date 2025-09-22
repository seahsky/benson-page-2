/**
 * Performance Optimization System
 * Advanced performance monitoring and optimization for 60fps interactions
 */

export interface PerformanceConfig {
  targetFPS: number;
  maxMemoryMB: number;
  enableAdaptiveOptimization: boolean;
  enablePredictiveOptimization: boolean;
  enableBatteryOptimization: boolean;
  reportingInterval: number;
  enableLogging: boolean;
  enableMetrics: boolean;
}

export interface PerformanceMetrics {
  fps: number;
  avgFrameTime: number;
  droppedFrames: number;
  memoryUsage: number;
  cpuUsage: number;
  batteryLevel: number;
  interactionLatency: number;
  renderLatency: number;
  energyEfficiency: number;
  thermalState: 'normal' | 'warm' | 'hot';
}

export interface OptimizationRecommendations {
  enableReducedMotion: boolean;
  throttleRate: number;
  maxConcurrentAnimations: number;
  useRAF: boolean;
  enableGPUAcceleration: boolean;
  enableWillChange: boolean;
  enableSubpixelAntiAliasing: boolean;
  priority: 'performance' | 'quality' | 'balanced';
  qualityLevel: number; // 0.0 to 1.0
}

export interface DeviceCapabilities {
  cores: number;
  memory: number;
  pixelRatio: number;
  isHighDPI: boolean;
  isLowEndDevice: boolean;
  hasWebGL: boolean;
  hasWebGL2: boolean;
  isMobile: boolean;
  supportsOffscreenCanvas: boolean;
  supportsIntersectionObserver: boolean;
  supportsPerformanceObserver: boolean;
}

export class PerformanceOptimizationSystem {
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics;
  private recommendations: OptimizationRecommendations;
  private deviceCapabilities: DeviceCapabilities;

  // Performance monitoring
  private performanceObserver: PerformanceObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private frameHistory: number[] = [];
  private interactionStartTimes: Map<string, number> = new Map();
  private rafId: number | null = null;
  private monitoringActive: boolean = false;

  // Optimization state
  private currentOptimizationLevel: number = 1.0;
  private lastOptimizationTime: number = 0;
  private optimizationCooldown: number = 5000; // 5 seconds

  // Performance thresholds
  private thresholds = {
    criticalFPS: 30,
    warningFPS: 45,
    targetFPS: 60,
    maxMemoryMB: 100,
    maxLatencyMs: 16.67, // 60fps frame time
    batteryLowThreshold: 0.2
  };

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      targetFPS: 60,
      maxMemoryMB: 100,
      enableAdaptiveOptimization: true,
      enablePredictiveOptimization: true,
      enableBatteryOptimization: true,
      reportingInterval: 1000,
      enableLogging: false,
      enableMetrics: true,
      ...config
    };

    this.deviceCapabilities = this.detectDeviceCapabilities();
    this.metrics = this.initializeMetrics();
    this.recommendations = this.generateInitialRecommendations();

    this.initializePerformanceMonitoring();
  }

  /**
   * Detect comprehensive device capabilities
   */
  private detectDeviceCapabilities(): DeviceCapabilities {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 8;
    const pixelRatio = window.devicePixelRatio || 1;
    const isHighDPI = pixelRatio >= 2;
    const isLowEndDevice = cores <= 2 || memory <= 4;

    // WebGL detection
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    const gl2 = canvas.getContext('webgl2');
    const hasWebGL = !!gl;
    const hasWebGL2 = !!gl2;

    // Feature detection
    const supportsOffscreenCanvas = typeof OffscreenCanvas !== 'undefined';
    const supportsIntersectionObserver = typeof IntersectionObserver !== 'undefined';
    const supportsPerformanceObserver = typeof PerformanceObserver !== 'undefined';

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent);

    return {
      cores,
      memory,
      pixelRatio,
      isHighDPI,
      isLowEndDevice,
      hasWebGL,
      hasWebGL2,
      isMobile,
      supportsOffscreenCanvas,
      supportsIntersectionObserver,
      supportsPerformanceObserver
    };
  }

  /**
   * Initialize performance metrics
   */
  private initializeMetrics(): PerformanceMetrics {
    return {
      fps: 60,
      avgFrameTime: 16.67,
      droppedFrames: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      batteryLevel: 1.0,
      interactionLatency: 0,
      renderLatency: 0,
      energyEfficiency: 1.0,
      thermalState: 'normal'
    };
  }

  /**
   * Generate initial optimization recommendations
   */
  private generateInitialRecommendations(): OptimizationRecommendations {
    const capabilities = this.deviceCapabilities;

    return {
      enableReducedMotion: capabilities.isLowEndDevice,
      throttleRate: capabilities.isLowEndDevice ? 33 : 16, // 30fps vs 60fps
      maxConcurrentAnimations: capabilities.isLowEndDevice ? 2 : 6,
      useRAF: true,
      enableGPUAcceleration: capabilities.hasWebGL,
      enableWillChange: !capabilities.isLowEndDevice,
      enableSubpixelAntiAliasing: !capabilities.isHighDPI,
      priority: capabilities.isLowEndDevice ? 'performance' : 'balanced',
      qualityLevel: capabilities.isLowEndDevice ? 0.6 : 1.0
    };
  }

  /**
   * Initialize performance monitoring systems
   */
  private initializePerformanceMonitoring(): void {
    if (this.config.enableMetrics) {
      this.setupFrameRateMonitoring();
      this.setupMemoryMonitoring();
      this.setupBatteryMonitoring();
      this.setupIntersectionObserver();

      if (this.deviceCapabilities.supportsPerformanceObserver) {
        this.setupPerformanceObserver();
      }
    }
  }

  /**
   * Setup frame rate monitoring
   */
  private setupFrameRateMonitoring(): void {
    let frameCount = 0;
    let lastTime = performance.now();
    let droppedFrames = 0;

    const measureFrame = (currentTime: number) => {
      if (!this.monitoringActive) return;

      frameCount++;
      const deltaTime = currentTime - lastTime;

      // Track frame timing
      this.frameHistory.push(deltaTime);
      if (this.frameHistory.length > 60) {
        this.frameHistory.shift();
      }

      // Count dropped frames (frames that took longer than target)
      const targetFrameTime = 1000 / this.config.targetFPS;
      if (deltaTime > targetFrameTime * 1.5) {
        droppedFrames++;
      }

      // Update metrics every second
      if (currentTime - lastTime >= this.config.reportingInterval) {
        const avgFrameTime = this.frameHistory.reduce((a, b) => a + b, 0) / this.frameHistory.length;
        const fps = Math.round(1000 / avgFrameTime);

        this.metrics.fps = fps;
        this.metrics.avgFrameTime = avgFrameTime;
        this.metrics.droppedFrames = droppedFrames;

        this.evaluatePerformance();

        // Reset counters
        droppedFrames = 0;
        lastTime = currentTime;
      }

      this.rafId = requestAnimationFrame(measureFrame);
    };

    this.rafId = requestAnimationFrame(measureFrame);
  }

  /**
   * Setup memory monitoring
   */
  private setupMemoryMonitoring(): void {
    const updateMemoryMetrics = () => {
      if (!this.monitoringActive) return;

      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        this.metrics.memoryUsage = memInfo.usedJSHeapSize / (1024 * 1024); // Convert to MB
      }

      setTimeout(updateMemoryMetrics, this.config.reportingInterval);
    };

    updateMemoryMetrics();
  }

  /**
   * Setup battery monitoring
   */
  private setupBatteryMonitoring(): void {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryMetrics = () => {
          if (!this.monitoringActive) return;

          this.metrics.batteryLevel = battery.level;

          // Adjust optimizations based on battery level
          if (this.config.enableBatteryOptimization && battery.level < this.thresholds.batteryLowThreshold) {
            this.applyBatteryOptimizations();
          }
        };

        battery.addEventListener('levelchange', updateBatteryMetrics);
        battery.addEventListener('chargingchange', updateBatteryMetrics);
        updateBatteryMetrics();
      });
    }
  }

  /**
   * Setup intersection observer for visibility optimization
   */
  private setupIntersectionObserver(): void {
    if (!this.deviceCapabilities.supportsIntersectionObserver) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Optimize based on visibility
          if (entry.isIntersecting) {
            this.onElementVisible();
          } else {
            this.onElementHidden();
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );
  }

  /**
   * Setup performance observer for detailed metrics
   */
  private setupPerformanceObserver(): void {
    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach(entry => {
          if (entry.entryType === 'measure') {
            // Track custom measurements
            this.trackCustomMeasurement(entry.name, entry.duration);
          } else if (entry.entryType === 'navigation') {
            // Track navigation performance
            this.trackNavigationMetrics(entry as PerformanceNavigationTiming);
          }
        });
      });

      this.performanceObserver.observe({
        entryTypes: ['measure', 'navigation', 'paint']
      });
    } catch (error) {
      if (this.config.enableLogging) {
        console.warn('Performance Observer setup failed:', error);
      }
    }
  }

  /**
   * Start performance monitoring
   */
  startMonitoring(): void {
    this.monitoringActive = true;

    if (this.config.enableLogging) {
      console.log('Performance monitoring started');
    }
  }

  /**
   * Stop performance monitoring
   */
  stopMonitoring(): void {
    this.monitoringActive = false;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    if (this.config.enableLogging) {
      console.log('Performance monitoring stopped');
    }
  }

  /**
   * Track interaction start
   */
  trackInteractionStart(interactionId: string): void {
    this.interactionStartTimes.set(interactionId, performance.now());
    performance.mark(`interaction-start-${interactionId}`);
  }

  /**
   * Track interaction end
   */
  trackInteractionEnd(interactionId: string): void {
    const startTime = this.interactionStartTimes.get(interactionId);
    if (startTime) {
      const endTime = performance.now();
      const latency = endTime - startTime;

      performance.mark(`interaction-end-${interactionId}`);
      performance.measure(
        `interaction-${interactionId}`,
        `interaction-start-${interactionId}`,
        `interaction-end-${interactionId}`
      );

      this.metrics.interactionLatency = latency;
      this.interactionStartTimes.delete(interactionId);

      // Check if latency is acceptable
      if (latency > this.thresholds.maxLatencyMs * 2) {
        this.triggerLatencyOptimization();
      }
    }
  }

  /**
   * Evaluate current performance and trigger optimizations
   */
  private evaluatePerformance(): void {
    const now = performance.now();
    if (now - this.lastOptimizationTime < this.optimizationCooldown) {
      return; // Still in cooldown
    }

    const performanceScore = this.calculatePerformanceScore();

    if (performanceScore < 0.6) {
      this.triggerAggressiveOptimization();
    } else if (performanceScore < 0.8) {
      this.triggerModerateOptimization();
    } else if (performanceScore > 0.9 && this.currentOptimizationLevel < 1.0) {
      this.relaxOptimizations();
    }

    this.lastOptimizationTime = now;
  }

  /**
   * Calculate overall performance score
   */
  private calculatePerformanceScore(): number {
    const fpsScore = Math.min(this.metrics.fps / this.config.targetFPS, 1);
    const memoryScore = Math.max(0, 1 - (this.metrics.memoryUsage / this.config.maxMemoryMB));
    const latencyScore = Math.max(0, 1 - (this.metrics.interactionLatency / (this.thresholds.maxLatencyMs * 2)));
    const droppedFrameScore = Math.max(0, 1 - (this.metrics.droppedFrames / 5)); // Target <5 dropped frames

    return (fpsScore * 0.4 + memoryScore * 0.2 + latencyScore * 0.3 + droppedFrameScore * 0.1);
  }

  /**
   * Trigger aggressive optimization
   */
  private triggerAggressiveOptimization(): void {
    this.currentOptimizationLevel = 0.5;

    this.recommendations = {
      ...this.recommendations,
      enableReducedMotion: true,
      throttleRate: 50, // 20fps
      maxConcurrentAnimations: 1,
      enableWillChange: false,
      priority: 'performance',
      qualityLevel: 0.4
    };

    this.applyOptimizations();

    if (this.config.enableLogging) {
      console.log('Aggressive performance optimization applied');
    }
  }

  /**
   * Trigger moderate optimization
   */
  private triggerModerateOptimization(): void {
    this.currentOptimizationLevel = 0.7;

    this.recommendations = {
      ...this.recommendations,
      throttleRate: 33, // 30fps
      maxConcurrentAnimations: 2,
      priority: 'performance',
      qualityLevel: 0.7
    };

    this.applyOptimizations();

    if (this.config.enableLogging) {
      console.log('Moderate performance optimization applied');
    }
  }

  /**
   * Relax optimizations when performance is good
   */
  private relaxOptimizations(): void {
    this.currentOptimizationLevel = Math.min(1.0, this.currentOptimizationLevel + 0.1);

    this.recommendations = {
      ...this.recommendations,
      enableReducedMotion: false,
      throttleRate: 16, // 60fps
      maxConcurrentAnimations: 6,
      enableWillChange: true,
      priority: 'balanced',
      qualityLevel: this.currentOptimizationLevel
    };

    this.applyOptimizations();

    if (this.config.enableLogging) {
      console.log('Performance optimizations relaxed');
    }
  }

  /**
   * Apply battery-specific optimizations
   */
  private applyBatteryOptimizations(): void {
    this.recommendations = {
      ...this.recommendations,
      enableReducedMotion: true,
      throttleRate: 50,
      maxConcurrentAnimations: 1,
      enableGPUAcceleration: false,
      priority: 'performance',
      qualityLevel: 0.5
    };

    this.applyOptimizations();

    if (this.config.enableLogging) {
      console.log('Battery optimization applied');
    }
  }

  /**
   * Trigger optimization for high latency
   */
  private triggerLatencyOptimization(): void {
    // Specific optimizations for reducing interaction latency
    this.recommendations.throttleRate = Math.max(33, this.recommendations.throttleRate + 8);
    this.recommendations.maxConcurrentAnimations = Math.max(1, this.recommendations.maxConcurrentAnimations - 1);

    this.applyOptimizations();

    if (this.config.enableLogging) {
      console.log('Latency optimization applied');
    }
  }

  /**
   * Apply current optimizations
   */
  private applyOptimizations(): void {
    // Dispatch optimization event for components to listen to
    window.dispatchEvent(new CustomEvent('performance:optimization', {
      detail: {
        recommendations: this.recommendations,
        metrics: this.metrics,
        optimizationLevel: this.currentOptimizationLevel
      }
    }));
  }

  /**
   * Handle element becoming visible
   */
  private onElementVisible(): void {
    // Element is visible, can use full quality
    if (this.currentOptimizationLevel > 0.8) {
      this.recommendations.qualityLevel = 1.0;
      this.applyOptimizations();
    }
  }

  /**
   * Handle element becoming hidden
   */
  private onElementHidden(): void {
    // Element is hidden, reduce quality to save resources
    this.recommendations.qualityLevel = 0.3;
    this.applyOptimizations();
  }

  /**
   * Track custom measurement
   */
  private trackCustomMeasurement(name: string, duration: number): void {
    if (name.includes('interaction')) {
      this.metrics.interactionLatency = duration;
    } else if (name.includes('render')) {
      this.metrics.renderLatency = duration;
    }
  }

  /**
   * Track navigation metrics
   */
  private trackNavigationMetrics(entry: PerformanceNavigationTiming): void {
    // Could track page load performance metrics here
  }

  /**
   * Observe element for visibility optimization
   */
  observeElement(element: HTMLElement): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.observe(element);
    }
  }

  /**
   * Stop observing element
   */
  unobserveElement(element: HTMLElement): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(element);
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get current recommendations
   */
  getRecommendations(): OptimizationRecommendations {
    return { ...this.recommendations };
  }

  /**
   * Get device capabilities
   */
  getDeviceCapabilities(): DeviceCapabilities {
    return { ...this.deviceCapabilities };
  }

  /**
   * Get performance report
   */
  getPerformanceReport(): {
    score: number;
    metrics: PerformanceMetrics;
    recommendations: OptimizationRecommendations;
    deviceCapabilities: DeviceCapabilities;
    optimizationLevel: number;
  } {
    return {
      score: this.calculatePerformanceScore(),
      metrics: this.getMetrics(),
      recommendations: this.getRecommendations(),
      deviceCapabilities: this.getDeviceCapabilities(),
      optimizationLevel: this.currentOptimizationLevel
    };
  }

  /**
   * Force optimization update
   */
  forceOptimization(): void {
    this.lastOptimizationTime = 0; // Reset cooldown
    this.evaluatePerformance();
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Cleanup and stop all monitoring
   */
  cleanup(): void {
    this.stopMonitoring();
    this.interactionStartTimes.clear();
    this.frameHistory = [];
  }
}

export default PerformanceOptimizationSystem;