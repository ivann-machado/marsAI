import { z } from "zod";

/**
 * File schema for Zod validation (Multer Disk Storage compatible)
 * @param maxSize - Maximum file size in bytes
 * @param allowedMimes - Allowed MIME types
 * @returns Zod schema for file validation
 */
export const fileSchema = (maxSize: number, allowedMimes: string[]) =>
	z.object({
		mimetype: z.string().refine(m => allowedMimes.includes(m), {
			message: `Invalid file type. Allowed: ${allowedMimes.join(', ')}`
		}),
		size: z.number().max(maxSize, `File too large (Max ${maxSize / (1024 * 1024)}MB)`),
		path: z.string({ error: "File upload path missing. Upload likely failed." })
	});
