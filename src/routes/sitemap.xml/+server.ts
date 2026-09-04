import path from 'node:path';
import { loadAllBlogPosts } from '$lib/mdx/renderer.js';
import { buildSitemap } from '$lib/sitemap.js';
import { SITE_URL } from '$lib/site.js';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const blogDir = path.resolve(process.cwd(), 'src', 'content', 'blog');
	const posts = await loadAllBlogPosts(blogDir);
	return new Response(buildSitemap(posts, SITE_URL), {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
};
