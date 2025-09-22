/**
 * Enhanced Hero Logo Animation Demo
 * Demonstrates the sophisticated visual effects and performance optimizations
 */

import React, { useState, useEffect } from 'react';
import { DraggableHeroLogo } from '../DraggableHeroLogo';
import { animationPerformance } from '@/lib/animations';

export const EnhancedHeroLogoDemo: React.FC = () => {
  const [fps, setFps] = useState<number>(0);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    let fpsMonitor: (() => number) | null = null;
    let interval: NodeJS.Timeout | null = null;

    if (isMonitoring) {
      fpsMonitor = animationPerformance.startFrameRateMonitor();
      interval = setInterval(() => {
        if (fpsMonitor) {
          setFps(fpsMonitor());
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  const deviceOptimization = animationPerformance.optimizeForDevice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced Hero Logo Animation Demo
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Featuring sophisticated visual effects powered by anime.js v4.1.3
          </p>

          {/* Performance Controls */}
          <div className="bg-white rounded-lg p-4 shadow-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Performance Monitoring</h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {isMonitoring ? 'Stop' : 'Start'} FPS Monitor
              </button>
              {isMonitoring && (
                <div className="text-sm font-mono">
                  FPS: {fps} | Active Animations: {animationPerformance.getActiveAnimationsCount()}
                </div>
              )}
            </div>

            {/* Device Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Motion:</strong> {deviceOptimization.reducedMotion ? 'Reduced' : 'Full'}
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>GPU Acceleration:</strong> {deviceOptimization.useGPUAcceleration ? 'ON' : 'OFF'}
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Max Concurrent:</strong> {deviceOptimization.maxConcurrentAnimations}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Enhanced Logo */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Interactive Logo with Enhanced Effects
            </h2>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <DraggableHeroLogo
                src="/images/benson-logo.png"
                alt="Enhanced Benson Wong Career Coaching Logo"
                language="en"
                size={{
                  mobile: "w-64 h-64",
                  tablet: "w-80 h-80",
                  desktop: "w-96 h-96"
                }}
                className="mb-4"
                disabled={false}
                onDragStart={() => {
                  console.log('🎯 Enhanced drag started');
                }}
                onDragEnd={() => {
                  console.log('🎯 Enhanced drag ended');
                }}
              />
            </div>

            <div className="mt-6 text-center text-sm text-gray-600 max-w-md">
              <p className="mb-2">
                <strong>Interaction Guide:</strong>
              </p>
              <ul className="space-y-1 text-left">
                <li>• <strong>Hover:</strong> Shimmer, glow, and micro-bounce effects</li>
                <li>• <strong>Click/Tap:</strong> Celebration animation with color enhancement</li>
                <li>• <strong>Drag:</strong> Smooth real-time follow with elastic snap-back</li>
                <li>• <strong>Double-click:</strong> Celebration + return to center</li>
                <li>• <strong>Focus:</strong> Accessibility ring with subtle glow</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Enhanced Animation Features
            </h2>

            <div className="space-y-4">
              {/* Sophisticated Hover Effects */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  🌟 Sophisticated Hover Effects
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Enhanced Scale:</strong> 1.08x with outQuart easing</li>
                  <li>• <strong>Shimmer Animation:</strong> CSS-powered light sweep effect</li>
                  <li>• <strong>Color Glow:</strong> Dynamic drop-shadow transitions</li>
                  <li>• <strong>Micro-bounce:</strong> Subtle vertical animation for feedback</li>
                  <li>• <strong>Enhanced Rotation:</strong> 3° with outBack easing</li>
                </ul>
              </div>

              {/* Celebration Animations */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  🎉 Celebration Animations
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Click/Tap:</strong> Multi-stage scale and rotation</li>
                  <li>• <strong>Color Enhancement:</strong> Brightness and saturation boost</li>
                  <li>• <strong>Variable Intensity:</strong> Subtle, medium, strong modes</li>
                  <li>• <strong>Elastic Feedback:</strong> Natural spring-back motion</li>
                </ul>
              </div>

              {/* Performance Optimizations */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  ⚡ Performance Optimizations
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>GPU Acceleration:</strong> Hardware-accelerated transforms</li>
                  <li>• <strong>Frame Throttling:</strong> Adaptive 60fps targeting</li>
                  <li>• <strong>Device Detection:</strong> Automatic capability adjustment</li>
                  <li>• <strong>Memory Management:</strong> Animation instance cleanup</li>
                  <li>• <strong>Reduced Motion:</strong> Accessibility preference support</li>
                </ul>
              </div>

              {/* Accessibility Features */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  ♿ Accessibility Features
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Focus States:</strong> Visible ring with smooth transitions</li>
                  <li>• <strong>Keyboard Navigation:</strong> Full interaction support</li>
                  <li>• <strong>Screen Reader:</strong> Announcements and state updates</li>
                  <li>• <strong>Reduced Motion:</strong> Automatic detection and fallbacks</li>
                  <li>• <strong>WCAG 2.1 AA:</strong> Compliant color contrast and sizing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded">
              <strong className="block text-primary mb-2">Animation Library</strong>
              <div>anime.js v4.1.3</div>
              <div>Performance-optimized</div>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <strong className="block text-primary mb-2">Bundle Impact</strong>
              <div>&lt; 10KB additional</div>
              <div>Lazy-loaded effects</div>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <strong className="block text-primary mb-2">Performance</strong>
              <div>60fps targeting</div>
              <div>&lt; 2.5s LCP maintained</div>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <strong className="block text-primary mb-2">Compatibility</strong>
              <div>All modern browsers</div>
              <div>Graceful degradation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroLogoDemo;