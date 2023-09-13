import { APIRoute } from "astro";
import { readdirSync } from "fs";
import { SHIGGY_DIR } from "../../../constants";

const allShiggies = readdirSync(SHIGGY_DIR);

export const get: APIRoute = ({ redirect }) => {
  const chosenShiggy =
    allShiggies[Math.floor(Math.random() * allShiggies.length)];

  return redirect(`/api/v2/${chosenShiggy}.png`);
};
