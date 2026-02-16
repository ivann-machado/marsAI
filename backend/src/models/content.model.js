import { pool } from '../config/db.js';

/**
 * Get all content entries from the database.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any[]>}
 */
export const selectAllContent = async (conn = null) => {
	const query = `SELECT name, value, updated_at FROM content`;
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update a content entry by name.
 * @param {string} name
 * @param {string} value
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const updateContent = async (name, value, conn = null) => {
	const query = `UPDATE content SET value = ?, updated_at = NOW() WHERE name = ?`;
	const db = conn || pool;
	return db.query(query, [value, name]);
};
