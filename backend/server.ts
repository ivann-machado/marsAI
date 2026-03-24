import { performance } from 'perf_hooks';
import prisma from './src/config/prisma.config.js';
import { loadSettings } from './src/config/settings.js';
import { createServer } from 'http';
import type { Server } from 'http';
import type { RequestListener } from 'http';
import app from './src/app.js';

const PORT: number = Number(process.env.PORT) || 3000;

console.log(`Starting server in ${process.env.NODE_ENV} mode at ${Math.round(Date.now() - performance.timeOrigin)}ms process time.`);
console.log(`Process ID: ${process.pid}`);

const settingStartTime = Date.now();
await loadSettings();
console.log(`Settings loaded in ${Date.now() - settingStartTime}ms at ${Math.round(Date.now() - performance.timeOrigin)}ms process time`);

const server: Server = createServer(app as RequestListener);

server.on('listening', () => {
	console.log(`Server started on http://localhost:${PORT} in ${Math.round(Date.now() - performance.timeOrigin)}ms process time.`);
});

const startServer = (port: number, retries: number = 20): void => {
	server.removeAllListeners('error');
	server.on('error', (err: NodeJS.ErrnoException) => {
		if (err.code === 'EADDRINUSE') {
			if (retries > 0) {
				console.log(`Port ${port} is in use, retrying in 1 second... (${retries} retries left)`);
				setTimeout(() => {
					server.close();
					startServer(port, retries - 1);
				}, 1000);
			} else {
				console.error(`Port ${port} is still busy after multiple attempts. Exiting.`);
				process.exit(1);
			}
		} else {
			throw err;
		}
	});
	server.listen(port);
};

startServer(PORT);

const gracefulShutdown = (err?: Error | any): void => {
	const isSignal = typeof err === 'string' && err.startsWith('SIG');
	if (err instanceof Error) {
		console.error('Uncaught Exception or Rejection :', err);
	}
	else {
		console.log(`Received kill signal ${isSignal ? `(${err}) ` : ''}shutting down gracefully`);
	}
	const forceExit = setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down');
		process.exit(1);
	}, 10000);

	server.close(async () => {
		console.log('Closed out remaining connections');
		try {
			await prisma.$disconnect();
			console.log('Database disconnected');
			clearTimeout(forceExit);
			process.exit((!isSignal && err) ? 1 : 0);
		} catch (dbErr) {
			console.error('Error disconnecting database', dbErr);
			process.exit(1);
		}
	});
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);
process.on('uncaughtException', gracefulShutdown);
process.on('unhandledRejection', gracefulShutdown);