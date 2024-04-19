<script lang="ts">
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import Masonry from '$lib/components/Masonry.svelte';

	const { data } = $props();
	const ids = data.ids.sort(() => Math.random() - 0.5);

	let loadedImages = $state<string[]>([]);

	const hasMore = $derived(loadedImages.length < ids.length);

	const loadMore = () => {
		const newImages = ids.slice(loadedImages.length, loadedImages.length + 10);
		loadedImages = [...loadedImages, ...newImages];
	};

	loadMore();
</script>

<svelte:head>
	<title>Shiggy Browser</title>
	<meta content="Shiggy Browser" property="og:description" />
	<meta content="https://shiggy.fun/shiggy.gif" property="og:image" />
	<meta content="#43B581" data-react-helmet="true" name="theme-color" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="root">
	<InfiniteScroll {hasMore} {loadMore} threshold={100} />
	<Masonry items={loadedImages}>
		{#each loadedImages as img}
			<a href="/{img}" target="_blank" rel="noopener noreferrer">
				<img src={`/api/v3/shiggies/${img}`} alt={img} />
			</a>
		{/each}
	</Masonry>
	{#if !hasMore}
		<p>Youve reached the end!</p>
	{/if}
</div>

<style>
	:global(window, html, body) {
		overflow: hidden;
	}

	.root {
		display: flex;
		flex-direction: column;
		background-color: #333;
		max-height: 100vh;
		overflow-y: auto;
		padding-top: 10px;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
