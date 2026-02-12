import { getAllContent, updateContent } from "../models/content.model.js";

/**
 * Get all content entries.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const getContent = async (req, res) => {
	try {
		const content = await getAllContent();
		res.status(200).json(content);
	} catch (error) {
		console.error("Get Content Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update a single content entry by name.
 * Expects `{ name, value }` in the request body.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const setContent = async (req, res) => {
	try {
		const { name, value } = req.body;

		if (!name || value === undefined) {
			return res
				.status(400)
				.json({ message: "Name and value are required" });
		}

		const affectedRows = await updateContent(name, value);

		if (affectedRows === 0) {
			return res.status(404).json({ message: "Content entry not found" });
		}

		res.status(200).json({ message: "Content updated successfully" });
	} catch (error) {
		console.error("Update Content Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
