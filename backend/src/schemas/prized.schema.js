import { z } from "zod";
import { prized_videosSchema } from "../generated/zod/index.ts";

export const CreatePrizedVideoSchema = prized_videosSchema
	.pick({ video_id: true, prix: true })
	.extend({
		video_id: z
			.int({ error: "Video ID must be a whole number" })
			.positive({ error: "Video ID must be a positive number" }),
		prix: z
			.string()
			.min(1, { error: "prix is required" })
			.max(50, { error: "prix must be at most 50 characters" }),
	});

export const UpdatePrizedVideoSchema = prized_videosSchema
	.pick({ prix: true })
	.extend({
		prix: z
			.string()
			.min(1, { error: "prix is required" })
			.max(50, { error: "prix must be at most 50 characters" }),
	});
