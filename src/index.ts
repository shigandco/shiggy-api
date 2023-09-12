import { join } from "path";
import { PUBLIC_DIR, SHIGGY_DIR } from "./constants";
import { PathHandler } from "./types/pathHandler";
import { BunFile } from "bun";
import { existsSync } from "fs";
import getShiggies from "./shiggyGetter";

if (!existsSync(SHIGGY_DIR))
  getShiggies(
    Bun.env.SHIGGY_LIMIT ? Number.parseInt(Bun.env.SHIGGY_LIMIT) : Infinity,
  );

export async function fetchHandler(req: Request) {
  const url = new URL(req.url);

  const api = url.pathname.match(/^\/api\/v(\d)\/(.*)$/);
  if (api) {
    try {
      const apiHandler: PathHandler = await import(
        `./v${api[1]}/index.ts`
      ).then((m) => m.default);

      if (apiHandler) {
        let path = api[2];
        if (path.endsWith("/")) path = path.slice(0, -1);
        const success = await apiHandler(path, req);
        if (success) {
          if ((success as BunFile).exists) {
            return new Response(success as BunFile);
          } else {
            return success as Response;
          }
        }
      }
    } catch (e) {
      () => {};
    }
  }

  if (url.pathname === "/")
    return new Response(Bun.file(join(PUBLIC_DIR, "index.html")));

  return new Response(`you literally shouldnt be able to be here`);
}

Bun.serve({
  fetch: fetchHandler,
  port: Bun.env.PORT || 19091,
});
