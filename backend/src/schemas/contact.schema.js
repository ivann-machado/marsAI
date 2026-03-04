import { z } from "zod";

/**
 * Contact form – standalone schema (no Prisma model).
 */
export const ContactSchema = z.object({
	name: z
		.string()
		.min(1, { error: "Name is required" })
		.max(100, { error: "Name must be at most 100 characters" }),
	email: z
		.string()
		.min(1, { error: "Email is required" })
		.email({ error: "Email must be a valid email address" }),
	message: z
		.string()
		.min(1, { error: "Message is required" })
		.max(2000, { error: "Message must be at most 2000 characters" }),
});
