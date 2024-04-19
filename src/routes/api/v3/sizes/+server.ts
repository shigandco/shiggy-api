import { getSizes } from '$lib/server/shiggy';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json(getSizes());
};
