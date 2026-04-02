import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { JWT_SECRET, redis } from "#config";
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
	token?: string;
	user?: any;
}

/**
 * Verify token and attach user to request.
 */
export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const token = req.token = req.headers["authorization"]?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	if (await redis.get(`blacklist:${token}`)) {
		return res.status(403).json({ message: "Blacklisted Token", action: "destroy" });
	}

	jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Invalid Token", action: "destroy" });
		}
		const decodedData = decoded as any;
		const ipHash = crypto.createHash('sha256').update(req.ip as string).digest('hex');
		if (decodedData.ipHash !== ipHash) {
			return res.status(403).json({ message: 'Token IP mismatch', action: "destroy" });
		}
		req.user = decodedData;
		next();
	});
};

/**
 * Require super admin role.
 */
export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
	if (req.user && req.user.role === "super_admin") {
		next();
	} else {
		res.status(403).json({ message: "Require Super Admin Role" });
	}
};

/**
 * Require unauthenticated user.
 */
export const requireGuest = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return next();
	}

	jwt.verify(token, JWT_SECRET as string, (err, _decoded) => {
		if (err) {
			return next();
		}
		return res.status(401).json({ message: 'You are already logged in' });
	});
};