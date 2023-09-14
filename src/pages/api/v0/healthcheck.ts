import { APIRoute } from "astro";
import getShiggies from "../../../shiggyGetter";

let gotShiggies = false;

export const GET: APIRoute = () => {
  if (!gotShiggies) {
    getShiggies(
      import.meta.env.MAX_SHIGGIES
        ? Number.parseInt(import.meta.env.MAX_SHIGGIES)
        : 100,
    );
    gotShiggies = true;
  }
  return new Response("ok", { status: 200 });
};
