import { pool } from "../config/db.js";

/**
 * Create a new admin user.
 * @param {string} login - Admin login (usually email).
 * @param {string|null} password - Hashed password or null if not set yet.
 * @param {string} [role='admin'] - Role name.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Inserted admin ID.
 */
export const createAdmin = async (login, password, role = "admin", conn = null) => {
	const query = `INSERT INTO admins (login, password, role) VALUES (?, ?, ?)`;
	const db = conn || pool;
	const result = await db.query(query, [login, password, role]);
	return result.insertId;
};

/**
 * Find an admin by login.
 * @param {string} login
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|undefined>} Admin row or undefined if not found.
 */
export const findAdminByLogin = async (login, conn = null) => {
	const query = `SELECT * FROM admins WHERE login = ?`;
	const db = conn || pool;
	const rows = await db.query(query, [login]);
	return rows[0];
};

/**
 * Find an admin by ID.
 * @param {number} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|undefined>} Admin row or undefined if not found.
 */
export const findAdminById = async (id, conn = null) => {
	const query = `SELECT * FROM admins WHERE id = ?`;
	const db = conn || pool;
	const rows = await db.query(query, [id]);
	return rows[0];
};

/**
 * Set or update the password for an admin.
 * @param {number} id - Admin ID.
 * @param {string} password - Hashed password.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const addPasswordAdmin = async (id, password, conn = null) => {
	const query = `UPDATE admins SET password = ? WHERE id = ?`;
	const db = conn || pool;
	const result = await db.query(query, [password, id]);
	return result.affectedRows;
};

/**
 * Delete an admin by ID.
 * @param {number} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const deleteAdmin = async (id, conn = null) => {
	const query = `DELETE FROM admins WHERE id = ?`;
	const db = conn || pool;
	const result = await db.query(query, [id]);
	return result.affectedRows;
};
