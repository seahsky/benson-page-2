import { test, expect } from '@playwright/test';

test.describe('Performance Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Enable performance monitoring
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  });

  test('should meet Core Web Vitals standards', async ({ page }) => {
    // Measure Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const vitals: Record<string, number> = {};

          entries.forEach((entry) => {
            if (entry.entryType === 'paint') {
              if (entry.name === 'first-contentful-paint') {
                vitals.fcp = entry.startTime;
              }
            }
            if (entry.entryType === 'largest-contentful-paint') {
              vitals.lcp = entry.startTime;
            }
            if (entry.entryType === 'layout-shift') {
              if (!vitals.cls) vitals.cls = 0;
              vitals.cls += (entry as any).value;
            }
          });

          // Also measure from navigation timing
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          vitals.domContentLoaded = navigation.domContentLoadedEventStart - navigation.navigationStart;
          vitals.loadComplete = navigation.loadEventStart - navigation.navigationStart;

          setTimeout(() => resolve(vitals), 2000); // Wait for measurements
        });

        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
      });
    });

    console.log('Core Web Vitals:', vitals);

    // Assert performance targets
    expect(vitals.fcp).toBeLessThan(1500); // FCP < 1.5s
    expect(vitals.lcp).toBeLessThan(2500); // LCP < 2.5s
    expect(vitals.cls).toBeLessThan(0.1);  // CLS < 0.1
  });

  test('should load quickly on mobile devices', async ({ page, browserName }) => {
    // Simulate mobile device
    await page.setViewportSize({ width: 375, height: 667 });

    // Throttle network to simulate 3G
    const client = await page.context().newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
      uploadThroughput: 750 * 1024 / 8, // 750 Kbps
      latency: 300 // 300ms
    });

    const startTime = Date.now();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    console.log(`Mobile load time (${browserName}):`, loadTime, 'ms');
    expect(loadTime).toBeLessThan(5000); // Should load in under 5 seconds on mobile
  });

  test('drag interactions should maintain 60fps', async ({ page }) => {
    // Navigate to page and wait for logo
    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Measure frame rate during drag
    const frameData = await page.evaluate(async () => {
      const frames: number[] = [];
      let animationId: number;
      let startTime = performance.now();

      const measureFrame = () => {
        const currentTime = performance.now();
        const frameTime = currentTime - startTime;
        frames.push(frameTime);
        startTime = currentTime;

        if (frames.length < 60) { // Measure for ~1 second
          animationId = requestAnimationFrame(measureFrame);
        }
      };

      // Start measuring
      animationId = requestAnimationFrame(measureFrame);

      // Simulate drag interaction
      const logoElement = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (logoElement) {
        // Simulate pointer events
        logoElement.dispatchEvent(new PointerEvent('pointerdown', {
          clientX: 100,
          clientY: 100,
          pointerId: 1
        }));

        // Simulate movement
        for (let i = 0; i < 30; i++) {
          await new Promise(resolve => requestAnimationFrame(resolve));
          logoElement.dispatchEvent(new PointerEvent('pointermove', {
            clientX: 100 + i,
            clientY: 100 + i,
            pointerId: 1
          }));
        }

        logoElement.dispatchEvent(new PointerEvent('pointerup', {
          clientX: 130,
          clientY: 130,
          pointerId: 1
        }));
      }

      // Wait for measurements to complete
      await new Promise(resolve => setTimeout(resolve, 1100));

      return frames;
    });

    // Calculate average FPS
    const averageFrameTime = frameData.reduce((sum, time) => sum + time, 0) / frameData.length;
    const fps = 1000 / averageFrameTime;

    console.log('Average FPS during drag:', fps);
    expect(fps).toBeGreaterThan(50); // Should maintain at least 50fps
  });

  test('should have optimized bundle sizes', async ({ page }) => {
    // Measure resource sizes
    const resourceSizes = await page.evaluate(() => {
      return Array.from(performance.getEntriesByType('resource'))
        .map((entry: PerformanceResourceTiming) => ({
          name: entry.name,
          size: entry.transferSize,
          type: entry.initiatorType
        }))
        .filter(resource => resource.name.includes('assets/'));
    });

    console.log('Resource sizes:', resourceSizes);

    // Check total bundle size
    const totalSize = resourceSizes.reduce((sum, resource) => sum + resource.size, 0);
    console.log('Total bundle size:', totalSize / 1024, 'KB');

    expect(totalSize).toBeLessThan(500 * 1024); // < 500KB total
  });

  test('should handle memory efficiently during extended drag sessions', async ({ page }) => {
    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Measure memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;
    });

    // Perform extended drag session
    await page.evaluate(async () => {
      const logoElement = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (logoElement) {
        // Simulate 100 drag operations
        for (let session = 0; session < 100; session++) {
          logoElement.dispatchEvent(new PointerEvent('pointerdown', {
            clientX: 100,
            clientY: 100,
            pointerId: 1
          }));

          // Multiple moves per session
          for (let i = 0; i < 10; i++) {
            await new Promise(resolve => requestAnimationFrame(resolve));
            logoElement.dispatchEvent(new PointerEvent('pointermove', {
              clientX: 100 + Math.random() * 100,
              clientY: 100 + Math.random() * 100,
              pointerId: 1
            }));
          }

          logoElement.dispatchEvent(new PointerEvent('pointerup', {
            clientX: 150,
            clientY: 150,
            pointerId: 1
          }));

          // Short pause between sessions
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }
    });

    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;
    });

    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      console.log('Memory increase after extended drag:', memoryIncrease / 1024 / 1024, 'MB');

      // Should not leak more than 10MB
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    }
  });

  test('touch interaction latency should be minimal', async ({ page }) => {
    // Simulate touch device
    await page.setViewportSize({ width: 375, height: 667 });

    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Measure touch response time
    const touchLatency = await page.evaluate(async () => {
      const logoElement = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (!logoElement) return 0;

      const latencies: number[] = [];

      for (let i = 0; i < 10; i++) {
        const startTime = performance.now();

        logoElement.dispatchEvent(new TouchEvent('touchstart', {
          touches: [{
            clientX: 100,
            clientY: 100,
            identifier: 1
          } as Touch]
        } as TouchEventInit));

        // Wait for next frame
        await new Promise(resolve => requestAnimationFrame(resolve));

        const endTime = performance.now();
        latencies.push(endTime - startTime);

        logoElement.dispatchEvent(new TouchEvent('touchend', {
          changedTouches: [{
            clientX: 100,
            clientY: 100,
            identifier: 1
          } as Touch]
        } as TouchEventInit));

        await new Promise(resolve => setTimeout(resolve, 100));
      }

      return latencies;
    });

    const averageLatency = touchLatency.reduce((sum, lat) => sum + lat, 0) / touchLatency.length;
    console.log('Average touch latency:', averageLatency, 'ms');

    expect(averageLatency).toBeLessThan(100); // Should respond within 100ms
  });

  test('should maintain performance across different devices', async ({ page }) => {
    const devices = [
      { width: 375, height: 667, name: 'Mobile' },   // iPhone SE
      { width: 768, height: 1024, name: 'Tablet' },  // iPad
      { width: 1920, height: 1080, name: 'Desktop' } // Desktop
    ];

    for (const device of devices) {
      await page.setViewportSize({ width: device.width, height: device.height });

      const startTime = Date.now();
      await page.reload({ waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;

      console.log(`${device.name} load time:`, loadTime, 'ms');

      // Performance targets per device type
      const maxLoadTime = device.name === 'Mobile' ? 3000 :
                         device.name === 'Tablet' ? 2500 : 2000;

      expect(loadTime).toBeLessThan(maxLoadTime);

      // Test drag performance on each device
      const logo = page.getByRole('button', { name: /draggable logo/i });
      if (await logo.isVisible()) {
        await logo.hover();
        await page.mouse.down();
        await page.mouse.move(device.width / 2, device.height / 2);
        await page.mouse.up();

        // Should complete drag smoothly without blocking
        await expect(logo).toBeVisible();
      }
    }
  });
});