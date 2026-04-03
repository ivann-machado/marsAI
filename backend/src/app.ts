import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { debounce } from "#middlewares";
import { CORS_OPTIONS, MORGAN_FORMAT, HELMET_CONFIG, LIMITER_CONFIG } from "#config";

// Routes imports
import {
	authRoutes,
	settingRoutes,
	contentRoutes,
	videoRoutes,
	newsletterRoutes,
	reservationRoutes,
	eventRoutes,
	contactRoutes,
	juryRoutes,
	sponsorRoutes,
	reviewRoutes,
	prizedRoutes,
	highlightRoutes,
	adminRoutes
} from "#routes";

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
app.use(LIMITER_CONFIG);

// Public routes
app.get("/", (_req: Request, res: Response) => {
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
app.use("/api/highlights", highlightRoutes);
// Protected routes
app.use("/api/admins", adminRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/content", contentRoutes);

// API Documentation
if (process.env.NODE_ENV !== "production") {
	const { default: swaggerUi } = await import("swagger-ui-express");
	const { default: swaggerSpec } = await import("#config/swagger.config");
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Global Error Handling Middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
});

export default app;
