import { z } from "zod";
import { adminsSchema } from "../generated/zod/index.ts";

/**
 * Login – only login + password are needed.
 * `password` is nullable in the base schema so we override it to required.
 */
export const LoginSchema = adminsSchema
	.pick({ login: true })
	.extend({
		password: z.string().min(1, { error: "Password is required" }),
	});

/**
 * Invite a new admin – only the login (email) is required.
 */
export const InviteAdminSchema = adminsSchema
	.pick({ login: true })
	.extend({
		login: z.email({ error: "Login must be a valid email address" }),
	});

/**
 * Check invite token.
 */
export const inviteTokenSchema = z.object({
	token: z.uuid({ error: "Token is required" }),
});

/**
 * Accept an invite – set a new password with confirmation.
 */
export const AcceptInviteSchema = z
	.object({
		password: z
			.string()
			.min(8, { error: "Password must be at least 8 characters" })
			.max(255, { error: "Password must be at most 255 characters" }),
		confirmPassword: z
			.string()
			.min(1, { error: "Password confirmation is required" }),
		token: z.uuid({ error: "Token is required" }),
	})
	.refine(
		(data) => data.password === data.confirmPassword,
		{ message: "Passwords do not match", path: ["confirmPassword"] },
	);
