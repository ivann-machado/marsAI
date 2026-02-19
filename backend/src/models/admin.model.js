import { pool } from "../config/db.js";

/**
 * Create a new admin user.
 * @param {string} login - Admin login (usually email).
 * @param {string|null} password - Hashed password or null if not set yet.
 * @param {string} [role='admin'] - Role name.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Inserted admin ID.
 */
export const insertAdmin = async (login, password, role = "admin", conn = null) => {
	const query = `INSERT INTO admins (login, password, role) VALUES (?, ?, ?)`;
	const db = conn || pool;
	return db.query(query, [login, password, role]);
};

/**
 * Find an admin by login.
 * @param {string} login
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|undefined>} Admin row or undefined if not found.
 */
export const selectAdminByLogin = async (login, conn = null) => {
	const query = `SELECT * FROM admins WHERE login = ?`;
	const db = conn || pool;
	return db.query(query, [login]);
};

/**
 * Find an admin by ID.
 * @param {number} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|undefined>} Admin row or undefined if not found.
 */
export const selectAdminById = async (id, conn = null) => {
	const query = `SELECT * FROM admins WHERE id = ?`;
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Set or update the password for an admin.
 * @param {number} id - Admin ID.
 * @param {string} password - Hashed password.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const updateAdminPassword = async (id, password, conn = null) => {
	const query = `UPDATE admins SET password = ? WHERE id = ?`;
	const db = conn || pool;
	return db.query(query, [password, id]);
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
	return db.query(query, [id]);
};



