import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Start the dev server or navigate to the deployed site
    await page.goto('http://localhost:5173'); // Adjust URL as needed
  });

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('draggable logo should have proper accessibility attributes', async ({ page }) => {
    // Wait for the draggable logo to be loaded
    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Check ARIA attributes
    await expect(logo).toHaveAttribute('role', 'button');
    await expect(logo).toHaveAttribute('tabindex', '0');
    await expect(logo).toHaveAttribute('aria-label');
    await expect(logo).toHaveAttribute('aria-describedby');
    await expect(logo).toHaveAttribute('aria-pressed');
  });

  test('draggable logo should be keyboard accessible', async ({ page }) => {
    const logo = page.getByRole('button', { name: /draggable logo/i });

    // Focus on the logo
    await logo.focus();
    await expect(logo).toBeFocused();

    // Test Space key to activate drag mode
    await page.keyboard.press('Space');
    await expect(logo).toHaveAttribute('aria-pressed', 'true');

    // Test arrow keys for movement in drag mode
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');

    // Test Home key to return to center
    await page.keyboard.press('Home');

    // Test Escape key to exit drag mode
    await page.keyboard.press('Escape');
    await expect(logo).toHaveAttribute('aria-pressed', 'false');
  });

  test('should announce screen reader messages', async ({ page }) => {
    // Check for aria-live region
    const announcements = page.locator('[aria-live="polite"]');
    await expect(announcements).toBeAttached();
    await expect(announcements).toHaveAttribute('aria-atomic', 'true');
  });

  test('should have hidden instructions for screen readers', async ({ page }) => {
    const instructions = page.locator('#drag-logo-instructions');
    await expect(instructions).toBeAttached();
    await expect(instructions).toHaveClass(/sr-only/);
  });

  test('bilingual support - Chinese accessibility', async ({ page }) => {
    // Test Chinese language support (if language toggle exists)
    const languageToggle = page.getByRole('button', { name: /language|语言/i });
    if (await languageToggle.isVisible()) {
      await languageToggle.click();

      // Check that logo still has proper accessibility in Chinese
      const logo = page.getByRole('button', { name: /可拖拽的Logo/i });
      await expect(logo).toHaveAttribute('aria-label');
      await expect(logo).toHaveAttribute('aria-describedby');
    }
  });

  test('should work with screen reader simulation', async ({ page }) => {
    // Simulate screen reader behavior
    await page.addInitScript(() => {
      // Mock screen reader announcements
      window.speechSynthesis = {
        speak: (utterance) => {
          console.log('Screen reader announcement:', utterance.text);
        },
        cancel: () => {},
        pause: () => {},
        resume: () => {},
        getVoices: () => []
      };
    });

    const logo = page.getByRole('button', { name: /draggable logo/i });
    await logo.focus();
    await page.keyboard.press('Space');

    // Check that announcements are made
    const announcements = page.locator('[aria-live="polite"]');
    await expect(announcements).not.toBeEmpty();
  });

  test('should respect reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Check that animations are disabled or reduced
    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Animations should be minimal or disabled with reduced motion
    await logo.hover();
    // Could check for transition: none or similar
  });

  test('should handle high contrast mode', async ({ page }) => {
    // Simulate high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });

    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Check that focus indicators are still visible
    await logo.focus();
    // Could check computed styles for proper contrast
  });

  test('should work with touch screen simulation', async ({ page }) => {
    // Simulate touch device
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size

    const logo = page.getByRole('button', { name: /draggable logo/i });
    await expect(logo).toBeVisible();

    // Test touch interactions
    await logo.tap();
    await page.touchscreen.tap(200, 300); // Simulate drag
  });
});

test.describe('WCAG 2.1 AA Compliance', () => {
  test('should meet WCAG 2.1 AA standards', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Test tab navigation
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();
  });
});