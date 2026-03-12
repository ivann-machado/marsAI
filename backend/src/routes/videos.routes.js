import express from "express";
import {
	getAllVideos,
	getVideoById,
	getAssignedVideos,
	getUnassignedVideos,
	createVideo,
	setVideo,
	removeVideo,
} from "../controllers/video.controller.js";
import {
	verifyToken,
	requireSuperAdmin,
} from "../middlewares/auth.middleware.js";
import { processAndUpload } from "../middlewares/upload.middleware.js";
import { CreateVideoSchema, UpdateVideoSchema } from "../schemas/video.schema.js";

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
router.get("/unassigned", verifyToken, getUnassignedVideos);
router.get("/:id", getVideoById);

router.post("/", processAndUpload({ schema: CreateVideoSchema }), createVideo);
router.put(
	"/:id",
	verifyToken,
	requireSuperAdmin,
	processAndUpload({ schema: UpdateVideoSchema }),
	setVideo,
);
router.delete("/:id", verifyToken, requireSuperAdmin, removeVideo);

export default router;
