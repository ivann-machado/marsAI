import { z } from "zod";
import { jurySchema } from "../generated/zod/index.ts";

/**
 * Create a jury member.
 * `photo` is omitted because it comes from a file upload (req.file).
 */
export const CreateJurySchema = jurySchema
	.omit({ id: true, photo: true })
	.extend({
		edition_id: z
			.number({ error: "Edition ID must be a number" })
			.int({ error: "Edition ID must be a whole number" })
			.positive({ error: "Edition ID must be a positive number" }),
		name: z
			.string()
			.min(1, { error: "Name is required" })
			.max(50, { error: "Name must be at most 50 characters" }),
		bio: z
			.string()
			.max(200, { error: "Bio must be at most 200 characters" })
			.optional()
			.default(""),
		profession: z
			.string()
			.max(50, { error: "Profession must be at most 50 characters" })
			.optional()
			.default(""),
	});

/**
 * Update a jury member – all fields optional, plus old-photo reference.
 */
export const UpdateJurySchema = jurySchema
	.omit({ id: true })
	.partial()
	.extend({
		edition_id: z
			.number({ error: "Edition ID must be a number" })
			.int({ error: "Edition ID must be a whole number" })
			.positive({ error: "Edition ID must be a positive number" })
			.optional(),
		oldPhoto: z.string().optional(),
	});
