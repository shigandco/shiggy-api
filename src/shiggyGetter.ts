import { mkdirSync, rmSync } from "fs";
import { PUBLIC_DIR, SHIGGY_DIR } from "./constants";
import AdmZip from "adm-zip";

import booru from "booru";
import { join } from "path";

const danbooru = booru("danbooru.donmai.us");

async function search(page: number, limit: number) {
  return await danbooru.search("kemomimi-chan_(naga_u)", {
    limit,
    page,
  });
}

export default async function getShiggies(limit: number = Infinity) {
  console.log("Shiggy dir not found, fetching shiggies...");
  mkdirSync(SHIGGY_DIR, { recursive: true });

  const posts = await search(1, limit);

  limit -= posts.length;

  let pageNumber = 2;
  // eslint-disable-next-line no-constant-condition
  while (posts.length < limit) {
    console.log(`Getting page ${pageNumber}`);
    const page = await search(pageNumber, limit);
    if (page.length === 0) break;
    posts.push(...page);
    pageNumber++;
    limit -= page.length;
  }

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

  console.log("Generating whythefuckwouldyoudownloadthis.zip");

  const zip = new AdmZip();

  zip.addLocalFolder(SHIGGY_DIR);
  zip.writeZip(join(PUBLIC_DIR, "whythefuckwouldyoudownloadthis.zip"));
  console.log("Done!");
}
