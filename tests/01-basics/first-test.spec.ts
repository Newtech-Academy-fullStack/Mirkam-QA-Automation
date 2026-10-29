import { test, expect } from '@playwright/test';

/**
 * LESSON 1: Your first Playwright tests.
 * No Page Objects here: everything is written directly in the test
 * so you can see the raw Playwright API.
 */

test('page has the correct title', async ({ page }) => {
  // 1. Arrange: open the page (baseURL comes from playwright.config.ts)
  await page.goto('/');

  // 2. Assert: check the browser tab title
  await expect(page).toHaveTitle('Swag Labs');
});

test('login form is visible', async ({ page }) => {
  await page.goto('/');

  // Different ways to find (locate) elements:
  const username = page.locator('#user-name');                     // CSS selector
  const password = page.getByPlaceholder('Password');              // by placeholder text
  const loginButton = page.getByRole('button', { name: 'Login' }); // by role (recommended)

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(loginButton).toBeEnabled();
});

test('user can log in (no page objects)', async ({ page }) => {
  await page.goto('/');

  // Act: type into fields and click
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert: we landed on the products page
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();
});
