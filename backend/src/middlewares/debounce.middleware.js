import crypto from 'node:crypto';

/**
 * @description: Generates a unique fingerprint for the request.
 * @param {object} req - The request object.
 * @returns {string} - The unique fingerprint.
*/
const fingerprint = (req) => {
	const data = {
		ip: req.ip,
		method: req.method,
		path: req.path,
		userId: req.user?.id,
		body: req.body,
	};
	return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
};

const cache = new Map();


/**
 * @description: Used to prevent duplicate requests from being processed.
 * @param {number} ms - The time in milliseconds to wait before processing the request.
 * @returns {function} - The middleware function.
*/
const debounce = (ms = 500) => (req, res, next) => {
	const key = fingerprint(req);
	if (cache.has(key)) return res.status(418).end();

	cache.set(key, true);
	setTimeout(() => cache.delete(key), ms);
	next();
};

export default debounce;