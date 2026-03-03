import prisma from "../config/prisma.js";

/**
 * Create a new admin user.
 * @param {string} login - Admin login (usually email).
 * @param {string|null} password - Hashed password or null if not set yet.
 * @param {string} [role='admin'] - Role name.
 * @returns {Promise<Object>} Inserted admin ID result compatibility.
 */
export const insertAdmin = async (login, password, role = "admin") => {
	const admin = await prisma.admins.create({
		data: { login, password, role },
	});
	return { insertId: admin.id };
};

/**
 * Find an admin by login.
 * @param {string} login
 * @returns {Promise<Object[]>} Compatibility result (array of rows).
 */
export const selectAdminByLogin = async (login) => {
	const admin = await prisma.admins.findUnique({
		where: { login },
	});
	return admin ? [admin] : [];
};

/**
 * Find an admin by ID.
 * @param {number} id
 * @returns {Promise<Object[]>} Compatibility result (array of rows).
 */
export const selectAdminById = async (id) => {
	const admin = await prisma.admins.findUnique({
		where: { id: Number(id) },
	});
	return admin ? [admin] : [];
};

/**
 * Set or update the password for an admin.
 * @param {number} id - Admin ID.
 * @param {string} password - Hashed password.
 * @returns {Promise<Object>} Affected rows compatibility result.
 */
export const updateAdminPassword = async (id, password) => {
	await prisma.admins.update({
		where: { id: Number(id) },
		data: { password },
	});
	return { affectedRows: 1 };
};

/**
 * Delete an admin by ID.
 * @param {number} id
 * @returns {Promise<Object>} Affected rows compatibility result.
 */
export const deleteAdmin = async (id) => {
	await prisma.admins.delete({
		where: { id: Number(id) },
	});
	return { affectedRows: 1 };
};