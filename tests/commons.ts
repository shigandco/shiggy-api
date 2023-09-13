import { APIContext, APIRoute } from "astro";

export function get(route: APIRoute, opts: Partial<APIContext> = {}) {
  opts.redirect = (path: string) =>
    new Response(null, { status: 302, headers: { location: path } });
  return route(opts as APIContext) as Response;
}
