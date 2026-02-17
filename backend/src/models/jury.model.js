import { pool } from "../config/db.js";

/**
 * Insert a new jury member into the database.
 *
 * @param {Object} data - Jury data payload
 * @param {number} data.edition_id - Related edition ID (foreign key)
 * @param {string} data.name - Jury member full name
 * @param {string} [data.bio] - Biography description
 * @param {string} [data.photo] - Photo filename or URL
 * @param {string} [data.profession] - Professional title
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 *
 * @returns {Promise<number>} Inserted jury ID
 */
export const createJury = async (
	{ edition_id, name, bio, photo, profession },
	conn = null,
) => {
	const sql =
		"INSERT INTO jury (edition_id, name, bio, photo, profession) VALUES (?, ?, ?, ?, ?)";
	const db = conn || pool;
	const result = await db.query(sql, [
		edition_id,
		name,
		bio,
		photo,
		profession,
	]);
	return result.insertId;
};

/**
 * Retrieve a jury member by its primary ID.
 *
 * @param {number} id - Jury ID
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 *
 * @returns {Promise<Object|undefined>} Jury object if found, otherwise undefined
 */
export const findJuryById = async (id, conn = null) => {
	const sql = "SELECT * FROM jury WHERE id = ?";
	const db = conn || pool;
	const rows = await db.query(sql, [id]);
	return rows[0];
};

/**
 * Retrieve all jury members ordered by ID descending.
 *
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 *
 * @returns {Promise<Object[]>} Array of jury records
 */
export const findAllJury = async (conn = null) => {
	const sql = "SELECT * FROM jury ORDER BY id DESC";
	const db = conn || pool;
	const rows = await db.query(sql);
	return rows;
};

/**
 * Update a jury member by its ID.
 *
 * @param {number} id - Jury ID
 * @param {Object} data - Updated jury data
 * @param {number} data.edition_id - Related edition ID
 * @param {string} data.name - Jury member full name
 * @param {string} [data.bio] - Biography description
 * @param {string} [data.photo] - Photo filename or URL
 * @param {string} [data.profession] - Professional title
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 *
 * @returns {Promise<number>} Number of affected rows
 */
export const updateJuryById = async (
	id,
	{ edition_id, name, bio, photo, profession },
	conn = null,
) => {
	const sql =
		"UPDATE jury SET edition_id = ?, name = ?, bio = ?, photo = ?, profession = ? WHERE id = ?";
	const db = conn || pool;
	const result = await db.query(sql, [
		edition_id,
		name,
		bio,
		photo,
		profession,
		id,
	]);
	return result.affectedRows;
};

/**
 * Delete a jury member by its ID.
 *
 * @param {number} id - Jury ID
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 *
 * @returns {Promise<number>} Number of affected rows
 */
export const deleteJuryById = async (id, conn = null) => {
	const sql = "DELETE FROM jury WHERE id = ?";
	const db = conn || pool;
	const result = await db.query(sql, [id]);
	return result.affectedRows;
};
