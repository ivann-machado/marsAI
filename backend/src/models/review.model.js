import prisma from "../config/prisma.js";

/**
 * Insert a new review.
 * @param {Object} data - Review data (admin_id, video_id)
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility
 */
export const insertReview = async ({ admin_id, video_id }) => {
	const review = await prisma.reviews.create({
		data: {
			admin_id: Number(admin_id),
			video_id: Number(video_id),
			status: "assigned",
			note: "",
		},
	});
	return { insertId: review.id };
};

/**
 * Select a review by ID.
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export const selectReviewById = async (id) => {
	return prisma.reviews.findUnique({
		where: { id: Number(id) },
		include: {
			admins: { select: { login: true } },
			videos: { select: { title: true } },
		},
	});
};

/**
 * Select a review by admin_id and video_id.
 * @param {number} admin_id
 * @param {number} video_id
 * @returns {Promise<Object|null>}
 */
export const selectReviewByAdminAndVideo = async (admin_id, video_id) => {
	const review = await prisma.reviews.findFirst({
		where: {
			admin_id: Number(admin_id),
			video_id: Number(video_id),
		},
		include: {
			admins: { select: { login: true } },
			videos: { select: { title: true } },
		},
	});

	if (!review) return null;

	return {
		...review,
		admin_login: review.admins?.login,
		video_title: review.videos?.title,
	};
};

/**
 * Select all reviews.
 * @returns {Promise<Object[]>}
 */
export const selectAllReviews = async () => {
	const reviews = await prisma.reviews.findMany({
		include: {
			admins: { select: { login: true } },
			videos: { select: { title: true } },
		},
		orderBy: { id: "desc" },
	});

	return reviews.map(review => ({
		...review,
		admin_login: review.admins?.login,
		video_title: review.videos?.title,
	}));
};

/**
 * Update a review by ID
 * @param {number} id - Review ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Compatibility result
 */
export const updateReview = async (id, { note, grade, status }) => {
	await prisma.reviews.update({
		where: { id: Number(id) },
		data: {
			note,
			grade: grade !== undefined ? Number(grade) : undefined,
			status,
		},
	});
	return { affectedRows: 1 };
};

/**
 * Delete a review by ID.
 * @param {number} id
 * @returns {Promise<number>} Number of affected rows
 */
export const deleteReview = async (id) => {
	await prisma.reviews.delete({
		where: { id: Number(id) },
	});
	return 1;
};
