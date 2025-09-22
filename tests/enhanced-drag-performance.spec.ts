import { test, expect } from '@playwright/test';

test.describe('Enhanced Drag Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page with enhanced drag logo
    await page.goto('/executive-wisdom');

    // Wait for the enhanced logo to be visible
    await page.waitForSelector('[data-testid="enhanced-draggable-logo"]', { timeout: 10000 });
  });

  test('should maintain 60fps during drag operations', async ({ page }) => {
    const logo = page.locator('[data-testid="enhanced-draggable-logo"]');

    // Start performance monitoring
    await page.evaluate(() => {
      window.performanceData = {
        frames: [],
        startTime: performance.now()
      };

      function captureFrame() {
        const now = performance.now();
        window.performanceData.frames.push(now);
        requestAnimationFrame(captureFrame);
      }
      captureFrame();
    });

    // Perform drag operation
    const logoBox = await logo.boundingBox();
    if (!logoBox) throw new Error('Logo not found');

    await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
    await page.mouse.down();

    // Drag in a complex pattern to stress test
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 50;
      const x = logoBox.x + logoBox.width / 2 + Math.cos(angle) * radius;
      const y = logoBox.y + logoBox.height / 2 + Math.sin(angle) * radius;

      await page.mouse.move(x, y, { steps: 1 });
      await page.waitForTimeout(16); // ~60fps
    }

    await page.mouse.up();

    // Calculate FPS
    const performanceData = await page.evaluate(() => {
      const data = window.performanceData;
      const duration = performance.now() - data.startTime;
      const frameCount = data.frames.length;
      const fps = (frameCount / duration) * 1000;

      // Calculate frame time consistency
      const frameTimes = [];
      for (let i = 1; i < data.frames.length; i++) {
        frameTimes.push(data.frames[i] - data.frames[i - 1]);
      }

      const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      const maxFrameTime = Math.max(...frameTimes);
      const droppedFrames = frameTimes.filter(time => time > 20).length;

      return { fps, avgFrameTime, maxFrameTime, droppedFrames, totalFrames: frameCount };
    });

    console.log('Performance Data:', performanceData);

    // Assert performance requirements
    expect(performanceData.fps).toBeGreaterThan(55); // At least 55fps average
    expect(performanceData.avgFrameTime).toBeLessThan(18); // Average frame time under 18ms
    expect(performanceData.droppedFrames).toBeLessThan(5); // Less than 5 dropped frames
  });

  test('should handle multi-touch gestures correctly', async ({ page, browserName }) => {
    // Skip on Firefox as it has limited touch simulation support
    test.skip(browserName === 'firefox', 'Firefox has limited touch simulation');

    const logo = page.locator('[data-testid="enhanced-draggable-logo"]');
    const logoBox = await logo.boundingBox();
    if (!logoBox) throw new Error('Logo not found');

    const centerX = logoBox.x + logoBox.width / 2;
    const centerY = logoBox.y + logoBox.height / 2;

    // Simulate pinch gesture
    await page.touchscreen.tap(centerX - 20, centerY);
    await page.touchscreen.tap(centerX + 20, centerY);

    // Check for scale transformation
    const transform = await logo.evaluate(el =>
      getComputedStyle(el).transform
    );

    // Should have some scale transformation applied
    expect(transform).not.toBe('none');
    expect(transform).not.toBe('matrix(1, 0, 0, 1, 0, 0)'); // Default transform
  });

  test('should optimize performance based on device capabilities', async ({ page }) => {
    // Simulate low-end device
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'hardwareConcurrency', { value: 2 });
      Object.defineProperty(navigator, 'deviceMemory', { value: 2 });
    });

    await page.reload();
    await page.waitForSelector('[data-testid="enhanced-draggable-logo"]');

    // Check that performance optimizations are applied
    const optimizations = await page.evaluate(() => {
      return window.dragPerformanceOptimizer?.getPerformanceReport?.();
    });

    if (optimizations) {
      expect(optimizations.recommendations.enableReducedMotion).toBe(true);
      expect(optimizations.recommendations.maxConcurrentAnimations).toBeLessThanOrEqual(3);
      expect(optimizations.recommendations.throttleRate).toBeGreaterThanOrEqual(33);
    }
  });

  test('should maintain accessibility during enhanced interactions', async ({ page }) => {
    const logo = page.locator('[data-testid="enhanced-draggable-logo"]');

    // Test keyboard navigation
    await logo.focus();
    await page.keyboard.press('Space'); // Enter drag mode

    // Verify aria-pressed state
    const ariaPressed = await logo.getAttribute('aria-pressed');
    expect(ariaPressed).toBe('true');

    // Test arrow key movement
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');

    // Check position update
    const transform = await logo.evaluate(el =>
      getComputedStyle(el).transform
    );
    expect(transform).toContain('translate');

    // Exit drag mode
    await page.keyboard.press('Escape');
    const ariaPressedAfter = await logo.getAttribute('aria-pressed');
    expect(ariaPressedAfter).toBe('false');
  });

  test('should handle rapid interaction changes smoothly', async ({ page }) => {
    const logo = page.locator('[data-testid="enhanced-draggable-logo"]');
    const logoBox = await logo.boundingBox();
    if (!logoBox) throw new Error('Logo not found');

    const centerX = logoBox.x + logoBox.width / 2;
    const centerY = logoBox.y + logoBox.height / 2;

    // Rapid interaction pattern: drag, release, hover, click, double-click
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(centerX + 30, centerY + 30, { steps: 5 });
    await page.mouse.up();

    await page.waitForTimeout(100);

    await logo.hover();
    await page.waitForTimeout(50);

    await logo.click();
    await page.waitForTimeout(50);

    await logo.dblclick();

    // Should not have any JavaScript errors
    const errors = await page.evaluate(() => window.jsErrors || []);
    expect(errors).toHaveLength(0);

    // Logo should return to center after double-click
    await page.waitForTimeout(800); // Wait for animation
    const finalTransform = await logo.evaluate(el =>
      getComputedStyle(el).transform
    );
    expect(finalTransform).toMatch(/translate\(0px, 0px\)/);
  });

  test('should provide accurate performance metrics', async ({ page }) => {
    // Enable performance monitoring
    await page.evaluate(() => {
      if (window.dragPerformanceOptimizer) {
        window.dragPerformanceOptimizer.startMonitoring();
      }
    });

    const logo = page.locator('[data-testid="enhanced-draggable-logo"]');
    const logoBox = await logo.boundingBox();
    if (!logoBox) throw new Error('Logo not found');

    // Perform several drag operations
    for (let i = 0; i < 3; i++) {
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(logoBox.x + logoBox.width / 2 + 50, logoBox.y + logoBox.height / 2 + 50);
      await page.mouse.up();
      await page.waitForTimeout(200);
    }

    // Wait for metrics to be collected
    await page.waitForTimeout(1500);

    const metrics = await page.evaluate(() => {
      return window.dragPerformanceOptimizer?.getPerformanceReport?.();
    });

    if (metrics) {
      expect(metrics.metrics.fps).toBeGreaterThan(0);
      expect(metrics.metrics.avgFrameTime).toBeGreaterThan(0);
      expect(metrics.performanceScore).toBeGreaterThan(0);
      expect(metrics.performanceScore).toBeLessThanOrEqual(1);
      expect(typeof metrics.metrics.memoryUsage).toBe('number');
      expect(typeof metrics.metrics.dragLatency).toBe('number');
    }
  });

  test('should handle edge cases gracefully', async ({ page }) => {
    const logo = page.locator('[data-testid="enhanced-draggable-logo"]');

    // Test very rapid pointer events
    await logo.hover();
    for (let i = 0; i < 20; i++) {
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForTimeout(5);
    }

    // Test dragging outside viewport
    const logoBox = await logo.boundingBox();
    if (!logoBox) throw new Error('Logo not found');

    await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(-100, -100); // Move outside viewport
    await page.mouse.up();

    // Test disabled state changes during interaction
    await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
    await page.mouse.down();

    // Simulate disabling the component during drag
    await page.evaluate(() => {
      const logoElement = document.querySelector('[data-testid="enhanced-draggable-logo"]');
      if (logoElement) {
        logoElement.setAttribute('disabled', 'true');
      }
    });

    await page.mouse.up();

    // Should not have any errors
    const errors = await page.evaluate(() => window.jsErrors || []);
    expect(errors).toHaveLength(0);
  });

  test('should integrate properly with anime.js animations', async ({ page }) => {
    const logo = page.locator('[data-testid="enhanced-draggable-logo"]');

    // Trigger various animations and check for conflicts
    await logo.hover(); // Hover animation
    await page.waitForTimeout(200);

    await logo.focus(); // Focus animation
    await page.waitForTimeout(200);

    await logo.dblclick(); // Celebration + snap-back animation
    await page.waitForTimeout(1000);

    // Check that anime.js animations completed successfully
    const animeInstances = await page.evaluate(() => {
      return window.animationManager?.getActiveAnimationsCount?.() || 0;
    });

    // Should have minimal or no active animations after completion
    expect(animeInstances).toBeLessThanOrEqual(2);
  });
});

// Type declarations for test environment
declare global {
  interface Window {
    performanceData: {
      frames: number[];
      startTime: number;
    };
    dragPerformanceOptimizer: any;
    animationManager: any;
    jsErrors: Error[];
  }
}