import { pool } from "../config/db.js";

/**
 * Add a new email to the newsletter list.
 * @param {string} email
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const insertNewsletter = async (email, conn = null) => {
	const query = "INSERT INTO newsletters (email) VALUES (?)";
	const db = conn || pool;
	return db.query(query, [email]);
};

/**
 * Find a newsletter subscription by email.
 * @param {string} email
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>}
 */
export const selectNewsletterByEmail = async (email, conn = null) => {
	const query = "SELECT * FROM newsletters WHERE email = ?";
	const db = conn || pool;
	return db.query(query, [email]);
};

/**
 * Get all newsletter subscriptions.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any[]>}
 */
export const selectAllNewsletters = async (conn = null) => {
	const query = "SELECT * FROM newsletters ORDER BY created_at DESC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Delete a newsletter entry by email.
 * @param {string} email
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const deleteNewsletterByEmail = async (email, conn = null) => {
	const query = "DELETE FROM newsletters WHERE email = ?";
	const db = conn || pool;
	return db.query(query, [email]);
};
