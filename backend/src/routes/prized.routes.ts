import express from "express";
import {
	createPrizedVideo,
	getAllPrizedVideos,
	getPrizedVideoByVideoId,
	removePrizedVideo,
} from "#controllers";
import {
	validate,
	verifyToken,
	requireSuperAdmin,
	cache,
	clearCache
} from "#middlewares";
import {
	CreatePrizedVideoSchema,
	UpdatePrizedVideoSchema,
} from "#schemas";

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
	"/:id",
	verifyToken,
	requireSuperAdmin,
	removePrizedVideo,
	clearCache("prized")
);

export default router;
