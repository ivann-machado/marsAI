import express from "express";
import { getSettings, setSetting } from "../controllers/setting.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Setting routes
 * - GET  `/`  : get all settings (authenticated admins).
 * - PUT  `/`  : update a setting (super admin only).
 */

router.get("/", verifyToken, requireSuperAdmin, getSettings);
router.put("/", verifyToken, requireSuperAdmin, setSetting);

export default router;
