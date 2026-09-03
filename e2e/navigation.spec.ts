import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 720 } });

test.describe('Navigation', () => {
	test('all nav links work on English site', async ({ page }) => {
		await page.goto('/en/');

		const navLinks = page.locator('.site-nav a');
		expect(await navLinks.count()).toBeGreaterThan(0);

		for (const link of await navLinks.all()) {
			const href = await link.getAttribute('href');
			expect(href).toBeTruthy();
		}
	});

	test('nav links work on Indonesian site', async ({ page }) => {
		await page.goto('/id/');

		const navLinks = page.locator('.site-nav a');
		const texts = await navLinks.allTextContents();
		expect(texts.some(t => t.trim() === 'Tentang')).toBeTruthy();
	});

	test('clicking About jumps to the about section on the home page', async ({ page }) => {
		await page.goto('/en/');
		await page.locator('.site-nav a', { hasText: 'About' }).click();
		// One-page home: nav links are anchors on the same route.
		await page.waitForURL(/\/en\/#about$/);
		expect(page.url()).toContain('/en/#about');
		await expect(page.locator('#about')).toBeInViewport();
	});

	test('clicking Projects jumps to the projects section on the home page', async ({ page }) => {
		await page.goto('/en/');
		await page.locator('.site-nav a', { hasText: 'Projects' }).click();
		await page.waitForURL(/\/en\/#projects$/);
		expect(page.url()).toContain('/en/#projects');
		await expect(page.locator('#projects')).toBeInViewport();
	});

	test('clicking Contact jumps to the contact section on the home page', async ({ page }) => {
		await page.goto('/en/');
		await page.locator('.site-nav a', { hasText: 'Contact' }).click();
		await page.waitForURL(/\/en\/#contact$/);
		expect(page.url()).toContain('/en/#contact');
		await expect(page.locator('#contact')).toBeInViewport();
	});
});
