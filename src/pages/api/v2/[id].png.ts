import { APIRoute } from "astro";
import { PUBLIC_DIR, SHIGGY_DIR } from "../../../constants";
import { join } from "path";

import getShiggies from "../../../utils/getShiggies";

export const GET: APIRoute = async ({ params }) => {
  if (!params.id) return new Response(Bun.file(join(PUBLIC_DIR, "404.png")));

  const allShiggies = await getShiggies();

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
