import { describe, expect, it } from 'vitest';
import { buildSitemap } from './sitemap.js';
import type { BlogPost } from './mdx/types.js';

function post(overrides: Partial<BlogPost>): BlogPost {
	return {
		title: 'Untitled',
		date: '2026-08-01',
		tags: [],
		categories: [],
		description: '',
		lang: 'en',
		slug: 'untitled',
		content: '',
		readingTime: 1,
		...overrides
	};
}

const fixtures: BlogPost[] = [
	post({ lang: 'en', slug: 'hello-world', date: '2026-08-28', tags: ['blog', 'mdx'] }),
	post({ lang: 'id', slug: 'selamat', date: '2026-08-27', tags: ['blog', 'memulai'] }),
	post({ lang: 'en', slug: 'older-note', date: '2026-07-15', tags: ['mdx'] })
];

describe('buildSitemap', () => {
	it('lists both locale home pages', () => {
		const xml = buildSitemap(fixtures, 'https://muchsin.me');
		expect(xml).toContain('<loc>https://muchsin.me/en/</loc>');
		expect(xml).toContain('<loc>https://muchsin.me/id/</loc>');
	});

	it('lists a blog index per locale with lastmod from the newest post', () => {
		const xml = buildSitemap(fixtures, 'https://muchsin.me');
		expect(xml).toContain('<loc>https://muchsin.me/en/blog/</loc>');
		expect(xml).toContain('<loc>https://muchsin.me/id/blog/</loc>');
		// EN newest is 2026-08-28, ID newest is 2026-08-27
		expect(xml).toMatch(
			/<loc>https:\/\/muchsin\.me\/en\/blog\/<\/loc>\s*<lastmod>2026-08-28<\/lastmod>/
		);
		expect(xml).toMatch(
			/<loc>https:\/\/muchsin\.me\/id\/blog\/<\/loc>\s*<lastmod>2026-08-27<\/lastmod>/
		);
	});

	it('lists each post only under its own locale with its own date', () => {
		const xml = buildSitemap(fixtures, 'https://muchsin.me');
		expect(xml).toContain('<loc>https://muchsin.me/en/blog/hello-world/</loc>');
		expect(xml).toContain('<loc>https://muchsin.me/en/blog/older-note/</loc>');
		expect(xml).toContain('<loc>https://muchsin.me/id/blog/selamat/</loc>');
		expect(xml).not.toContain('/id/blog/hello-world/');
		expect(xml).not.toContain('/en/blog/selamat/');
		expect(xml).toMatch(
			/<loc>https:\/\/muchsin\.me\/en\/blog\/hello-world\/<\/loc>\s*<lastmod>2026-08-28<\/lastmod>/
		);
	});

	it('lists tag pages only in locales where a post carries the tag', () => {
		const xml = buildSitemap(fixtures, 'https://muchsin.me');
		// 'blog' tag exists in both locales
		expect(xml).toContain('<loc>https://muchsin.me/en/blog/tags/blog/</loc>');
		expect(xml).toContain('<loc>https://muchsin.me/id/blog/tags/blog/</loc>');
		// 'memulai' only exists on the ID post
		expect(xml).toContain('<loc>https://muchsin.me/id/blog/tags/memulai/</loc>');
		expect(xml).not.toContain('/en/blog/tags/memulai/');
	});

	it('escapes XML-special characters in URLs', () => {
		const xml = buildSitemap(
			[post({ lang: 'en', slug: 'amp', tags: ['dev&ops'] })],
			'https://muchsin.me'
		);
		expect(xml).toContain('<loc>https://muchsin.me/en/blog/tags/dev&amp;ops/</loc>');
	});

	it('emits a valid sitemap XML document', () => {
		const xml = buildSitemap(fixtures, 'https://muchsin.me');
		expect(xml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
		expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
		expect(xml.trimEnd().endsWith('</urlset>')).toBe(true);
	});

	it('handles an empty blog gracefully', () => {
		const xml = buildSitemap([], 'https://muchsin.me');
		expect(xml).toContain('<loc>https://muchsin.me/en/</loc>');
		expect(xml).toContain('<loc>https://muchsin.me/id/</loc>');
		expect(xml).not.toContain('<lastmod>');
	});
});
