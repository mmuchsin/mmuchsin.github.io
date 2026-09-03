<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['hero'] } = $props();

	// Auto-cycle Arabic script — alternates every 4s so users can read both.
	// Uses onMount/onDestroy (not $effect) to avoid reactive cycles with $state.
	let arabicOn = $state(true);
	let timer: ReturnType<typeof setTimeout> | null = null;

	function cycle() {
		arabicOn = !arabicOn;
		timer = setTimeout(cycle, 4000);
	}

	onMount(() => {
		timer = setTimeout(cycle, 4000);
	});

	onDestroy(() => timer && clearTimeout(timer));
</script>

<section class="hero wrap" aria-labelledby="hero-title">
	<div class="hero-text">
		<h1 id="hero-title" data-rise style="--i: 0">{copy.name}</h1>
		<span class="name-rule" aria-hidden="true"></span>

		<!-- Auto-cycling Arabic script -->
		<div class="hero-script" class:arabic-on={arabicOn} data-rise style="--i: 2">
			<span class="script-latin">assalamu&#8217;alaikum</span>
			<span class="script-arabic" dir="rtl" lang="ar" aria-label="Assalamualaikum">السلام عليكم</span>
		</div>

		<p class="tagline" data-rise style="--i: 3">{copy.tagline}</p>
		<p class="sub" data-rise style="--i: 4">{copy.sub}</p>

		<div class="cta-row" data-rise style="--i: 5">
			<a class="btn btn-primary" href="#projects">{copy.cta_projects}</a>
			<a class="btn btn-ghost" href="#contact">{copy.cta_contact}</a>
		</div>
	</div>
</section>
