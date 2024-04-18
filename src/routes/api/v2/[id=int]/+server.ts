import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	return redirect(301, `/api/v2/${params.id}.png`);
};
