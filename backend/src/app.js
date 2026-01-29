import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { CORS_OPTIONS } from './config/index.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

//  Middleware
app.use(cors(CORS_OPTIONS));
app.use(express.json());

// Logging
app.use(morgan('dev')); // Log requests

// Rate Limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.get('/', (req, res) => {
	res.json({ message: '' });
});
app.use('/api/auth', authRoutes);

// Protected routes


export default app;
