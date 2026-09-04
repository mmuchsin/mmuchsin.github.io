import type { BlogPost } from './mdx/types.js';
import { LOCALES } from './i18n/index.js';

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

interface Entry {
	loc: string;
	/** ISO date (YYYY-MM-DD) or undefined for pages with no meaningful date. */
	lastmod?: string;
}

/**
 * Build the sitemap XML from the blog content: per-locale home pages and
 * blog indexes, every post under its own locale only, and tag pages only
 * in locales where a post carries the tag (matching the prerender entries
 * in svelte.config.js, which are built from the same content).
 */
export function buildSitemap(posts: BlogPost[], siteUrl: string): string {
	const entries: Entry[] = [];

	for (const locale of LOCALES) {
		const localePosts = posts.filter((p) => p.lang === locale);
		const newest = localePosts
			.map((p) => p.date)
			.sort()
			.at(-1);

		entries.push({ loc: `${siteUrl}/${locale}/` });
		entries.push({ loc: `${siteUrl}/${locale}/blog/`, lastmod: newest });

		for (const p of localePosts) {
			entries.push({ loc: `${siteUrl}/${locale}/blog/${p.slug}/`, lastmod: p.date });
		}

		const tags = new Set(localePosts.flatMap((p) => p.tags));
		for (const tag of tags) {
			entries.push({ loc: `${siteUrl}/${locale}/blog/tags/${tag}/` });
		}
	}

	const urls = entries
		.map(
			(e) =>
				`  <url>\n    <loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}\n  </url>`
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
