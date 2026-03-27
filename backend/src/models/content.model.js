import prisma from "../config/prisma.config.ts";

/**
 * Get all content entries from the database.
 * @returns {Promise<Object[]>} Compliance result (array of rows).
 */
export const selectAllContent = async () => {
	return prisma.content.findMany();
};

/**
 * Update a content entry by name.
 * @param {string} name
 * @param {string} value
 * @returns {Promise<any>} raw MariaDB-like result for compatibility.
 */
export const updateContent = async (name, value) => {
	await prisma.content.update({
		where: { name },
		data: { value },
	});
	return { affectedRows: 1 };
};



