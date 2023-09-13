import { APIRoute } from "astro";
import { readdirSync } from "fs";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";

const allShiggies = readdirSync(SHIGGY_DIR);

export const get: APIRoute = ({ params }) => {
  console.log(params);
  const chosenShiggy = allShiggies[allShiggies.indexOf(params.id!)];

  if (!chosenShiggy) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
