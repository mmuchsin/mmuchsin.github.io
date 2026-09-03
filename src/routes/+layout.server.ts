import { loadAllBlogPosts } from '$lib/mdx/renderer.js';
import path from 'node:path';
import { translations, LOCALES } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const trailingSlash = 'always' as const;

export const load: LayoutServerLoad = async ({ request }) => {
	const blogDir = path.resolve(process.cwd(), 'src', 'content', 'blog');
	const posts = await loadAllBlogPosts(blogDir);

	// Detect locale from Accept-Language header for root layout (used by /blog/ routes)
	const lang = (request.headers.get('accept-language') ?? 'en').split(',')[0].split('-')[0];
	const locale = LOCALES.includes(lang as 'en' | 'id') ? (lang as 'en' | 'id') : 'en';

	return { posts, locale, t: translations[locale] };
};
