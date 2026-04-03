import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { JWT_SECRET } from "../config/index.ts";
import redis from "../config/redis.config.ts";

/**
 * Verify token and attach user to request.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const verifyToken = async (req, res, next) => {
	const token = req.token = req.headers["authorization"]?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	if (await redis.get(`blacklist:${token}`)) {
		return res.status(403).json({ message: "Blacklisted Token", action: "destroy" });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Invalid Token", action: "destroy" });
		}
		const ipHash = crypto.createHash('sha256').update(req.ip).digest('hex');
		if (decoded.ipHash !== ipHash) {
			return res.status(403).json({ message: 'Token IP mismatch', action: "destroy" });
		}
		req.user = decoded;
		next();
	});
};

/**
 * Require super admin role.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const requireSuperAdmin = (req, res, next) => {
	if (req.user && req.user.role === "super_admin") {
		next();
	} else {
		res.status(403).json({ message: "Require Super Admin Role" });
	}
};

/**
 * Require unauthenticated user.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const requireGuest = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return next();
	}

	jwt.verify(token, JWT_SECRET, (err, _decoded) => {
		if (err) {
			return next();
		}
		return res.status(401).json({ message: 'You are already logged in' });
	});
};