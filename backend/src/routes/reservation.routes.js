import express from "express";
import {
	createReservation,
	getAllReservations,
	getReservationById,
	removeReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

/**
 * Reservation routes
 * - POST `/` : create a reservation.
 * - GET  `/` : get all reservations.
 * - GET  `/:id` : get a reservation.
 * - DELETE `/:id` : delete a reservation.
 */
router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.delete("/:id", removeReservation);

export default router;