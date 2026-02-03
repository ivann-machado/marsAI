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

// TODO: Implement setSetting in controller
// export const setSetting = async (name, value) => {
// 	try {
// 		await updateSetting(name, value);
// 		if (SETTINGS[name]) {
// 			SETTINGS[name].value = value;
// 			SETTINGS[name].updatedAt = new Date();
// 		} else {
// 			SETTINGS[name] = { value, updatedAt: new Date() };
// 		}
// 		console.log(`Setting '${name}' updated to '${value}'`);
// 		return SETTINGS[name];
// 	} catch (error) {
// 		console.error(`Failed to update setting '${name}':`, error);
// 		throw error;
// 	}
// };