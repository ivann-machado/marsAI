import express from "express";
import {
	getAllVideos,
	getVideoById,
	getAssignedVideos,
	createVideo,
	setVideo,
	removeVideo,
} from "../controllers/video.controller.js";
import {
	verifyToken,
	requireSuperAdmin,
} from "../middlewares/auth.middleware.js";
import { processAndUpload } from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * Videos routes
 * - GET `/` :  get all videos.
 * - GET `/:id` : get a video.
 * - POST `/` : create a video.
 * - PUT `/:id` : update a video.
 * - DELETE `/:id` : delete a video.
 */
router.get("/", getAllVideos);
router.get("/assigned", verifyToken, getAssignedVideos);
router.get("/:id", getVideoById);

router.post("/", processAndUpload(), createVideo);
router.put(
	"/:id",
	verifyToken,
	requireSuperAdmin,
	processAndUpload(),
	setVideo,
);
router.delete("/:id", verifyToken, requireSuperAdmin, removeVideo);

export default router;
