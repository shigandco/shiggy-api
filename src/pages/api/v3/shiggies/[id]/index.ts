import { join, resolve } from "path";
import { existsSync } from "fs";
import { APIRoute } from "astro";

import { SHIGGY_DIR } from "../../../../../constants";

import getShiggies from "../../../../../utils/getShiggies";

const allowedOutFormats = new Set([
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
  "tiff",
]);

export const GET: APIRoute = async ({ params, url }) => {
  if (!params.id || !new Set<string>(await getShiggies()).has(params.id))
    return new Response("Not found", { status: 404 });

  const pngFile = Bun.file(join(SHIGGY_DIR, params.id, "image.png"));

  const searchParams = url.searchParams;
  if (searchParams.has("format")) {
    const format = searchParams.get("format")!.toLowerCase();
    if (!allowedOutFormats.has(format))
      return new Response("Invalid Format", { status: 400 });

    if (format !== "png") {
      const imageName = `image.${format}`;

      if (!existsSync(join(SHIGGY_DIR, params.id, imageName))) {
        const url = new URL(import.meta.env.CONVERTER);
        url.searchParams.append("format", format);
        url.searchParams.append(
          "filepath",
          resolve(join(SHIGGY_DIR, params.id, "image.png")),
        );

        const res = await fetch(url);
        if (!res.ok) return new Response("Error", { status: 500 });
      }

      return new Response(Bun.file(join(SHIGGY_DIR, params.id, imageName)), {
        headers: {
          "Shiggy-Id": params.id,
        },
      });
    }
  }

  return new Response(pngFile, {
    headers: {
      "Shiggy-Id": params.id,
    },
  });
};
