import { test, expect } from '@playwright/test';

test.describe('due date', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('due date input is present in the form', async ({ page }) => {
    await expect(page.getByTestId('due-date-input')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/due-date-input.png' });
  });

  test('adds a todo with a due date and displays it', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Write report');
    await page.getByTestId('due-date-input').fill('2026-05-15');
    await page.getByTestId('add-todo').click();

    const item = page.getByTestId('todo-item');
    await expect(item).toBeVisible();
    await expect(item.getByTestId('todo-due-date')).toHaveText('Due May 15, 2026');
    await page.screenshot({ path: 'e2e/screenshots/due-date-displayed.png' });
  });

  test('adds a todo without a due date shows no due date label', async ({ page }) => {
    await page.getByTestId('todo-input').fill('No deadline task');
    await page.getByTestId('add-todo').click();

    const item = page.getByTestId('todo-item');
    await expect(item).toBeVisible();
    await expect(item.getByTestId('todo-due-date')).toHaveCount(0);
  });

  test('overdue todo has overdue styling', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Past deadline task');
    await page.getByTestId('due-date-input').fill('2025-01-01');
    await page.getByTestId('add-todo').click();

    const dueDate = page.getByTestId('todo-due-date');
    await expect(dueDate).toHaveText('Due Jan 1, 2025');
    await expect(dueDate).toHaveClass(/todo-due-date--overdue/);
    await page.screenshot({ path: 'e2e/screenshots/due-date-overdue.png' });
  });

  test('completed overdue todo does not have overdue styling', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Done late task');
    await page.getByTestId('due-date-input').fill('2025-01-01');
    await page.getByTestId('add-todo').click();

    await page.getByTestId('todo-checkbox').click();

    const dueDate = page.getByTestId('todo-due-date');
    await expect(dueDate).not.toHaveClass(/todo-due-date--overdue/);
    await page.screenshot({ path: 'e2e/screenshots/due-date-overdue-completed.png' });
  });

  test('date input clears after adding a todo', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Clear test');
    await page.getByTestId('due-date-input').fill('2026-06-01');
    await page.getByTestId('add-todo').click();

    await expect(page.getByTestId('due-date-input')).toHaveValue('');
  });
});
