import { selectAllSettings, updateSetting } from "../models/setting.model.js";

/**
 * Get all settings.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
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
 * Update a setting value by name.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const setSetting = async (req, res) => {
	try {
		const { name, value } = req.body;

		if (!name || value === undefined) {
			return res.status(400).json({ message: "Name and value are required" });
		}

		const result = await updateSetting(name, value);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Setting not found" });
		}

		res.status(200).json({ message: "Setting updated successfully" });
	} catch (error) {
		console.error("Set Setting Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};



