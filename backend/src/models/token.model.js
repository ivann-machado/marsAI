import { pool } from '../database/index.js';

export const createToken = async (token, admin_id) => {
	const query = `INSERT INTO tokens (value, admin_id) VALUES (?, ?)`;
	const result = await pool.query(query, [token, admin_id]);
	return result.insertId;
};

export const findToken = async (token) => {
	const query = `SELECT * FROM tokens WHERE value = ?`;
	const rows = await pool.query(query, [token]);
	return rows[0];
};

export const updateTokenStatus = async (token, status) => {
	const query = `UPDATE tokens set status = ? WHERE value = ?`;
	const rows = await pool.query(query, [status, token]);
	return rows[0];
};