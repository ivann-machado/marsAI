import { pool } from '../database/index.js';

export const createAdmin = async (login, password, role = 'admin') => {
	const query = `INSERT INTO admins (login, password, role) VALUES (?, ?, ?)`;
	const result = await pool.query(query, [login, password, role]);
	return result.insertId;
};

export const findAdminByLogin = async (login) => {
	const query = `SELECT * FROM admins WHERE login = ?`;
	const rows = await pool.query(query, [login]);
	return rows[0];
};

export const findAdminById = async (id) => {
	const query = `SELECT * FROM admins WHERE id = ?`;
	const rows = await pool.query(query, [id]);
	return rows[0];
};

export const addPasswordAdmin = async (id, password) => {
	const query = `UPDATE admins SET password = ? WHERE id = ?`;
	const result = await pool.query(query, [password, id]);
	return result.affectedRows;
};