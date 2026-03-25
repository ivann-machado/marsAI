import { z } from "zod";

export const CreateHighlightSchema = z.object({
	video_id: z
		.number()
		.int({ error: "Video ID must be a whole number" })
		.positive({ error: "Video ID must be a positive number" })
		.optional()
		.nullable(),
	title: z
		.string()
		.min(1, { error: "Title is required" })
		.max(100, { error: "Title must be at most 100 characters" }),
	description: z
		.string()
		.min(1, { error: "Description is required" })
		.max(500, { error: "Description must be at most 500 characters" }),
	link_url: z
		.string()
		.url({ error: "Link URL must be a valid URL" })
		.optional()
		.nullable(),
	image_url: z
		.string()
		.url({ error: "Image URL must be a valid URL" })
		.optional()
		.nullable(),
	video_url: z
		.string()
		.url({ error: "Video URL must be a valid URL" })
		.optional()
		.nullable(),
});

export const UpdateHighlightSchema = z
	.object({
		video_id: z
			.number()
			.int({ error: "Video ID must be a whole number" })
			.positive({ error: "Video ID must be a positive number" })
			.optional()
			.nullable(),
		title: z
			.string()
			.min(1, { error: "Title is required" })
			.max(100, { error: "Title must be at most 100 characters" })
			.optional(),
		description: z
			.string()
			.min(1, { error: "Description is required" })
			.max(500, { error: "Description must be at most 500 characters" })
			.optional(),
		link_url: z
			.string()
			.url({ error: "Link URL must be a valid URL" })
			.optional()
			.nullable(),
		image_url: z
			.string()
			.url({ error: "Image URL must be a valid URL" })
			.optional()
			.nullable(),
		video_url: z
			.string()
			.url({ error: "Video URL must be a valid URL" })
			.optional()
			.nullable(),
		is_active: z
			.boolean({ error: "is_active must be a boolean" })
			.optional(),
	})
	.strict();
