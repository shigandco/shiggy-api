import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";

const allShiggies: string[] = await Bun.file(
  join(SHIGGY_DIR, "shiggies.json"),
).json();

export const GET: APIRoute = ({ params }) => {
  if (!params.id) return new Response("Not found", { status: 404 });

  let n;
  try {
    n = parseInt(params.id);
  } catch (e) {
    return new Response("Not found", { status: 404 });
  }
  if (n < 0 || n >= allShiggies.length)
    return new Response("Not found", { status: 404 });

  const chosenShiggy = allShiggies[n];

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
