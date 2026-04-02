import express from "express";
import {
	createReservation,
	getAllReservations,
	getReservationById,
	removeReservation,
} from "#controllers";
import { validate, cache } from "#middlewares";
import { CreateReservationSchema } from "#schemas";

const router = express.Router();

/**
 * Reservation routes
 * - POST `/` : create a reservation.
 * - GET  `/` : get all reservations.
 * - GET  `/:id` : get a reservation.
 * - DELETE `/:id` : delete a reservation.
 */
router.post("/", validate(CreateReservationSchema), createReservation);
router.get("/", cache({ etagOnly: true }), getAllReservations);
router.get("/:id", cache({ etagOnly: true }), getReservationById);
router.delete("/:id", removeReservation);

export default router;
