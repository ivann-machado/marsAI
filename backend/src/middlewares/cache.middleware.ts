import crypto from 'node:crypto';
import type { Request, Response, NextFunction, RequestHandler } from "express";

interface CacheEntry {
	body: any;
	etag: string;
	expires: number;
}

const store = new Map<string, CacheEntry>();

/**
 * Applies ETag header and handles 304 Not Modified responses.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {any} body - The response body.
 * @param {string} etag - The ETag value.
 * @param {any} originalJson - The original res.json function.
 * @returns {Response}
 */
const applyEtag = (req: Request, res: Response, body: any, etag: string, originalJson: any): Response => {
	res.setHeader('ETag', etag);
	res.setHeader('Cache-Control', 'no-cache');
	if (req.headers['if-none-match'] === etag) {
		return res.status(304).end();
	}
	return originalJson(body);
};

interface CacheOptions {
	ttl?: number;
	etagOnly?: boolean;
}

/**
 * Caches the response for a given duration and handles ETag revalidation.
 * @param {CacheOptions} options - The cache options.
 * @returns {RequestHandler} - The middleware function.
 */
export const cache = ({ ttl = 60 * 60 * 24, etagOnly = false }: CacheOptions = {}): RequestHandler => (req, res, next) => {
	const originalJson = res.json.bind(res);

	if (etagOnly) {
		(res as any).json = (body: any) => {
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

	(res as any).json = (body: any) => {
		const etag = crypto.createHash('md5').update(JSON.stringify(body)).digest('hex');
		store.set(key, { body, etag, expires: ttl === 0 ? 0 : Date.now() + ttl * 1000 });
		return applyEtag(req, res, body, `"${etag}"`, originalJson);
	};

	next();
};

/**
 * Clears cache entries matching a given pattern.
 * @param {string} pattern - The pattern to match cache keys against.
 * @returns {RequestHandler} - The middleware function.
 */
export const clearCache = (pattern: string): RequestHandler => (_req, _res, next) => {
	store.forEach((_, key) => {
		if (key.includes(pattern)) store.delete(key);
	});
	next();
};