import { selectAllSettings, updateSetting } from "../models/setting.model.js";

/**
 * Get all application settings.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const getSettings = async (req, res) => {
	try {
		const settings = await selectAllSettings();
		res.status(200).json(settings);
	} catch (error) {
		console.error("Get Settings Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update a single setting by name.
 * Expects `{ name, value }` in the request body.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const setSetting = async (req, res) => {
	try {
		const { name, value } = req.body;

		if (!name || value === undefined) {
			return res
				.status(400)
				.json({ message: "Name and value are required" });
		}

		const affectedRows = await updateSetting(name, value);

		if (affectedRows === 0) {
			return res.status(404).json({ message: "Setting not found" });
		}

		res.status(200).json({ message: "Setting updated successfully" });
	} catch (error) {
		console.error("Update Setting Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};



