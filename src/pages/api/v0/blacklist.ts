import { APIRoute } from "astro";
import { SHARED_KEY } from "../../../utils/filters";
import emitter from "../../../events";

export const POST: APIRoute = ({ request }) => {
  if (!SHARED_KEY(request)) return new Response(null, { status: 401 });

  emitter.emit("UPDATE_SHIGGIES");

  return new Response(null, { status: 200 });
};
