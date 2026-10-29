import { type Page, type Locator, expect } from '@playwright/test';

/** Page Object for the products (inventory) page. */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  /** Adds a product to the cart by its visible name, e.g. "Sauce Labs Backpack". */
  async addToCart(productName: string) {
    const item = this.items.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }
}
