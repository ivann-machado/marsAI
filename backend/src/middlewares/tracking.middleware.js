/**
 * Tracks the time taken by each middleware in the wrapper. Controllers can be included.
 * @param {...import('express').RequestHandler} middleware - The middleware functions to track.
 * @returns {import('express').RequestHandler[]} - The tracked middleware functions.
 */
export const timed = (...middleware) => {
	return middleware.map((mw, i) => {
		return async (req, res, next) => {
			const start = process.hrtime.bigint();
			req.middlewareTimes = req.middlewareTimes || [];

			let tracked = false;

			const trackedNext = (...args) => {
				if (!tracked) {
					const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
					req.middlewareTimes.push({
						index: i,
						duration: duration.toFixed(2),
						isController: false
					});
					tracked = true;
				}
				next(...args);
			};

			const finishListener = () => {
				if (!tracked) {
					const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
					req.middlewareTimes.push({
						index: i,
						duration: duration.toFixed(2),
						isController: true
					});
					tracked = true;
				}
			};

			if (res.prependOnceListener) {
				res.prependOnceListener('finish', finishListener);
			} else {
				res.once('finish', finishListener);
			}

			try {
				const result = mw(req, res, trackedNext);
				if (result && typeof result.catch === 'function') {
					result.catch(next);
				}
			} catch (error) {
				next(error);
			}
		};
	});
};