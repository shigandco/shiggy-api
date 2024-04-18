import { createReadableStream } from '@sveltejs/kit/node';

export function file(path: string, init: ResponseInit) {
	const stream = createReadableStream(path);
	return new Response(stream, init);
}
