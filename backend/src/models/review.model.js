import { pool } from "../config/db.js";

export const createReview = async (admin_id, video_id, note, grade, status) => {
	return pool.query(
		`INSERT INTO reviews (admin_id, video_id, note, grade, status)
         VALUES (?, ?, ?, ?, ?)`,
		[admin_id, video_id, note, grade, status],
	);
};

export const findAllReviews = async () => {
	return pool.query(`SELECT * FROM reviews ORDER BY id DESC`);
};

export const findReviewById = async (id) => {
	return pool.query(`SELECT * FROM reviews WHERE id = ?`, [id]);
};

export const updateReview = async (id, note, grade, status) => {
	return pool.query(
		`UPDATE reviews
         SET note = ?, grade = ?, status = ?
         WHERE id = ?`,
		[note, grade, status, id],
	);
};

export const deleteReview = async (id) => {
	return pool.query(`DELETE FROM reviews WHERE id = ?`, [id]);
};
