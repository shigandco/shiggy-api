import { file } from '$lib/server/response';
import { getImagePath, random } from '$lib/server/shiggy';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const post = random();

	if (post === null) {
		return error(404, 'No shiggies available');
	}

	return file(getImagePath(post.id), {
		headers: {
			'Content-Type': 'image/png'
		}
	});
};
