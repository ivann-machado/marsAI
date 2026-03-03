import prisma from "../config/prisma.js";

/**
 * Insert a new jury member into the database.
 * @param {Object} data - Jury data payload
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility
 */
export const insertJury = async ({ edition_id, name, bio, photo, profession }) => {
	const jury = await prisma.jury.create({
		data: {
			edition_id: Number(edition_id),
			name,
			bio: bio || "",
			photo: photo || "",
			profession: profession || "",
		},
	});
	return { insertId: jury.id };
};

/**
 * Retrieve a jury member by its primary ID.
 * @param {number} id - Jury ID
 * @returns {Promise<Object[]>} Compatibility result (array of rows)
 */
export const selectJuryById = async (id) => {
	const jury = await prisma.jury.findUnique({
		where: { id: Number(id) },
	});
	return jury ? [jury] : [];
};

/**
 * Retrieve all jury members ordered by ID descending.
 * @returns {Promise<Object[]>} Compliance result (array of rows)
 */
export const selectAllJuries = async () => {
	return prisma.jury.findMany({
		orderBy: { id: "desc" },
	});
};

/**
 * Update a jury member by its ID.
 * @param {number} id - Jury ID
 * @param {Object} data - Updated jury data
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility
 */
export const updateJury = async (id, { edition_id, name, bio, photo, profession }) => {
	await prisma.jury.update({
		where: { id: Number(id) },
		data: {
			edition_id: edition_id ? Number(edition_id) : undefined,
			name,
			bio,
			photo,
			profession,
		},
	});
	return { affectedRows: 1 };
};

/**
 * Delete a jury member by its ID.
 * @param {number} id - Jury ID
 * @returns {Promise<Object>} raw MariaDB-like result for compatibility
 */
export const deleteJury = async (id) => {
	await prisma.jury.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};
