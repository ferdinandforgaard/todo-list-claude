import { test, expect } from '@playwright/test';

test('starts in light mode and switches to dark mode when toggled', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('todo-app-theme', 'light');
  });

  await page.goto('/');

  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');

  const input = page.getByTestId('todo-input');
  const addButton = page.getByTestId('add-todo');
  for (const text of ['Buy milk', 'Walk the dog', 'Read a book']) {
    await input.fill(text);
    await addButton.click();
  }
  await page.getByTestId('todo-checkbox').first().check();

  await page.screenshot({
    path: 'e2e/screenshots/theme-light.png',
    fullPage: true,
  });

  const toggle = page.getByTestId('theme-toggle');
  await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark mode');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');

  await toggle.click();

  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-label', 'Switch to light mode');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await page.waitForTimeout(400);
  await page.screenshot({
    path: 'e2e/screenshots/theme-dark.png',
    fullPage: true,
  });

  await toggle.click();
  await expect(html).toHaveAttribute('data-theme', 'light');
});

test('persists dark mode preference across reloads', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() =>
    window.localStorage.removeItem('todo-app-theme'),
  );
  await page.reload();

  await page.getByTestId('theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByTestId('theme-toggle')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
