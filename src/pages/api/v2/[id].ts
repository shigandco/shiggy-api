import { APIRoute } from "astro";
export const get: APIRoute = ({ params, redirect }) => {
  return redirect(`/api/v2/${params.id}.png`);
};
