import { pool } from "../config/db.js";

/**
 * Create a newsletter subscription.
 *
 * @param {string} email - Email address to subscribe
 * @returns {Promise<number>} Inserted newsletter ID
 */
export const createNewsletter = async (email) => {
	const sql = "INSERT INTO newsletters (email) VALUES (?)";
	const result = await pool.query(sql, [email]);
	return result.insertId;
};

/**
 * Find a newsletter subscription by email.
 *
 * @param {string} email - Email address to search
 * @returns {Promise<Object|null>} Newsletter row or null if not found
 */
export const findNewsletterByEmail = async (email) => {
	const sql = "SELECT id FROM newsletters WHERE email = ?";
	const rows = await pool.query(sql, [email]);
	return rows[0] || null;
};

/**
 * Retrieve all newsletter subscriptions.
 *
 * @returns {Promise<Array>} List of all newsletter subscriptions
 */
export const findAllNewsletters = async () => {
	const sql = "SELECT * FROM newsletters ORDER BY id DESC";
	const rows = await pool.query(sql);
	return rows;
};

/**
 * Delete a newsletter subscription by email.
 *
 * @param {string} email - Email address to delete
 * @returns {Promise<any>} Database delete result
 */
export const deleteNewsletterByEmail = async (email) => {
	const sql = "DELETE FROM newsletters WHERE email = ?";
	return pool.query(sql, [email]);
};
