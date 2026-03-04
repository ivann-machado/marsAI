import { z } from "zod";
import { newslettersSchema } from "../generated/zod/index.ts";

/**
 * Subscribe to the newsletter – tighten email validation.
 */
export const CreateNewsletterSchema = newslettersSchema
	.omit({ id: true })
	.extend({
		email: z
			.string()
			.min(1, { error: "Email is required" })
			.max(50, { error: "Email must be at most 50 characters" })
			.email({ error: "Email must be a valid email address" }),
	});

/**
 * Send a newsletter blast – subject + HTML content required.
 */
export const SendNewsletterSchema = z.object({
	subject: z
		.string()
		.min(1, { error: "Subject is required" })
		.max(200, { error: "Subject must be at most 200 characters" }),
	htmlContent: z
		.string()
		.min(1, { error: "HTML content is required" }),
});
