// @ts-check
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];
const ALLOWED_ORIGIN_URLS = ALLOWED_ORIGINS.map((origin) => {
	try {
		return new URL(origin);
	} catch (_e) {
		return null;
	}
}).filter((url) => url !== null);

/**
 * Check if the origin is allowed.
 * Allows exact matches and subdomains of allowed origins.
 * @param {string} origin
 * @param {(err: Error | null, allow?: boolean) => void} callback - The CORS callback.
 */
const checkOrigin = (origin, callback) => {
	if (!origin) return callback(null, true);

	if (ALLOWED_ORIGINS.includes(origin)) {
		return callback(null, true);
	}

	// Check for subdomains using cached URLs
	try {
		const originUrl = new URL(origin);
		const isAllowedSubdomain = ALLOWED_ORIGIN_URLS.some((allowedUrl) => {
			return (
				originUrl.protocol === allowedUrl.protocol &&
				originUrl.hostname.endsWith(`.${allowedUrl.hostname}`)
			);
		});

		if (isAllowedSubdomain) {
			return callback(null, true);
		}
	} catch (_e) {
		console.warn(`Invalid origin URL blocked: ${origin}`);
	}

	callback(new Error('Origin not allowed'));
};

export default {
	origin: checkOrigin,
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"]
};