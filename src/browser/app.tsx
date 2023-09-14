import { createSignal, onMount } from "solid-js";
import { Mason, createMasonryBreakpoints } from "solid-mason";

const breakpoints = createMasonryBreakpoints(() => [
  { query: "(min-width: 1536px)", columns: 6 },
  { query: "(min-width: 1280px) and (max-width: 1536px)", columns: 5 },
  { query: "(min-width: 1024px) and (max-width: 1280px)", columns: 4 },
  { query: "(min-width: 768px) and (max-width: 1024px)", columns: 3 },
  { query: "(max-width: 768px)", columns: 2 },
]);

export default function App() {
  const [items, setItems] = createSignal<
    { id: string; height: number; width: number }[]
  >([]);

  onMount(() => {
    fetch("/api/v3/sizes")
      .then((r) => r.json())
      .then((v) => {
        setItems(Object.keys(v).map((k) => ({ id: k, ...v[k] })));
      });
  });

  return (
    <div class="w-screen p-8 min-h-screen">
      <Mason as="div" columns={breakpoints()} items={items()}>
        {(item) => (
          <div class="w-full p-2">
            <div
              class="parent rounded-xl overflow-hidden"
              style={{ "aspect-ratio": `${item.width}/${item.height}` }}
            >
              <img
                loading="lazy"
                src={`/api/v3/shiggies/${item.id}?format=webp`}
              />
            </div>
          </div>
        )}
      </Mason>
    </div>
  );
}
