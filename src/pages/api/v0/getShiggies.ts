import { APIRoute } from "astro";
import { SHARED_KEY } from "../../../utils/filters";
export const GET: APIRoute = ({ request, locals }) => {
  if (!SHARED_KEY(request)) return new Response(null, { status: 401 });
  locals.getShiggies();
  return new Response(null, { status: 200 });
};
