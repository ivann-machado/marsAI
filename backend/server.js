import { PORT } from './src/config/index.js';
import connectDB, { pool } from './src/config/db.js';
import { createServer } from "http";
import app from './src/app.js';

connectDB();

const server = createServer(app);

server.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

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