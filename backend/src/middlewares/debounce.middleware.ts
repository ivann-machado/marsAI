import crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

/**
 * Generates a unique fingerprint for the request.
 */
const fingerprint = (req: Request) => {
	const data = {
		ip: req.ip,
		method: req.method,
		path: req.path,
		userId: (req as any).user?.id,
		body: req.body,
	};
	return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
};

const cache = new Map<string, boolean>();

/**
 * Used to prevent duplicate requests from being processed.
 * @param ms - The time in milliseconds to wait before processing the request.
 * @returns The middleware function.
 */
const debounce = (ms = 500) => (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'GET') return next();
	const key = fingerprint(req);
	if (cache.has(key)) return res.status(418).end();

	cache.set(key, true);
	setTimeout(() => cache.delete(key), ms);
	next();
};

export default debounce;