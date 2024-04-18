import { getAll } from '$lib/server/shiggy';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json(
		getAll().reduce((acc: Record<string, { width: number; height: number }>, i) => {
			acc[i.id] = {
				width: i.width,
				height: i.height
			};
			return acc;
		}, {})
	);
};
