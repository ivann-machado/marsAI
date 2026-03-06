export const validate = (schema) => {
	return (req, res, next) => {
		const errors = schema.validate(req.body);
		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}
		next();
	};
};