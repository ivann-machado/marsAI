import { pool } from "../config/db.js";

/**
 * Insert a new country.
 * @param {Object} data - Country data (name, iso_code)
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>} raw MariaDB result
 */
export const insertCountry = async ({ name, iso_code }, conn = null) => {
	const query = "INSERT INTO countries (name, iso_code) VALUES (?, ?)";
	const db = conn || pool;
	return db.query(query, [name, iso_code]);
};

/**
 * Select a country by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectCountryById = async (id, conn = null) => {
	const query = "SELECT * FROM countries WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Select all countries.
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object[]>}
 */
export const selectAllCountries = async (conn = null) => {
	const query = "SELECT * FROM countries ORDER BY name ASC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update a country by ID.
 * @param {number} id
 * @param {Object} data - Country data
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const updateCountry = async (id, { name, iso_code }, conn = null) => {
	const query = "UPDATE countries SET name = ?, iso_code = ? WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [name, iso_code, id]);
};

/**
 * Delete a country by ID.
 * @param {number} id
 * @param {import("mariadb").PoolConnection|null} [conn=null] - Optional transaction connection
 * @returns {Promise<Object>}
 */
export const deleteCountry = async (id, conn = null) => {
	const query = "DELETE FROM countries WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
