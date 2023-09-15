import { join } from "path";
import { SHIGGY_DIR } from "../constants";

export default async function getShiggies() {
  return (await Bun.file(join(SHIGGY_DIR, "shiggies.json")).json()) as string[];
}
