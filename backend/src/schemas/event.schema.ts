import { z } from "zod";
import { eventsSchema, events_typeSchema } from "../generated/zod/index.ts";
import { fileSchema } from "./file.schema.js";

/**
 * Create a new event.
 */
export const CreateEventSchema = eventsSchema
	.omit({ id: true })
	.extend({
		type: events_typeSchema.exclude(["EMPTY_ENUM_VALUE"]),
		name: z
			.string()
			.min(1, { error: "Name is required" })
			.max(50, { error: "Name must be at most 50 characters" }),
		url: z.url({ error: "URL must be a valid URL" }),
		logo: fileSchema(5 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']),

		info: z
			.string()
			.max(5000, { error: "Info must be at most 5000 characters" })
			.optional()
			.default(""),
		place: z
			.string()
			.max(100, { error: "Place must be at most 100 characters" })
			.optional()
			.default(""),
		duration: z
			.int({ error: "Duration must be a whole number" })
			.min(0, { error: "Duration must be 0 or greater" })
			.optional()
			.default(0),
		cover_image: fileSchema(5 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']),

		date: z.coerce.date({ error: "Date must be a valid date" }),
	});

/**
 * Update an event – all fields optional, plus old-file references for cleanup.
 */
export const UpdateEventSchema = CreateEventSchema
	.partial()
	.extend({
		oldLogo: z.string().optional(),
		oldCover_image: z.string().optional(),
	});
