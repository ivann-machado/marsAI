import { z } from "zod";
import { sponsorsSchema, sponsors_typeSchema } from "../generated/zod/index.ts";

/**
 * Create a new sponsor.
 */
export const CreateSponsorSchema = sponsorsSchema
	.omit({ id: true })
	.extend({
		edition_id: z
			.int({ error: "Edition ID must be a whole number" })
			.positive({ error: "Edition ID must be a positive number" }),
		type: sponsors_typeSchema
			.optional()
			.default("other"),
		name: z
			.string()
			.min(1, { error: "Name is required" })
			.max(50, { error: "Name must be at most 50 characters" }),
		url: z
			.url({ error: "URL must be a valid URL" })
			.optional()
			.default(""),
		logo: z
			.string()
			.max(100, { error: "Logo path must be at most 100 characters" }),
	});

/**
 * Update a sponsor – all fields optional, plus old-logo reference for cleanup.
 */
export const UpdateSponsorSchema = CreateSponsorSchema
	.partial()
	.extend({
		oldLogo: z.string().optional(),
	});
