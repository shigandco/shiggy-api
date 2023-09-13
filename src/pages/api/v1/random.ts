import { APIRoute } from "astro";
import { readdirSync } from "fs";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";

const allShiggies = readdirSync(SHIGGY_DIR);

export const get: APIRoute = () => {
  const chosenShiggy =
    allShiggies[Math.floor(Math.random() * allShiggies.length)];

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
