import { loadAllBlogPosts } from '$lib/mdx/renderer.js';
import path from 'node:path';
import type { LayoutServerLoad } from './$types';

export const trailingSlash = 'always' as const;

// The root layout only needs to hydrate the blog content; locale-dependent
// data (translations, locale) is resolved by the [locale] layout from the
// URL segment.
export const load: LayoutServerLoad = async () => {
	const blogDir = path.resolve(process.cwd(), 'src', 'content', 'blog');
	const posts = await loadAllBlogPosts(blogDir);
	return { posts };
};
