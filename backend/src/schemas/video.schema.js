import { z } from "zod";
import { videosSchema } from "../generated/zod/index.ts";
import { fileSchema } from "./file.schema.js";
import { getMp4Metadata } from "../utils/file.util.js";

/**
 * Base video schema.
 * System-managed fields (`id`, `url`, `verified`, `status`) are omitted.
 */
const VideoSchema = videosSchema
	.omit({ id: true, url: true, verified: true, status: true })
	.extend({
		edition_id: z
			.coerce.number()
			.int({ error: "Edition ID must be a whole number" })
			.positive({ error: "Edition ID must be a positive number" })
			.optional(),
		filename: fileSchema(300 * 1024 * 1024, ['video/mp4']),
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
		producer_image: fileSchema(5 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml'])
			.optional(),
		socials: z
			.array(z.url())
			.optional()
			.or(z.literal("")),
		scenario_ai: z
			.string()
			.max(50, { error: "Scenario AI must be at most 50 characters" })
			.optional(),
		video_gen_ai: z
			.string()
			.max(50, { error: "Video gen AI must be at most 50 characters" })
			.optional(),
		sound_ai: z
			.string()
			.max(50, { error: "Sound AI must be at most 50 characters" })
			.optional(),
		postprod_ai: z
			.string()
			.max(50, { error: "Post-production AI must be at most 50 characters" })
			.optional(),
		tags: z
			.string()
			.max(100, { error: "Tags must be at most 100 characters" })
			.optional()
			.default(""),
		subtitle: fileSchema(2 * 1024 * 1024, ['application/x-subrip', 'text/srt'])
			.optional(),
	});
const videoRefinement = (schema) => schema.superRefine((data, ctx) => {
	if (!data.filename) return;
	const metadata = getMp4Metadata(data.filename?.buffer);
	if (!metadata) {
		ctx.addIssue({ code: "custom", path: ["filename"], message: "Could not parse video metadata" });
		return;
	}
	if (metadata.duration > 90) {
		ctx.addIssue({ code: "custom", path: ["filename"], message: "Video duration must not exceed 90 seconds" });
	}
	if (metadata.aspectRatio !== "16:9") {
		ctx.addIssue({ code: "custom", path: ["filename"], message: "Video aspect ratio must be 16:9" });
	}
});

/**
 * Create a new video.
 */
export const CreateVideoSchema = videoRefinement(VideoSchema);
/**
 * Update a video – all fields optional.
 */
export const UpdateVideoSchema = videoRefinement(VideoSchema.partial());