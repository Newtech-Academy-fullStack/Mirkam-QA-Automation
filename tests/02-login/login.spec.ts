import { test, expect } from '../fixtures';
import { USERS, PASSWORD } from '../../utils/testData';

/**
 * LESSON 2: Same login flow, now using a Page Object + fixtures.
 * Compare this file with 01-basics/first-test.spec.ts.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut, PASSWORD);
    await loginPage.expectError('Sorry, this user has been locked out');
  });

  // Data-driven test: one test body, many inputs
  const invalidCases = [
    { name: 'empty username and password', username: '', password: '', error: 'Username is required' },
    { name: 'empty password', username: USERS.standard, password: '', error: 'Password is required' },
    { name: 'wrong password', username: USERS.standard, password: 'wrong', error: 'do not match' },
    { name: 'unknown user', username: 'unknown_user', password: PASSWORD, error: 'do not match' },
  ];

  for (const { name, username, password, error } of invalidCases) {
    test(`invalid login: ${name}`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await expect(loginPage.errorMessage).toContainText(error);
    });
  }
});
