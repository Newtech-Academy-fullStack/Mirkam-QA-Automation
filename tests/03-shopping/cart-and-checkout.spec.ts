import { test, expect } from '../fixtures';
import { USERS, PASSWORD, CUSTOMER } from '../../utils/testData';

/**
 * LESSON 3: An end-to-end (E2E) flow across several pages.
 */
test.describe('Shopping', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard, PASSWORD);
    await inventoryPage.expectLoaded();
  });

  test('adding items updates the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('sort by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('complete a purchase', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await expect(cartPage.items).toHaveCount(1);
    await cartPage.checkout();

    await checkoutPage.fillInfo(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete\.html/);
  });
});
