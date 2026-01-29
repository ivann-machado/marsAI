import express from 'express';
import cors from 'cors';
import { CORS_OPTIONS } from './config/index.js';
// import authRoutes from './routes/auth.routes.js';

const app = express();

//  Middleware
app.use(cors(CORS_OPTIONS));
app.use(express.json());

// Public routes
app.get('/', (req, res) => {
	res.json({ message: '' });
});
// app.use('/api', authRoutes);

// Protected routes


export default app;