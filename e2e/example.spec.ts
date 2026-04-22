import { test, expect } from '@playwright/test';

test('homepage renders the heading', async ({ page }) => {
  await page.goto('/');

  const heading = page.getByTestId('heading');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('Agent-ready web app');

  // Save a committed screenshot so it shows up in the PR.
  // Reference it in the PR description with a raw GitHub URL.
  await page.screenshot({
    path: 'e2e/screenshots/homepage.png',
    fullPage: true,
  });
});
