import crypto from 'node:crypto';

const store = new Map();


/**
 * Applies ETag header and handles 304 Not Modified responses.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {object} body - The response body.
 * @param {string} etag - The ETag value.
 * @param {function} originalJson - The original res.json function.
 * @returns {import('express').Response}
 */
const applyEtag = (req, res, body, etag, originalJson) => {
	res.setHeader('ETag', etag);
	res.setHeader('Cache-Control', 'no-cache');
	if (req.headers['if-none-match'] === etag) {
		return res.status(304).end();
	}
	return originalJson(body);
};

/**
 * Caches the response for a given duration and handles ETag revalidation.
 * @param {object} options - The cache options.
 * @param {number} [options.ttl=86400] - The duration in seconds to cache the response. 0 = forever.
 * @param {boolean} [options.etagOnly=false] - If true, skips server-side caching but still applies ETag.
 * @returns {import('express').RequestHandler} - The middleware function.
 */
export const cache = ({ ttl = 60 * 60 * 24, etagOnly = false } = {}) => (req, res, next) => {
	const originalJson = res.json.bind(res);

	if (etagOnly) {
		res.json = (body) => {
			const etag = `"${crypto.createHash('md5').update(JSON.stringify(body)).digest('hex')}"`;
			return applyEtag(req, res, body, etag, originalJson);
		};
		return next();
	}

	const key = req.originalUrl;
	const entry = store.get(key);

	if (entry) {
		if (ttl !== 0 && Date.now() > entry.expires) {
			store.delete(key);
		} else {
			return applyEtag(req, res, entry.body, `"${entry.etag}"`, originalJson);
		}
	}

	res.json = (body) => {
		const etag = crypto.createHash('md5').update(JSON.stringify(body)).digest('hex');
		store.set(key, { body, etag, expires: ttl === 0 ? 0 : Date.now() + ttl * 1000 });
		return applyEtag(req, res, body, `"${etag}"`, originalJson);
	};

	next();
};

/**
 * Clears cache entries matching a given pattern.
 * @param {string} pattern - The pattern to match cache keys against.
 * @returns {import('express').RequestHandler} - The middleware function.
 */
export const clearCache = (pattern) => (_req, _res, next) => {
	store.forEach((_, key) => {
		if (key.includes(pattern)) store.delete(key);
	});
	next();
};