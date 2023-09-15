import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../../constants";
import { join } from "path";

import getShiggies from "../../../../utils/getShiggies";
import emitter from "../../../../events";

let allShiggies = new Set<string>(await getShiggies());

emitter.on("UPDATE_SHIGGIES", async () => {
  allShiggies = new Set<string>(await getShiggies());
});

export const GET: APIRoute = ({ params }) => {
  if (!params.id || !allShiggies.has(params.id))
    return new Response("Not found", { status: 404 });

  return new Response(Bun.file(join(SHIGGY_DIR, params.id, "data.json")));
};
