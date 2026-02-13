import { getAllSettings, updateSetting } from '../models/setting.model.js';

export let SETTINGS = {};

export const loadSettings = async () => {
	try {
		console.log("Loading settings from database...");
		const settingsList = await getAllSettings();

		SETTINGS = settingsList.reduce((acc, setting) => {
			acc[setting.name] = {
				value: setting.value,
				updatedAt: setting.updated_at
			};
			return acc;
		}, {});

		console.log(`Loaded ${Object.keys(SETTINGS).length} settings.`);
		return SETTINGS;
	} catch (error) {
		console.error("Failed to load settings:", error);
		throw error;
	}
};
