import { pool } from "../config/db.js";

/**
 * Insert a new review
 * @param {Object} data - Review data
 * @param {number} data.admin_id - ID of the admin
 * @param {number} data.video_id - ID of the video
 * @param {number} data.note - Note/score
 * @param {string} data.grade - Grade (A, B, C…)
 * @param {string} [data.status] - Status (optional)
 * @param {import('mariadb').PoolConnection} [conn] - Optional DB connection for transaction
 * @returns {Promise<number>} Inserted review ID
 */
export const insertReview = async (
	{ admin_id, video_id, note, grade, status },
	conn = null,
) => {
	const query =
		"INSERT INTO reviews (admin_id, video_id, note, grade, status) VALUES (?, ?, ?, ?, ?)";
	const db = conn || pool;
	const result = await db.query(query, [
		admin_id,
		video_id,
		note,
		grade,
		status || null,
	]);
	return result;
};

/**
 * Select a review by ID
 * @param {number} id - Review ID
 * @param {import('mariadb').PoolConnection} [conn]
 * @returns {Promise<Object|undefined>} Review row or undefined
 */
export const selectReviewById = async (id, conn = null) => {
	const query = "SELECT * FROM reviews WHERE id = ?";
	const db = conn || pool;
	const rows = await db.query(query, [id]);
	return rows[0];
};

/**
 * Select all reviews, ordered by id descending
 * @param {import('mariadb').PoolConnection} [conn]
 * @returns {Promise<Object[]>} List of reviews
 */
export const selectAllReviews = async (conn = null) => {
	const query = "SELECT * FROM reviews ORDER BY id DESC";
	const db = conn || pool;
	const rows = await db.query(query);
	return rows;
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
export const updateReviewById = async (
	id,
	{ note, grade, status },
	conn = null,
) => {
	const query =
		"UPDATE reviews SET note = ?, grade = ?, status = ? WHERE id = ?";
	const db = conn || pool;
	const result = await db.query(query, [note, grade, status || null, id]);
	return result.affectedRows;
};

/**
 * Delete a review by ID
 * @param {number} id - Review ID
 * @param {import('mariadb').PoolConnection} [conn]
 * @returns {Promise<number>} Number of affected rows
 */
export const deleteReviewById = async (id, conn = null) => {
	const query = "DELETE FROM reviews WHERE id = ?";
	const db = conn || pool;
	const result = await db.query(query, [id]);
	return result.affectedRows;
};
