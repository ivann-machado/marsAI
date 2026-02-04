import express from "express";
import { VideoController } from "../controllers/video.controller.js";

const router = express.Router();

router.get("/", VideoController.getAll);
router.get("/:id", VideoController.getById);
router.post("/", VideoController.create);
router.put("/:id", VideoController.update);
router.delete("/:id", VideoController.remove);

export default router;
