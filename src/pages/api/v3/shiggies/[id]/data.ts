import { APIRoute } from "astro";
import { readdirSync } from "fs";
import { PUBLIC_DIR, SHIGGY_DIR } from "../../../../../constants";
import { join } from "path";

const allShiggies = readdirSync(SHIGGY_DIR);

export const get: APIRoute = ({ params }) => {
  const chosenShiggy = allShiggies[allShiggies.indexOf(params.id!)];

  if (!chosenShiggy) return new Response(Bun.file(join(PUBLIC_DIR, "404.png")));

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "data.json")));
};
