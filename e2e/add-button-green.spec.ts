import { test, expect } from '@playwright/test';

test('add button is green', async ({ page }) => {
  await page.goto('/');

  const addButton = page.getByTestId('add-todo');
  await expect(addButton).toBeVisible();
  await expect(addButton).toHaveCSS('background-color', 'rgb(22, 163, 74)');

  await page.screenshot({
    path: 'e2e/screenshots/add-button-green.png',
    fullPage: true,
  });
});
