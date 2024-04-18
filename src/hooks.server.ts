import { SHARED_KEY } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/v0')) {
		const auth = event.request.headers.get('Authorization');
		if (!auth || auth !== SHARED_KEY) {
			return new Response('Unauthorized', { status: 401 });
		}
	}
	const response = await resolve(event);
	return response;
};
