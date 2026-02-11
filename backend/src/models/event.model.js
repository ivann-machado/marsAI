import { pool } from "../config/db.js";

/**
 * Create a new event.
 * @param {Object} data - Event data.
 * @param {string} data.type - Event type (e.g. 'atelier').
 * @param {string} data.name - Event name.
 * @param {string} data.url - Event URL.
 * @param {string} data.logo - Event logo path.
 * @param {string} data.date - Event date (YYYY-MM-DD).
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Inserted event ID.
 */
export const createEvent = async (
	{ type, name, url, logo, info, place, duration, cover_image, date },
	conn = null,
) => {
	const sql = `
		INSERT INTO events 
		(type, name, url, logo, info, place, duration, cover_image, date)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`;

	const db = conn || pool;

	const result = await db.query(sql, [
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

	return result.insertId;
};

/**
 * Find an event by ID.
 * @param {number} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|undefined>} Event row or undefined.
 */
export const findEventById = async (id, conn = null) => {
	const sql = "SELECT * FROM events WHERE id = ?";
	const db = conn || pool;
	const rows = await db.query(sql, [id]);
	return rows[0];
};

/**
 * Find all events, ordered by date descending.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object[]>} List of events.
 */
export const findAllEvents = async (conn = null) => {
	const sql = "SELECT * FROM events ORDER BY date DESC";
	const db = conn || pool;
	const rows = await db.query(sql);
	return rows;
};

/**
 * Update an event by ID.
 * @param {number} id
 * @param {Object} data - Fields to update.
 * @param {string} [data.type]
 * @param {string} [data.name]
 * @param {string} [data.url]
 * @param {string} [data.logo]
 * @param {string} [data.date]
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const updateEvent = async (
	id,
	{ type, name, url, logo, info, place, duration, cover_image, date },
	conn = null,
) => {
	const sql = `
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

	const result = await db.query(sql, [
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

	return result.affectedRows;
};

/**
 * Delete an event by ID.
 * @param {number} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Number of affected rows.
 */
export const deleteEventById = async (id, conn = null) => {
	const sql = "DELETE FROM events WHERE id = ?";
	const db = conn || pool;
	const result = await db.query(sql, [id]);
	return result.affectedRows;
};
