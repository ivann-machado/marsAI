import { z } from "zod";
import { videosSchema } from "../generated/zod/index.ts";
import { fileSchema } from "./file.schema.js";
import { getMp4Duration } from "../utils/file.util.js";

/**
 * Create a new video.
 * System-managed fields (`id`, `url`, `verified`, `status`) are omitted.
 */
export const CreateVideoSchema = videosSchema
	.omit({ id: true, url: true, verified: true, status: true })
	.extend({
		edition_id: z
			.coerce.number()
			.int({ error: "Edition ID must be a whole number" })
			.positive({ error: "Edition ID must be a positive number" })
			.optional()
			.default(2026),
		filename: fileSchema(300 * 1024 * 1024, ['video/mp4'])
			.refine((file) => {
				const duration = getMp4Duration(file.buffer);
				return duration !== null && duration <= 90;
			}, "Video duration exceeds 90 seconds"),
		email: z.email({ error: "Email must be a valid email address" }),
		cover_image: fileSchema(5 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']),
		title: z
			.string()
			.min(1, { error: "Title is required" })
			.max(50, { error: "Title must be at most 50 characters" }),
		description: z
			.string()
			.min(1, { error: "Description is required" }),
		country_id: z
			.coerce.number()
			.int({ error: "Country ID must be a whole number" })
			.positive({ error: "Country ID must be a positive number" }),
		producer: z
			.string()
			.min(1, { error: "Producer name is required" })
			.max(50, { error: "Producer name must be at most 50 characters" }),
		producer_image: fileSchema(5 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']),
		linkedin_link: z
			.url({ error: "LinkedIn link must be a valid URL", hostname: /^linkedin\.com/ })
			.optional()
			.or(z.literal("")),
		youtube_link: z
			.url({ error: "YouTube link must be a valid URL", hostname: /^youtube\.com/ })
			.optional()
			.or(z.literal("")),
		instagram_link: z
			.url({ error: "Instagram link must be a valid URL", hostname: /^instagram\.com/ })
			.optional()
			.or(z.literal("")),
		scenario_ai: z
			.string()
			.max(50, { error: "Scenario AI must be at most 50 characters" }),
		video_gen_ai: z
			.string()
			.max(50, { error: "Video gen AI must be at most 50 characters" }),
		sound_ai: z
			.string()
			.max(50, { error: "Sound AI must be at most 50 characters" }),
		postprod_ai: z
			.string()
			.max(50, { error: "Post-production AI must be at most 50 characters" }),
		tags: z
			.string()
			.max(100, { error: "Tags must be at most 100 characters" })
			.optional()
			.default(""),
		subtitle: fileSchema(2 * 1024 * 1024, ['application/x-subrip', 'text/srt']),
	});

/**
 * Update a video – all fields optional.
 */
export const UpdateVideoSchema = CreateVideoSchema.partial();
