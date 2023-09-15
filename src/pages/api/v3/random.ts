import { APIRoute } from "astro";

import getShiggies from "../../../utils/getShiggies";

export const GET: APIRoute = async ({ redirect }) => {
  const chosenShiggy = Math.floor(Math.random() * (await getShiggies()).length);

  return redirect(`/api/v3/shiggies/${chosenShiggy}`);
};
