<script lang="ts">
	let { data } = $props();

	const shiggy = data.shiggy;

	let reported = $state(false);
	const report = () => {
		fetch(`/api/v3/shiggies/${shiggy.id}/report`, { method: 'POST' });
		reported = true;
	};
</script>

<meta content="{shiggy.id}" property="og:title" />
<meta content="shiggy" property="og:description" />
<meta content="/{shiggy.id}" property="og:url" />
<meta content="/api/v3/shiggies/${shiggy.id}" property="og:image" />
<meta content="#d9d8de" data-react-helmet="true" name="theme-color" />

<div class="root flex flex-row">
	<div class="image">
		<img src={`/api/v3/shiggies/${shiggy.id}`} alt={shiggy.id} />
	</div>
	<div class="flex flex-col">
		<h1 class="tags flex flex-col">
			{#each shiggy.tags as tag}
				<span>{tag}</span>
			{/each}
		</h1>
		<div class="actions flex flex-row">
			<a
				class="button"
				href="/api/v3/shiggies/{shiggy.id}"
				download
				target="_blank"
				rel="noopener noreferrer">Download</a
			>
			<button class="button report" onclick={report}>
				{#if reported}
					Thanks for your report!
				{:else}
					Report
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.flex {
		display: flex;
	}

	.flex-row {
		flex-direction: row;
	}

	.flex-col {
		flex-direction: column;
	}

	.root {
		background-color: #333;
		padding: 10px;
		justify-content: space-between;
		overflow-y: auto;
	}

	.image {
		width: 60%;
	}

	img {
		width: 100%;
		height: auto;
	}

	.tags {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.tags span {
		background-color: #43b581;
		color: white;
		padding: 5px;
		border-radius: 5px;
	}

	a {
		text-decoration: none;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}

	button {
		border: none;
		background: none;
	}

	.button {
		background-color: #43b581;
		color: white;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
	}

	.button.report {
		background-color: #ff4500;
	}
</style>
