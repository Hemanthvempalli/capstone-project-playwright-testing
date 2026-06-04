// tests/products/products.spec.js

const { test, expect } = require('@playwright/test');
const BookstorePage = require('../../pages/BookstorePage');
const testData      = require('../../test-data/testData');

test.describe('Module 2: Product Catalog', () => {
  let bookstore;

  test.beforeEach(async ({ page }) => {
    bookstore = new BookstorePage(page);
    await bookstore.navigateToBookstore();
  });

  test('TC_P01 - Bookstore page loads with correct URL', async ({ page }) => {
    await expect(page).toHaveURL(/bookstore/);
  });

  test('TC_P02 - Bookstore page has correct title', async ({ page }) => {
    const title = await bookstore.getPageTitle();
    expect(title.toLowerCase()).toContain('bookstore');
  });

test('TC_P03 - Book links are visible on listing page', async ({ page }) => {
    await page.goto('/bookstore');
    await page.waitForLoadState('domcontentloaded');
    const books = page.locator('a[href*="/bookstore/books/"]:not([href*="categories"])');
    const count = await books.count();
    expect(count).toBeGreaterThan(0);
});

test('TC_P04 - Book titles (h5) are displayed', async ({ page }) => {
    await page.goto('/bookstore');
    await page.waitForLoadState('domcontentloaded');
    const titles = page.locator('h5');
    const count = await titles.count();
    expect(count).toBeGreaterThan(0);
});

  test('TC_P05 - Book prices with € symbol are shown', async ({ page }) => {
    const bodyText = await bookstore.getBodyText();
    expect(bodyText).toContain('€');
  });

  test('TC_P06 - Add To Cart buttons are present', async ({ page }) => {
    const addBtns = page.locator('a[href*="add-to-cart"]');
    expect(await addBtns.count()).toBeGreaterThan(0);
  });

test('TC_P07 - Clicking a book title opens book detail page', async ({ page }) => {
    await page.goto('/bookstore/books/674108466cb6226060a20d44');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/bookstore/books/');
});

  test('TC_P08 - JavaScript book detail shows title and price', async ({ page }) => {
    await bookstore.navigateToBookDetail(testData.books.javascript);
    const bodyText = await bookstore.getBodyText();
    expect(bodyText.toLowerCase()).toContain('javascript for web developers');
    expect(bodyText).toContain('€');
  });

  test('TC_P09 - Book detail page has Add to Cart button', async ({ page }) => {
    await bookstore.navigateToBookDetail(testData.books.javascript);
    await expect(page.locator('a[href*="add-to-cart"]')).toBeVisible();
  });

  test('TC_P10 - Book detail page shows a book image', async ({ page }) => {
    await bookstore.navigateToBookDetail(testData.books.javascript);
    await expect(page.locator('img').first()).toBeVisible();
  });

  test('TC_P11 - DevOps book detail page loads correctly', async ({ page }) => {
    await bookstore.navigateToBookDetail(testData.books.devops);
    const bodyText = await bookstore.getBodyText();
    expect(bodyText.toLowerCase()).toContain('devops');
  });

  test('TC_P12 - Agile Testing book detail page loads correctly', async ({ page }) => {
    await bookstore.navigateToBookDetail(testData.books.agile);
    const bodyText = await bookstore.getBodyText();
    expect(bodyText.toLowerCase()).toContain('agile');
  });

  test('TC_P13 - "All" category link is present and visible', async ({ page }) => {
    await expect(page.locator('a[href="/bookstore/"]')).toBeVisible();
  });

test('TC_P14 - Sort by price ASC updates URL', async ({ page }) => {
    await page.goto('/bookstore?sort=asc');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('sort=asc');
});

test('TC_P15 - Sort by price DESC updates URL', async ({ page }) => {
    await page.goto('/bookstore?sort=desc');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('sort=desc');
});
});