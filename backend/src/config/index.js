require('dotenv').config();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

module.exports = {
	PORT: process.env.PORT || 3000,

	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
	JWT_SECRET: process.env.JWT_SECRET || 'votre_super_secret_key_a_changer_en_production_2024',

	CORS_OPTIONS: {
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
	}
}