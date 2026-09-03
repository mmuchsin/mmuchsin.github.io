import { test, expect } from '@playwright/test';

// The root redirect is client-side (static site — no server at runtime to read
// Accept-Language), so these tests drive navigator.language via the Playwright
// context `locale` option, which sets both navigator.language and the
// Accept-Language header.
test.describe('Root redirect', () => {
	test('redirects to /en/ for unknown locale preference', async ({ browser }) => {
		const context = await browser.newContext({ locale: 'fr-FR' });
		const page = await context.newPage();

		await page.goto('/');
		// Client-side redirect via onMount — wait for the actual destination
		await page.waitForURL(/\/en\/$/);
		expect(page.url()).toMatch(/\/en\/$/);

		await context.close();
	});

	test('renders English home page after redirect', async ({ browser }) => {
		const context = await browser.newContext({ locale: 'fr-FR' });
		const page = await context.newPage();

		await page.goto('/');
		await page.waitForURL(/\/en\/$/);
		expect(page.url()).toMatch(/\/en\/$/);
		expect(await page.locator('h1').textContent()).toContain('Muchsin');

		await context.close();
	});

	test('redirects to /id/ when browser prefers Indonesian', async ({ browser }) => {
		const context = await browser.newContext({ locale: 'id-ID' });
		const page = await context.newPage();

		await page.goto('/');
		await page.waitForURL(/\/id\/$/);
		expect(page.url()).toMatch(/\/id\/$/);

		await context.close();
	});
});
