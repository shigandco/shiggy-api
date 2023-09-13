import { APIRoute } from "astro";
import { PUBLIC_DIR, SHIGGY_DIR } from "../../../../../constants";
import { join } from "path";

const allShiggies: string[] = await Bun.file(
  join(SHIGGY_DIR, "shiggies.json"),
).json();

export const get: APIRoute = ({ params }) => {
  const chosenShiggy = allShiggies[allShiggies.indexOf(params.id!)];

  if (!chosenShiggy) return new Response(Bun.file(join(PUBLIC_DIR, "404.png")));

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
