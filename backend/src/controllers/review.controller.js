import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.js";

/** Shared include object for eager-loading review relations. */
const reviewIncludes = {
	admins: {
		select: {
			login: true,
		},
	},
	videos: {
		select: {
			title: true,
		},
	},
};

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

		const review = await prisma.reviews.create({
			data: {
				admin_id: Number(admin_id),
				video_id: Number(video_id),
				status: "assigned",
				note: "",
			},
		});

		res.status(201).json({
			message: "Review created",
			id: review.id.toString(),
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
		const { admin_id, video_id, page, limit } = req.query;

		const where = {};
		if (admin_id) where.admin_id = Number(admin_id);
		if (video_id) where.video_id = Number(video_id);

		if (admin_id && video_id) {
			const review = await prisma.reviews.findFirst({
				where,
				include: reviewIncludes,
			});

			if (!review) {
				return res.status(200).json(null);
			}

			return res.status(200).json({
				...review,
				admin_login: review.admins?.login,
				video_title: review.videos?.title,
			});
		}

		const result = await paginate(prisma.reviews, {
			page,
			limit,
			where,
			include: reviewIncludes,
			orderBy: { id: "desc" },
		});

		result.data = result.data.map(review => ({
			...review,
			admin_login: review.admins?.login,
			video_title: review.videos?.title,
		}));

		res.status(200).json(result);
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

		const review = await prisma.reviews.findUnique({
			where: { id: Number(id) },
			include: reviewIncludes,
		});

		if (!review)
			return res.status(404).json({ message: "Review not found" });

		res.status(200).json({
			...review,
			admin_login: review.admins?.login,
			video_title: review.videos?.title,
		});
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

		const review = await prisma.reviews.update({
			where: { id: Number(id) },
			data: {
				note,
				grade: grade !== undefined ? Number(grade) : undefined,
				status,
			},
		});

		res.status(200).json({ message: "Review updated", affectedRows: 1 });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Review not found" });
		}
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

		await prisma.reviews.delete({
			where: { id: Number(id) },
		});

		res.status(200).json({ message: "Review deleted", affectedRows: 1 });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Review not found" });
		}
		console.error("Delete Review Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
