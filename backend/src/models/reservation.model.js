import { pool } from "../config/db.js";

/**
 * Create a new reservation.
 * @param {Object} reservation
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const insertReservation = async (reservation, conn = null) => {
	const { event_id, firstname, lastname, email } = reservation;
	const query = `INSERT INTO reservations (event_id, firstname, lastname, email) VALUES (?, ?, ?, ?)`;
	const db = conn || pool;
	return db.query(query, [event_id, firstname, lastname, email]);
};

/**
 * Find a reservation by ID.
 * @param {number|string} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>}
 */
export const selectReservationById = async (id, conn = null) => {
	const query = "SELECT * FROM reservations WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};

/**
 * Get all reservations.
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any[]>}
 */
export const selectAllReservations = async (conn = null) => {
	const query = "SELECT * FROM reservations ORDER BY id DESC";
	const db = conn || pool;
	return db.query(query);
};

/**
 * Delete a reservation by ID.
 * @param {number|string} id
 * @param {import('mariadb').PoolConnection} [conn] - Optional connection for transactions.
 * @returns {Promise<any>} Result.
 */
export const deleteReservation = async (id, conn = null) => {
	const query = "DELETE FROM reservations WHERE id = ?";
	const db = conn || pool;
	return db.query(query, [id]);
};
