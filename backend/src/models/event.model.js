import prisma from "../config/prisma.config.js";

/**
 * Create a new event.
 * @param {Object} data - Event data.
 * @returns {Promise<any>} raw MariaDB-like result for compatibility.
 */
export const insertEvent = async ({ type, name, url, logo, info, place, duration, cover_image, date }) => {
	const event = await prisma.events.create({
		data: {
			type,
			name,
			url,
			logo: logo || "",
			info: info || "",
			place: place || "",
			duration: duration ? Number(duration) : 0,
			cover_image: cover_image || "",
			date: new Date(date),
		},
	});
	return { insertId: event.id };
};

/**
 * Find an event by ID.
 * @param {number} id
 * @returns {Promise<Object[]>} Compatibility result (array of rows).
 */
export const selectEventById = async (id) => {
	const event = await prisma.events.findUnique({
		where: { id: Number(id) },
	});
	return event ? [event] : [];
};

/**
 * Find all events, ordered by date descending.
 * @returns {Promise<Object[]>} Compliance result (array of rows).
 */
export const selectAllEvents = async () => {
	return prisma.events.findMany({
		orderBy: { date: "desc" },
	});
};

/**
 * Update an event by ID.
 * @param {number} id
 * @param {Object} data - Fields to update.
 * @returns {Promise<any>} raw MariaDB-like result for compatibility.
 */
export const updateEvent = async (id, { type, name, url, logo, info, place, duration, cover_image, date }) => {
	await prisma.events.update({
		where: { id: Number(id) },
		data: {
			type,
			name,
			url,
			logo,
			info,
			place,
			duration: duration ? Number(duration) : undefined,
			cover_image,
			date: date ? new Date(date) : undefined,
		},
	});
	return { affectedRows: 1 };
};

/**
 * Delete an event by ID.
 * @param {number} id
 * @returns {Promise<any>} raw MariaDB-like result for compatibility.
 */
export const deleteEvent = async (id) => {
	await prisma.events.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
