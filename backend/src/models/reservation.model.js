import { pool } from "../config/db.js";

export const createReservation = async ({
	event_id,
	firstname,
	lastname,
	email,
}) => {
	const sql =
		"INSERT INTO reservations (event_id, firstname, lastname, email) VALUES (?, ?, ?, ?)";
	const result = await pool.query(sql, [
		event_id,
		firstname,
		lastname,
		email,
	]);

	return result.insertId;
};


export const findReservationById = async (id) => {
	const sql = "SELECT * FROM reservations WHERE id = ?";
	const rows = await pool.query(sql, [id]);
	return rows[0] || null;
};

export const findAllReservations = async () => {
	const sql = "SELECT * FROM reservations ORDER BY id DESC";
	const rows = await pool.query(sql);
	return rows;
};

export const deleteReservationById = async (id) => {
	const sql = "DELETE FROM reservations WHERE id = ?";
	return pool.query(sql, [id]);
};
