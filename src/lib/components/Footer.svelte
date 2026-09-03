<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['footer'] } = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="site-footer">
	<div class="wrap">
		<p>{copy.text}</p>
		<button type="button" class="back-to-top" aria-label="Back to top" onclick={scrollToTop}>
			↑ Back to top
		</button>
		<p class="colophon">{copy.colophon}</p>
	</div>
</footer>
