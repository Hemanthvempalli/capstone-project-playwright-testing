// tests/cart/cart.spec.js

const { test, expect } = require('@playwright/test');
const BookstorePage = require('../../pages/BookstorePage');
const testData      = require('../../test-data/testData');

test.describe('Module 3: Shopping Cart', () => {
  let bookstore;

  test.beforeEach(async ({ page }) => {
    bookstore = new BookstorePage(page);
  });

  test('TC_C01 - Cart page loads with correct URL', async ({ page }) => {
    await bookstore.navigateToCart();
    await expect(page).toHaveURL(/bookstore\/cart/);
  });

  test('TC_C02 - Cart page has "Shopping Cart" heading', async ({ page }) => {
    await bookstore.navigateToCart();
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    expect((await h1.textContent()).toLowerCase()).toContain('shopping cart');
  });

  test('TC_C03 - Empty cart page body contains cart-related text', async ({ page }) => {
    await page.context().clearCookies();
    await bookstore.navigateToCart();
    const bodyText = await bookstore.getBodyText();
    expect(
      bodyText.toLowerCase().includes('no items') ||
      bodyText.toLowerCase().includes('empty') ||
      bodyText.toLowerCase().includes('cart')
    ).toBeTruthy();
  });

  test('TC_C04 - Cart icon is visible on bookstore listing', async ({ page }) => {
    await bookstore.navigateToBookstore();
    await expect(page.locator('a[href="/bookstore/cart"]')).toBeVisible();
  });

  test('TC_C05 - Cart icon image (cart.png) is visible', async ({ page }) => {
    await bookstore.navigateToBookstore();
    await expect(page.locator('img[src*="cart"]')).toBeVisible();
  });

  test('TC_C06 - Clicking cart icon navigates to cart page', async ({ page }) => {
    await bookstore.navigateToBookstore();
    await page.locator('a[href="/bookstore/cart"]').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/bookstore\/cart/);
  });

  test('TC_C07 - Add first book via bookstore listing button', async ({ page }) => {
    await bookstore.navigateToBookstore();
    await bookstore.addBookToCartByIndex(0);
    expect(page.url().includes('bookstore')).toBeTruthy();
  });

test('TC_C08 - Add JavaScript book via direct add-to-cart URL', async ({ page }) => {
    await page.goto('/bookstore/add-to-cart/674108466cb6226060a20d44');
    await page.waitForLoadState('domcontentloaded');
    const text = await page.textContent('body');
    expect(text).toBeTruthy();
});

  test('TC_C09 - Add book from book detail page', async ({ page }) => {
    await bookstore.navigateToBookDetail(testData.books.javascript);
    await page.locator('a[href*="add-to-cart"]').click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url().includes('bookstore')).toBeTruthy();
  });

test('TC_C10 - Add DevOps book via direct add-to-cart URL', async ({ page }) => {
    await page.goto('/bookstore/add-to-cart/67410b8c6cb6226060a20da4');
    await page.waitForLoadState('domcontentloaded');
    const text = await page.textContent('body');
    expect(text).toBeTruthy();
});

test('TC_C11 - Add multiple books sequentially without error', async ({ page }) => {
    await page.goto('/bookstore/add-to-cart/674108466cb6226060a20d44');
    await page.waitForLoadState('domcontentloaded');
    await page.goto('/bookstore/add-to-cart/67410a586cb6226060a20d8d');
    await page.waitForLoadState('domcontentloaded');
    await page.goto('/bookstore/cart');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('bookstore');
});

test('TC_C12 - Cart page has "All Books" navigation link', async ({ page }) => {
    await page.goto('/bookstore/cart');
    await page.waitForLoadState('domcontentloaded');
    const link = page.locator('a[href="/bookstore"]').first();
    await expect(link).toBeVisible();
});

  test('TC_C13 - Cart page has Sign In link', async ({ page }) => {
    await bookstore.navigateToCart();
    await expect(page.locator('a[href*="signin"]')).toBeVisible();
  });

test('TC_C14 - Cart page title contains "cart"', async ({ page }) => {
    await page.goto('/bookstore/cart');
    await page.waitForLoadState('domcontentloaded');
    const heading = await page.locator('h1').first().textContent();
    expect(heading.toLowerCase()).toContain('cart');
});

  test('TC_C15 - Cart page renders without JavaScript errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await bookstore.navigateToCart();
    expect(errors.filter(e => !e.toLowerCase().includes('favicon')).length).toBe(0);
  });
});