import { z } from "zod";
import { reviewsSchema, reviews_statusSchema } from "../generated/zod/index.ts";

/**
 * Create a review – only the assignment fields are required.
 * `note`, `grade`, and `status` are set by the system on creation.
 */
export const CreateReviewSchema = reviewsSchema
	.pick({ admin_id: true, video_id: true })
	.extend({
		admin_id: z
			.number({ error: "Admin ID must be a number" })
			.int({ error: "Admin ID must be a whole number" })
			.positive({ error: "Admin ID must be a positive number" }),
		video_id: z
			.number({ error: "Video ID must be a number" })
			.int({ error: "Video ID must be a whole number" })
			.positive({ error: "Video ID must be a positive number" }),
	});

/**
 * Update a review – reviewers submit note, grade, and status.
 * `admin_id` and `video_id` are immutable after creation.
 */
export const UpdateReviewSchema = reviewsSchema
	.pick({ note: true, grade: true, status: true })
	.extend({
		note: z
			.string()
			.max(300, { error: "Note must be at most 300 characters" })
			.optional(),
		grade: z
			.number({ error: "Grade must be a number" })
			.int({ error: "Grade must be a whole number" })
			.min(0, { error: "Grade must be at least 0" })
			.max(10, { error: "Grade must be at most 10" })
			.optional(),
		status: reviews_statusSchema
			.exclude(["EMPTY_ENUM_VALUE"])
			.optional(),
	});
