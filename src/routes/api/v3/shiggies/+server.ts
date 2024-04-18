import { getAll } from '$lib/server/shiggy';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json(getAll().map((i) => i.id));
};
