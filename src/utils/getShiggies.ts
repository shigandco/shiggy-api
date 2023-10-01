import { join } from "path";
import { SHIGGY_DIR } from "../constants";

export default async function getShiggies(): Promise<string[]> {
  return await Bun.file(join(SHIGGY_DIR, "shiggies.json")).json();
}

type ShiggySizeMap = { [key: string]: { width: number; height: number } };

export async function getSizes(): Promise<ShiggySizeMap> {
  return await Bun.file(join(SHIGGY_DIR, "sizes.json")).json();
}
