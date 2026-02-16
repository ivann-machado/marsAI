import express from "express";
import { getContent, setContent } from "../controllers/content.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Content routes
 * - GET  `/`  : get all content entries (authenticated admins).
 * - PUT  `/`  : update a content entry (super admin only).
 */

router.get("/", getContent);
router.put("/", verifyToken, requireSuperAdmin, setContent);

export default router;
