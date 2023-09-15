import { APIRoute } from "astro";
import { PUBLIC_DIR, SHIGGY_DIR } from "../../../constants";
import { join } from "path";

import getShiggies from "../../../utils/getShiggies";
import emitter from "../../../events";

let allShiggies = await getShiggies();

emitter.on("UPDATE_SHIGGIES", async () => {
  allShiggies = await getShiggies();
});
export const GET: APIRoute = ({ params }) => {
  if (!params.id) return new Response(Bun.file(join(PUBLIC_DIR, "404.png")));

  let n;
  try {
    n = parseInt(params.id);
  } catch (e) {
    return new Response(Bun.file(join(PUBLIC_DIR, "404.png")));
  }
  if (isNaN(n) || n < 0 || n >= allShiggies.length)
    return new Response(Bun.file(join(PUBLIC_DIR, "404.png")));

  const chosenShiggy = allShiggies[n];

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
