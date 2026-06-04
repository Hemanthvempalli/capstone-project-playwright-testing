// tests/compare/compare.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Module 6: UI Elements & Comparisons', () => {

  test('TC_CMP01 - Checkboxes: first checkbox toggles on click', async ({ page }) => {
    await page.goto('/checkboxes');
    await page.waitForLoadState('domcontentloaded');
    const first = page.locator('input[type="checkbox"]').nth(0);
    const initial = await first.isChecked();
    await first.click();
    expect(await first.isChecked()).toBe(!initial);
  });

  test('TC_CMP02 - Checkboxes: second checkbox toggles on click', async ({ page }) => {
    await page.goto('/checkboxes');
    await page.waitForLoadState('domcontentloaded');
    const second = page.locator('input[type="checkbox"]').nth(1);
    const initial = await second.isChecked();
    await second.click();
    expect(await second.isChecked()).toBe(!initial);
  });

  test('TC_CMP03 - Checkboxes: at least 2 checkboxes exist', async ({ page }) => {
    await page.goto('/checkboxes');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.locator('input[type="checkbox"]').count()).toBeGreaterThanOrEqual(2);
  });

  test('TC_CMP04 - Dropdown: more than one option is present', async ({ page }) => {
    await page.goto('/dropdown');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.locator('select option').count()).toBeGreaterThan(1);
  });

  test('TC_CMP05 - Dropdown: can select Option 1', async ({ page }) => {
    await page.goto('/dropdown');
    await page.waitForLoadState('domcontentloaded');
    const select = page.locator('select').first();
    await select.selectOption({ index: 1 });
    expect((await select.inputValue()).length).toBeGreaterThan(0);
  });

  test('TC_CMP06 - Dropdown: can select Option 2', async ({ page }) => {
    await page.goto('/dropdown');
    await page.waitForLoadState('domcontentloaded');
    const select = page.locator('select').first();
    await select.selectOption({ index: 2 });
    expect((await select.inputValue()).length).toBeGreaterThan(0);
  });

  test('TC_CMP07 - Tables: first table has header cells', async ({ page }) => {
    await page.goto('/tables');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('table th').first()).toBeVisible();
  });

  test('TC_CMP08 - Tables: data cells (td) are populated', async ({ page }) => {
    await page.goto('/tables');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.locator('table td').count()).toBeGreaterThan(0);
  });

  test('TC_CMP09 - Radio Buttons: at least one radio is selectable', async ({ page }) => {
    await page.goto('/radio-buttons');
    await page.waitForLoadState('domcontentloaded');
    const radios = page.locator('input[type="radio"]');
    expect(await radios.count()).toBeGreaterThan(0);
    await radios.first().click();
    expect(await radios.first().isChecked()).toBeTruthy();
  });

  test('TC_CMP10 - Inputs: entering a number reflects the value', async ({ page }) => {
    await page.goto('/inputs');
    await page.waitForLoadState('domcontentloaded');
    const input = page.locator('input[type="number"]');
    await input.fill('42');
    expect(await input.inputValue()).toBe('42');
  });

  test('TC_CMP11 - Key Presses: pressing a key updates the result', async ({ page }) => {
    await page.goto('/key-presses');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('input, #target').first().click();
    await page.keyboard.press('A');
    expect((await page.textContent('body')).toLowerCase()).toMatch(/you entered|pressed|key/i);
  });

  test('TC_CMP12 - Add/Remove Elements: Add creates a Delete button', async ({ page }) => {
    await page.goto('/add-remove-elements');
    await page.waitForLoadState('domcontentloaded');
    const before = await page.locator('button:has-text("Delete")').count();
    await page.locator('button:has-text("Add Element")').first().click();
    const after = await page.locator('button:has-text("Delete")').count();
    expect(after).toBeGreaterThan(before);
  });

  test('TC_CMP13 - Dynamic Table page loads with a table', async ({ page }) => {
    await page.goto('/dynamic-table');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('table').first()).toBeVisible();
  });

  test('TC_CMP14 - Broken Images page loads with img elements', async ({ page }) => {
    await page.goto('/broken-images');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.locator('img').count()).toBeGreaterThan(0);
  });

  test('TC_CMP15 - Notification Message page has a clickable link', async ({ page }) => {
    await page.goto('/notification-message');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('a').first()).toBeVisible();
  });
});