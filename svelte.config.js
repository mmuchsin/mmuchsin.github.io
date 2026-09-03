import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import path from 'node:path';

// Dynamically discover blog slugs and tags for prerendering.
// This avoids hardcoding entries in svelte.config.js — new posts
// are automatically included without config changes.
function discoverBlogEntries() {
	const entries = ['/', '/blog']; // blog index page
	const blogDir = path.resolve('src/content/blog');

	try {
		const dirs = fs.readdirSync(blogDir, { withFileTypes: true })
			.filter(d => d.isDirectory());

		for (const dir of dirs) {
			entries.push(`/blog/${dir.name}`); // individual post

			// Read frontmatter to discover tags
			const indexFile = path.join(blogDir, dir.name, 'index.mdx');
			if (!fs.existsSync(indexFile)) continue;

			const content = fs.readFileSync(indexFile, 'utf-8');
			const tagsMatch = content.match(/^tags:\s*\[([^\]]+)\]/m);
			if (tagsMatch) {
				const tags = tagsMatch[1]
					.replace(/[\[\]"]/g, '')
					.split(',')
					.map(t => t.trim());
				for (const tag of tags) {
					entries.push(`/blog/tags/${tag}`); // tag filter page
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
			// explicit entries discovered from the content directory.
			strict: false
		}),
		// GitHub Pages subpath (ADR 0001)
		paths: {
			base: ''
		},
		// Discover blog routes dynamically so new posts/tags are
		// automatically prerendered without config changes.
		prerender: {
			entries: discoverBlogEntries(),
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
