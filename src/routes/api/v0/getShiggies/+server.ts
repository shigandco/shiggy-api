import getShiggies from '$lib/server/getShiggies';
import { text, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	getShiggies();
	return text('OK');
};
