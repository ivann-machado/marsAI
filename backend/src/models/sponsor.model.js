import prisma from "../config/prisma.js";

/**
 * Create a new sponsor.
 * @param {Object} data
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility
 */
export const insertSponsor = async ({ edition_id, type, name, url, logo }) => {
	const sponsor = await prisma.sponsors.create({
		data: {
			edition_id: Number(edition_id),
			type: type || "other",
			name,
			url: url || "",
			logo: logo || "",
		},
	});
	return { insertId: sponsor.id };
};

/**
 * Find sponsor by id
 * @param {number} id
 * @returns {Promise<Object[]>} Compatibility result (array of rows)
 */
export const selectSponsorById = async (id) => {
	const sponsor = await prisma.sponsors.findUnique({
		where: { id: Number(id) },
	});
	return sponsor ? [sponsor] : [];
};

/**
 * Find all sponsors
 * @returns {Promise<Object[]>} Compliance result (array of rows)
 */
export const selectAllSponsors = async () => {
	return prisma.sponsors.findMany({
		orderBy: { id: "desc" },
	});
};

/**
 * Update sponsor by id
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility
 */
export const updateSponsorById = async (id, { edition_id, type, name, url, logo }) => {
	await prisma.sponsors.update({
		where: { id: Number(id) },
		data: {
			edition_id: edition_id ? Number(edition_id) : undefined,
			type,
			name,
			url,
			logo,
		},
	});
	return { affectedRows: 1 };
};

/**
 * Delete sponsor by id
 * @param {number} id
 * @returns {Promise<Object>} Compatibility result
 */
export const deleteSponsorById = async (id) => {
	await prisma.sponsors.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
