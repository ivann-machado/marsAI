import { Router } from "express";

import {
	createNewsletter,
	getAllNewsletters,
	removeNewsletter,
	sendNewsletter,
} from "../controllers/newsletter.controller.js";

import {
	verifyToken,
	requireSuperAdmin,
} from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * Newsletter routes
 *
 * PUBLIC
 * POST   /subscribe         → subscribe user
 *
 * ADMIN ONLY
 * GET    /                  → get all subscribers
 * DELETE /:email           → remove subscriber
 * POST   /send             → send newsletter to all subscribers
 */

// Subscribe (public)
router.post("/", createNewsletter);

// Admin routes
router.get("/", verifyToken, requireSuperAdmin, getAllNewsletters);

router.delete("/:email", verifyToken, requireSuperAdmin, removeNewsletter);

// Send newsletter (ADMIN ONLY)
router.post("/send", verifyToken, requireSuperAdmin, sendNewsletter);

export default router;
