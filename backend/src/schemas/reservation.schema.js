import { z } from "zod";
import { reservationsSchema } from "../generated/zod/index.ts";

/**
 * Create a reservation.
 */
export const CreateReservationSchema = reservationsSchema
	.omit({ id: true })
	.extend({
		event_id: z
			.number({ error: "Event ID must be a number" })
			.int({ error: "Event ID must be a whole number" })
			.positive({ error: "Event ID must be a positive number" }),
		firstname: z
			.string()
			.min(1, { error: "First name is required" })
			.max(50, { error: "First name must be at most 50 characters" }),
		lastname: z
			.string()
			.min(1, { error: "Last name is required" })
			.max(50, { error: "Last name must be at most 50 characters" }),
		email: z.email({ error: "Email must be a valid email address" }),
	});
