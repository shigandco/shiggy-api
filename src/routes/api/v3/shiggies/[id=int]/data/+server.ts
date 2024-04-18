import { get } from '$lib/server/shiggy';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const post = get(params.id ?? '0');

	if (post === null) {
		return error(404, 'Shiggy not found');
	}

	return json(post, {
		headers: {
			'Content-Type': 'application/json',
			'Shiggy-Id': post.id
		}
	});
};
