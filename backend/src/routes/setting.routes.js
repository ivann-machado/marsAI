import express from "express";
import { getSettings, setSetting } from "../controllers/setting.controller.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { cache, clearCache } from "../middlewares/cache.middleware.js";
import { UpdateSettingSchema } from "../schemas/setting.schema.js";

const router = express.Router();

/**
 * Setting routes
 * - GET  `/`  : get all settings (super admin only).
 * - PUT  `/`  : update a setting (super admin only).
 */

router.get("/", verifyToken, requireSuperAdmin, cache({ ttl: 0 }), getSettings);
router.put("/", verifyToken, requireSuperAdmin, validate(UpdateSettingSchema), setSetting, clearCache("settings"));

export default router;
