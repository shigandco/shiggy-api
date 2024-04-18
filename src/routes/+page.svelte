<svelte:head>
  <title>Read if cute</title>
  <meta content="read if cute" property="og:description" />
  <meta
    content="https://shiggy.fun/shiggy.gif"
    property="og:image"
  />
  <meta content="#43B581" data-react-helmet="true" name="theme-color" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<img src="/shiggy.gif" alt="shiggy"/>

<style>

  :global(body) {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #212121;
  }

  img {
    width: 100vh;
    height: 100vh;
  }
</style>