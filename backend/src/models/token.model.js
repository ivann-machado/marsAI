import { pool } from "../config/db.js";

/**
 * Create a new invite token linked to an admin.
 * @param {string} token - Random token value.
 * @param {number} admin_id - Related admin ID.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Inserted token ID.
 */
export const createToken = async (token, admin_id, conn = null) => {
	const query = `INSERT INTO tokens (value, admin_id) VALUES (?, ?)`;
	const db = conn || pool;
	const result = await db.query(query, [token, admin_id]);
	return result.insertId;
};

/**
 * Find a token row by its value.
 * @param {string} token
 * @returns {Promise<Object|undefined>} Token row or undefined if not found.
 */
export const findToken = async (token) => {
	const query = `SELECT * FROM tokens WHERE value = ?`;
	const rows = await pool.query(query, [token]);
	return rows[0];
};

/**
 * Update the token status (eg. 'pending', 'used', 'revoked').
 * @param {string} token
 * @param {string} status
 * @returns {Promise<Object>} Result row from the update query .
 */
export const updateTokenStatus = async (token, status) => {
	const query = `UPDATE tokens set status = ? WHERE value = ?`;
	const rows = await pool.query(query, [status, token]);
	return rows[0];
};
