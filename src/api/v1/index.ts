import { join } from "path";
import { existsSync } from "fs";
import { Router } from "bunrest/src/router/router";

import { PUBLIC_DIR, SHIGGY_DIR } from "../../constants";

const shiggies: string[] = await Bun.file(
  join(PUBLIC_DIR, "shiggies.json"),
).json();

function init(router: Router): Router {
  router.get("/:path", (req, res) => {
    const path: string = req.params?.path;
    if (!path) return void res.status(404).send("Not Found");

    let id: string;
    if (path === "random") {
      id = shiggies[Math.floor(Math.random() * shiggies.length)];
    } else {
      const n = parseInt(path);
      if (isNaN(n) || n < 0 || n >= shiggies.length)
        return void res.status(404).send("Not Found");
      id = shiggies[n];
    }

    const image_path = join(SHIGGY_DIR, id, "image.png");
    if (!existsSync(image_path))
      return void res.status(500).send("Internal Server Error");

    res.status(200).send(Bun.file(image_path));
  });

  return router;
}

export default init;
