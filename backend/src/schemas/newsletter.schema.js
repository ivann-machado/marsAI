import { z } from "zod";
import { newslettersSchema } from "../generated/zod/index.ts";

/**
 * Subscribe to the newsletter – tighten email validation.
 */
export const CreateNewsletterSchema = newslettersSchema
	.pick({ email: true })
	.extend({
		email: z.email({ error: "Email must be a valid email address" }),
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
