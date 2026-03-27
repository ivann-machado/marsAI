import prisma from "../config/prisma.config.ts";

/**
 * Create a new invite token linked to an admin.
 * @param {string} tokenValue - Random token value.
 * @param {number} admin_id - Related admin ID.
 * @returns {Promise<Object>} Compatibility result with insertId.
 */
export const insertToken = async (tokenValue, admin_id) => {
	const token = await prisma.tokens.create({
		data: {
			value: tokenValue,
			admin_id: Number(admin_id),
			status: "pending",
		},
	});
	return { insertId: token.id };
};

/**
 * Find a token by its value.
 * @param {string} tokenValue
 * @returns {Promise<Object[]>} Compatibility result (array of rows).
 */
export const selectTokenByValue = async (tokenValue) => {
	const token = await prisma.tokens.findUnique({
		where: { value: tokenValue },
	});
	return token ? [token] : [];
};

/**
 * Update the status of a token.
 * @param {string} tokenValue
 * @param {string} status
 * @returns {Promise<Object>} Affected rows compatibility result.
 */
export const updateTokenStatus = async (tokenValue, status) => {
	await prisma.tokens.update({
		where: { value: tokenValue },
		data: { status },
	});
	return { affectedRows: 1 };
};
