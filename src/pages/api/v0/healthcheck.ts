import { APIRoute } from "astro";
import getShiggies from "../../../shiggyGetter";

let gotShiggies = false;

export const GET: APIRoute = () => {
  if (!gotShiggies) {
    gotShiggies = true;
    setTimeout(() => {
      getShiggies(
        import.meta.env.MAX_SHIGGIES
          ? Number.parseInt(import.meta.env.MAX_SHIGGIES)
          : 100,
      );
    }, 1000);
    return new Response(null, { status: 200 });
  }
  return new Response(null, { status: 200 });
};
