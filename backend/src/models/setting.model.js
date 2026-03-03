import prisma from "../config/prisma.js";

/**
 * Get all settings from the database.
 * @returns {Promise<Object[]>} Compliance result (array of rows).
 */
export const selectAllSettings = async () => {
	return prisma.settings.findMany();
};

/**
 * Update a setting value by name.
 * @param {string} name
 * @param {string} value
 * @returns {Promise<any>} raw MariaDB-like result for compatibility.
 */
export const updateSetting = async (name, value) => {
	await prisma.settings.update({
		where: { name },
		data: { value },
	});
	return { affectedRows: 1 };
};



