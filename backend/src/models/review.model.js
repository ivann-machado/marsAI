import { pool } from "../config/db.js";

/**
 * Insert a new review.
 * @param {Object} data - Review data (admin_id, video_id, note, grade, status)
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertReview = async (
	{ admin_id, video_id, note, grade, status },
	conn = null,
) => {
	const query =
		"INSERT INTO reviews (admin_id, video_id, note, grade, status) VALUES (?, ?, ?, ?, ?)";
	const db = conn || pool;
	return db.query(query, [admin_id, video_id, note, grade, status]);
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
 * Update a review by ID.
 * @param {number} id
 * @param {Object} data - Review data
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const updateReview = async (
	id,
	{ admin_id, video_id, note, grade, status },
	conn = null,
) => {
	const query =
		"UPDATE reviews SET admin_id = ?, video_id = ?, note = ?, grade = ?, status = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [admin_id, video_id, note, grade, status, id]);
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
