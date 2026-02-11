import {
	createReservation,
	findAllReservations,
	findReservationById,
	deleteReservationById,
} from "../models/reservation.model.js";

export const create = async (req, res) => {
	try {
		const { event_id, firstname, lastname, email } = req.body;

		if (!event_id || !firstname || !lastname || !email) {
			return res.status(400).json({
				message: "event_id, firstname, lastname and email are required",
			});
		}

		const id = await createReservation({
			event_id,
			firstname,
			lastname,
			email,
		});

		res.status(201).json({
			message: "Reservation created",
			id: Number (id),
		});
	} catch (error) {
		console.error("Create Reservation Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getAll = async (req, res) => {
	try {
		const reservations = await findAllReservations();
		res.status(200).json(reservations);
	} catch (error) {
		console.error("Get Reservation Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getById = async (req, res) => {
	try {
		const reservation = await findReservationById(req.params.id);
		if (!reservation) {
			return res.status(404).json({ message: "Reservation not found" });
		}
		res.status(200).json(reservation);
	} catch (error) {
		console.error("Get Reservation Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const remove = async (req, res) => {
	try {
		await deleteReservationById(req.params.id);
		res.status(200).json({ message: "Reservation deleted" });
	} catch (error) {
		console.error("Delete Reservation Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
