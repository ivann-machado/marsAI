import { pool } from "../config/db.js";

/**
 * Create a new sponsor.
 *
 * @param {Object} data
 * @param {number} data.edition_id
 * @param {string} data.type
 * @param {string} data.name
 * @param {string} data.url
 * @param {string} data.logo
 * @param {import("mariadb").PoolConnection} [conn]
 *
 * @returns {Promise<number>} inserted sponsor id
 */
export const createSponsor = async (
	{ edition_id, type, name, url, logo },
	conn = null
) => {
	const sql =
		"INSERT INTO sponsor (edition_id, type, name, url, logo) VALUES (?, ?, ?, ?, ?)";

	const db = conn || pool;

	const result = await db.query(sql, [
		edition_id,
		type,
		name,
		url,
		logo,
	]);

	return result.insertId;
};

/**
 * Find sponsor by id
 *
 * @param {number} id
 * @param {import("mariadb").PoolConnection} [conn]
 *
 * @returns {Promise<Object|undefined>}
 */
export const findSponsorById = async (id, conn = null) => {
	const sql = "SELECT * FROM sponsor WHERE id = ?";

	const db = conn || pool;

	const rows = await db.query(sql, [id]);

	return rows[0];
};

/**
 * Find all sponsors
 *
 * @param {import("mariadb").PoolConnection} [conn]
 *
 * @returns {Promise<Object[]>}
 */
export const findAllSponsors = async (conn = null) => {
	const sql = "SELECT * FROM sponsor ORDER BY id DESC";

	const db = conn || pool;

	const rows = await db.query(sql);

	return rows;
};

/**
 * Update sponsor by id
 *
 * @param {number} id
 * @param {Object} data
 * @param {number} data.edition_id
 * @param {string} data.type
 * @param {string} data.name
 * @param {string} data.url
 * @param {string} data.logo
 * @param {import("mariadb").PoolConnection} [conn]
 *
 * @returns {Promise<number>} affected rows
 */
export const updateSponsorById = async (
	id,
	{ edition_id, type, name, url, logo },
	conn = null
) => {
	const sql =
		"UPDATE sponsor SET edition_id = ?, type = ?, name = ?, url = ?, logo = ? WHERE id = ?";

	const db = conn || pool;

	const result = await db.query(sql, [
		edition_id,
		type,
		name,
		url,
		logo,
		id,
	]);

	return result.affectedRows;
};

/**
 * Delete sponsor by id
 *
 * @param {number} id
 * @param {import("mariadb").PoolConnection} [conn]
 *
 * @returns {Promise<number>} affected rows
 */
export const deleteSponsorById = async (id, conn = null) => {
	const sql = "DELETE FROM sponsor WHERE id = ?";

	const db = conn || pool;

	const result = await db.query(sql, [id]);

	return result.affectedRows;
};
