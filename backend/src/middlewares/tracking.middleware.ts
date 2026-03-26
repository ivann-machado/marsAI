import type { Request, Response, NextFunction, RequestHandler } from 'express';

export interface MiddlewareTime {
	index: number;
	duration: string;
	isController: boolean;
}

declare global {
	namespace Express {
		interface Request {
			middlewareTimes?: MiddlewareTime[];
		}
	}
}

/**
 * Tracks the time taken by each middleware in the wrapper. Controllers can be included.
 * @param middleware - The middleware functions to track.
 * @returns The tracked middleware functions.
 */
export const timed = (...middleware: RequestHandler[]): RequestHandler[] => {
	return middleware.map((mw: RequestHandler, i: number): RequestHandler => {
		return async (req: Request, res: Response, next: NextFunction) => {
			const start = process.hrtime.bigint();

			req.middlewareTimes = req.middlewareTimes || [];

			let tracked = false;

			const trackedNext = (err?: any) => {
				if (!tracked) {
					const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
					req.middlewareTimes!.push({
						index: i,
						duration: duration.toFixed(2),
						isController: false
					});
					tracked = true;
				}
				next(err);
			};

			const finishListener = () => {
				if (!tracked) {
					const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
					req.middlewareTimes!.push({
						index: i,
						duration: duration.toFixed(2),
						isController: true
					});
					tracked = true;
				}
			};

			if (typeof res.prependOnceListener === 'function') {
				res.prependOnceListener('finish', finishListener);
			} else {
				res.once('finish', finishListener);
			}

			try {
				const result = (mw as any)(req, res, trackedNext);

				if (result && typeof result.catch === 'function') {
					result.catch(next);
				}
			} catch (error) {
				next(error);
			}
		};
	});
};