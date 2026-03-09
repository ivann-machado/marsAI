import express from "express";
import {
	createSponsor,
	getAllSponsors,
	getSponsorById,
	updateSponsor,
	removeSponsor,
} from "../controllers/sponsor.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";
import { processAndUpload } from "../middlewares/upload.middleware.js";
import { CreateSponsorSchema, UpdateSponsorSchema } from "../schemas/sponsor.schema.js";

const router = express.Router();

router.get("/", getAllSponsors);
router.get("/:id", getSponsorById);
router.post("/", verifyToken, requireSuperAdmin, processAndUpload({ schema: CreateSponsorSchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), createSponsor);
router.put("/:id", verifyToken, requireSuperAdmin, processAndUpload({ schema: UpdateSponsorSchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), updateSponsor);
router.delete("/:id", verifyToken, requireSuperAdmin, removeSponsor);

export default router;
