import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { CORS_OPTIONS, JWT_SECRET } from "./config/index.js";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/videos.routes.js";
import jwt from "jsonwebtoken";
import newsletterRoutes from "./routes/newsletter.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";

const app = express();

//  Middleware
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use("/api/videos", videoRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/reservations", reservationRoutes);

// Logging
app.use(morgan("dev")); // Log requests

// Rate Limitingœ
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	handler: (req, res, next, options) => {
		res.status(options.statusCode).send(
			`Too many requests from this IP, please try again after ${options.windowMs / (60 * 1000)} minutes`,
		);
	},
	skip: (req) => {
		try {
			const token = req.headers["authorization"]?.split(" ")[1];
			if (!token) return false;

			const decoded = jwt.verify(token, JWT_SECRET);
			return decoded.role === "admin" || decoded.role === "super admin";
		} catch (error) {
			return false;
		}
	},
});
app.use(limiter);

// Public routes
app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to MarsAI API" });
});
app.use("/api/auth", authRoutes);

// Protected routes

// Global Error Handling Middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
});

export default app;
