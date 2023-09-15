import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";
import getShiggies from "../../../utils/getShiggies";
import emitter from "../../../events";

let allShiggies = await getShiggies();

emitter.on("UPDATE_SHIGGIES", async () => {
  allShiggies = await getShiggies();
});

export const GET: APIRoute = () => {
  const chosenShiggy =
    allShiggies[Math.floor(Math.random() * allShiggies.length)];

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
