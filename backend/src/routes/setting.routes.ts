import express, { Router } from "express";
import { getSettings, setSetting } from "#controllers";
import {
	verifyToken,
	requireSuperAdmin,
	validate,
	cache,
	clearCache
} from "#middlewares";
import { UpdateSettingSchema } from "#schemas";

const router: Router = express.Router();

/**
 * Setting routes
 * - GET  `/`  : get all settings (super admin only).
 * - PUT  `/`  : update a setting (super admin only).
 */

router.get("/", verifyToken, requireSuperAdmin, cache({ ttl: 0 }), getSettings);
router.put("/", verifyToken, requireSuperAdmin, validate(UpdateSettingSchema), setSetting, clearCache("settings"));

export default router;
