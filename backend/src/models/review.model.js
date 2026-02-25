import { pool } from "../config/db.js";

/**
 * Insert a new review.
 * @param {Object} data - Review data (admin_id, video_id)
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertReview = async ({ admin_id, video_id }, conn = null) => {
	const query = "INSERT INTO reviews (admin_id, video_id) VALUES (?, ?)";
	const db = conn || pool;
	return db.query(query, [admin_id, video_id]);
};

/**
 * Select a review by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectReviewById = async (id, conn = null) => {
	const query = "SELECT * FROM reviews WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Select a review by admin_id and video_id.
 * @param {number} admin_id
 * @param {number} video_id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object|null>}
 */
export const selectReviewByAdminAndVideo = async (
	admin_id,
	video_id,
	conn = null,
) => {
	const query =
		"SELECT r.*, a.login as admin_login, v.title as video_title FROM reviews r JOIN admins a ON r.admin_id = a.id JOIN videos v ON r.video_id = v.id WHERE r.admin_id = ? AND r.video_id = ?";
	const db = conn || pool;
	const rows = await db.query(query, [admin_id, video_id]);
	return rows[0] || null;
};

/**
 * Select all reviews.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectAllReviews = async (conn = null) => {
	const query =
		"SELECT r.*, a.login as admin_login, v.title as video_title FROM reviews r JOIN admins a ON r.admin_id = a.id JOIN videos v ON r.video_id = v.id";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update a review by ID
 * @param {number} id - Review ID
 * @param {Object} data - Fields to update
 * @param {number} [data.note]
 * @param {string} [data.grade]
 * @param {string} [data.status]
 * @param {import('mariadb').PoolConnection} [conn]
 * @returns {Promise<number>} Number of affected rows
 */
export const updateReview = async (
	id,
	{ note, grade, status },
	conn = null,
) => {
	const query =
		"UPDATE reviews SET note = ?, grade = ?, status = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [note, grade, status, id]);
};

/**
 * Delete a review by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const deleteReview = async (id, conn = null) => {
	const query = "DELETE FROM reviews WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
