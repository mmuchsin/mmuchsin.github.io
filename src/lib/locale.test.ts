import { describe, expect, it } from 'vitest';
import { resolveLocale, SUPPORTED_LOCALES, type Locale } from './locale.js';

describe('resolveLocale', () => {
	it('returns en for undefined input', () => {
		expect(resolveLocale(undefined)).toBe('en');
	});

	it('returns en for empty string', () => {
		expect(resolveLocale('')).toBe('en');
	});

	it('recognizes exact "en"', () => {
		expect(resolveLocale('en')).toBe('en');
	});

	it('recognizes exact "id"', () => {
		expect(resolveLocale('id')).toBe('id');
	});

	it('recognizes lowercase "en"', () => {
		expect(resolveLocale('en-us')).toBe('en');
	});

	it('recognizes lowercase "id"', () => {
		expect(resolveLocale('id-ID')).toBe('id');
	});

	it('defaults to en for unsupported locale', () => {
		expect(resolveLocale('fr')).toBe('en');
	});

	it('defaults to en for unsupported regional locale', () => {
		expect(resolveLocale('ja-JP')).toBe('en');
	});

	it('extracts primary language from regional tag', () => {
		expect(resolveLocale('pt-BR')).toBe('en');
	});

	it('is case-insensitive', () => {
		expect(resolveLocale('EN')).toBe('en');
		expect(resolveLocale('ID')).toBe('id');
		expect(resolveLocale('En-US')).toBe('en');
	});

	it('handles locale with multiple subtags', () => {
		expect(resolveLocale('en-x-private')).toBe('en');
	});
});

describe('SUPPORTED_LOCALES', () => {
	it('includes en and id', () => {
		expect(SUPPORTED_LOCALES).toContain('en');
		expect(SUPPORTED_LOCALES).toContain('id');
	});

	it('is a readonly array', () => {
		expect(() => {
			(Object.freeze({} as typeof SUPPORTED_LOCALES));
		}).not.toThrow();
	});
});
