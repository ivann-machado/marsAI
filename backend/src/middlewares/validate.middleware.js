/**
 * Validate request body against Zod schema
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @returns {function} - Express middleware
 */
export const validate = (schema) => {
	return (req, res, next) => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			return res.status(400).json({ errors: result.error.issues.map(d => d.message) });
		}
		next();
	};
};