import { pool } from "../config/db.js";

/**
 * Create a new reservation.
 * @param {Object} reservation Object containing event_id, firstname, lastname, email
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<number>} Inserted reservation ID
 */
export const insertReservation = async (reservation, conn = null) => {
	const { event_id, firstname, lastname, email } = reservation;
	const query = `INSERT INTO reservations (event_id, firstname, lastname, email) VALUES (?, ?, ?, ?)`;
	const db = conn || pool;
	const result = await db.query(query, [event_id, firstname, lastname, email]);
	return result.insertId;
};

/**
 * Find a reservation by ID.
 * @param {number|string} id - Reservation ID
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Object|undefined>} Row or undefined.
 */
export const selectReservationById = async (id, conn = null) => {
	const query = "SELECT * FROM reservations WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Get all reservations.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<Array>} List of reservations.
 */
export const selectAllReservations = async (conn = null) => {
	const query = "SELECT * FROM reservations ORDER BY id DESC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Delete a reservation by ID.
 * @param {number|string} id - Reservation ID
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const deleteReservation = async (id, conn = null) => {
	const query = "DELETE FROM reservations WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
