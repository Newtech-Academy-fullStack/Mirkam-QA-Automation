import { type Page, type Locator } from '@playwright/test';

/** Page Object for the cart page. */
export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
