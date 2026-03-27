import prisma from "../config/prisma.config.ts";

/**
 * Insert a new edition.
 * @param {Object} data - Edition data (name, year)
 * @returns {Promise<Object>} raw result compatibility
 */
export const insertEdition = async ({ name, year }) => {
	const edition = await prisma.editions.create({
		data: { name, year: Number(year) },
	});
	return { insertId: edition.id };
};

/**
 * Select an edition by ID.
 * @param {number} id
 * @returns {Promise<Object[]>}
 */
export const selectEditionById = async (id) => {
	const edition = await prisma.editions.findUnique({
		where: { id: Number(id) },
	});
	return edition ? [edition] : [];
};

/**
 * Select all editions.
 * @returns {Promise<Object[]>}
 */
export const selectAllEditions = async () => {
	return prisma.editions.findMany({
		orderBy: [
			{ year: "desc" },
			{ name: "asc" },
		],
	});
};

/**
 * Update an edition by ID.
 * @param {number} id
 * @param {Object} data - Edition data
 * @returns {Promise<Object>}
 */
export const updateEdition = async (id, { name, year }) => {
	await prisma.editions.update({
		where: { id: Number(id) },
		data: { name, year: Number(year) },
	});
	return { affectedRows: 1 };
};

/**
 * Delete an edition by ID.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const deleteEdition = async (id) => {
	await prisma.editions.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
