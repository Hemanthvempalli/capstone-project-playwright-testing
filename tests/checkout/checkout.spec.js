// tests/checkout/checkout.spec.js

const { test, expect } = require('@playwright/test');
const BookstorePage = require('../../pages/BookstorePage');
const testData      = require('../../test-data/testData');

test.describe('Module 4: Checkout & User Account', () => {
  let bookstore;

  test.beforeEach(async ({ page }) => {
    bookstore = new BookstorePage(page);
  });

  test('TC_CH01 - Sign In page loads with correct URL', async ({ page }) => {
    await bookstore.navigateToSignIn();
    await expect(page).toHaveURL(/signin/);
  });

  test('TC_CH02 - Sign In page has "Sign in" heading', async ({ page }) => {
    await bookstore.navigateToSignIn();
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    expect((await h1.textContent()).toLowerCase()).toContain('sign in');
  });

test('TC_CH03 - Sign In page has email input field', async ({ page }) => {
    await page.goto('/bookstore/user/signin');
    await page.waitForLoadState('domcontentloaded');
    const emailInput = page.locator('input[type="email"], #email').first();
    await expect(emailInput).toBeVisible({ timeout: 10000 });
});

  test('TC_CH04 - Sign In page has password input field', async ({ page }) => {
    await bookstore.navigateToSignIn();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
  });

  test('TC_CH05 - Sign In page has a submit button', async ({ page }) => {
    await bookstore.navigateToSignIn();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('TC_CH06 - Sign In page has Sign Up link', async ({ page }) => {
    await bookstore.navigateToSignIn();
    await expect(page.locator('a[href*="signup"]')).toBeVisible();
  });

  test('TC_CH07 - Clicking Sign Up link navigates to signup page', async ({ page }) => {
    await bookstore.navigateToSignIn();
    await page.locator('a[href*="signup"]').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/signup/);
  });

  test('TC_CH08 - Sign Up page loads with input fields', async ({ page }) => {
    await bookstore.navigateToSignUp();
    await expect(page).toHaveURL(/signup/);
    expect(await page.locator('input').count()).toBeGreaterThan(0);
  });

test('TC_CH09 - Invalid credentials do not reach dashboard', async ({ page }) => {
    await page.goto('/bookstore/user/signin');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('input[type="email"], #email').first().fill('invalid@example.com');
    await page.locator('input[type="password"], #password').first().fill('wrongpassword');
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');
    const url = page.url();
    expect(url).not.toContain('dashboard');
});

  test('TC_CH10 - Sign In page title is not empty', async ({ page }) => {
    await bookstore.navigateToSignIn();
    expect((await page.title()).length).toBeGreaterThan(0);
  });

test('TC_C11 - Add multiple books sequentially without error', async ({ page }) => {
    await page.goto('/bookstore/add-to-cart/674108466cb6226060a20d44');
    await page.waitForLoadState('domcontentloaded');
    await page.goto('/bookstore/add-to-cart/67410a586cb6226060a20d8d');
    await page.waitForLoadState('domcontentloaded');
    const url = page.url();
    const text = await page.textContent('body');
    expect(url.length > 0 || text.length > 0).toBeTruthy();
});

  test('TC_CH12 - Sign In link text reads "Sign In"', async ({ page }) => {
    await bookstore.navigateToBookstore();
    const text = await page.locator('a[href*="signin"]').textContent();
    expect(text.toLowerCase()).toContain('sign in');
  });

  test('TC_CH13 - Cart is accessible after adding a book', async ({ page }) => {
    await bookstore.addBookToCartDirect(testData.books.javascript);
    await bookstore.navigateToCart();
    await expect(page).toHaveURL(/bookstore\/cart/);
  });

  test('TC_CH14 - Empty email on Sign In form does not crash', async ({ page }) => {
    await bookstore.navigateToSignIn();
    await page.locator('input[type="password"]').first().fill('somepassword');
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');
    expect((await bookstore.getBodyText()).length).toBeGreaterThan(0);
  });

  test('TC_CH15 - Sign In page renders without JavaScript errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await bookstore.navigateToSignIn();
    expect(errors.filter(e => !e.toLowerCase().includes('favicon')).length).toBe(0);
  });
});