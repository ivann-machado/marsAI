import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

export const PORT = process.env.PORT || 3000;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export const DEV_MODE = process.env.DEV_MODE === 'true';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const CORS_OPTIONS = {
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);

		if (origin.includes('.ngrok-free.dev') || origin.includes('.ngrok.io')) {
			return callback(null, true);
		}

		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		}

		callback(new Error('Non autorisé par CORS'));
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"]
};