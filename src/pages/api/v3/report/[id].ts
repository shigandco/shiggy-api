import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../../constants";
import { join } from "path";

import getShiggies from "../../../../utils/getShiggies";

export const GET: APIRoute = async ({ params }) => {
  if (!params.id || !new Set<string>(await getShiggies()).has(params.id))
    return new Response("Not found", { status: 404 });

  return new Response(Bun.file(join(SHIGGY_DIR, params.id, "data.json")));
};
