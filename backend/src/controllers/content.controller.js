import { selectAllContent, updateContent } from "../models/content.model.js";

/**
 * Get all content entries.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllContent = async (req, res) => {
	try {
		const content = await selectAllContent();
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
 */
export const setContent = async (req, res) => {
	try {
		const { name, value } = req.body;

		if (!name || value === undefined) {
			return res.status(400).json({ message: "Name and value are required" });
		}

		const result = await updateContent(name, value);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Content entry not found" });
		}

		res.status(200).json({ message: "Content updated successfully" });
	} catch (error) {
		console.error("Set Content Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};
