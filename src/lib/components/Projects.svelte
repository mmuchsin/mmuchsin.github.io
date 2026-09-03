<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['projects'] } = $props();

	// The first item is the flagship — full-width featured card, the rest as list rows.
	const featured = $derived(copy.items[0]);
	const rest = $derived(copy.items.slice(1));
</script>

<section id="projects" class="section">
	<div class="wrap">
		<div class="section-head reveal">
			<p class="eyebrow">{copy.eyebrow}</p>
			<h2>{copy.title}</h2>
			<p class="intro">{copy.intro}</p>
		</div>

		<article class="project-card featured reveal" style:--d="80ms">
			<div class="project-head">
				<h3>{featured.name}</h3>
				{#if featured.live}
					<div class="project-links">
						<a href={featured.live} target="_blank" rel="noopener noreferrer">
							{copy.live} <span class="arrow">↗</span>
						</a>
					</div>
				{/if}
			</div>
			<p class="project-desc">{featured.description}</p>
			<ul class="tags">
				{#each featured.tags as tag (tag)}
					<li>{tag}</li>
				{/each}
			</ul>
		</article>

		<div class="project-rows">
			{#each rest as project, index (project.name)}
				<article class="project-row reveal" style:--d="{160 + index * 100}ms">
					<div>
						<h3 class="project-title">{project.name}</h3>
						<ul class="tags">
							{#each project.tags as tag (tag)}
								<li>{tag}</li>
							{/each}
						</ul>
					</div>
					<p class="project-desc">{project.description}</p>
					<div class="project-links">
						{#if project.live}
							<a href={project.live} target="_blank" rel="noopener noreferrer">
								{copy.live} <span class="arrow">↗</span>
							</a>
						{/if}
						{#if project.repo}
							<a class="secondary" href={project.repo} target="_blank" rel="noopener noreferrer">
								{copy.repo_label} <span class="arrow">↗</span>
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
