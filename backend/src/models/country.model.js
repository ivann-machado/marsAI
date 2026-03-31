import prisma from "../config/prisma.config.ts";

/**
 * Insert a new country.
 * @param {Object} data - Country data (name, iso_code)
 * @returns {Promise<Object>} raw result compatibility
 */
export const insertCountry = async ({ name, iso_code }) => {
	const country = await prisma.countries.create({
		data: { name, iso_code },
	});
	return { insertId: country.id };
};

/**
 * Select a country by ID.
 * @param {number} id
 * @returns {Promise<Object[]>}
 */
export const selectCountryById = async (id) => {
	const country = await prisma.countries.findUnique({
		where: { id: Number(id) },
	});
	return country ? [country] : [];
};

/**
 * Select all countries.
 * @returns {Promise<Object[]>}
 */
export const selectAllCountries = async () => {
	return prisma.countries.findMany({
		orderBy: { name: "asc" },
	});
};

/**
 * Update a country by ID.
 * @param {number} id
 * @param {Object} data - Country data
 * @returns {Promise<Object>}
 */
export const updateCountry = async (id, { name, iso_code }) => {
	await prisma.countries.update({
		where: { id: Number(id) },
		data: { name, iso_code },
	});
	return { affectedRows: 1 };
};

/**
 * Delete a country by ID.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const deleteCountry = async (id) => {
	await prisma.countries.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
