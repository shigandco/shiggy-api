import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../../constants";
import { join } from "path";

export const GET: APIRoute = () => {
  return new Response(Bun.file(join(SHIGGY_DIR, "shiggies.json")));
};
