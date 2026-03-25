import express from "express";
import {
	createReview,
	getAllReviews,
	getAssignedReviews,
	getRemainingVideos,
	getReviewById,
	setReview,
	removeReview,
} from "../controllers/review.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { cache } from "../middlewares/cache.middleware.js";
import {
	CreateReviewSchema,
	UpdateReviewSchema,
} from "../schemas/review.schema.js";

const router = express.Router();

// 1. GET /api/reviews (toutes les reviews)
// 2. GET /api/reviews?admin_id=1&video_id=30 (une review précise)
// 3. GET /api/reviews/assigned (reviews assignées à l'admin connecté)
// 4. GET /api/reviews/remaining (vidéos non assignées à l'admin connecté)
// 5. GET /api/reviews/rest (alias de /remaining)

router.post("/", validate(CreateReviewSchema), createReview);
router.get("/remaining", verifyToken, getRemainingVideos);
router.get("/", cache({ etagOnly: true }), getAllReviews);
router.get("/:id", cache({ etagOnly: true }), getReviewById);
router.put("/:id", validate(UpdateReviewSchema), setReview);
router.delete("/:id", removeReview);

export default router;
