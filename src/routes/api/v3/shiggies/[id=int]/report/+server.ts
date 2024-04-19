import { REPORT_WEBHOOK_URL } from '$env/static/private';
import { get } from '$lib/server/shiggy';
import { getBaseUrl } from '$lib/util';
import { error, text, type RequestHandler } from '@sveltejs/kit';
import { EmbedBuilder, WebhookClient } from 'discord.js';

export const POST: RequestHandler = async ({ params, request }) => {
	const post = get(params.id ?? '0');

	if (post === null) {
		return error(404, 'Shiggy not found');
	}

	if (!REPORT_WEBHOOK_URL) {
		return error(500, 'No report webhook URL set');
	}

	const ip =
		request.headers.get('cf-connecting-ip') ?? request.headers.get('x-real-ip') ?? 'IP not found';

	const hook = new WebhookClient({ url: REPORT_WEBHOOK_URL });

	const embed = new EmbedBuilder()
		.setAuthor({
			name: ip
		})
		.setTitle(`New Report`)
		.setDescription(`Shiggy ${post.id} has been reported`)
		.setImage(`${getBaseUrl(request)}/api/v3/${post.id}`)
		.setColor(0xff0000);

	await hook.send({
		embeds: [embed]
	});

	return text('OK');
};
