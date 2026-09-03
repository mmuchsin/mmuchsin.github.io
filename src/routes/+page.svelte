<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { resolveLocale } from '$lib/locale';

	onMount(() => {
		const locale = resolveLocale(navigator.language);
		window.location.replace(`${base}/${locale}/`);
	});
</script>

<!-- Fully static site: the redirect must happen client-side, based on the
     visitor's browser language. This prerendered page is just a stub. -->
<p>Redirecting…</p>
<noscript>
	<a href={`${base}/en/`}>English</a> · <a href={`${base}/id/`}>Bahasa Indonesia</a>
</noscript>
