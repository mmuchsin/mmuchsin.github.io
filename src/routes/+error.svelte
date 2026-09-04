<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { translations } from '$lib/i18n';
	import { localeFromPath } from '$lib/locale';

	// The failing URL's own locale segment picks the copy; errors outside a
	// locale tree (e.g. /fr/) fall back to English.
	const locale = $derived(localeFromPath(page.url.pathname, base) ?? 'en');
	const t = $derived(translations[locale]);

	// 404s get localized copy; other statuses surface the error message
	// (useful in development, never user-facing in a prerendered build).
	const message = $derived(
		page.status === 404 || !page.error?.message ? t.error.not_found : page.error.message
	);

	// app.html ships lang="en"; errors outside the [locale] layout (e.g. /fr/)
	// have nothing else keeping the document language in sync with the copy.
	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<h1>{page.status}</h1>
<p>{message}</p>
