import { z } from "zod";
import { sponsorsSchema, sponsors_typeSchema } from "../generated/zod/index.ts";
import { fileSchema } from "./file.schema.ts";

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
		logo: fileSchema(5 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']),
	});

/**
 * Update a sponsor – all fields optional, plus old-logo reference for cleanup.
 */
export const UpdateSponsorSchema = CreateSponsorSchema
	.partial()
	.extend({
		oldLogo: z.string().optional(),
	});
