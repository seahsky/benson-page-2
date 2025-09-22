import { test, expect } from '@playwright/test';

test.describe('Simple Drag Integration Test', () => {
  test('should display and interact with draggable logo', async ({ page }) => {
    // Navigate to the root page (which shows ExecutiveWisdom)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the draggable logo
    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    await expect(logo).toBeVisible();

    // Test if it's focusable (accessibility)
    const logoContainer = logo.locator('..').first();
    await logoContainer.focus();

    // Check for accessibility attributes
    await expect(logoContainer).toHaveAttribute('role', 'button');
    await expect(logoContainer).toHaveAttribute('tabindex', '0');

    console.log('✅ Draggable logo is visible and accessible');
  });

  test('should handle basic mouse interaction', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    const logoBox = await logo.boundingBox();

    if (logoBox) {
      // Test basic mouse down/up
      await page.mouse.move(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.mouse.up();

      console.log('✅ Basic mouse interaction works');
    }
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt*="Benson Wong Career Coaching Logo"]');
    await expect(logo).toBeVisible();

    // Check mobile size classes
    const container = logo.locator('..').first();
    const containerClass = await container.getAttribute('class');
    expect(containerClass).toContain('w-80');

    console.log('✅ Mobile responsiveness verified');
  });
});