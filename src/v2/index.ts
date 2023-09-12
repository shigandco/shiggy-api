import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { PUBLIC_DIR, SHIGGY_DIR } from "../constants";
import { PathHandler } from "../types/pathHandler";

const shiggyWithExtension = /^\d+\.png/;
const shiggyWithoutExtension = /^\d+\/?$/;

const handler: PathHandler = (path, req) => {
  const allShiggies = readdirSync(SHIGGY_DIR);

  switch (path) {
    case "whatthefuck": {
      return Bun.file("whythefuckwouldyoudownloadthis.zip");
    }
    case "random": {
      const shiggyNumber =
        allShiggies[Math.floor(Math.random() * allShiggies.length)];

      return Response.redirect(`/api/v2/${shiggyNumber}.png`);
    }
  }

  if (shiggyWithoutExtension.test(path)) {
    return Response.redirect(req.url + ".png");
  } else if (shiggyWithExtension.test(path)) {
    const shiggyId = path.match(/^\d+/);
    console.log(shiggyId);
    if (shiggyId) {
      const fileName = join(SHIGGY_DIR, shiggyId[0], "image.png");
      if (existsSync(fileName)) {
        return Bun.file(fileName);
      }
    }
  }

  return Bun.file(join(PUBLIC_DIR, "404.png"));
};

export default handler;
