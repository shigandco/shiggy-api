<script lang="ts">
	import { page } from "$app/stores";
</script>


<svelte:head>
  <title>How did we get here?</title>
  <meta content="How did we get here?" property="og:description" />
  <meta
    content="https://shiggy.fun/404.png"
    property="og:image"
  />
  <meta content="#43B581" data-react-helmet="true" name="theme-color" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
{#if $page.status === 404}
  <img src="/404.png" alt="404"/>
{:else}
  <span>{$page.error?.message}</span>
{/if}

<style>

  :global(body) {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
  }

  img {
    width: 100vh;
    height: 100vh;
  }
</style>