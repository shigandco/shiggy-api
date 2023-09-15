import { APIRoute } from "astro";

import { GET as shiggyGetter } from "./shiggies/[id]/index";

import getShiggies from "../../../utils/getShiggies";

export const GET: APIRoute = async (APIContext) => {
  const allShiggies = await getShiggies();

  const shig = allShiggies[Math.floor(Math.random() * allShiggies.length)];

  APIContext.params = { id: shig };

  return shiggyGetter(APIContext);
};
