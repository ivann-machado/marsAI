import express from "express";
import {
	getAllVideos,
	getVideoById,
	createVideo,
	setVideo,
	removeVideo,
} from "../controllers/video.controller.js";

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
router.get("/:id", getVideoById);
router.post("/", createVideo);
router.put("/:id", setVideo);
router.delete("/:id", removeVideo);

export default router;
