import express from "express";
import {
	createPrizedVideo,
	getAllPrizedVideos,
	getPrizedVideoByVideoId,
	removePrizedVideo,
} from "../controllers/prized.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
	verifyToken,
	requireSuperAdmin,
} from "../middlewares/auth.middleware.js";
import { cache, clearCache } from "../middlewares/cache.middleware.js";
import {
	CreatePrizedVideoSchema,
	UpdatePrizedVideoSchema,
} from "../schemas/prized.schema.js";

const router = express.Router();

router.post(
	"/",
	verifyToken,
	requireSuperAdmin,
	validate(CreatePrizedVideoSchema),
	createPrizedVideo,
	clearCache("prized"),
);
router.get("/", cache(), getAllPrizedVideos);
router.get("/:video_id", cache(), getPrizedVideoByVideoId);
router.delete(
	"/:video_id",
	verifyToken,
	requireSuperAdmin,
	removePrizedVideo,
	clearCache("prized"),
);

export default router;
