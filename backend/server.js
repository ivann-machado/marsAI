import { PORT } from './src/config/index.js';
import connectDB, { pool } from './src/config/db.js';
import { loadSettings } from './src/config/settings.js';
import { createServer } from "http";
import app from './src/app.js';

connectDB();
await loadSettings();

const server = createServer(app);

server.on('listening', () => {
	console.log(`Server started on http://localhost:${PORT}`);
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

const gracefulShutdown = async () => {
	console.log('Received kill signal, shutting down gracefully');

	server.close(() => {
		console.log('Closed out remaining connections');

		pool.end()
			.then(() => {
				console.log('Database pool closed');
				process.exit(0);
			})
			.catch((err) => {
				console.error('Error closing database pool', err);
				process.exit(1);
			});
	});

	setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down');
		process.exit(1);
	}, 10000);
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);