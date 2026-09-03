import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import path from 'node:path';

// Dynamically discover blog slugs and tags for prerendering.
// This avoids hardcoding entries in svelte.config.js — new posts
// are automatically included without config changes.
function discoverBlogEntries() {
	const entries = [];
	const locales = ['en', 'id'];

	// Root redirect page
	entries.push('/');

	// Main site pages (locale-prefixed)
	for (const locale of locales) {
		entries.push(`/${locale}/`);
		entries.push(`/${locale}/blog`);
	}

	const blogDir = path.resolve('src/content/blog');

	try {
		const dirs = fs.readdirSync(blogDir, { withFileTypes: true })
			.filter(d => d.isDirectory());

		for (const dir of dirs) {
			const indexFile = path.join(blogDir, dir.name, 'index.mdx');
			if (!fs.existsSync(indexFile)) continue;

			const content = fs.readFileSync(indexFile, 'utf-8');
			const langMatch = content.match(/^lang:\s*(en|id)\s*$/m);

			// Individual post — only in the tree of its own language
			// (post.lang must match the URL locale; other trees 404)
			entries.push(`/${langMatch?.[1] ?? 'en'}/blog/${dir.name}`);

			// Read frontmatter to discover tags
			const tagsMatch = content.match(/^tags:\s*\[([^\]]+)\]/m);
			if (tagsMatch) {
				const tags = tagsMatch[1]
					.replace(/[\[\]"]/g, '')
					.split(',')
					.map(t => t.trim());
				for (const tag of tags) {
					// Tag pages per locale
					for (const locale of locales) {
						entries.push(`/${locale}/blog/tags/${tag}`);
					}
				}
			}
		}
	} catch {
		// Blog content directory doesn't exist yet — entries stays minimal.
	}

	return entries;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Parameterized blog routes ([slug], [tag]) are prerendered via
			// explicit entries discovered from the content directory, so
			// strict mode is satisfied. The fallback renders +error.svelte
			// into build/404.html so GitHub Pages serves our full 404 page
			// (with app shell) for unknown paths instead of its stub.
			strict: true,
			fallback: '404.html'
		}),
		// Root domain (CNAME: muchsin.me). base is a prefix, so the root
		// domain needs the empty string — NOT '/' (ADR 0001).
		paths: {
			base: ''
		},
		// Discover blog routes dynamically so new posts/tags are
		// automatically prerendered without config changes.
		prerender: {
			entries: discoverBlogEntries(),
			handleUnseenRoutes: 'warn',
			handleMissingId: 'ignore'
		}
	}
};

export default config;
