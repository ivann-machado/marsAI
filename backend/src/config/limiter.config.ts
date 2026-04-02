import { JWT_SECRET } from "./env.ts";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

export default rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	handler: (req: Request, res: Response, _next: NextFunction, options: any) => {
		res.status(options.statusCode).send(
			`Too many requests from this IP, please try again after ${options.windowMs / (60 * 1000)} minutes`,
		);
	},
	skip: (req: Request) => {
		try {
			const token = req.headers["authorization"]?.split(" ")[1];
			if (!token) return false;

			const decoded = jwt.verify(token, JWT_SECRET as string) as any;
			return decoded.role === "admin" || decoded.role === "super_admin";
		} catch (error) {
			return false;
		}
	},
});