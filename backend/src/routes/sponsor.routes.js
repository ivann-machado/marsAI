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
import { cache, clearCache } from "../middlewares/cache.middleware.js";
import { CreateSponsorSchema, UpdateSponsorSchema } from "../schemas/sponsor.schema.js";

const router = express.Router();

router.get("/", cache({ ttl: 0 }), getAllSponsors);
router.get("/:id", cache(), getSponsorById);
router.post("/", verifyToken, requireSuperAdmin, processAndUpload({ schema: CreateSponsorSchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), createSponsor, clearCache("sponsor"));
router.put("/:id", verifyToken, requireSuperAdmin, processAndUpload({ schema: UpdateSponsorSchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), updateSponsor, clearCache("sponsor"));
router.delete("/:id", verifyToken, requireSuperAdmin, removeSponsor, clearCache("sponsor"));

export default router;
