import { test, expect } from '@playwright/test';

test('user can delete a todo with the trash icon', async ({ page }) => {
  await page.goto('/');

  const input = page.getByTestId('todo-input');
  const addButton = page.getByTestId('add-todo');

  for (const text of ['Buy groceries', 'Walk the dog', 'Write report']) {
    await input.fill(text);
    await addButton.click();
  }

  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(3);

  await page.screenshot({
    path: 'e2e/screenshots/delete-todo-before.png',
    fullPage: true,
  });

  const deleteButtons = page.getByTestId('delete-todo');
  await expect(deleteButtons).toHaveCount(3);
  await deleteButtons.nth(1).click();

  await expect(items).toHaveCount(2);
  await expect(items.nth(0)).toContainText('Buy groceries');
  await expect(items.nth(1)).toContainText('Write report');
  await expect(page.getByText('Walk the dog')).toHaveCount(0);

  await page.screenshot({
    path: 'e2e/screenshots/delete-todo-after.png',
    fullPage: true,
  });

  await page.getByTestId('delete-todo').first().click();
  await page.getByTestId('delete-todo').first().click();
  await expect(items).toHaveCount(0);
});
