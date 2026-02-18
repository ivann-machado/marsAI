import {
	insertReservation,
	selectAllReservations,
	selectReservationById,
	deleteReservation,
} from "../models/reservation.model.js";

/**
 * Create a new reservation.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createReservation = async (req, res) => {
	try {
		const { event_id, firstname, lastname, email } = req.body;

		if (!event_id || !firstname || !lastname || !email) {
			return res
				.status(400)
				.json({ message: "Event ID, firstname, lastname and email are required" });
		}

		const result = await insertReservation({
			event_id,
			firstname,
			lastname,
			email,
		});

		res.status(201).json({
			message: "Reservation created successfully",
			id: result.insertId.toString(),
		});
	} catch (error) {
		console.error("Create Reservation Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get all reservations.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllReservations = async (req, res) => {
	try {
		const reservations = await selectAllReservations();
		res.status(200).json(reservations);
	} catch (error) {
		console.error("Get All Reservations Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get a reservation by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getReservationById = async (req, res) => {
	try {
		const rows = await selectReservationById(req.params.id);
		const reservation = rows[0];
		if (!reservation) {
			return res.status(404).json({ message: "Reservation not found" });
		}
		res.status(200).json(reservation);
	} catch (error) {
		console.error("Get Reservation By ID Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete a reservation by ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const removeReservation = async (req, res) => {
	try {
		const result = await deleteReservation(req.params.id);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Reservation not found" });
		}

		res.status(200).json({ message: "Reservation deleted successfully" });
	} catch (error) {
		console.error("Remove Reservation Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
