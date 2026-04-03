import { selectAllSettings } from '#models';
export interface SettingValue {
	value: string;
	updatedAt: Date;
}
type SettingsMap = Record<string, { value: string; updatedAt: Date }>

type SettingRow = { name: string; value: string; updated_at: Date };
export let SETTINGS: Record<string, SettingValue> = {};

export const loadSettings = async () => {
	try {
		console.log("Loading settings from database...");
		const settingsList = await selectAllSettings();
		SETTINGS = (settingsList as SettingRow[]).reduce<SettingsMap>((acc, setting) => {
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
