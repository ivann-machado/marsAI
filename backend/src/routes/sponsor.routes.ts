import express, { Router } from "express";
import {
	createSponsor,
	getAllSponsors,
	getSponsorById,
	updateSponsor,
	removeSponsor,
} from "#controllers";
import {
	verifyToken,
	requireSuperAdmin,
	processAndUpload,
	cache,
	clearCache
} from "#middlewares";
import { CreateSponsorSchema, UpdateSponsorSchema } from "#schemas";

const router: Router = express.Router();

router.get("/", cache({ ttl: 0 }), getAllSponsors);
router.get("/:id", cache(), getSponsorById);
router.post("/", verifyToken, requireSuperAdmin, processAndUpload({ schema: CreateSponsorSchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), createSponsor, clearCache("sponsor"));
router.put("/:id", verifyToken, requireSuperAdmin, processAndUpload({ schema: UpdateSponsorSchema, maxFiles: 1, maxSize: 5 * 1024 * 1024 }), updateSponsor, clearCache("sponsor"));
router.delete("/:id", verifyToken, requireSuperAdmin, removeSponsor, clearCache("sponsor"));

export default router;
