import type { Server } from "node:http";
import type { Worker } from "bullmq";
import prisma from "../config/prisma.config.ts";
import redis from "../config/redis.config.ts";

/**
 * Start the server with retry logic for port binding.
 * @param server - The HTTP server instance.
 * @param port - The port to listen on.
 * @param retries - The number of retry attempts (default: 20).
 */
export const startServer = (server: Server, port: number, retries: number = 20): void => {
	server.removeAllListeners('error')
		.on('error', (err: NodeJS.ErrnoException) => {
			if (err.code === 'EADDRINUSE') {
				if (retries > 0) {
					console.log(`Port ${port} is in use, retrying in 1 second... (${retries} retries left)`);
					setTimeout(() => {
						server.close();
						startServer(server, port, retries - 1);
					}, 1000);
				} else {
					console.error(`Port ${port} is still busy after multiple attempts. Exiting.`);
					process.exit(1);
				}
			} else {
				throw err;
			}
		})
		.listen(port);
};

/**
 * Gracefully shut down the server.
 * @param server - The HTTP server instance.
 * @param err - Error object or signal string.
 * @param worker - Optional BullMQ worker to close.
 */
export const gracefulShutdown = (server: Server, err: Error | string, worker?: Worker): void => {
	const isSignal = typeof err === 'string' && err.startsWith('SIG');
	if (err instanceof Error) {
		console.error('Uncaught Exception or Rejection :', err);
	} else {
		console.log(`Received kill signal ${isSignal ? `(${err}) ` : ''}shutting down gracefully`);
	}
	const forceExit = setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down');
		process.exit(1);
	}, 10000);

	server.close(async () => {
		console.log('Closed out remaining connections');
		try {
			const teardowns: Promise<unknown>[] = [
				prisma.$disconnect(),
				redis.quit(),
			];
			if (worker) teardowns.push(worker.close());
			await Promise.all(teardowns);
			console.log('Database, Redis & worker disconnected');
			clearTimeout(forceExit);
			process.exit((!isSignal && err) ? 1 : 0);
		} catch (dbErr) {
			console.error('Error disconnecting', dbErr);
			process.exit(1);
		}
	});
};