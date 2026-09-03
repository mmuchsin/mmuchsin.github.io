import { loadAllBlogPosts } from '$lib/mdx/renderer.js';
import path from 'node:path';

export const load = async () => {
	const blogDir = path.resolve(process.cwd(), 'src', 'content', 'blog');
	const posts = await loadAllBlogPosts(blogDir);
	return { posts };
};
