import express, { Router } from "express";
import { getAllContent, setContent } from "#controllers";
import {
	verifyToken,
	requireSuperAdmin,
	validate,
	cache,
	clearCache
} from "#middlewares";
import { UpdateContentSchema } from "#schemas";

const router: Router = express.Router();

/**
 * Content routes
 * - GET  `/`  : get all content.
 * - PUT  `/`  : update a content (super admin only).
 */
router.get("/", cache({ ttl: 0 }), getAllContent);
router.put("/", verifyToken, requireSuperAdmin, validate(UpdateContentSchema), setContent, clearCache("content"));

export default router;
