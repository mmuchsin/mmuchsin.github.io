<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['about'] } = $props();
</script>

<section id="about" class="section">
	<div class="wrap">
		<div class="section-head reveal">
			<p class="eyebrow">{copy.eyebrow}</p>
			<h2>{copy.title}</h2>
		</div>
		<div class="reveal" style:--d="100ms">
			<p class="prose">{copy.body_1}</p>
			<p class="prose">{copy.body_2}</p>
			<h3 class="subheading">{copy.highlights_title}</h3>
			<ul class="chips">
				{#each copy.highlights as highlight (highlight)}
					<li>{highlight}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
