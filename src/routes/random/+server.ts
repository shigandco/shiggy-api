import { random } from '$lib/server/shiggy';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const shig = random();

	if (!shig) return error(404, 'No shiggies found');
	return redirect(302, `/${shig.id}`);
};
