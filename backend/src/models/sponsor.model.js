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
export const insertSponsor = async ({ edition_id, type, name, url, logo }, conn = null) => {
	const query = "INSERT INTO sponsors (edition_id, type, name, url, logo) VALUES (?, ?, ?, ?, ?)";
	const db = conn || pool;

	return db.query(query, [edition_id, type, name, url, logo]);
};

/**
 * Find sponsor by id
 *
 * @param {number} id
 * @param {import("mariadb").PoolConnection} [conn]
 *
 * @returns {Promise<Object|undefined>}
 */
export const selectSponsorById = async (id, conn = null) => {
	const query = "SELECT * FROM sponsors WHERE id = ?";

	const db = conn || pool;

	return db.query(query, [id]);
};

/**
 * Find all sponsors
 *
 * @param {import("mariadb").PoolConnection} [conn]
 *
 * @returns {Promise<Object[]>}
 */
export const selectAllSponsors = async (conn = null) => {
	const query = "SELECT * FROM sponsors ORDER BY id DESC";

	const db = conn || pool;

	return db.query(query);
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
export const updateSponsorById = async (id, { edition_id, type, name, url, logo }, conn = null) => {
	const query = "UPDATE sponsors SET edition_id = ?, type = ?, name = ?, url = ?, logo = ? WHERE id = ?";

	const db = conn || pool;

	return db.query(query, [edition_id, type, name, url, logo, id]);
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
	const query = "DELETE FROM sponsors WHERE id = ?";

	const db = conn || pool;

	return db.query(query, [id]);
};
