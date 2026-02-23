import express from "express";
import { processAndUpload } from "../middlewares/upload.middleware.js";

import {
	createJury,
	getAllJuries,
	getJuryById,
	setJury,
	removeJury,
} from "../controllers/jury.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Jury routes
 * - GET `/` : get all jury members.
 * - GET `/:id` : get a jury member.
 * - POST `/` : create a jury member (super admin only).
 * - PUT `/:id` : update a jury member (super admin only).
 * - DELETE `/:id` : delete a jury member (super admin only).
 */
router.get("/", getAllJuries);
router.get("/:id", getJuryById);
router.post("/", verifyToken, requireSuperAdmin, processAndUpload(), createJury);
router.put("/:id", verifyToken, requireSuperAdmin, processAndUpload(), setJury);
router.delete("/:id", verifyToken, requireSuperAdmin, removeJury);

export default router;
