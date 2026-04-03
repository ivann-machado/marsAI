import express, { Router } from "express";
import {
	createJury,
	getAllJuries,
	getJuryById,
	setJury,
	removeJury,
} from "#controllers";
import {
	verifyToken,
	requireSuperAdmin,
	cache,
	clearCache,
	processAndUpload
} from "#middlewares";
import { CreateJurySchema, UpdateJurySchema } from "#schemas";

const router: Router = express.Router();

/**
 * Jury routes
 * - GET `/` : get all jury members.
 * - GET `/:id` : get a jury member.
 * - POST `/` : create a jury member (super admin only).
 * - PUT `/:id` : update a jury member (super admin only).
 * - DELETE `/:id` : delete a jury member (super admin only).
 */
router.get("/", cache(), getAllJuries);
router.get("/:id", cache(), getJuryById);
router.post("/", verifyToken, requireSuperAdmin, processAndUpload({ schema: CreateJurySchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), createJury, clearCache("jury"));
router.put("/:id", verifyToken, requireSuperAdmin, processAndUpload({ schema: UpdateJurySchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), setJury, clearCache("jury"));
router.delete("/:id", verifyToken, requireSuperAdmin, removeJury, clearCache("jury"));

export default router;
