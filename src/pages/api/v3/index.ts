import { join } from "path";
import { existsSync } from "fs";
import { Router } from "bunrest/src/router/router";

import { SHIGGY_DIR, PUBLIC_DIR, ZIP_NAME } from "../../../constants";

if (!existsSync(SHIGGY_DIR) || !existsSync(join(PUBLIC_DIR, "sizes.json")))
  throw new Error("Shiggies not found");

const sizesFile = Bun.file(join(PUBLIC_DIR, "sizes.json"));
const sizes: {
  [id: string]: {
    width: number;
    height: number;
  };
} = await sizesFile.json();
const ids = Object.keys(sizes);

function init(router: Router): Router {
  router.get("/sizes", (_, res) => {
    res.status(200).send(sizesFile);
  });

  router.get("/whatthefuck", (_, res) => {
    res.status(200).send(Bun.file(join(PUBLIC_DIR, ZIP_NAME)));
  });

  router.get("/random", (_, res) => {
    res
      .status(200)
      .send(
        Bun.file(
          join(
            SHIGGY_DIR,
            ids[Math.floor(Math.random() * ids.length)],
            "image.png",
          ),
        ),
      );
  });

  router.get("/shiggies", (_, res) => {
    res.status(200).send(Bun.file(join(PUBLIC_DIR, "shiggies.json")));
  });

  router.get("/shiggies/:id", (req, res) => {
    const id = req.params?.id;
    if (!id || !sizes[id]) return void res.status(404).statusText("Not Found");
    res.status(200).send(Bun.file(join(SHIGGY_DIR, id, "image.png")));
  });

  router.get("/shiggies/:id/data", (req, res) => {
    const id = req.params?.id;
    if (!id || !sizes[id]) return void res.status(404).statusText("Not Found");
    res.status(200).send(Bun.file(join(SHIGGY_DIR, id, "data.json")));
  });

  return router;
}

export default init;
