import prisma from "../config/prisma.js";

/**
 * Get all content entries.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllContent = async (req, res) => {
	try {
		const content = await prisma.content.findMany();
		res.status(200).json(content);
	} catch (error) {
		console.error("Get All Content Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update a content entry by name.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const setContent = async (req, res, next) => {
	try {
		const { name, value } = req.body;

		if (!name || value === undefined) {
			return res.status(400).json({ message: "Name and value are required" });
		}

		await prisma.content.update({
			where: { name },
			data: { value },
		});

		res.status(200).json({ message: "Content updated successfully" });
		next();
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Content entry not found" });
		}
		console.error("Set Content Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};



