import { test, expect } from '@playwright/test';

test('todo app shell renders the card, input, and add button', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Todos' })).toBeVisible();

  const input = page.getByTestId('todo-input');
  await expect(input).toBeVisible();
  await expect(input).toHaveAttribute('placeholder', 'What needs doing?');

  const addButton = page.getByTestId('add-todo');
  await expect(addButton).toBeVisible();
  await expect(addButton).toHaveText('Add');

  await page.screenshot({
    path: 'e2e/screenshots/todo-app-shell.png',
    fullPage: true,
  });
});
