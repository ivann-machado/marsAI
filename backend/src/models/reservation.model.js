import prisma from "../config/prisma.js";

/**
 * Create a new reservation.
 * @param {Object} reservation
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility.
 */
export const insertReservation = async ({ event_id, firstname, lastname, email }) => {
	const res = await prisma.reservations.create({
		data: {
			event_id: Number(event_id),
			firstname,
			lastname,
			email,
		},
	});
	return { insertId: res.id };
};

/**
 * Find a reservation by ID.
 * @param {number|string} id
 * @returns {Promise<Object[]>} Compatibility result (array of rows).
 */
export const selectReservationById = async (id) => {
	const res = await prisma.reservations.findUnique({
		where: { id: Number(id) },
		include: { events: true },
	});
	return res ? [res] : [];
};

/**
 * Get all reservations.
 * @returns {Promise<Object[]>} Compliance result (array of rows).
 */
export const selectAllReservations = async () => {
	return prisma.reservations.findMany({
		include: { events: true },
		orderBy: { id: "desc" },
	});
};

/**
 * Delete a reservation by ID.
 * @param {number|string} id
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility.
 */
export const deleteReservation = async (id) => {
	await prisma.reservations.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
