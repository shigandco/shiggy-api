import { getAllIds } from '$lib/server/shiggy';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { ids: getAllIds() };
};
