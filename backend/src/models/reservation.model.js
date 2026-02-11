import { pool } from "../config/db.js";

/**
 * Create a reservation
 * @param {Object} reservation - Reservation data
 * @param {number|string} reservation.event_id - Event ID
 * @param {string} reservation.firstname - First name of the person
 * @param {string} reservation.lastname - Last name of the person
 * @param {string} reservation.email - Email of the person
 * @returns {Promise<number>} Inserted reservation ID
 */
export const createReservation = async ({ event_id, firstname, lastname, email }) => {
	const sql = "INSERT INTO reservations (event_id, firstname, lastname, email) VALUES (?, ?, ?, ?)";
	const result = await pool.query(sql, [event_id, firstname, lastname, email]);
	return result.insertId;
};

/**
 * Find a reservation by ID
 * @param {number|string} id - Reservation ID
 * @returns {Promise<Object|null>} Reservation object or null if not found
 */
export const findReservationById = async (id) => {
	const sql = "SELECT * FROM reservations WHERE id = ?";
	const rows = await pool.query(sql, [id]);
	return rows[0] || null;
};

/**
 * Get all reservations
 * @returns {Promise<Array<Object>>} List of all reservations
 */
export const findAllReservations = async () => {
	const sql = "SELECT * FROM reservations ORDER BY id DESC";
	const rows = await pool.query(sql);
	return rows;
};

/**
 * Delete a reservation by ID
 * @param {number|string} id - Reservation ID
 * @returns {Promise<Object>} Result of deletion query
 */
export const deleteReservationById = async (id) => {
	const sql = "DELETE FROM reservations WHERE id = ?";
	return pool.query(sql, [id]);
};
