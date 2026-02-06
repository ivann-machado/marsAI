import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { CORS_OPTIONS } from "./config/index.js";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/videos.routes.js";

const app = express();

// Security Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use("/api/videos", videoRoutes);

// Logging
app.use(morgan("dev")); // Log requests

// Rate Limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again after 15 minutes",
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
