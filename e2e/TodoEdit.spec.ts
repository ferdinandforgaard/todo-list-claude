import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Add a todo to work with
  await page.getByTestId('todo-input').fill('Buy groceries');
  await page.getByTestId('add-todo').click();
});

test('double-click enters edit mode', async ({ page }) => {
  await page.getByTestId('todo-text').dblclick();
  await expect(page.getByTestId('todo-edit-input')).toBeVisible();
  await expect(page.getByTestId('todo-edit-input')).toHaveValue('Buy groceries');
  await page.screenshot({ path: 'e2e/screenshots/inline-edit-active.png' });
});

test('Enter key saves the edited text', async ({ page }) => {
  await page.getByTestId('todo-text').dblclick();
  const editInput = page.getByTestId('todo-edit-input');
  await editInput.fill('Buy organic groceries');
  await editInput.press('Enter');
  await expect(page.getByTestId('todo-text')).toHaveText('Buy organic groceries');
  await expect(page.getByTestId('todo-edit-input')).not.toBeVisible();
  await page.screenshot({ path: 'e2e/screenshots/inline-edit-saved.png' });
});

test('Escape key cancels the edit', async ({ page }) => {
  await page.getByTestId('todo-text').dblclick();
  const editInput = page.getByTestId('todo-edit-input');
  await editInput.fill('Something else');
  await editInput.press('Escape');
  await expect(page.getByTestId('todo-text')).toHaveText('Buy groceries');
  await expect(page.getByTestId('todo-edit-input')).not.toBeVisible();
  await page.screenshot({ path: 'e2e/screenshots/inline-edit-cancelled.png' });
});

test('blur saves the edited text', async ({ page }) => {
  await page.getByTestId('todo-text').dblclick();
  const editInput = page.getByTestId('todo-edit-input');
  await editInput.fill('Edited on blur');
  // Click elsewhere to trigger blur
  await page.getByTestId('todo-card').click({ position: { x: 240, y: 10 } });
  await expect(page.getByTestId('todo-text')).toHaveText('Edited on blur');
});
