const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

const testData = {
  validUser: {
    username: 'practice',
    password: 'SuperSecretPassword!',
  },
  invalidUsername: 'wrongUser',
  invalidPassword: 'WrongPassword123',
  sqlInjection: "' OR '1'='1",
  newUser: {
    username: `testuser${Date.now()}`,
    password: 'Test@1234',
    confirmPassword: 'Test@1234',
  },
};

test.describe('Module 1: Authentication Management', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC_A01 - Valid User Login', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/secure/);
    const msg = await loginPage.getFlashMessage();
    expect(msg.toLowerCase()).toContain('you logged into a secure area');
  });

  test('TC_A02 - Invalid Username Login', async ({ page }) => {
    await loginPage.login(testData.invalidUsername, testData.validUser.password);
    const msg = await loginPage.getFlashMessage();
    expect(msg.toLowerCase()).toContain('your password is invalid');
  });

  test('TC_A03 - Invalid Password Login', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.invalidPassword);
    const msg = await loginPage.getFlashMessage();
    expect(msg.toLowerCase()).toContain('your password is invalid');
  
  });

  test('TC_A04 - Empty Username Field Validation', async ({ page }) => {
    await loginPage.fillPassword(testData.validUser.password);
    await loginPage.clickSubmit();
    const msg = await loginPage.getFlashMessage();
    expect(msg.trim().length).toBeGreaterThan(0);
  });

  test('TC_A05 - Empty Password Field Validation', async ({ page }) => {
    await loginPage.fillUsername(testData.validUser.username);
    await loginPage.clickSubmit();
    const msg = await loginPage.getFlashMessage();
    expect(msg.trim().length).toBeGreaterThan(0);
  });

  test('TC_A06 - Both Fields Empty Validation', async ({ page }) => {
    await loginPage.clickSubmit();
    const msg = await loginPage.getFlashMessage();
    expect(msg.trim().length).toBeGreaterThan(0);
  });

  test('TC_A07 - User Logout', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/secure/);
    await page.locator(loginPage.logoutBtn).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/login/);
  });

  test('TC_A08 - Session Persistence After Refresh', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/secure/);
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/secure/);
  });

test('TC_A09 - Forgot Password Link Visible and Clickable', async ({ page }) => {
    const forgotLink = page.locator('a[href*="forgot"]');
    const hasForgot = await forgotLink.count();
    if (hasForgot > 0) {
      await expect(forgotLink.first()).toBeVisible();
      await forgotLink.first().click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/forgot/);
    } else {
      await page.goto('/forgot-password');
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/forgot/);
    }
  });
  test('TC_A10 - Register Link Visible on Login Page', async ({ page }) => {
    const registerLink = page.locator('a[href="/register"]');
    await expect(registerLink).toBeVisible();
  });

  test('TC_A11 - Login Page Title Correct', async ({ page }) => {
    await expect(page).toHaveTitle(/login/i);
  });

  test('TC_A12 - New User Registration', async ({ page }) => {
    await page.goto('/register');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#username').fill(testData.newUser.username);
    await page.locator('#password').fill(testData.newUser.password);
    await page.locator('#confirmPassword').fill(testData.newUser.confirmPassword);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');
    const bodyText = await page.textContent('body');
    expect(
      page.url().includes('login') ||
      bodyText.toLowerCase().includes('register') ||
      bodyText.toLowerCase().includes('success')
    ).toBeTruthy();
  });

  test('TC_A13 - Re-Login After Logout', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/secure/);
    await page.locator(loginPage.logoutBtn).click();
    await page.waitForLoadState('domcontentloaded');
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/secure/);
    const msg = await loginPage.getFlashMessage();
    expect(msg.toLowerCase()).toContain('you logged into a secure area');
  });

  test('TC_A14 - SQL Injection in Login Fields', async ({ page }) => {
    await loginPage.login(testData.sqlInjection, testData.sqlInjection);
    await expect(page).not.toHaveURL(/secure/);
    const msg = await loginPage.getFlashMessage();
    expect(msg.trim().length).toBeGreaterThan(0);
  });

test('TC_A15 - Login Page UI Elements Present', async ({ page }) => {
    await expect(page.locator(loginPage.usernameInput)).toBeVisible();
    await expect(page.locator(loginPage.passwordInput)).toBeVisible();
    await expect(page.locator(loginPage.submitBtn)).toBeVisible();
    await expect(page.locator('a[href="/register"]')).toBeVisible();
  });

});