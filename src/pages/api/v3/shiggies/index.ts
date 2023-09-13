import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../../constants";
import { join } from "path";

export const get: APIRoute = () => {
  return new Response(Bun.file(join(SHIGGY_DIR, "shiggies.json")));
};
