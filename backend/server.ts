import { performance as perf } from 'node:perf_hooks';
import { createServer, type Server, type RequestListener } from 'node:http';
import { loadSettings } from './src/config/settings.ts';
import { startServer, gracefulShutdown } from './src/utils/server.util.ts';
import { startVideoWorker } from './src/workers/video.worker.ts';
import app from './src/app.js';

const PORT: number = Number(process.env.PORT) || 3000;

console.log(`Starting server in ${process.env.NODE_ENV} mode at ${Math.round(Date.now() - perf.timeOrigin)}ms process time.\nProcess ID: ${process.pid}`);

const settingStartTime = Date.now();

await loadSettings();
console.log(`Settings loaded in ${Date.now() - settingStartTime}ms at ${Math.round(Date.now() - perf.timeOrigin)}ms process time`);

const server: Server = createServer(app as RequestListener);

server.on('listening', () => console.log(`Server started on http://localhost:${PORT} in ${Math.round(Date.now() - perf.timeOrigin)}ms process time.`));

startServer(server, PORT);

const videoWorker = startVideoWorker();

process.on('SIGTERM', (signal: string) => gracefulShutdown(server, signal, videoWorker))
	.on('SIGINT', (signal: string) => gracefulShutdown(server, signal, videoWorker))
	.on('SIGUSR2', (signal: string) => gracefulShutdown(server, signal, videoWorker))
	.on('uncaughtException', (err: Error) => gracefulShutdown(server, err, videoWorker))
	.on('unhandledRejection', (err: Error) => gracefulShutdown(server, err, videoWorker));