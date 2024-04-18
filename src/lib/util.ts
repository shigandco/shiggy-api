export const getBaseUrl = (req: Request) => {
	const url = new URL(req.url);
	return `${url.protocol}//${url.host}`;
};
