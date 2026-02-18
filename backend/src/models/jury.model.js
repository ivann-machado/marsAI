import { pool } from "../config/db.js";

/**
 * Insert a new jury member into the database.
 * @param {Object} data - Jury data payload
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertJury = async (
	{ edition_id, name, bio, photo, profession },
	conn = null,
) => {
	const sql =
		"INSERT INTO jury (edition_id, name, bio, photo, profession) VALUES (?, ?, ?, ?, ?)";
	const db = conn || pool;
	return db.query(sql, [
		edition_id,
		name,
		bio,
		photo,
		profession,
	]);
};

/**
 * Retrieve a jury member by its primary ID.
 * @param {number} id - Jury ID
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>} raw MariaDB result (array of rows)
 */
export const selectJuryById = async (id, conn = null) => {
	const sql = "SELECT * FROM jury WHERE id = ?";
	const db = conn || pool;
	return db.query(sql, [id]);
};

/**
 * Retrieve all jury members ordered by ID descending.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>} raw MariaDB result (array of rows)
 */
export const selectAllJuries = async (conn = null) => {
	const sql = "SELECT * FROM jury ORDER BY id DESC";
	const db = conn || pool;
	return db.query(sql);
};

/**
 * Update a jury member by its ID.
 * @param {number} id - Jury ID
 * @param {Object} data - Updated jury data
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const updateJury = async (
	id,
	{ edition_id, name, bio, photo, profession },
	conn = null,
) => {
	const sql =
		"UPDATE jury SET edition_id = ?, name = ?, bio = ?, photo = ?, profession = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(sql, [
		edition_id,
		name,
		bio,
		photo,
		profession,
		id,
	]);
};

/**
 * Delete a jury member by its ID.
 * @param {number} id - Jury ID
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const deleteJury = async (id, conn = null) => {
	const sql = "DELETE FROM jury WHERE id = ?";
	const db = conn || pool;
	return db.query(sql, [id]);
};
