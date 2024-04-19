import { BLACKLIST_FILE, SHIGGIES_DIR } from '$lib/constants';
import type { Post } from 'booru';
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { makeZip } from './getShiggies';

export function get(id: string): Post | null {
	if (!existsSync(join(SHIGGIES_DIR, id))) {
		return null;
	}

	return JSON.parse(readFileSync(join(SHIGGIES_DIR, id, 'data.json'), 'utf-8'));
}

export function getImagePath(id: string): string {
	return join(SHIGGIES_DIR, id, 'image.png');
}

export function random(): Post | null {
	const files = readdirSync(SHIGGIES_DIR);
	const file = files[Math.floor(Math.random() * files.length)];
	return get(file);
}

export function getAllIds(): string[] {
	return readdirSync(SHIGGIES_DIR);
}

export function getAll(): Post[] {
	const posts: Post[] = [];

	for (const file of getAllIds()) {
		const post = get(file);
		if (post) posts.push(post);
	}

	return posts;
}
type sizes = {
	[key: string]: {
		width: number;
		height: number;
	};
};
export function getSizes(): sizes {
	return getAll().reduce((acc: sizes, i) => {
		acc[i.id] = {
			width: i.width,
			height: i.height
		};
		return acc;
	}, {});
}

export async function blacklist(id: string) {
	const blacklist = JSON.parse(readFileSync(BLACKLIST_FILE, 'utf-8'));
	blacklist.push(id);
	writeFileSync(BLACKLIST_FILE, JSON.stringify(blacklist));
	rmSync(join(SHIGGIES_DIR, id), { recursive: true, force: true });

	await makeZip();
}
