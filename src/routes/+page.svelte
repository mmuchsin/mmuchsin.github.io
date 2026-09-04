<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { translations } from '$lib/i18n';
	import { resolveLocale } from '$lib/locale';

	onMount(() => {
		const locale = resolveLocale(navigator.language);
		window.location.replace(`${base}/${locale}/`);
	});
</script>

<!-- Fully static site: the redirect must happen client-side, based on the
     visitor's browser language. This prerendered page is just a stub —
     no locale is in scope yet, so the copy shows both languages. -->
<p>{translations.en.redirect.message} · {translations.id.redirect.message}</p>
<noscript>
	<a href={`${base}/en/`}>{translations.en.redirect.link_en}</a> ·
	<a href={`${base}/id/`}>{translations.id.redirect.link_id}</a>
</noscript>
