import { z } from "zod";

/**
 * File schema for Zod validation
 * @param {number} maxSize - Maximum file size in bytes
 * @param {string[]} allowedMimes - Allowed MIME types
 * @returns {z.ZodObject} - Zod schema for file validation
 */
export const fileSchema = (maxSize, allowedMimes) =>
	z.object({
		mimetype: z.string().refine(m => allowedMimes.includes(m), {
			message: `Invalid file type. Allowed: ${allowedMimes.join(', ')}`
		}),
		size: z.number().max(maxSize, `File too large (Max ${maxSize / (1024 * 1024)}MB)`),
		buffer: z.any()
	});