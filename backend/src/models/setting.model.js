import { pool } from '../config/db.js';

export const getAllSettings = async () => {
	const query = `SELECT name, value, updated_at FROM settings`;
	const rows = await pool.query(query);
	return rows;
};

export const updateSetting = async (name, value) => {
	const query = `UPDATE settings SET value = ?, updated_at = NOW() WHERE name = ?`;
	const result = await pool.query(query, [value, name]);
	return result.affectedRows;
};
