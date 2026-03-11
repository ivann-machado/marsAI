import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEV_MODE } from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Render a view file by replacing placeholders with data values.
 * @param {string} viewPath - Relative path to the view file from 'src/views' (e.g., 'emails/inviteAdmin.html').
 * @param {Object} data - Key-value pairs to replace in the template (e.g., { name: 'John' }).
 * @returns {Promise<string>} - The rendered HTML string.
 */
export const renderView = async (viewPath, data = {}) => {
	try {
		const absolutePath = path.join(__dirname, '../views', viewPath);
		let content = await fs.readFile(absolutePath, 'utf-8');

		for (const [key, value] of Object.entries(data)) {
			const placeholder = `{{${key}}}`;
			content = content.replaceAll(placeholder, value);
		}

		if (DEV_MODE) {
			console.log("Rendered view:", content);
		}

		return content;
	} catch (error) {
		console.error(`Error rendering view: ${viewPath}`, error);
		throw new Error(`Failed to render view: ${viewPath}`);
	}
};
