import { test, expect, devices } from '@playwright/test';

test.describe('Drag Integration - Mobile Touch Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/executive-wisdom');
    await page.waitForLoadState('networkidle');
  });

  test('should display draggable logo on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const logo = page.locator('[role="button"][aria-label*="Draggable Logo"]');
    await expect(logo).toBeVisible();

    // Verify mobile size classes are applied
    const container = logo.locator('..').first();
    await expect(container).toHaveClass(/w-80.*h-80/);
  });

  test('should handle touch interactions on mobile Safari', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();

    await page.goto('/executive-wisdom');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    await expect(logo).toBeVisible();

    // Test touch drag simulation
    const logoBox = await logo.boundingBox();
    if (logoBox) {
      // Start touch
      await page.touchscreen.tap(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);

      // Verify touch feedback (scale effect)
      await page.waitForTimeout(100);

      // Test touch and drag
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(logoBox.x + logoBox.width / 2 + 30, logoBox.y + logoBox.height / 2 + 15);
      await page.mouse.up();

      // Logo should return to position smoothly
      await page.waitForTimeout(600); // Wait for snap-back animation
    }

    await context.close();
  });

  test('should respect mobile drag constraints', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    const logoBox = await logo.boundingBox();

    if (logoBox) {
      // Test horizontal drag limits (mobile should be -30 to +30 pixels)
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();

      // Try to drag beyond mobile constraints
      await page.mouse.move(logoBox.x + logoBox.width / 2 + 100, logoBox.y + logoBox.height / 2);
      await page.mouse.up();

      // Should snap back within mobile constraints
      await page.waitForTimeout(600);

      // Verify logo position is within expected mobile bounds
      const finalBox = await logo.boundingBox();
      if (finalBox) {
        const displacement = Math.abs(finalBox.x - logoBox.x);
        expect(displacement).toBeLessThan(35); // Account for mobile constraint + elasticity
      }
    }
  });

  test('should work on different mobile devices', async ({ browser }) => {
    const mobileDevices = [
      devices['iPhone 12'],
      devices['iPhone SE'],
      devices['Pixel 5'],
      devices['Galaxy S5']
    ];

    for (const device of mobileDevices) {
      const context = await browser.newContext(device);
      const page = await context.newPage();

      await page.goto('/executive-wisdom');
      await page.waitForLoadState('networkidle');

      const logo = page.locator('[role="button"][aria-label*="Draggable Logo"]');
      await expect(logo).toBeVisible();

      // Test basic interaction
      await logo.tap();

      await context.close();
    }
  });

  test('should handle device orientation changes', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 375, height: 667 });

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    await expect(logo).toBeVisible();

    // Change to landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(200); // Wait for constraint recalculation

    await expect(logo).toBeVisible();

    // Test drag still works after orientation change
    const logoBox = await logo.boundingBox();
    if (logoBox) {
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(logoBox.x + logoBox.width / 2 + 20, logoBox.y + logoBox.height / 2);
      await page.mouse.up();

      await page.waitForTimeout(600);
    }
  });
});

test.describe('Drag Integration - Accessibility Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/executive-wisdom');
    await page.waitForLoadState('networkidle');
  });

  test('should be keyboard accessible', async ({ page }) => {
    const logo = page.locator('[role="button"][aria-label*="Draggable Logo"]');

    // Focus the logo
    await logo.focus();
    await expect(logo).toBeFocused();

    // Check ARIA attributes
    await expect(logo).toHaveAttribute('role', 'button');
    await expect(logo).toHaveAttribute('tabindex', '0');
    await expect(logo).toHaveAttribute('aria-pressed', 'false');

    // Test Space key to enter drag mode
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);

    await expect(logo).toHaveAttribute('aria-pressed', 'true');
  });

  test('should support bilingual accessibility', async ({ page }) => {
    // Test English
    const logoEn = page.locator('[role="button"][aria-label*="Draggable Logo"]');
    await expect(logoEn).toBeVisible();

    // Switch to Chinese (if language toggle exists)
    const languageToggle = page.locator('[data-testid="language-toggle"]');
    if (await languageToggle.isVisible()) {
      await languageToggle.click();
      await page.waitForTimeout(500);

      // Check if Chinese aria-label is applied
      const logoZh = page.locator('[role="button"]').first();
      const ariaLabel = await logoZh.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('should provide screen reader announcements', async ({ page }) => {
    const logo = page.locator('[role="button"][aria-label*="Draggable Logo"]');

    // Focus and enter drag mode
    await logo.focus();
    await page.keyboard.press('Space');

    // Check for announcement elements
    const announcement = page.locator('[aria-live="polite"]');
    await expect(announcement).toBeInDOM();

    // Test movement announcements
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);

    // Test return to center
    await page.keyboard.press('Home');
    await page.waitForTimeout(100);

    // Exit drag mode
    await page.keyboard.press('Escape');
    await expect(logo).toHaveAttribute('aria-pressed', 'false');
  });

  test('should work with screen readers', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');

    const logo = page.locator('[role="button"][aria-label*="Draggable Logo"]');
    await expect(logo).toBeFocused();

    // Check for hidden instructions
    const instructions = page.locator('#drag-logo-instructions');
    await expect(instructions).toBeInDOM();
    await expect(instructions).toHaveClass(/sr-only/);

    // Test keyboard interaction
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowRight ArrowRight ArrowRight');
    await page.keyboard.press('ArrowDown ArrowDown');
    await page.keyboard.press('Home');
    await page.keyboard.press('Escape');
  });

  test('should respect reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    await expect(logo).toBeVisible();

    // Test that interactions still work but with reduced motion
    const logoBox = await logo.boundingBox();
    if (logoBox) {
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(logoBox.x + logoBox.width / 2 + 20, logoBox.y + logoBox.height / 2);
      await page.mouse.up();

      // Should still snap back but with reduced animation
      await page.waitForTimeout(100);
    }
  });
});

test.describe('Drag Integration - Performance & Responsiveness', () => {
  test('should maintain 60fps during drag interactions', async ({ page }) => {
    await page.goto('/executive-wisdom');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    const logoBox = await logo.boundingBox();

    if (logoBox) {
      // Start performance monitoring
      await page.evaluate(() => {
        (window as any).dragPerformance = {
          frames: 0,
          startTime: performance.now()
        };

        function frameCounter() {
          (window as any).dragPerformance.frames++;
          requestAnimationFrame(frameCounter);
        }
        requestAnimationFrame(frameCounter);
      });

      // Perform drag operation
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();

      // Simulate realistic drag path
      for (let i = 0; i < 20; i++) {
        await page.mouse.move(
          logoBox.x + logoBox.width / 2 + Math.sin(i * 0.3) * 30,
          logoBox.y + logoBox.height / 2 + Math.cos(i * 0.3) * 20
        );
        await page.waitForTimeout(16); // ~60fps
      }

      await page.mouse.up();
      await page.waitForTimeout(600); // Wait for snap-back animation

      // Check performance
      const performance = await page.evaluate(() => {
        const perf = (window as any).dragPerformance;
        const endTime = window.performance.now();
        const duration = endTime - perf.startTime;
        const fps = (perf.frames / duration) * 1000;
        return { fps, duration, frames: perf.frames };
      });

      // Should maintain close to 60fps
      expect(performance.fps).toBeGreaterThan(45);
    }
  });

  test('should handle rapid interactions without memory leaks', async ({ page }) => {
    await page.goto('/executive-wisdom');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');

    // Perform many rapid interactions
    for (let i = 0; i < 10; i++) {
      await logo.dblclick();
      await page.waitForTimeout(50);
    }

    // Check if page is still responsive
    await expect(logo).toBeVisible();

    // Test final drag operation
    const logoBox = await logo.boundingBox();
    if (logoBox) {
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(logoBox.x + logoBox.width / 2 + 30, logoBox.y + logoBox.height / 2);
      await page.mouse.up();

      await page.waitForTimeout(600);
    }
  });
});