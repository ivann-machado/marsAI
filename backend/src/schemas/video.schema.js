import { z } from "zod";
import { videosSchema } from "../generated/zod/index.ts";

/**
 * Create a new video.
 * System-managed fields (`id`, `url`, `verified`, `status`) are omitted.
 */
export const CreateVideoSchema = videosSchema
	.omit({ id: true, url: true, verified: true, status: true })
	.extend({
		edition_id: z
			.int({ error: "Edition ID must be a whole number" })
			.positive({ error: "Edition ID must be a positive number" })
			.optional()
			.default(2026),
		filename: z
			.string()
			.min(1, { error: "Video filename is required" })
			.max(100, { error: "Filename must be at most 100 characters" }),
		email: z.email({ error: "Email must be a valid email address" }),
		cover_image: z
			.string()
			.min(1, { error: "Cover image is required" })
			.max(100, { error: "Cover image path must be at most 100 characters" }),
		title: z
			.string()
			.min(1, { error: "Title is required" })
			.max(50, { error: "Title must be at most 50 characters" }),
		description: z
			.string()
			.min(1, { error: "Description is required" }),
		country_id: z
			.int({ error: "Country ID must be a whole number" })
			.positive({ error: "Country ID must be a positive number" }),
		producer: z
			.string()
			.min(1, { error: "Producer name is required" })
			.max(50, { error: "Producer name must be at most 50 characters" }),
		producer_image: z
			.string()
			.min(1, { error: "Producer image is required" })
			.max(100, { error: "Producer image path must be at most 100 characters" }),
		linkedin_link: z
			.url({ error: "LinkedIn link must be a valid URL", hostname: /^linkedin\.com/ })
			.optional()
			.default(""),
		youtube_link: z
			.url({ error: "YouTube link must be a valid URL", hostname: /^youtube\.com/ })
			.optional()
			.default(""),
		instagram_link: z
			.url({ error: "Instagram link must be a valid URL", hostname: /^instagram\.com/ })
			.optional()
			.default(""),
		scenario_ai: z
			.string()
			.min(1, { error: "Scenario AI tool is required" })
			.max(50, { error: "Scenario AI must be at most 50 characters" }),
		video_gen_ai: z
			.string()
			.min(1, { error: "Video generation AI tool is required" })
			.max(50, { error: "Video gen AI must be at most 50 characters" }),
		sound_ai: z
			.string()
			.min(1, { error: "Sound AI tool is required" })
			.max(50, { error: "Sound AI must be at most 50 characters" }),
		postprod_ai: z
			.string()
			.min(1, { error: "Post-production AI tool is required" })
			.max(50, { error: "Post-production AI must be at most 50 characters" }),
		tags: z
			.string()
			.max(100, { error: "Tags must be at most 100 characters" })
			.optional()
			.default(""),
	});

/**
 * Update a video – all fields optional.
 */
export const UpdateVideoSchema = CreateVideoSchema.partial();
