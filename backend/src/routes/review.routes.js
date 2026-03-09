import express from "express";
import {
	createReview,
	getAllReviews,
	getReviewById,
	setReview,
	removeReview,
} from "../controllers/review.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { CreateReviewSchema, UpdateReviewSchema } from "../schemas/review.schema.js";

const router = express.Router();

// 1. GET /api/reviews (toutes les reviews)
// 2. GET /api/reviews?admin_id=1&video_id=30 (une review précise)

router.post("/", validate(CreateReviewSchema), createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", validate(UpdateReviewSchema), setReview);
router.delete("/:id", removeReview);

export default router;
