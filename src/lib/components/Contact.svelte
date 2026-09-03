<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['contact'] } = $props();
</script>

<section id="contact" class="section">
	<div class="wrap">
		<div class="section-head reveal">
			<p class="eyebrow">{copy.eyebrow}</p>
			<h2>{copy.title}</h2>
			<p class="prose">{copy.intro}</p>
		</div>
		<div class="contact-links reveal" style:--d="100ms">
			<a class="btn btn-ghost" href={copy.github_url} target="_blank" rel="noopener noreferrer" aria-label="{copy.github} (opens in new window)">
				{copy.github} <span class="arrow">↗</span>
			</a>
			<a class="btn btn-ghost" href={copy.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="{copy.linkedin} (opens in new window)">
				{copy.linkedin} <span class="arrow">↗</span>
			</a>
		</div>
	</div>
</section>
