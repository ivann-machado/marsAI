import { performance } from 'perf_hooks';
import prisma from './src/config/prisma.config.js';
import { loadSettings } from './src/config/settings.js';
import { createServer } from "http";
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

console.log(`Starting server in ${process.env.DEV_MODE ? 'development' : 'production'} mode at ${Math.round(Date.now() - performance.timeOrigin)}ms process time.`);
console.log(`Process ID: ${process.pid}`);
const settingStartTime = Date.now();
await loadSettings();
console.log(`Settings loaded in ${Date.now() - settingStartTime}ms at ${Math.round(Date.now() - performance.timeOrigin)}ms process time`);

const server = createServer(app);

server.on('listening', () => {
	console.log(`Server started on http://localhost:${PORT} in ${Math.round(Date.now() - performance.timeOrigin)}ms process time.`);
});

const startServer = (port, retries = 20) => {
	server.removeAllListeners('error');
	server.on('error', (err) => {
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

const gracefulShutdown = () => {
	console.log('Received kill signal, shutting down gracefully');

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
			process.exit(0);
		} catch (err) {
			console.error('Error disconnecting database', err);
			process.exit(1);
		}
	});
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);