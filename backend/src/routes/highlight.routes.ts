import express, { Router } from "express";
import {
	getHighlights,
	getHighlightById,
	createHighlight,
	setHighlight,
	removeHighlight,
} from "#controllers";
import {
	cache,
	clearCache,
	verifyToken,
	requireSuperAdmin,
	validate
} from "#middlewares";
import {
	CreateHighlightSchema,
	UpdateHighlightSchema,
} from "#schemas";

const router: Router = express.Router();

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
