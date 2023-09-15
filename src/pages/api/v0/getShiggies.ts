import { APIRoute } from "astro";
export const GET: APIRoute = ({ locals }) => {
  locals.getShiggies();
  return new Response(null, { status: 200 });
};
