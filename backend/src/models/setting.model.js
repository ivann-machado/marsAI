import { pool } from '../config/db.js';

/**
 * Get all settings from the database.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any[]>}
 */
export const selectAllSettings = async (conn = null) => {
	const query = `SELECT name, value, updated_at FROM settings`;
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update a setting value by name.
 * @param {string} name
 * @param {string} value
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const updateSetting = async (name, value, conn = null) => {
	const query = `UPDATE settings SET value = ?, updated_at = NOW() WHERE name = ?`;
	const db = conn || pool;
	return db.query(query, [value, name]);
};



