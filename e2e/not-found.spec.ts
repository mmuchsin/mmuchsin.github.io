import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4173';

// The 404 fallback page is a client-rendered SPA shell — the error page
// only exists after hydration fetches the app chunks. waitUntil:
// 'networkidle' lets that finish before asserting.
test.describe('Not found handling', () => {
	test('unsupported locale returns 404', async ({ page }) => {
		const response = await page.goto(`${BASE}/fr/`, { waitUntil: 'networkidle' });

		expect(response?.status()).toBe(404);
		expect(page.url()).toBe(`${BASE}/fr/`);
		await expect(page.locator('h1')).toContainText('404', { timeout: 15000 });
	});

	test('non-existent page returns 404', async ({ page }) => {
		const response = await page.goto(`${BASE}/en/nonexistent-page`, {
			waitUntil: 'networkidle'
		});

		expect(response?.status()).toBe(404);
		expect(page.url()).toBe(`${BASE}/en/nonexistent-page`);
		await expect(page.locator('h1')).toContainText('404', { timeout: 15000 });
	});
});
