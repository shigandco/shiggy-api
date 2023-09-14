import { APIRoute } from "astro";

export const GET: APIRoute = ({ params, redirect }) => {
  return redirect(`/api/v2/${params.id}.png`);
};
