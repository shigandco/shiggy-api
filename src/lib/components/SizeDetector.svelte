<script lang="ts">
  interface Props {
    width?: number;
    height?: number;
  }
  let { width = $bindable(0), height = $bindable(0) }: Props = $props();

  let div: HTMLDivElement;

  $effect(() => {
    if (div) {
      getSize();
    }
  });

  const getSize = () => {
    width = div!.clientWidth;
    height = div!.clientHeight;
  };
</script>

<div bind:this={div} onresize={getSize}></div>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>