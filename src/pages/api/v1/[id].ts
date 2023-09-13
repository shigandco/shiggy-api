import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";

const allShiggies: string[] = await Bun.file(
  join(SHIGGY_DIR, "shiggies.json"),
).json();

export const get: APIRoute = ({ params }) => {
  console.log(params);
  const chosenShiggy = allShiggies[allShiggies.indexOf(params.id!)];

  if (!chosenShiggy) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(Bun.file(join(SHIGGY_DIR, chosenShiggy, "image.png")));
};
