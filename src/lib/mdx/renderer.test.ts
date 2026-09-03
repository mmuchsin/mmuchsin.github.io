import { describe, expect, it } from 'vitest';
import { extractFrontmatter } from './renderer.js';

describe('extractFrontmatter', () => {
	it('parses title from frontmatter', () => {
		const input = `---\ntitle: Hello World\n---\nBody text`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.title).toBe('Hello World');
	});

	it('returns empty string for missing title', () => {
		const input = '---\n---\nBody text';
		const result = extractFrontmatter(input);
		expect(result.frontmatter.title).toBe('');
	});

	it('parses date from frontmatter', () => {
		const input = `---\ntitle: Test\ndate: 2026-01-15\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.date).toBe('2026-01-15');
	});

	it('defaults to today when no date is provided', () => {
		const input = '---\ntitle: Test\n---\nBody';
		const result = extractFrontmatter(input);
		const expectedDate = new Date().toISOString().split('T')[0];
		expect(result.frontmatter.date).toBe(expectedDate);
	});

	it('parses tags from frontmatter as array', () => {
		const input = `---\ntitle: Test\ntags: [svelte, typescript]\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.tags).toEqual(['svelte', 'typescript']);
	});

	it('parses tags with quoted values', () => {
		const input = `---\ntitle: Test\ntags: ["svelte", "typescript"]\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.tags).toEqual(['svelte', 'typescript']);
	});

	it('returns empty tags array when missing', () => {
		const input = '---\ntitle: Test\n---\nBody';
		const result = extractFrontmatter(input);
		expect(result.frontmatter.tags).toEqual([]);
	});

	it('parses categories from frontmatter as array', () => {
		const input = `---\ntitle: Test\ncategories: [tutorial, svelte]\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.categories).toEqual(['tutorial', 'svelte']);
	});

	it('returns empty categories array when missing', () => {
		const input = '---\ntitle: Test\n---\nBody';
		const result = extractFrontmatter(input);
		expect(result.frontmatter.categories).toEqual([]);
	});

	it('parses description from frontmatter', () => {
		const input = `---\ntitle: Test\ndescription: A test post\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.description).toBe('A test post');
	});

	it('strips quotes from description', () => {
		const input = `---\ntitle: Test\ndescription: "My description"\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.description).toBe('My description');
	});

	it('parses lang as id when specified', () => {
		const input = `---\ntitle: Test\nlang: id\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.lang).toBe('id');
	});

	it('defaults to en when lang is not id', () => {
		const input = `---\ntitle: Test\nlang: en\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.lang).toBe('en');
	});

	it('defaults to en when lang is missing', () => {
		const input = '---\ntitle: Test\n---\nBody';
		const result = extractFrontmatter(input);
		expect(result.frontmatter.lang).toBe('en');
	});

	it('returns body content after frontmatter', () => {
		const input = `---\ntitle: Test\n---\nThis is the body content.`;
		const result = extractFrontmatter(input);
		expect(result.content).toBe('This is the body content.');
	});

	it('returns full content when no frontmatter exists', () => {
		const input = 'Plain text without frontmatter.';
		const result = extractFrontmatter(input);
		expect(result.content).toBe('Plain text without frontmatter.');
		expect(result.frontmatter.title).toBe('');
	});

	it('handles multi-word title with colons', () => {
		const input = `---\ntitle: Hello: World: Greetings\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.title).toBe('Hello: World: Greetings');
	});

	it('handles tags with spaces and commas', () => {
		const input = `---\ntitle: Test\ntags: [svelte, typescript, frontend]\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.tags).toEqual(['svelte', 'typescript', 'frontend']);
	});

	it('filters empty tag values', () => {
		const input = `---\ntitle: Test\ntags: [svelte, , typescript]\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.tags).toEqual(['svelte', 'typescript']);
	});

	it('handles frontmatter with extra whitespace', () => {
		const input = `---\ntitle:  Test Title  \ndate: 2026-01-15\n---\nBody`;
		const result = extractFrontmatter(input);
		expect(result.frontmatter.title).toBe('Test Title');
	});
});
