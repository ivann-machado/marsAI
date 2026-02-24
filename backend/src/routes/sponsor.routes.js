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

const router = express.Router();

router.get("/", getAllSponsors);
router.get("/:id", getSponsorById);
router.post("/", verifyToken, requireSuperAdmin, processAndUpload(), createSponsor);
router.put("/:id", verifyToken, requireSuperAdmin, processAndUpload(), updateSponsor);
router.delete("/:id", verifyToken, requireSuperAdmin, removeSponsor);

export default router;
