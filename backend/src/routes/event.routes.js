import express from "express";

import {
	createEvent,
	getAllEvents,
	getEventById,
	setEvent,
	removeEvent,
} from "../controllers/event.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Event routes
 * - POST `/` : create an event (super admin only).
 * - GET  `/` : get all events.
 * - GET  `/:id` : get an event.
 * - PUT  `/:id` : update an event (super admin only).
 * - DELETE `/:id` : delete an event (super admin only).
 */
router.post("/", verifyToken, requireSuperAdmin, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", verifyToken, requireSuperAdmin, setEvent);
router.delete("/:id", verifyToken, requireSuperAdmin, removeEvent);

export default router;
