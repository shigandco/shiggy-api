import { APIRoute } from "astro";

import getShiggies from "../../../utils/getShiggies";
import emitter from "../../../events";

let allShiggies = await getShiggies();

emitter.on("UPDATE_SHIGGIES", async () => {
  allShiggies = await getShiggies();
});

export const GET: APIRoute = ({ redirect }) => {
  const chosenShiggy = Math.floor(Math.random() * allShiggies.length);

  return redirect(`/api/v2/${chosenShiggy}.png`);
};
