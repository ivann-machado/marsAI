import prisma from "../config/prisma.config.js";
import { paginate } from "../utils/paginate.util.js";

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

		const reservation = await prisma.reservations.create({
			data: {
				event_id: Number(event_id),
				firstname,
				lastname,
				email,
			},
		});

		res.status(201).json({
			message: "Reservation created successfully",
			id: reservation.id.toString(),
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
		const { page, limit } = req.query;

		const result = await paginate(prisma.reservations, {
			page,
			limit,
			include: { events: true },
			orderBy: { id: "desc" },
		});

		res.status(200).json(result);
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
		const reservation = await prisma.reservations.findUnique({
			where: { id: Number(req.params.id) },
			include: { events: true },
		});

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
		await prisma.reservations.delete({
			where: { id: Number(req.params.id) },
		});

		res.status(200).json({ message: "Reservation deleted successfully" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Reservation not found" });
		}
		console.error("Remove Reservation Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
