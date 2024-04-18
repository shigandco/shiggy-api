import booru, { Post } from 'booru';
import { readFileSync } from 'fs';
import { mkdir, rename, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { BLACKLIST_FILE, SHIGGIES_DIR, TEMP_SHIGGIES_DIR } from '../constants';

const blacklistedTags = ['nsfw'];

export default async function getShiggies() {
	try {
		console.log('Getting shiggies...');

		// booru's types are fucked up
		const db = (booru as unknown as { forSite: typeof booru }).forSite('danbooru.donmai.us');

		const blacklist: string[] = (() => {
			try {
				return JSON.parse(readFileSync(BLACKLIST_FILE, 'utf-8'));
			} catch (e) {
				return [];
			}
		})();

		const isSafe = (post: Post) => {
			if (blacklist.includes(post.id.toString())) return false;
			if (['q', 'e'].includes(post.rating)) return false;
			if (post.tags.some((tag) => blacklistedTags.includes(tag))) return false;
			return true;
		};

		const posts: Post[] = [];

		const apiPosts = await db.search('kemomimi-chan_(naga_u)', {
			limit: Number(process.env.MAX_SHIGGIES ?? 10)
		});

		for (const post of apiPosts) {
			if (post.fileUrl && isSafe(post)) {
				posts.push(post);
			}
		}

		await rm(TEMP_SHIGGIES_DIR, { recursive: true, force: true });

		await mkdir(TEMP_SHIGGIES_DIR);

		for (const post of posts) {
			await mkdir(join(TEMP_SHIGGIES_DIR, post.id));
			const file = await fetch(post.fileUrl!);

			await sharp(await file.arrayBuffer())
				.toFormat('png')
				.toFile(join(TEMP_SHIGGIES_DIR, post.id, 'image.png'));

			await writeFile(join(TEMP_SHIGGIES_DIR, post.id, 'data.json'), JSON.stringify(post));
		}

		console.log('Success! Replacing old shiggies');

		await rm(SHIGGIES_DIR, { recursive: true, force: true });
		await rename(TEMP_SHIGGIES_DIR, SHIGGIES_DIR);
	} catch (e) {
		console.log('Error getting shiggies');
		console.error(e);
	}
}
