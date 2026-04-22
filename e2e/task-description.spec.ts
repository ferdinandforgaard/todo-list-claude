import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('description input is visible in the form', async ({ page }) => {
  await expect(page.getByTestId('todo-description-input')).toBeVisible();
  await expect(page.getByTestId('todo-description-input')).toHaveAttribute(
    'placeholder',
    'Description (optional)',
  );
  await page.screenshot({ path: 'e2e/screenshots/task-description-form.png' });
});

test('adds a todo with a description', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Buy groceries');
  await page.getByTestId('todo-description-input').fill('Milk, eggs, and bread');
  await page.getByTestId('add-todo').click();

  await expect(page.getByTestId('todo-text')).toHaveText('Buy groceries');
  await expect(page.getByTestId('todo-description')).toHaveText('Milk, eggs, and bread');
  await page.screenshot({ path: 'e2e/screenshots/task-description-with-description.png' });
});

test('adds a todo without a description shows no description element', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Walk the dog');
  await page.getByTestId('add-todo').click();

  await expect(page.getByTestId('todo-text')).toHaveText('Walk the dog');
  await expect(page.getByTestId('todo-description')).toHaveCount(0);
  await page.screenshot({ path: 'e2e/screenshots/task-description-without-description.png' });
});

test('clears description input after adding a todo', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Plan trip');
  await page.getByTestId('todo-description-input').fill('Book flights and hotel');
  await page.getByTestId('add-todo').click();

  await expect(page.getByTestId('todo-description-input')).toHaveValue('');
});

test('only described todos show a description element', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Task with description');
  await page.getByTestId('todo-description-input').fill('Some details here');
  await page.getByTestId('add-todo').click();

  await page.getByTestId('todo-input').fill('Task without description');
  await page.getByTestId('add-todo').click();

  const items = page.getByTestId('todo-item');
  await expect(items).toHaveCount(2);
  await expect(items.first().getByTestId('todo-description')).toHaveText('Some details here');
  await expect(items.last().getByTestId('todo-description')).toHaveCount(0);

  await page.screenshot({ path: 'e2e/screenshots/task-description-mixed.png' });
});
