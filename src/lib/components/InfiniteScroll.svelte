<script lang="ts">
  import { onDestroy } from "svelte";

  interface Props {
    threshold?: number;
    horizontal?: boolean;
    hasMore?: boolean;
    loadMore: () => void;
    elementScroll?: HTMLElement;
  }

	let { threshold = 0, horizontal = false, hasMore = true, loadMore, elementScroll}: Props = $props();

  

  let isLoadMore = false;
  let component: HTMLDivElement;

  $effect(() => {
    if (component || elementScroll) {
      const element = elementScroll ? elementScroll : component.parentNode!; 

      element.addEventListener("scroll", onScroll);
      element.addEventListener("resize", onScroll);
    }
  });

  const onScroll = (e: Event) => {
    const element = e.target as HTMLElement;

    const offset = horizontal
      ? element.scrollWidth - element.clientWidth - element.scrollLeft
      : element.scrollHeight - element.clientHeight - element.scrollTop;

    if (offset <= threshold) {
      console.log(hasMore)
      if (!isLoadMore && hasMore) {
        loadMore();
      }
      isLoadMore = true;
    } else {
      console.log("not load more");
      isLoadMore = false;
    }
  };

  onDestroy(() => {
    if (component || elementScroll) {
      const element = elementScroll ? elementScroll : component.parentNode;

      element?.removeEventListener("scroll", null);
      element?.removeEventListener("resize", null);
    }
  });
</script>

<div bind:this={component} style="width:0px"></div>