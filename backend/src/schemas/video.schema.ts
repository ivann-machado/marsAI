import { z } from "zod";
import { videosSchema } from "../generated/zod/index.ts";
import { fileSchema } from "./file.schema.ts";
import { getMp4Metadata } from "../utils/file.util.ts";

/**
 * Base video schema.
 * System-managed fields (`id`, `url`, `status`) are omitted.
 */
const VideoSchemaBody = videosSchema
	.omit({ id: true, url: true, status: true })
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

const videoRefinement = (schema: z.ZodTypeAny) => schema.superRefine(async (data: any, ctx: z.RefinementCtx) => {
	if (!data.filename || !data.filename.path) return;

	const metadata = await getMp4Metadata(data.filename.path);

	if (!metadata) {
		ctx.addIssue({ code: "custom", path: ["filename"], message: "Could not parse video metadata from disk" });
		return;
	}
	if (metadata.duration && metadata.duration > 90) {
		ctx.addIssue({ code: "custom", path: ["filename"], message: "Video duration must not exceed 90 seconds" });
	}
	if (metadata.aspectRatio && metadata.aspectRatio !== "16:9") {
		ctx.addIssue({ code: "custom", path: ["filename"], message: "Video aspect ratio must be 16:9" });
	}
});

/**
 * Create a new video.
 */
export const CreateVideoSchema = videoRefinement(VideoSchemaBody);

/**
 * Update a video – all fields optional.
 */
export const UpdateVideoSchema = videoRefinement(VideoSchemaBody.partial());
