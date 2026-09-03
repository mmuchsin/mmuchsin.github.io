import { describe, expect, it } from 'vitest';
const module = await import('../routes/[locale]/+layout.server.js');
const load = module.load;

describe('locale layout server load', () => {
	it('returns locale and translations for valid "en"', async () => {
		const event = {
			params: { locale: 'en' },
			parent: async () => ({ locale: 'en', t: {} })
		} as unknown as Parameters<typeof load>[0];
		const result = (await load(event)) as Exclude<Awaited<ReturnType<typeof load>>, void>;
		expect(result.locale).toBe('en');
		expect(result.t).toBeDefined();
	});
	it('returns locale and translations for valid "id"', async () => {
		const event = {
			params: { locale: 'id' },
			parent: async () => ({ locale: 'id', t: {} })
		} as unknown as Parameters<typeof load>[0];
		const result = (await load(event)) as Exclude<Awaited<ReturnType<typeof load>>, void>;
		expect(result.locale).toBe('id');
		expect(result.t).toBeDefined();
	});
	it('throws 404 for unsupported locale', async () => {
		const event = {
			params: { locale: 'fr' },
			parent: async () => ({ locale: 'en', t: {} })
		} as unknown as Parameters<typeof load>[0];
		try {
			await load(event);
			expect.fail('should have thrown');
		} catch (e) {
			expect((e as any).status).toBe(404);
		}
	});
	it('throws 404 for "ja" locale', async () => {
		const event = {
			params: { locale: 'ja' },
			parent: async () => ({ locale: 'en', t: {} })
		} as unknown as Parameters<typeof load>[0];
		try {
			await load(event);
			expect.fail('should have thrown');
		} catch (e) {
			expect((e as any).status).toBe(404);
		}
	});
});
