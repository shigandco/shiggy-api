import { APIRoute } from "astro";

import { GET as shiggyGetter } from "./shiggies/[id]/index";

import getShiggies from "../../../utils/getShiggies";
import emitter from "../../../events";

let allShiggies = await getShiggies();

emitter.on("UPDATE_SHIGGIES", async () => {
  allShiggies = await getShiggies();
});

export const GET: APIRoute = async (APIContext) => {
  const shig = allShiggies[Math.floor(Math.random() * allShiggies.length)];

  APIContext.params = { id: shig };

  return shiggyGetter(APIContext);
};
