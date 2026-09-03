import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkCallout from 'remark-callout';
import fs from 'node:fs';
import path from 'node:path';
import type { BlogPost, BlogPostFrontmatter } from './types.js';
import { calculateReadingTime } from './types.js';

// Rehype plugin to convert callout AST nodes to styled HTML divs
function rehypeCallouts() {
	return function transform(tree: any) {
		function walk(node: any) {
			if (!node) return;

			if (node.type === 'containerCallout') {
				const configMap: Record<string, { icon: string; color: string }> = {
					note: { icon: '📝', color: '#3b82f6' },
					tip: { icon: '💡', color: '#10b981' },
					warning: { icon: '⚠️', color: '#f59e0b' },
					info: { icon: 'ℹ️', color: '#6366f1' }
				};

				const calloutType = node.name ?? 'info';
				const config = configMap[calloutType] ?? configMap.info;
				const title = (node.label ?? calloutType.charAt(0).toUpperCase() + calloutType.slice(1)) as string;

				node.type = 'element';
				node.tagName = 'div';
				node.properties = {
					className: ['callout'],
					style: `--callout-color: ${config.color}`
				};
				node.children = [
					{
						type: 'element',
						tagName: 'div',
						properties: { className: ['callout-header'] },
						children: [
							{ type: 'text', value: config.icon + ' ' },
							{ type: 'element', tagName: 'span', properties: { className: ['callout-title'] }, children: [{ type: 'text', value: title }] }
						]
					},
					{
						type: 'element',
						tagName: 'div',
						properties: { className: ['callout-content'] },
						children: node.children ?? []
					}
				];
			}

			if (node.children) {
				node.children.forEach(walk);
			}
		}

		walk(tree);
	};
}

// Create a reusable processor for MDX → HTML
const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkCallout)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeHighlight, { detect: true })
	.use(rehypeCallouts)
	.use(rehypeStringify, { allowDangerousHtml: true });

export async function renderMDX(content: string): Promise<string> {
	const result = await processor.process({ value: content });
	return String(result.value);
}

export function extractFrontmatter(mdxContent: string): { frontmatter: BlogPostFrontmatter; content: string } {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
	const match = mdxContent.match(frontmatterRegex);

	if (!match) {
		return {
			frontmatter: {
				title: '',
				date: new Date().toISOString().split('T')[0],
				tags: [],
				categories: [],
				description: '',
				lang: 'en'
			},
			content: mdxContent
		};
	}

	const frontmatterStr = match[1];
	const content = match[2];

	const frontmatter: Partial<BlogPostFrontmatter> = {};

	for (const line of frontmatterStr.split('\n')) {
		const [key, ...valueParts] = line.split(':');
		if (!key) continue;

		const value = valueParts.join(':').trim();

		switch (key.trim()) {
			case 'title':
				frontmatter.title = value.replace(/^["']|["']$/g, '');
				break;
			case 'date':
				frontmatter.date = value;
				break;
			case 'tags':
				frontmatter.tags = value
					.replace(/[\[\]]/g, '')
					.split(',')
					.map((t) => t.trim().replace(/^["']|["']$/g, ''))
					.filter(Boolean);
				break;
			case 'categories':
				frontmatter.categories = value
					.replace(/[\[\]]/g, '')
					.split(',')
					.map((c) => c.trim().replace(/^["']|["']$/g, ''))
					.filter(Boolean);
				break;
			case 'description':
				frontmatter.description = value.replace(/^["']|["']$/g, '');
				break;
			case 'lang':
				frontmatter.lang = (value.trim().toLowerCase() === 'id' ? 'id' : 'en') as 'en' | 'id';
				break;
		}
	}

	return {
		frontmatter: {
			title: frontmatter.title ?? '',
			date: frontmatter.date ?? new Date().toISOString().split('T')[0],
			tags: frontmatter.tags ?? [],
			categories: frontmatter.categories ?? [],
			description: frontmatter.description ?? '',
			lang: frontmatter.lang ?? 'en'
		},
		content
	};
}

export async function loadBlogPost(
	dirPath: string,
	filename: string,
	slug: string
): Promise<BlogPost | null> {
	let content: string;
	try {
		content = fs.readFileSync(path.join(dirPath, filename), 'utf-8');
	} catch {
		return null;
	}

	const { frontmatter, content: body } = extractFrontmatter(content);

	return {
		...frontmatter,
		slug,
		content: await renderMDX(body),
		readingTime: calculateReadingTime(body)
	};
}

export async function loadAllBlogPosts(
	dirPath: string
): Promise<BlogPost[]> {
	const posts: BlogPost[] = [];

	try {
		const entries = fs.readdirSync(dirPath, { withFileTypes: true });

		for (const entry of entries) {
			if (entry.isDirectory()) {
				const postPath = path.join(dirPath, entry.name);
				const indexFile = path.join(postPath, 'index.mdx');

				if (fs.existsSync(indexFile)) {
					const post = await loadBlogPost(dirPath, `${entry.name}/index.mdx`, entry.name);
					if (post) posts.push(post);
				}
			}
		}
	} catch {
		// Directory doesn't exist yet
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
