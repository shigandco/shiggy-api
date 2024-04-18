import { get, getImagePath } from '$lib/server/shiggy';
import { error, type RequestHandler } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ params, request }) => {
	const post = get(params.id ?? '0');

	if (post === null) {
		return error(404, 'Shiggy not found');
	}

	const file = sharp(getImagePath(post.id));

	const url = new URL(request.url);
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
