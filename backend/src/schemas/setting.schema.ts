import { z } from "zod";
import { settingsSchema } from "../generated/zod/index.ts";

/**
 * Update a setting entry – `updated_at` is system-managed.
 */
export const UpdateSettingSchema = settingsSchema
	.omit({ updated_at: true })
	.extend({
		name: z
			.string()
			.min(1, { error: "Name is required" })
			.max(50, { error: "Name must be at most 50 characters" }),
		value: z
			.string()
			.min(1, { error: "Value is required" }),
	});
