import express from "express";
import {
	createSponsor,
	getAllSponsors,
	getSponsorById,
	updateSponsor,
	removeSponsor,
} from "../controllers/sponsor.controller.js";

const router = express.Router();

router.get("/", getAllSponsors);
router.get("/:id", getSponsorById);
router.post("/", createSponsor);
router.put("/:id", updateSponsor);
router.delete("/:id", removeSponsor);

export default router;
