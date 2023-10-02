import { APIRoute } from "astro";
import { getSizes } from "../../../utils/getShiggies.ts";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(await getSizes()), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
