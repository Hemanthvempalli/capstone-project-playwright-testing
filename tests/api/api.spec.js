// tests/api/api.spec.js

const { test, expect } = require('@playwright/test');

const BASE = 'https://practice.expandtesting.com';

test.describe('Module 8: API Testing', () => {

  test('TC_API01 - GET /api/health-check returns HTTP 200', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health-check`);
    expect(res.status()).toBe(200);
  });

  test('TC_API02 - Health check: success field is true', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health-check`);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  test('TC_API03 - Health check: status field is "UP"', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health-check`);
    const body = await res.json();
    expect(body.status).toBe('UP');
  });

  test('TC_API04 - Health check: message is "API is up!"', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health-check`);
    const body = await res.json();
    expect(body.message).toBe('API is up!');
  });

  test('TC_API05 - Health check Content-Type is application/json', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health-check`);
    expect(res.headers()['content-type']).toContain('application/json');
  });

  test('TC_API06 - GET /api/my-ip/ returns HTTP 200', async ({ request }) => {
    const res = await request.get(`${BASE}/api/my-ip/`);
    expect(res.status()).toBe(200);
  });

  test('TC_API07 - GET /api/my-ip/ response body is not empty', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/my-ip/`);
    const body = await res.json();
    expect(JSON.stringify(body).length).toBeGreaterThan(2);
  });

  test('TC_API08 - GET /status-codes/200 returns HTTP 200', async ({ request }) => {
    const res = await request.get(`${BASE}/status-codes/200`);
    expect(res.status()).toBe(200);
  });

  test('TC_API09 - GET /status-codes/404 returns HTTP 404', async ({ request }) => {
    const res = await request.get(`${BASE}/status-codes/404`);
    expect(res.status()).toBe(404);
  });

  test('TC_API10 - GET /status-codes/500 returns HTTP 500', async ({ request }) => {
    const res = await request.get(`${BASE}/status-codes/500`);
    expect(res.status()).toBe(500);
  });

  test('TC_API11 - GET /bookstore returns HTTP 200', async ({ request }) => {
    const res = await request.get(`${BASE}/bookstore`);
    expect(res.status()).toBe(200);
  });

  test('TC_API12 - GET book detail endpoint returns HTTP 200', async ({ request }) => {
    const res = await request.get(`${BASE}/bookstore/books/674108466cb6226060a20d44`);
    expect(res.status()).toBe(200);
  });

  test('TC_API13 - GET /bookstore/cart returns HTTP 200', async ({ request }) => {
    const res = await request.get(`${BASE}/bookstore/cart`);
    expect(res.status()).toBe(200);
  });

  test('TC_API14 - GET / (home page) returns HTTP 200', async ({ request }) => {
    const res = await request.get(`${BASE}/`);
    expect(res.status()).toBe(200);
  });

  test('TC_API15 - GET non-existent page returns HTTP 404', async ({ request }) => {
    const res = await request.get(`${BASE}/this-page-does-not-exist-xyz-9999`);
    expect(res.status()).toBe(404);
  });
});