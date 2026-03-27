import morgan from 'morgan';
import type { Request, Response } from 'express';

morgan.token('date-custom', () => {
	const now = new Date();
	const dd = String(now.getDate()).padStart(2, '0');
	const mm = String(now.getMonth() + 1).padStart(2, '0');
	const yy = String(now.getFullYear()).slice(-2);
	const hh = String(now.getHours()).padStart(2, '0');
	const min = String(now.getMinutes()).padStart(2, '0');
	const ss = String(now.getSeconds()).padStart(2, '0');
	const ms = String(now.getMilliseconds()).padStart(3, '0');
	return `${dd}/${mm}/${yy} ${hh}:${min}:${ss}.${ms}`;
});

morgan.token('middleware-times', (req: Request) => {
	if (!req.middlewareTimes?.length) return '';
	return '| ' + req.middlewareTimes
		.map(m => `${m.isController ? 'C' : 'M'}${m.index}:${m.duration}ms`)
		.join(', ');
});

morgan.format('dev-dated', (tokens, req: Request, res: Response) => {
	const status: number = Number(tokens.status(req, res));
	const color = status >= 500 ? 31
		: status >= 400 ? 33
			: status >= 300 ? 36
				: status >= 200 ? 32
					: 0;

	return [
		'\x1b[90m' + tokens['date-custom'](req, res) + '\x1b[0m',
		tokens.method(req, res),
		tokens.url(req, res),
		`\x1b[${color}m${status}\x1b[0m`,
		tokens['response-time'](req, res) + 'ms',
		'-',
		tokens.res(req, res, 'content-length'),
		'\x1b[36m' + tokens['middleware-times'](req, res) + '\x1b[0m',
	].join(' ');
});

export default process.env.NODE_ENV === 'production' ? 'combined' : 'dev-dated';