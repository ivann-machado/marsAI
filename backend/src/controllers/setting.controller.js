import prisma from "../config/prisma.config.js";

/**
 * Get all settings.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getSettings = async (req, res) => {
	try {
		const settings = await prisma.settings.findMany();
		res.status(200).json(settings);
	} catch (error) {
		console.error("Get Settings Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update a setting value by name.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const setSetting = async (req, res, next) => {
	try {
		const { name, value } = req.body;

		if (!name || value === undefined) {
			return res.status(400).json({ message: "Name and value are required" });
		}

		await prisma.settings.update({
			where: { name },
			data: { value },
		});

		res.status(200).json({ message: "Setting updated successfully" });
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Setting not found" });
		}
		console.error("Set Setting Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};



