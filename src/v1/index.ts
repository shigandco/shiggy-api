import { readdirSync } from "fs";
import { SHIGGY_DIR } from "../constants";
import { join } from "path";
import { PathHandler } from "../types/pathHandler";

const handler: PathHandler = (path) => {
  let shiggyNumber = path.split("/")[0];
  if (shiggyNumber) {
    if (shiggyNumber === "random") {
      const allShiggies = readdirSync(SHIGGY_DIR);
      shiggyNumber =
        allShiggies[Math.floor(Math.random() * allShiggies.length)];
    }

    const image_path = join(SHIGGY_DIR, shiggyNumber, "image.png");

    if (image_path) {
      return Bun.file(image_path);
    }
  }
};

export default handler;
