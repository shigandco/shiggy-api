import { join } from "path";
import { Router } from "bunrest/src/router/router";
import { PUBLIC_DIR, SHIGGY_DIR, ZIP_NAME } from "../../constants";

const shiggyWithExtension = /^\d+\.png/;
const shiggyWithoutExtension = /^\d+\/?$/;

const shiggies: string[] = await Bun.file(
  join(PUBLIC_DIR, "shiggies.json"),
).json();

function init(router: Router): Router {
  router.get("/:path", (req, res) => {
    const path: string = req.params?.path;
    if (!path) return void res.status(404).send("Not Found");

    switch (path) {
      case "whatthefuck":
        return void res.status(200).send(Bun.file(join(PUBLIC_DIR, ZIP_NAME)));
      case "random": {
        const shiggy = Math.floor(Math.random() * shiggies.length);
        return void res
          .setHeader("h", "h") // stupid lib
          .setHeader("Location", `${shiggy}.png`)
          .status(302)
          .send("nya");
      }
    }

    if (shiggyWithoutExtension.test(path)) {
      return void res
        .setHeader("h", "h") // stupid lib
        .setHeader("Location", req.request.url + ".png")
        .status(302)
        .send("nya");
    } else if (shiggyWithExtension.test(path)) {
      const shiggy = path.match(/^\d+/)?.[0];
      if (shiggy) {
        const shigId = parseInt(shiggy);
        if (isNaN(shigId) || shigId < 0 || shigId >= shiggies.length) {
          () => {}; // i am actually too lazy to rewrite that conditional
        } else {
          return void res
            .status(200)
            .send(Bun.file(join(SHIGGY_DIR, shiggies[shigId], "image.png")));
        }
      }
    }

    return void res.status(200).send(Bun.file(join(PUBLIC_DIR, "404.png")));
  });
  return router;
}

export default init;
