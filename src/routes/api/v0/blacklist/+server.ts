import { blacklist } from '$lib/server/shiggy';
import { text, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { id } = await request.json();
	await blacklist(id);
	return text('OK');
};
