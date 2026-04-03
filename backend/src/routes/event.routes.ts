import express, { Router } from "express";
import {
	createEvent,
	getAllEvents,
	getEventById,
	setEvent,
	removeEvent,
} from "#controllers";
import {
	verifyToken,
	requireSuperAdmin,
	cache,
	clearCache,
	processAndUpload
} from "#middlewares";
import { CreateEventSchema, UpdateEventSchema } from "#schemas";

const router: Router = express.Router();

/**
 * Event routes
 * - POST `/` : create an event (super admin only).
 * - GET  `/` : get all events.
 * - GET  `/:id` : get an event.
 * - PUT  `/:id` : update an event (super admin only).
 * - DELETE `/:id` : delete an event (super admin only).
 */
router.post("/", verifyToken, requireSuperAdmin, processAndUpload({ schema: CreateEventSchema, maxFiles: 2, maxSize: 10 * 1024 * 1024 }), createEvent, clearCache("event"));
router.get("/", cache(), getAllEvents);
router.get("/:id", cache(), getEventById);
router.put("/:id", verifyToken, requireSuperAdmin, processAndUpload({ schema: UpdateEventSchema, maxFiles: 2, maxSize: 10 * 1024 * 1024 }), setEvent, clearCache("event"));
router.delete("/:id", verifyToken, requireSuperAdmin, removeEvent, clearCache("event"));

export default router;
