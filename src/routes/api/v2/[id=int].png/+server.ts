import { file } from '$lib/server/response';
import { get, getImagePath } from '$lib/server/shiggy';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const post = get(params.id ?? '0');

	if (post === null) {
		return error(404, 'Shiggy not found');
	}

	return file(getImagePath(post.id), {
		headers: {
			'Content-Type': 'image/png'
		}
	});
};
