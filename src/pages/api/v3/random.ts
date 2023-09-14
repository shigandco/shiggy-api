import { join } from "path";
import { APIRoute } from "astro";

import { SHIGGY_DIR } from "../../../constants";

import { GET as shiggyGetter } from "./shiggies/[id]/index";

const allShiggies: string[] = await Bun.file(
  join(SHIGGY_DIR, "shiggies.json"),
).json();

export const GET: APIRoute = async (APIContext) => {
  const shig = allShiggies[Math.floor(Math.random() * allShiggies.length)];

  APIContext.params = { id: shig };

  return shiggyGetter(APIContext);
};
