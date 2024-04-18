import { random } from '$lib/server/shiggy';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const post = random();

	if (post === null) {
		return error(404, 'No shiggies available');
	}

	return redirect(302, `/api/v2/${post.id}.png`);
};
