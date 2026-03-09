import express from "express";
import { getAllContent, setContent } from "../controllers/content.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { UpdateContentSchema } from "../schemas/content.schema.js";

const router = express.Router();

/**
 * Content routes
 * - GET  `/`  : get all content.
 * - PUT  `/`  : update a content (super admin only).
 */
router.get("/", getAllContent);
router.put("/", verifyToken, requireSuperAdmin, validate(UpdateContentSchema), setContent);

export default router;
