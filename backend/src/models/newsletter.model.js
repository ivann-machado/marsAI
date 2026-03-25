import prisma from "../config/prisma.config.js";

/**
 * Add a new email to the newsletter list.
 * @param {string} email
 * @returns {Promise<any>} raw MariaDB-like result for compatibility.
 */
export const insertNewsletter = async (email) => {
	const res = await prisma.newsletters.create({
		data: { email },
	});
	return { insertId: res.id };
};

/**
 * Find a newsletter subscription by email.
 * @param {string} email
 * @returns {Promise<Object[]>} Compatibility result (array of rows).
 */
export const selectNewsletterByEmail = async (email) => {
	const sub = await prisma.newsletters.findUnique({
		where: { email },
	});
	return sub ? [sub] : [];
};

/**
 * Get all newsletter subscriptions.
 * @returns {Promise<Object[]>} Compliance result (array of rows).
 */
export const selectAllNewsletters = async () => {
	return prisma.newsletters.findMany({
		orderBy: { created_at: "desc" },
	});
};

/**
 * Delete a newsletter entry by email.
 * @param {string} email
 * @returns {Promise<any>} raw MariaDB-like result for compatibility.
 */
export const deleteNewsletterByEmail = async (email) => {
	await prisma.newsletters.delete({
		where: { email },
	});
	return { affectedRows: 1 };
};
