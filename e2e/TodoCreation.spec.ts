import { test, expect } from '@playwright/test';

test('adds a todo when clicking Add', async ({ page }) => {
  await page.goto('/');

  const input = page.getByTestId('todo-input');
  const addButton = page.getByTestId('add-todo');

  await input.fill('Buy milk');
  await addButton.click();

  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(1);
  await expect(items.first()).toHaveText('Buy milk');
  await expect(input).toHaveValue('');

  await page.screenshot({
    path: 'e2e/screenshots/todo-creation-click-add.png',
    fullPage: true,
  });
});

test('adds a todo when pressing Enter', async ({ page }) => {
  await page.goto('/');

  const input = page.getByTestId('todo-input');

  await input.fill('Walk the dog');
  await input.press('Enter');

  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(1);
  await expect(items.first()).toHaveText('Walk the dog');
  await expect(input).toHaveValue('');
});

test('appends multiple todos in order', async ({ page }) => {
  await page.goto('/');

  const input = page.getByTestId('todo-input');
  const addButton = page.getByTestId('add-todo');

  for (const text of ['First task', 'Second task', 'Third task']) {
    await input.fill(text);
    await addButton.click();
  }

  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(3);
  await expect(items.nth(0)).toHaveText('First task');
  await expect(items.nth(1)).toHaveText('Second task');
  await expect(items.nth(2)).toHaveText('Third task');

  await page.screenshot({
    path: 'e2e/screenshots/todo-creation-multiple.png',
    fullPage: true,
  });
});

test('ignores empty and whitespace-only input', async ({ page }) => {
  await page.goto('/');

  const input = page.getByTestId('todo-input');
  const addButton = page.getByTestId('add-todo');

  await addButton.click();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  await input.fill('   ');
  await addButton.click();
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  await input.fill('');
  await input.press('Enter');
  await expect(page.getByTestId('todo-item')).toHaveCount(0);

  await page.screenshot({
    path: 'e2e/screenshots/todo-creation-empty-ignored.png',
    fullPage: true,
  });
});
