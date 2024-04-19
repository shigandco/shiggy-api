import { getAll, getImagePath, random } from '$lib/server/shiggy';
import { error, type RequestHandler } from '@sveltejs/kit';
import type { Post } from 'booru';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url);

	let post: Post | null = null;

	if (url.searchParams.has('aspect-ratio')) {
		const posts = getAll();

		const [targetWidth, targetHeight] = url.searchParams
			.get('aspect-ratio')!
			.split(':')
			.map(Number);

		if (!url.searchParams.get('aspect-ratio-variance')) {
			const matches: Post[] = [];

			for (const tryPost of posts) {
				if (tryPost.width / tryPost.height === targetWidth / targetHeight) {
					matches.push(tryPost);
				}
			}

			if (matches.length > 0) {
				post = matches[Math.floor(Math.random() * matches.length)];
			}
		} else {
			// Target the closest aspect ratio
			let closestPost: Post | null = null;

			for (const tryPost of posts) {
				if (
					!closestPost ||
					Math.abs(tryPost.width / tryPost.height - targetWidth / targetHeight) <
						Math.abs(closestPost.width / closestPost.height - targetWidth / targetHeight)
				) {
					closestPost = tryPost;
				}
			}

			post = closestPost;
		}
	} else {
		post = random();
	}

	if (!post) {
		return error(404, 'No shiggies available');
	}

	const file = sharp(getImagePath(post.id));

	if (url.searchParams.has('format')) {
		// @ts-expect-error im not typing that
		file.toFormat(url.searchParams.get('format'));
	}

	return new Response(await file.toBuffer(), {
		headers: {
			'Content-Type': `image/${url.searchParams.get('format') ?? 'png'}`,
			'Shiggy-Id': post.id
		}
	});
};
