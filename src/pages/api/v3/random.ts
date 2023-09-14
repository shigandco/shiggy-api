import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";

const allShiggies: string[] = await Bun.file(
  join(SHIGGY_DIR, "shiggies.json"),
).json();

export const GET: APIRoute = () => {
  const shig = allShiggies[Math.floor(Math.random() * allShiggies.length)];

  return new Response(Bun.file(join(SHIGGY_DIR, shig, "image.png")), {
    headers: {
      "shiggy-id": shig,
    },
  });
};
