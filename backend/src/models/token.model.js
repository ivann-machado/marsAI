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
	return db.query(query, [tokenValue, admin_id]);
};

export const selectTokenByValue = async (tokenValue, conn = null) => {
	const query = `SELECT * FROM tokens WHERE value = ?`;
	const db = conn || pool;
	return db.query(query, [tokenValue]);
};

export const updateTokenStatus = async (tokenValue, status, conn = null) => {
	const query = `UPDATE tokens set status = ? WHERE value = ?`;
	const db = conn || pool;
	return db.query(query, [status, tokenValue]);
};
