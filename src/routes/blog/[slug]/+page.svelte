<script lang="ts">
	import { base } from '$app/paths';
	import { error } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/mdx/types.js';

	let { data }: { data: PageData } = $props();

	const post = $derived(data.post as BlogPost);

	if (!post) {
		throw error(404, 'Not found');
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<main id="main-content">
	<article class="post">
	<header class="post-header">
		<div class="post-meta">
			<span class="post-date">{formatDate(post.date)}</span>
			{#if post.categories.length > 0}
				<span class="post-category">{post.categories.join(', ')}</span>
			{/if}
			<span class="reading-time">{post.readingTime} min read</span>
		</div>
		<h1 class="post-title">{post.title}</h1>
		{#if post.description}
			<p class="post-description">{post.description}</p>
		{/if}
		{#if post.tags.length > 0}
			<div class="post-tags">
				{#each post.tags as tag}
					<a href={`${base}/blog/tags/${tag}`} class="tag">#{tag}</a>
				{/each}
			</div>
		{/if}
	</header>

	<!-- MDX Content -->
	<div class="post-content">{@html post.content}</div>

		<!-- Back to blog -->
		<a href={`${base}/blog`} class="back-link">← Back to Blog</a>
	</article>
</main>

<style>
	.post {
		max-width: 720px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	.post-header {
		margin-bottom: 2rem;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.post-category {
		background: var(--accent);
		color: white;
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
	}

	.post-title {
		font-size: 2rem;
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.post-description {
		color: var(--text-secondary);
		font-size: 1.125rem;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.post-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		background: var(--bg);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		text-decoration: none;
		color: var(--text-secondary);
		transition: color 0.2s;
	}

	.tag:hover {
		color: var(--accent);
	}

	.post-content {
		line-height: 1.8;
		color: var(--text-primary);
	}

	/* Post content typography — applied via @html, so Svelte doesn't see the elements */
	.post-content :global(h2) {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.post-content :global(h3) {
		font-size: 1.25rem;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.post-content :global(p) {
		margin-bottom: 1.25rem;
	}

	.post-content :global(code) {
		background: var(--surface);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	.post-content :global(pre) {
		background: var(--surface);
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1.5rem;
	}

	.post-content :global(pre code) {
		background: none;
		padding: 0;
	}

	.post-content :global(blockquote) {
		border-left: 4px solid var(--accent);
		padding-left: 1rem;
		margin: 1.5rem 0;
		color: var(--text-secondary);
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	.post-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.post-content :global(img) {
		max-width: 100%;
		border-radius: 0.5rem;
		margin: 1.5rem 0;
	}

	/* Callout styles for rendered MDX HTML — :global since these come from {@html} */
	:global(.callout) {
		border-left: 4px solid var(--callout-color, #6366f1);
		background: color-mix(in srgb, var(--callout-color, #6366f1) 8%, transparent);
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	:global(.callout-header) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
		font-weight: 600;
		color: var(--callout-color, #6366f1);
	}

	:global(.callout-icon) {
		font-size: 1.1rem;
	}

	:global(.callout-title) {
		text-transform: capitalize;
	}

	:global(.callout-content) {
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.back-link {
		display: inline-block;
		margin-top: 2rem;
		color: var(--accent);
		text-decoration: none;
		font-weight: 500;
	}

	.back-link:hover {
		text-decoration: underline;
	}
</style>
