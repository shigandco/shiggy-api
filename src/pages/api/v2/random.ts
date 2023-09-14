import { APIRoute } from "astro";
import { SHIGGY_DIR } from "../../../constants";
import { join } from "path";

const allShiggies: string[] = await Bun.file(
  join(SHIGGY_DIR, "shiggies.json"),
).json();

export const GET: APIRoute = ({ redirect }) => {
  const chosenShiggy = Math.floor(Math.random() * allShiggies.length);

  return redirect(`/api/v2/${chosenShiggy}.png`);
};
