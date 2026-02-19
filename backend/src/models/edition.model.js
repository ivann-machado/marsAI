import { pool } from "../config/db.js";

/**
 * Insert a new edition.
 * @param {Object} data - Edition data (name, year)
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertEdition = async ({ name, year }, conn = null) => {
	const query = "INSERT INTO editions (name, year) VALUES (?, ?)";
	const db = conn || pool;
	return db.query(query, [name, year]);
};

/**
 * Select an edition by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectEditionById = async (id, conn = null) => {
	const query = "SELECT * FROM editions WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Select all editions.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectAllEditions = async (conn = null) => {
	const query = "SELECT * FROM editions ORDER BY year DESC, name ASC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update an edition by ID.
 * @param {number} id
 * @param {Object} data - Edition data
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const updateEdition = async (id, { name, year }, conn = null) => {
	const query = "UPDATE editions SET name = ?, year = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [name, year, id]);
};

/**
 * Delete an edition by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const deleteEdition = async (id, conn = null) => {
	const query = "DELETE FROM editions WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
