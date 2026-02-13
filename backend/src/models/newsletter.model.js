import { pool } from "../config/db.js";

/**
 * Create a newsletter subscription.
 *
 * @param {string} email - Email address to subscribe
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Inserted newsletter ID
 */
export const createNewsletter = async (email, conn = null) => {
	const sql = "INSERT INTO newsletters (email) VALUES (?)";
	const db = conn || pool;
	const result = await db.query(sql, [email]);
	return result.insertId;
};

/**
 * Find a newsletter subscription by email.
 *
 * @param {string} email - Email address to search
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|null>} Newsletter row or null if not found
 */
export const findNewsletterByEmail = async (email, conn = null) => {
	const sql = "SELECT id FROM newsletters WHERE email = ?";
	const db = conn || pool;
	const rows = await db.query(sql, [email]);
	return rows[0] || null;
};

/**
 * Retrieve all newsletter subscriptions.
 *
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Array>} List of all newsletter subscriptions
 */
export const findAllNewsletters = async (conn = null) => {
	const sql = "SELECT * FROM newsletters ORDER BY id DESC";
	const db = conn || pool;
	const rows = await db.query(sql);
	return rows;
};

/**
 * Delete a newsletter subscription by email.
 *
 * @param {string} email - Email address to delete
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Database delete result
 */
export const deleteNewsletterByEmail = async (email, conn = null) => {
	const sql = "DELETE FROM newsletters WHERE email = ?";
	const db = conn || pool;
	return db.query(sql, [email]);
};

