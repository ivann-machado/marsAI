import { pool } from '../config/db.js';

/**
 * Get all content entries from the database.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Array>} Array of content rows.
 */
export const getAllContent = async (conn = null) => {
	const query = `SELECT name, value, updated_at FROM content`;
	const db = conn || pool;
	const rows = await db.query(query);
	return rows;
};

/**
 * Update a content entry by name.
 * @param {string} name - Content name.
 * @param {string} value - New value.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const updateContent = async (name, value, conn = null) => {
	const query = `UPDATE content SET value = ?, updated_at = NOW() WHERE name = ?`;
	const db = conn || pool;
	const result = await db.query(query, [value, name]);
	return result.affectedRows;
};
