import {
	getHighlights,
	getHighlightById, // Ajouté ici
	createHighlight,
	setHighlight,
	removeHighlight,
} from "../controllers/highlight.controller.js";
import { cache, clearCache } from "../middleware/cache.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requireSuperAdmin } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
	CreateHighlightSchema,
	UpdateHighlightSchema,
} from "../schemas/highlight.schema.js";
import express from "express";

const router = express.Router();

router.get("/", cache(), getHighlights);
router.get("/:id", cache(), getHighlightById);
router.post(
	"/",
	verifyToken,
	requireSuperAdmin,
	validate(CreateHighlightSchema),
	createHighlight,
	clearCache("highlights"),
);
router.put(
	"/:id",
	verifyToken,
	requireSuperAdmin,
	validate(UpdateHighlightSchema),
	setHighlight,
	clearCache("highlights"),
);
router.delete(
	"/:id",
	verifyToken,
	requireSuperAdmin,
	removeHighlight,
	clearCache("highlights"),
);

export default router;
