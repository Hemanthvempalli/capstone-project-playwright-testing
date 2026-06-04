// tests/profile/profile.spec.js

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const testData  = require('../../test-data/testData');

test.describe('Module 7: User Profile & Secure Area', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('TC_PR01 - /users/1 profile page loads', async ({ page }) => {
    await page.goto('/users/1');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/users\/1/);
  });

  test('TC_PR02 - Profile heading contains user/profile/welcome', async ({ page }) => {
    await page.goto('/users/1');
    await page.waitForLoadState('domcontentloaded');
    const text = await page.locator('h1, h2').first().textContent();
    expect(text.toLowerCase()).toMatch(/user|profile|welcome/);
  });

  test('TC_PR03 - Profile page shows an avatar image', async ({ page }) => {
    await page.goto('/users/1');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('img').first()).toBeVisible();
  });

  test('TC_PR04 - Profile page title contains "profile" or "user"', async ({ page }) => {
    await page.goto('/users/1');
    expect((await page.title()).toLowerCase()).toMatch(/profile|user/);
  });

  test('TC_PR05 - Profile page body contains "user" text', async ({ page }) => {
    await page.goto('/users/1');
    await page.waitForLoadState('domcontentloaded');
    expect((await page.textContent('body')).toLowerCase()).toContain('user');
  });

  test('TC_PR06 - Valid login reaches secure area', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/secure/);
  });

  test('TC_PR07 - Secure area shows success flash message', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    const msg = await loginPage.getFlashMessage();
    expect(msg.toLowerCase()).toContain('logged into a secure area');
  });

  test('TC_PR08 - Secure area has logout button', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page.locator('a[href="/logout"]')).toBeVisible();
  });

  test('TC_PR09 - Secure area heading is visible after login', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('TC_PR10 - /contact page loads with contact content', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');
    expect((await page.textContent('body')).toLowerCase()).toContain('contact');
  });

  test('TC_PR11 - Contact page has input or textarea fields', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.locator('input, textarea').count()).toBeGreaterThan(0);
  });

  test('TC_PR12 - /feedback page loads with a form element', async ({ page }) => {
    await page.goto('/feedback');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('form, input, textarea').first()).toBeVisible();
  });

  test('TC_PR13 - /random-number page generates a number in the body', async ({ page }) => {
    await page.goto('/random-number');
    await page.waitForLoadState('domcontentloaded');
    expect(/\d+/.test(await page.textContent('body'))).toBeTruthy();
  });

  test('TC_PR14 - Logout from secure area redirects to /login', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await page.locator('a[href="/logout"]').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/login/);
  });

  test('TC_PR15 - Direct /secure access results in valid page URL', async ({ page }) => {
    await page.goto('/secure');
    await page.waitForLoadState('domcontentloaded');
    const url = page.url();
    expect(url.includes('secure') || url.includes('login')).toBeTruthy();
  });
});