import { pool } from '../config/db.js';

/**
 * Get all settings from the database.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Array>} Array of setting rows.
 */
export const selectAllSettings = async (conn = null) => {
	const query = `SELECT name, value, updated_at FROM settings`;
	const db = conn || pool;
	const rows = await db.query(query);
	return rows;
};

/**
 * Update a setting value by name.
 * @param {string} name - Setting key name.
 * @param {string} value - New value.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const updateSetting = async (name, value, conn = null) => {
	const query = `UPDATE settings SET value = ?, updated_at = NOW() WHERE name = ?`;
	const db = conn || pool;
	const result = await db.query(query, [value, name]);
	return result.affectedRows;
};



