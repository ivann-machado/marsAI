import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

/**
 * Validate request body against Zod schema
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @returns {import('express').RequestHandler} - Express middleware
 */
export const validate = (schema: z.ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse({ ...req.body, ...req.params, ...req.query });
		if (!result.success) {
			return res.status(400).json({ errors: result.error.issues.map(d => d.message) });
		}
		next();
	};
};