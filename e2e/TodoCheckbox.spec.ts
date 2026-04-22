import { test, expect } from '@playwright/test';

test('todo items can be checked off to strike through text', async ({ page }) => {
  await page.goto('/');

  const input = page.getByTestId('todo-input');
  const addButton = page.getByTestId('add-todo');

  await input.fill('Buy groceries');
  await addButton.click();
  await input.fill('Walk the dog');
  await addButton.click();

  const checkboxes = page.getByTestId('todo-checkbox');
  await expect(checkboxes).toHaveCount(2);

  const items = page.getByTestId('todo-item');
  const firstText = items.nth(0).getByTestId('todo-text');
  const secondText = items.nth(1).getByTestId('todo-text');

  await expect(firstText).toHaveCSS('text-decoration', /none/);

  await page.screenshot({
    path: 'e2e/screenshots/todo-checkbox-unchecked.png',
    fullPage: true,
  });

  await checkboxes.nth(0).check();
  await expect(checkboxes.nth(0)).toBeChecked();
  await expect(firstText).toHaveCSS('text-decoration', /line-through/);
  await expect(secondText).toHaveCSS('text-decoration', /none/);

  await page.screenshot({
    path: 'e2e/screenshots/todo-checkbox-checked.png',
    fullPage: true,
  });

  await checkboxes.nth(0).uncheck();
  await expect(checkboxes.nth(0)).not.toBeChecked();
  await expect(firstText).toHaveCSS('text-decoration', /none/);
});
