import dotenv from 'dotenv';
dotenv.config();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

export const PORT = process.env.PORT || 3000;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export const DEV_MODE = process.env.DEV_MODE === 'true';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const CONTACT_MAIL = process.env.CONTACT_MAIL || 'no-reply@marsai.com';

const ALLOWED_ORIGIN_URLS = ALLOWED_ORIGINS.map((origin) => {
	try {
		return new URL(origin);
	} catch (e) {
		return null;
	}
}).filter(Boolean);

/**
 * Check if the origin is allowed.
 * Allows exact matches and subdomains of allowed origins.
 * @param {string} origin
 * @param {function} callback
 */
const checkOrigin = (origin, callback) => {
	if (!origin) return callback(null, true);

	if (origin.includes('.ngrok-free.dev') || origin.includes('.ngrok.io')) {
		return callback(null, true);
	}

	if (ALLOWED_ORIGINS.includes(origin)) {
		return callback(null, true);
	}

	// Check for subdomains using cached URLs
	try {
		const originUrl = new URL(origin);
		const isAllowedSubdomain = ALLOWED_ORIGIN_URLS.some((allowedUrl) => {
			return (
				originUrl.protocol === allowedUrl.protocol &&
				originUrl.hostname.endsWith(`.${allowedUrl.hostname}`)
			);
		});

		if (isAllowedSubdomain) {
			return callback(null, true);
		}
	} catch (e) {
		// Invalid origin URL, block it
	}

	callback(new Error('Origin not allowed'));
};

export const CORS_OPTIONS = {
	origin: checkOrigin,
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"]
};

export const HELMET_CONFIG = {
	contentSecurityPolicy: false,
	crossOriginEmbedderPolicy: false,
	crossOriginOpenerPolicy: false,
	crossOriginResourcePolicy: false,
};
