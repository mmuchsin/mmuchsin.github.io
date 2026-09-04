<script lang="ts">
	import { OG_IMAGE, SITE_NAME } from '$lib/site';

	let {
		title,
		description,
		url,
		type = 'website'
	}: {
		title: string;
		description: string;
		/** Absolute canonical URL for this page. */
		url: string;
		type?: 'website' | 'article';
	} = $props();
</script>

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={url} />

<meta property="og:site_name" content={SITE_NAME} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type} />
<meta property="og:url" content={url} />
<meta property="og:image" content={OG_IMAGE} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
