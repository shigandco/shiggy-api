import { mkdirSync, rmSync } from "fs";
import { SHIGGY_DIR } from "./constants";

import booru from "booru";
import { join } from "path";

const danbooru = booru("danbooru.donmai.us");

export default async function getShiggies(limit: number = 1000) {
  console.log("Shiggy dir not found, fetching shiggies...");
  mkdirSync(SHIGGY_DIR, { recursive: true });

  const posts = await danbooru.search("kemomimi-chan_(naga_u)", {
    limit,
  });

  let success = 0;
  let failure = 0;

  for (const post of posts) {
    if (!post.file_url) return;
    mkdirSync(join(SHIGGY_DIR, post.id), { recursive: true });

    try {
      const image = await fetch(post.file_url).then((r) => r.arrayBuffer());
      await Bun.write(join(SHIGGY_DIR, post.id, "image.png"), image);

      const fileData = {
        id: post.id,
        tags: post.tags,
      };

      await Bun.write(
        join(SHIGGY_DIR, post.id, "data.json"),
        JSON.stringify(fileData),
      );

      success++;
    } catch (e) {
      failure++;
      console.log(`Failed to write ${post.id} to disk`);
      rmSync(join(SHIGGY_DIR, post.id), { recursive: true });
    }

    console.log(`${success + failure}/${posts.length}`);
  }

  console.log(`Successfully wrote ${success} shiggies to disk`);
  if (failure) console.log(`Failed to write ${failure} shiggies to disk`);
}
