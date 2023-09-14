import { mkdir, rmSync } from "fs";
import { join, resolve } from "path";
import AdmZip from "adm-zip";
import booru, { Post } from "booru";

import { PUBLIC_DIR, SHIGGY_DIR, ZIP_NAME } from "./constants";

const imageConvPort = Bun.env.IMAGE_CONV_PORT || "19092";

const blacklist = new Set(
  (await Bun.file(join(PUBLIC_DIR, "blacklist.txt")).text()).split("\n"),
);

const deniedTags = new Set(["nsfw"]); // idk, work on this

function isSafe(post: Post): boolean {
  if (blacklist.has(post.id)) return false;
  switch (post.rating) {
    case "s":
      return true;
    case "q":
    case "e":
      return false;
  }

  if (post.tags.some((t) => deniedTags.has(t))) return false;
  return true;
}

function selectAttributesFromPost(post: Post): Partial<Post> {
  return {
    id: post.id,
    fileUrl: post.fileUrl,
    tags: post.tags,
    score: post.score,
    rating: post.rating,
    createdAt: post.createdAt,
    height: post.height,
    width: post.width,
  };
}

const danbooru = booru("danbooru.donmai.us");

export default async function getShiggies(limit = 50): Promise<void> {
  console.info("Cleaning up old shiggies..");

  rmSync(SHIGGY_DIR, { recursive: true, force: true });
  rmSync(join(PUBLIC_DIR, ZIP_NAME), { force: true });
  rmSync(join(PUBLIC_DIR, "sizes.json"), { force: true });

  console.info("Setting up shiggies..");
  const posts = {} as Record<
      string,
      ReturnType<typeof selectAttributesFromPost>
    >,
    didFetch = new Set<string>(),
    chunk_limit = Math.min(Math.ceil(limit / 10), 50);

  let page = await danbooru.search("kemomimi-chan_(naga_u)", {
    limit: chunk_limit,
  });

  while (page.length && Object.keys(posts).length + chunk_limit <= limit) {
    console.info(`Processing page ${page.page}...`);

    await Promise.all(
      page.map(async (post) => {
        if (!post.available || !post.fileUrl || !isSafe(post)) return;
        const fileExt = post.fileUrl.split(".").pop();

        posts[post.id] = selectAttributesFromPost(post);

        const path = join(SHIGGY_DIR, post.id);
        const [image] = await Promise.all([
          fetch(post.fileUrl!).then((r) => r.arrayBuffer()),
          mkdir(path, { recursive: true }, (e) => {
            if (e) throw new Error("Failed to create directory");
          }),
        ]);

        await Promise.all([
          Bun.write(join(path, `image.${fileExt}`), image),
          Bun.write(join(path, "data.json"), JSON.stringify(posts[post.id])),
        ]);

        if (fileExt !== "png") {
          const url = new URL(`http://localhost:${imageConvPort}/`);
          url.searchParams.append("format", "png");
          url.searchParams.append(
            "filepath",
            resolve(join(SHIGGY_DIR, post.id, `image.${fileExt}`)),
          );

          const res = await fetch(url);
          if (!res.ok) return;
        }

        didFetch.add(post.id);
      }),
    );

    page = await page.nextPage();
  }

  const sizes = Object.fromEntries(
    Object.entries(posts).map(([id, post]) => [
      id,
      {
        width: post.width,
        height: post.height,
      },
    ]),
  );
  Bun.write(join(PUBLIC_DIR, "sizes.json"), JSON.stringify(sizes, null));

  Bun.write(
    join(SHIGGY_DIR, "shiggies.json"),
    JSON.stringify(Object.keys(posts), null),
  );
  console.info(
    `Fetched ${didFetch.size} posts out of ${Object.keys(posts).length} total`,
  );

  console.info("Generating whythefuckwouldyoudownloadthis.zip");

  const zip = new AdmZip();

  zip.addLocalFolder(SHIGGY_DIR);
  zip.writeZip(join(PUBLIC_DIR, ZIP_NAME));
  console.info("Done!");
}
