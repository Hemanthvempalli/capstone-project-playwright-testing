// tests/navigation/navigation.spec.js

const { test, expect } = require('@playwright/test');
const NavigationPage = require('../../pages/NavigationPage');

test.describe('Module 5: Site Navigation', () => {
  let nav;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationPage(page);
    await nav.navigateTo('/');
  });

  test('TC_N01 - Home page title contains "automation"', async ({ page }) => {
    expect((await nav.getTitle()).toLowerCase()).toContain('automation');
  });

  test('TC_N02 - Logo image is visible on home page', async ({ page }) => {
    await expect(page.locator('img[src*="logo"]').first()).toBeVisible();
  });

  test('TC_N03 - Tips nav link is visible', async ({ page }) => {
    await expect(page.locator('a[href="/tips"]').first()).toBeVisible();
  });

  test('TC_N04 - /tips page loads successfully', async ({ page }) => {
    await nav.navigateTo('/tips');
    await expect(page).toHaveURL(/tips/);
  });

  test('TC_N05 - /test-cases page loads successfully', async ({ page }) => {
    await nav.navigateTo('/test-cases');
    await expect(page).toHaveURL(/test-cases/);
  });

  test('TC_N06 - /about page body contains "about"', async ({ page }) => {
    await nav.navigateTo('/about');
    await expect(page).toHaveURL(/about/);
    expect((await nav.getBodyText()).toLowerCase()).toContain('about');
  });

  test('TC_N07 - /login page is reachable', async ({ page }) => {
    await nav.navigateTo('/login');
    await expect(page).toHaveURL(/login/);
  });

  test('TC_N08 - /register page is reachable', async ({ page }) => {
    await nav.navigateTo('/register');
    await expect(page).toHaveURL(/register/);
  });

  test('TC_N09 - /forgot-password page is reachable', async ({ page }) => {
    await nav.navigateTo('/forgot-password');
    await expect(page).toHaveURL(/forgot/);
  });

  test('TC_N10 - /status-codes page loads with status content', async ({ page }) => {
    await nav.navigateTo('/status-codes');
    expect((await nav.getBodyText()).toLowerCase()).toContain('status');
  });

  test('TC_N11 - /checkboxes page has checkbox inputs', async ({ page }) => {
    await nav.navigateTo('/checkboxes');
    expect(await page.locator('input[type="checkbox"]').count()).toBeGreaterThan(0);
  });

  test('TC_N12 - /dropdown page has a select element', async ({ page }) => {
    await nav.navigateTo('/dropdown');
    await expect(page.locator('select').first()).toBeVisible();
  });

  test('TC_N13 - /inputs page has a number input field', async ({ page }) => {
    await nav.navigateTo('/inputs');
    await expect(page.locator('input[type="number"]')).toBeVisible();
  });

  test('TC_N14 - /tables page has a visible table', async ({ page }) => {
    await nav.navigateTo('/tables');
    await expect(page.locator('table').first()).toBeVisible();
  });

  test('TC_N15 - /dynamic-content page loads with body content', async ({ page }) => {
    await nav.navigateTo('/dynamic-content');
    expect((await nav.getBodyText()).length).toBeGreaterThan(100);
  });
});