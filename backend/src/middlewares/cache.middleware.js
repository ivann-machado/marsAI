import crypto from 'node:crypto';

const store = new Map();

/**
 * @description: Caches the response for a given duration.
 * @param {number} ttl - The duration in seconds to cache the response.
 * @returns {function} - The middleware function.
 */
export const cache = (ttl = 60 * 60 * 24) => (req, res, next) => {
	const key = req.originalUrl;
	const entry = store.get(key);

	if (entry) {
		if (ttl !== 0 && Date.now() > entry.expires) {
			store.delete(key);
		} else {
			const etag = `"${entry.etag}"`;
			res.setHeader('ETag', etag);
			res.setHeader('Cache-Control', 'no-cache');

			if (req.headers['if-none-match'] === etag) {
				return res.status(304).end();
			}

			return res.json(entry.body);
		}
	}

	const originalJson = res.json.bind(res);
	res.json = (body) => {
		const etag = crypto.createHash('md5').update(JSON.stringify(body)).digest('hex');
		store.set(key, {
			body,
			etag,
			expires: ttl === 0 ? 0 : Date.now() + ttl * 1000
		});
		res.setHeader('ETag', `"${etag}"`);
		res.setHeader('Cache-Control', 'no-cache');
		return originalJson(body);
	};

	next();
};

/**
 * @description: Clears the cache for a given pattern.
 * @param {string} pattern - The pattern to match against the cache keys.
 * @returns {function} - The middleware function.
 */
export const clearCache = (pattern) => (req, res, next) => {
	store.forEach((_, key) => {
		if (key.includes(pattern)) store.delete(key);
	});
	next();
};