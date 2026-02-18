import { Router } from "express";
import {
	createNewsletter,
	getAllNewsletters,
	removeNewsletter,
} from "../controllers/newsletter.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * Newsletter routes
 * - POST `/subscribe` : subscribe to newsletter.
 * - GET  `/`         : get all subscribers (super admin only).
 * - DELETE `/:email`  : unsubscribe from newsletter.
 */
router.post("/subscribe", createNewsletter);
router.get("/", verifyToken, requireSuperAdmin, getAllNewsletters);
router.delete("/:email", verifyToken, requireSuperAdmin, removeNewsletter);

export default router;
