const { expect } = require('@playwright/test');

async function waitForPageLoad(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
}

async function takeScreenshot(page, name) {
  await page.screenshot({ path: `screenshots/${name}_${Date.now()}.png`, fullPage: true });
}

async function isVisible(page, selector) {
  try {
    await page.waitForSelector(selector, { timeout: 5000 });
    return await page.isVisible(selector);
  } catch {
    return false;
  }
}

async function safeClick(page, selector) {
  await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  await page.click(selector);
}

async function safeFill(page, selector, value) {
  await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  await page.fill(selector, value);
}

async function getText(page, selector) {
  await page.waitForSelector(selector, { timeout: 8000 });
  return await page.textContent(selector);
}

module.exports = {
  waitForPageLoad,
  takeScreenshot,
  isVisible,
  safeClick,
  safeFill,
  getText,
};