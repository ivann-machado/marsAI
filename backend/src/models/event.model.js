import { pool } from "../config/db.js";

/**
 * Create a new event.
 * @param {Object} data - Event data.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const insertEvent = async (
	{ type, name, url, logo, info, place, duration, cover_image, date },
	conn = null,
) => {
	const query = `
		INSERT INTO events
		(type, name, url, logo, info, place, duration, cover_image, date)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`;

	const db = conn || pool;
	return db.query(query, [
		type,
		name,
		url,
		logo,
		info,
		place,
		duration,
		cover_image,
		date,
	]);
};

/**
 * Find an event by ID.
 * @param {number} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>}
 */
export const selectEventById = async (id, conn = null) => {
	const query = "SELECT * FROM events WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Find all events, ordered by date descending.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any[]>}
 */
export const selectAllEvents = async (conn = null) => {
	const query = "SELECT * FROM events ORDER BY date DESC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Update an event by ID.
 * @param {number} id
 * @param {Object} data - Fields to update.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const updateEvent = async (
	id,
	{ type, name, url, logo, info, place, duration, cover_image, date },
	conn = null,
) => {
	const query = `
		UPDATE events
		SET type = ?,
		    name = ?,
		    url = ?,
		    logo = ?,
		    info = ?,
		    place = ?,
		    duration = ?,
		    cover_image = ?,
		    date = ?
		WHERE id = ?
	`;

	const db = conn || pool;
	return db.query(query, [
		type,
		name,
		url,
		logo,
		info,
		place,
		duration,
		cover_image,
		date,
		id,
	]);
};

/**
 * Delete an event by ID.
 * @param {number} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const deleteEvent = async (id, conn = null) => {
	const query = "DELETE FROM events WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
