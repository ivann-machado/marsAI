import { pool } from "../config/db.js";

/**
 * Create a new invite token linked to an admin.
 * @param {string} tokenValue - Random token value.
 * @param {number} admin_id - Related admin ID.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Inserted token ID.
 */
export const insertToken = async (tokenValue, admin_id, conn = null) => {
	const query = `INSERT INTO tokens (value, admin_id) VALUES (?, ?)`;
	const db = conn || pool;
	const result = await db.query(query, [tokenValue, admin_id]);
	return result.insertId;
};

/**
 * Find a token row by its value.
 * @param {string} tokenValue
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|undefined>} Token row or undefined if not found.
 */
export const selectTokenByValue = async (tokenValue, conn = null) => {
	const query = `SELECT * FROM tokens WHERE value = ?`;
	const db = conn || pool;
	return db.query(query, [tokenValue]);
};

/**
 * Update the token status (eg. 'pending', 'used', 'revoked').
 * @param {string} tokenValue
 * @param {string} status
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const updateTokenStatus = async (tokenValue, status, conn = null) => {
	const query = `UPDATE tokens set status = ? WHERE value = ?`;
	const db = conn || pool;
	return db.query(query, [status, tokenValue]);
};
