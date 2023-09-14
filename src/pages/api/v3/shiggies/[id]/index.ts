import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../../../constants";
import { join } from "path";

const allShiggies = new Set<string>(
  await Bun.file(join(SHIGGY_DIR, "shiggies.json")).json(),
);

export const GET: APIRoute = ({ params }) => {
  if (!params.id || !allShiggies.has(params.id))
    return new Response("Not found", { status: 404 });

  return new Response(Bun.file(join(SHIGGY_DIR, params.id, "image.png")));
};
