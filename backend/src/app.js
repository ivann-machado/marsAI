import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import debounce from "./middlewares/debounce.middleware.js";
import { JWT_SECRET } from "./config/index.ts";
import CORS_OPTIONS from "./config/cors.config.ts";
import jwt from "jsonwebtoken";
import MORGAN_FORMAT from "./config/morgan.config.ts";
import HELMET_CONFIG from "./config/helmet.config.ts";
// Routes imports
import authRoutes from "./routes/auth.routes.js";
import settingRoutes from "./routes/setting.routes.js";
import contentRoutes from "./routes/content.routes.js";
import videoRoutes from "./routes/videos.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import eventRoutes from "./routes/event.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import juryRoutes from "./routes/jury.routes.js";
import sponsorRoutes from "./routes/sponsor.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import prizedRoutes from "./routes/prized.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.set("trust proxy", Number(process.env.PROXY_TRUST) || 0);
// Helmet for security
app.use(helmet(HELMET_CONFIG));

//  Middleware
app.use(cors(CORS_OPTIONS));
app.use(express.json());

// Logging
app.use(morgan(MORGAN_FORMAT)); // Log requests

// Debounce for deduplication
app.use(debounce(500));

// Rate Limiting
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
			return decoded.role === "admin" || decoded.role === "super_admin";
		} catch (error) {
			return false;
		}
	},
});
app.use(limiter);

// Public routes
app.get("/", (_req, res) => {
	res.status(200).json({ message: "Welcome to MarsAI API" });
});
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/jury", juryRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/prized-videos", prizedRoutes);
// Protected routes
app.use("/api/admins", adminRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/content", contentRoutes);

// API Documentation
if (process.env.NODE_ENV !== "production") {
	const { default: swaggerUi } = await import("swagger-ui-express");
	const { default: swaggerSpec } = await import("./config/swagger.config.ts");
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Global Error Handling Middleware
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
});

export default app;
