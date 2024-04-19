import { get } from '$lib/server/shiggy';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const shiggy = get(params.id);
	if (!shiggy) return error(404, 'Shiggy not found');
	return { shiggy };
};
