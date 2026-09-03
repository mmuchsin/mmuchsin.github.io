<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/mdx/types.js';

	let { data }: { data: PageData } = $props();

	const posts = $derived(data.posts as BlogPost[]);
	const tag = $derived(data.tag as string);
</script>

<main id="main-content" class="tag-page">
	<header class="tag-header">
		<a href={`${base}/blog`} class="back-link">← Back to Blog</a>
		<h1>Posts tagged with <span class="tag-name">#{tag}</span></h1>
	</header>

	{#if posts.length === 0}
		<p class="empty-state">No posts found with this tag.</p>
	{:else}
		<div class="post-list">
			{#each posts as post (post.slug)}
				<article class="post-card">
					<a href={`${base}/blog/${post.slug}`} class="post-link">
						<div class="post-meta">
							<span class="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
							{#if post.categories.length > 0}
								<span class="post-category">{post.categories[0]}</span>
							{/if}
						</div>
						<h2 class="post-title">{post.title}</h2>
						<p class="post-description">{post.description}</p>
						<div class="post-footer">
							<span class="reading-time">{post.readingTime} min read</span>
						</div>
					</a>
				</article>
			{/each}
		</div>
	{/if}
</main>

<style>
	.tag-page {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	.tag-header {
		margin-bottom: 2rem;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
		color: var(--accent);
		text-decoration: none;
		font-weight: 500;
	}

	.tag-name {
		background: var(--accent);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.post-card {
		background: var(--surface);
		border-radius: 0.75rem;
		overflow: hidden;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.post-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.post-link {
		display: block;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.post-category {
		background: var(--accent);
		color: white;
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
	}

	.post-title {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.post-description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 0.75rem;
	}

	.post-footer {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.empty-state {
		text-align: center;
		color: var(--text-secondary);
		padding: 3rem 0;
	}
</style>
