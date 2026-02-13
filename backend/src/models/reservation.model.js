import { pool } from "../config/db.js";

/**
 * Create a new reservation.
 *
 * @param {Object} reservationData - Object containing event_id, firstname, lastname, email
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions
 * @returns {Promise<number>} Inserted reservation ID
 */
export const createReservation = async ({
	event_id,
	firstname,
	lastname,
	email,
}, conn = null) => {
	const sql =
		"INSERT INTO reservations (event_id, firstname, lastname, email) VALUES (?, ?, ?, ?)";
	const db = conn || pool;
	const result = await db.query(sql, [
		event_id,
		firstname,
		lastname,
		email,
	]);

	return result.insertId;
};

/**
 * Find a reservation by ID.
 *
 * @param {number|string} id - Reservation ID
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions
 * @returns {Promise<Object|null>} Reservation row or null
 */
export const findReservationById = async (id, conn = null) => {
	const sql = "SELECT * FROM reservations WHERE id = ?";
	const db = conn || pool;
	const rows = await db.query(sql, [id]);
	return rows[0] || null;
};

/**
 * Get all reservations.
 *
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions
 * @returns {Promise<Array>} List of reservations
 */
export const findAllReservations = async (conn = null) => {
	const sql = "SELECT * FROM reservations ORDER BY id DESC";
	const db = conn || pool;
	const rows = await db.query(sql);
	return rows;
};

/**
 * Delete a reservation by ID.
 *
 * @param {number|string} id - Reservation ID
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions
 * @returns {Promise<any>}
 */
export const deleteReservationById = async (id, conn = null) => {
	const sql = "DELETE FROM reservations WHERE id = ?";
	const db = conn || pool;
	return db.query(sql, [id]);
};

