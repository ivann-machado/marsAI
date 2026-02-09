import express from "express";
import { VideoController } from "../controllers/video.controller.js";

const router = express.Router();

/**
 * Videos routes
 * - GET `/` :  get all videos.
 * - GET `/:id` : get a video.
 * - POST `/` : create a video.
 * - PUT `/:id` : update a video.
 * - DELETE `/:id` : delete a video.
 */
router.get("/", VideoController.getAll);
router.get("/:id", VideoController.getById);
router.post("/", VideoController.create);
router.put("/:id", VideoController.update);
router.delete("/:id", VideoController.remove);

export default router;
