import { APIRoute } from "astro";
import { PUBLIC_DIR, ZIP_NAME } from "../../../constants";
import { join } from "path";

export const GET: APIRoute = () => {
  return new Response(Bun.file(join(PUBLIC_DIR, ZIP_NAME)));
};
