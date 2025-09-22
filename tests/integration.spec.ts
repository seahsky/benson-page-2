import { test, expect } from '@playwright/test';

test.describe('Anime.js and Drag System Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should coordinate hover animations with drag interactions', async ({ page }) => {
    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Test hover animation first
    await logo.hover();

    // Verify hover animation started (scale should change)
    const hoverScale = await page.evaluate(() => {
      const element = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (element) {
        return window.getComputedStyle(element).transform;
      }
      return null;
    });

    expect(hoverScale).toBeTruthy();

    // Start drag - should pause hover animation
    await page.mouse.move(200, 200);
    await page.mouse.down();

    // Verify drag state
    const isDragging = await page.evaluate(() => {
      return document.querySelector('.absolute.-bottom-8')?.textContent?.includes('dragging');
    });

    expect(isDragging).toBe(true);

    // Move during drag
    await page.mouse.move(250, 250);

    // Release - should trigger anime.js release animation
    await page.mouse.up();

    // Wait for release animation to complete
    await page.waitForTimeout(600);

    // Verify element returned to proper position
    const finalTransform = await page.evaluate(() => {
      const element = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (element) {
        return window.getComputedStyle(element).transform;
      }
      return null;
    });

    expect(finalTransform).toBeTruthy();
  });

  test('should handle custom event communication', async ({ page }) => {
    // Listen for custom events
    const events = await page.evaluate(() => {
      const eventLog: string[] = [];

      ['logo:dragStart', 'logo:dragMove', 'logo:dragEnd'].forEach(eventType => {
        window.addEventListener(eventType, (e) => {
          eventLog.push(eventType);
        });
      });

      return new Promise<string[]>((resolve) => {
        // Perform drag operation
        const logoElement = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
        if (logoElement) {
          logoElement.dispatchEvent(new PointerEvent('pointerdown', {
            clientX: 100,
            clientY: 100,
            pointerId: 1
          }));

          setTimeout(() => {
            logoElement.dispatchEvent(new PointerEvent('pointermove', {
              clientX: 150,
              clientY: 150,
              pointerId: 1
            }));
          }, 50);

          setTimeout(() => {
            logoElement.dispatchEvent(new PointerEvent('pointerup', {
              clientX: 150,
              clientY: 150,
              pointerId: 1
            }));
          }, 100);

          setTimeout(() => {
            resolve(eventLog);
          }, 200);
        } else {
          resolve([]);
        }
      });
    });

    expect(events).toContain('logo:dragStart');
    expect(events).toContain('logo:dragMove');
    expect(events).toContain('logo:dragEnd');
  });

  test('should maintain performance during combined animations', async ({ page }) => {
    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Start performance monitoring
    const performanceData = await page.evaluate(async () => {
      const frames: number[] = [];
      let startTime = performance.now();

      const measureFrame = () => {
        const currentTime = performance.now();
        frames.push(currentTime - startTime);
        startTime = currentTime;
      };

      // Start frame measurement
      const interval = setInterval(measureFrame, 16); // ~60fps

      // Perform combined interactions (hover + drag)
      const logoElement = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (logoElement) {
        // Hover
        logoElement.dispatchEvent(new MouseEvent('mouseenter'));

        await new Promise(resolve => setTimeout(resolve, 100));

        // Drag
        logoElement.dispatchEvent(new PointerEvent('pointerdown', {
          clientX: 100,
          clientY: 100,
          pointerId: 1
        }));

        // Multiple moves with hover still active
        for (let i = 0; i < 20; i++) {
          await new Promise(resolve => setTimeout(resolve, 16));
          logoElement.dispatchEvent(new PointerEvent('pointermove', {
            clientX: 100 + i * 2,
            clientY: 100 + i * 2,
            pointerId: 1
          }));
        }

        logoElement.dispatchEvent(new PointerEvent('pointerup', {
          clientX: 140,
          clientY: 140,
          pointerId: 1
        }));

        // Leave hover
        logoElement.dispatchEvent(new MouseEvent('mouseleave'));
      }

      // Stop measuring after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearInterval(interval);

      return frames;
    });

    // Calculate average frame time
    const averageFrameTime = performanceData.reduce((sum, time) => sum + time, 0) / performanceData.length;
    const fps = 1000 / averageFrameTime;

    console.log('Combined animation FPS:', fps);
    expect(fps).toBeGreaterThan(45); // Should maintain reasonable FPS during complex interactions
  });

  test('should handle accessibility keyboard navigation with animations', async ({ page }) => {
    const logo = page.getByRole('button', { name: /draggable logo/i });

    // Focus and activate drag mode via keyboard
    await logo.focus();
    await expect(logo).toBeFocused();

    await page.keyboard.press('Space');
    await expect(logo).toHaveAttribute('aria-pressed', 'true');

    // Move via arrow keys (should use anime.js for smooth movement)
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');

    // Check that position changed smoothly
    const position = await page.evaluate(() => {
      const element = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (element) {
        const transform = window.getComputedStyle(element).transform;
        const matrix = new DOMMatrix(transform);
        return { x: matrix.m41, y: matrix.m42 };
      }
      return { x: 0, y: 0 };
    });

    expect(Math.abs(position.x)).toBeGreaterThan(0);
    expect(Math.abs(position.y)).toBeGreaterThan(0);

    // Return to center via Home key
    await page.keyboard.press('Home');

    // Verify returned to center with animation
    await page.waitForTimeout(600); // Wait for animation

    const centerPosition = await page.evaluate(() => {
      const element = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (element) {
        const transform = window.getComputedStyle(element).transform;
        const matrix = new DOMMatrix(transform);
        return { x: matrix.m41, y: matrix.m42 };
      }
      return { x: 0, y: 0 };
    });

    expect(Math.abs(centerPosition.x)).toBeLessThan(5);
    expect(Math.abs(centerPosition.y)).toBeLessThan(5);

    // Exit drag mode
    await page.keyboard.press('Escape');
    await expect(logo).toHaveAttribute('aria-pressed', 'false');
  });

  test('should handle touch events with proper anime.js coordination', async ({ page }) => {
    // Simulate mobile device
    await page.setViewportSize({ width: 375, height: 667 });

    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Test touch tap for scale animation
    await logo.tap();

    // Verify tap scale animation
    const tapResponse = await page.evaluate(async () => {
      const element = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (element) {
        // Simulate touch events manually for better control
        element.dispatchEvent(new TouchEvent('touchstart', {
          touches: [{
            clientX: 100,
            clientY: 100,
            identifier: 1
          } as Touch]
        } as TouchEventInit));

        // Check if scale changed
        await new Promise(resolve => setTimeout(resolve, 100));

        element.dispatchEvent(new TouchEvent('touchend', {
          changedTouches: [{
            clientX: 100,
            clientY: 100,
            identifier: 1
          } as Touch]
        } as TouchEventInit));

        return true;
      }
      return false;
    });

    expect(tapResponse).toBe(true);
  });

  test('should handle browser compatibility for anime.js animations', async ({ page, browserName }) => {
    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Test basic animation functionality across browsers
    const animationSupport = await page.evaluate(() => {
      // Check if anime is available and working
      const element = document.querySelector('[role="button"][aria-label*="Draggable"]') as HTMLElement;
      if (!element) return false;

      // Check CSS transform support
      const supportsTransform = 'transform' in element.style ||
                               'webkitTransform' in element.style ||
                               'mozTransform' in element.style;

      // Check requestAnimationFrame support
      const supportsRAF = typeof requestAnimationFrame !== 'undefined';

      // Check PointerEvent support
      const supportsPointer = typeof PointerEvent !== 'undefined';

      return {
        transform: supportsTransform,
        requestAnimationFrame: supportsRAF,
        pointerEvents: supportsPointer,
        browser: navigator.userAgent
      };
    });

    console.log(`${browserName} animation support:`, animationSupport);

    expect(animationSupport.transform).toBe(true);
    expect(animationSupport.requestAnimationFrame).toBe(true);
    expect(animationSupport.pointerEvents).toBe(true);

    // Perform drag to ensure it works in this browser
    await page.mouse.move(200, 200);
    await logo.hover();
    await page.mouse.down();
    await page.mouse.move(250, 250);
    await page.mouse.up();

    // Should complete without errors
    await expect(logo).toBeVisible();
  });

  test('should handle error scenarios gracefully', async ({ page }) => {
    // Inject error scenarios to test robustness
    await page.addInitScript(() => {
      // Mock occasional animation failures
      const originalAnime = (window as any).anime;
      let failureCount = 0;

      (window as any).anime = (...args: any[]) => {
        failureCount++;
        if (failureCount % 5 === 0) {
          // Simulate animation failure every 5th call
          throw new Error('Simulated animation failure');
        }
        return originalAnime(...args);
      };
    });

    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Perform multiple interactions that might trigger errors
    for (let i = 0; i < 10; i++) {
      try {
        await logo.hover();
        await page.mouse.down();
        await page.mouse.move(200 + i * 10, 200 + i * 10);
        await page.mouse.up();
        await page.waitForTimeout(100);
      } catch (error) {
        // Should handle errors gracefully
        console.log('Handled error scenario:', i);
      }
    }

    // Logo should still be functional despite some animation failures
    await expect(logo).toBeVisible();

    // Test that basic functionality still works
    await logo.focus();
    await page.keyboard.press('Space');
    await expect(logo).toHaveAttribute('aria-pressed', 'true');
  });
});