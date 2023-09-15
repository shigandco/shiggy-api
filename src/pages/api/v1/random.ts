import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";
import getShiggies from "../../../utils/getShiggies";

export const GET: APIRoute = async () => {
  const allShiggies = await getShiggies();

  const chosenShiggy =
    allShiggies[Math.floor(Math.random() * allShiggies.length)];

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
