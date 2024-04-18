import { SHIGGIES_ZIP, SHIGGIES_ZIP_NAME } from '$lib/constants';
import { file } from '$lib/server/response';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return file(SHIGGIES_ZIP, {
		headers: {
			'Content-Type': 'application/zip',
			'Content-Disposition': `attachment; filename=${SHIGGIES_ZIP_NAME}`
		}
	});
};
