import { APIRoute } from "astro";
import { readdirSync } from "fs";
import { SHIGGY_DIR } from "../../../constants";

const allShiggies = readdirSync(SHIGGY_DIR);

export const get: APIRoute = ({ params, redirect }) => {
  const chosenShiggy = allShiggies[allShiggies.indexOf(params.id!)];

  return redirect(`/api/v2/${chosenShiggy}.png`);
};
