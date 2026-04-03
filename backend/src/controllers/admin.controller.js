import { prisma } from "#config";
import { paginate } from "#utils";

/**
 * Get all admins (paginated).
 * @route GET /api/admins
 */
export const getAllAdmins = async (req, res) => {
	try {
		const { page, limit } = req.query;

		const result = await paginate(prisma.admins, {
			page,
			limit,
			select: {
				id: true,
				login: true,
				role: true,
			},
			orderBy: { id: "desc" },
		});

		res.status(200).json(result);
	} catch (error) {
		console.error("Get All Admins Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get a single admin by ID.
 * @route GET /api/admins/:id
 */
export const getAdminById = async (req, res) => {
	try {
		const admin = await prisma.admins.findUnique({
			where: { id: Number(req.params.id) },
			select: {
				id: true,
				login: true,
				role: true,
			},
		});

		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}

		res.status(200).json(admin);
	} catch (error) {
		console.error("Get Admin By Id Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update admin role.
 * @route PUT /api/admins/:id
 */
export const setAdmin = async (req, res) => {
	try {
		const { role } = req.body;

		if (role && !["admin", "super_admin"].includes(role)) {
			return res.status(400).json({
				message: "Invalid role. Must be 'admin' or 'super_admin'",
			});
		}

		await prisma.admins.update({
			where: { id: Number(req.params.id) },
			data: { role },
		});

		res.status(200).json({ message: "Admin updated" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Admin not found" });
		}
		console.error("Update Admin Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete an admin by ID.
 * @route DELETE /api/admins/:id
 */
export const removeAdmin = async (req, res) => {
	try {
		await prisma.admins.delete({
			where: { id: Number(req.params.id) },
		});

		res.status(200).json({ message: "Admin deleted" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Admin not found" });
		}
		console.error("Delete Admin Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
