import { join, resolve } from "path";
import AdmZip from "adm-zip";
import booru, { Post } from "booru";

import { PUBLIC_DIR, SHIGGY_DIR, ZIP_NAME } from "./constants";
import { rm, mkdir } from "fs/promises";

const deniedTags = new Set(["nsfw"]); // idk, work on this

const converter = import.meta.env?.CONVERTER || Bun.env.CONVERTER;

function isSafe(post: Post, blacklist: Set<string>): boolean {
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

  const blacklistFile = Bun.file(join(SHIGGY_DIR, "blacklist.json"));
  const sizesFile = Bun.file(join(SHIGGY_DIR, "sizes.json"));
  const shiggyFile = Bun.file(join(SHIGGY_DIR, "shiggies.json"));

  const blacklist = new Set<string>(
    (await blacklistFile.exists()) ? await blacklistFile.json() : [],
  );

  await rm(SHIGGY_DIR, { recursive: true, force: true });
  await rm(join(PUBLIC_DIR, ZIP_NAME), { force: true });

  await mkdir(SHIGGY_DIR, { recursive: true });

  Bun.write(blacklistFile, JSON.stringify([...blacklist]));

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
        if (!post.available || !post.fileUrl || !isSafe(post, blacklist))
          return;
        const fileExt = post.fileUrl.split(".").pop();

        if (fileExt !== "png" && !converter) return;

        posts[post.id] = selectAttributesFromPost(post);

        const path = join(SHIGGY_DIR, post.id);
        const [image] = await Promise.all([
          fetch(post.fileUrl!).then((r) => r.arrayBuffer()),
          mkdir(path, { recursive: true }),
        ]);

        await Promise.all([
          Bun.write(join(path, `image.${fileExt}`), image),
          Bun.write(join(path, "data.json"), JSON.stringify(posts[post.id])),
        ]);
        console.log(`Fetched ${post.id}!`);

        if (fileExt !== "png") {
          try {
            const url = new URL(converter!);
            url.searchParams.append("format", "png");
            url.searchParams.append(
              "filepath",
              resolve(join(SHIGGY_DIR, post.id, `image.${fileExt}`)),
            );

            const res = await fetch(url);
            if (!res.ok) return;
          } catch (e) {
            console.error(e);
            await rm(join(SHIGGY_DIR, post.id), { recursive: true });
          }
        }

        didFetch.add(post.id);
      }),
    );

    const sizes = Object.fromEntries(
      Object.entries(posts).map(([id, post]) => [
        id,
        {
          width: post.width,
          height: post.height,
        },
      ]),
    );

    Bun.write(sizesFile, JSON.stringify(sizes));
    Bun.write(shiggyFile, JSON.stringify(Object.keys(posts)));

    page = await page.nextPage();
  }

  console.info(
    `Fetched ${didFetch.size} posts out of ${Object.keys(posts).length} total`,
  );

  console.info("Generating whythefuckwouldyoudownloadthis.zip");

  const zip = new AdmZip();

  zip.addLocalFolder(SHIGGY_DIR);
  zip.writeZip(join(PUBLIC_DIR, ZIP_NAME));
  console.info("Done!");
}
