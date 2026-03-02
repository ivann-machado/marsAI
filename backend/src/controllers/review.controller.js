import { getConnection } from "../config/db.js";
import {
	insertReview,
	selectReviewById,
	selectReviewByAdminAndVideo,
	selectAllReviews,
	updateReview,
	deleteReview,
} from "../models/review.model.js";

/**
 * Create a new review
 *
 * @route POST /reviews
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<void>}
 */
export const createReview = async (req, res) => {
	try {
		const { admin_id, video_id } = req.body;

		if (!admin_id || !video_id) {
			return res
				.status(400)
				.json({ message: "admin_id and video_id are required" });
		}

		const result = await insertReview({ admin_id, video_id });

		res.status(201).json({
			message: "Review created",
			id: result.insertId.toString(),
		});
	} catch (error) {
		console.error("Create Review Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get all reviews
 *
 * @route GET /reviews
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
export const getAllReviews = async (req, res) => {
	try {
		const { admin_id, video_id } = req.query;
		if (admin_id && video_id) {
			const review = await selectReviewByAdminAndVideo(
				parseInt(admin_id, 10),
				parseInt(video_id, 10),
			);

			if (!review) {
				return res.status(200).json(null);
			}

			return res.status(200).json(review);
		}

		const reviews = await selectAllReviews();
		res.status(200).json(reviews);
	} catch (error) {
		console.error("Get Reviews Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get a single review by ID
 *
 * @route GET /reviews/:id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
export const getReviewById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id)
			return res.status(400).json({ message: "Review id is required" });

		const review = await selectReviewById(id);

		if (!review)
			return res.status(404).json({ message: "Review not found" });

		res.status(200).json(review);
	} catch (error) {
		console.error("Get Review By Id Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update a review by ID
 *
 * @route PUT /reviews/:id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
export const setReview = async (req, res) => {
	try {
		const { id } = req.params;
		const { note, grade, status } = req.body;

		if (!id)
			return res.status(400).json({ message: "Review id is required" });

		const result = await updateReview(id, { note, grade, status });
		const affectedRows = result.affectedRows;

		res.status(200).json({ message: "Review updated", affectedRows });
	} catch (error) {
		console.error("Update Review Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete a review by ID
 *
 * @route DELETE /reviews/:id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
export const removeReview = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id)
			return res.status(400).json({ message: "Review id is required" });

		const affectedRows = await deleteReview(id);

		res.status(200).json({ message: "Review deleted", affectedRows });
	} catch (error) {
		console.error("Delete Review Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
