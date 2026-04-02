import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NODE_ENV } from '#config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Render a view file by replacing placeholders with data values.
 * @param viewPath - Relative path to the view file from 'src/views' (e.g., 'emails/inviteAdmin.html').
 * @param data - Key-value pairs to replace in the template (e.g., { name: 'John' }).
 * @returns The rendered HTML string.
 */
export const renderView = async (viewPath: string, data: Record<string, any> = {}): Promise<string> => {
	try {
		const absolutePath = path.join(__dirname, '../views', viewPath);
		let content = await fs.readFile(absolutePath, 'utf-8');

		for (const [key, value] of Object.entries(data)) {
			const placeholder = `{{${key}}}`;
			content = content.replaceAll(placeholder, String(value));
		}

		if (NODE_ENV !== 'production') {
			console.log("Rendered view:", content);
		}

		return content;
	} catch (error: any) {
		console.error(`Error rendering view: ${viewPath}`, error);
		throw new Error(`Failed to render view: ${viewPath}`);
	}
};