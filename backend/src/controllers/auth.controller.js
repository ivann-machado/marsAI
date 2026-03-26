import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.config.ts";
import { JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV, FRONTEND_URL } from "../config/index.ts";
import { renderView } from "../utils/view.util.js";
import { sendEmail } from "../services/brevo.service.js";
import redis from "../config/redis.config.ts";


/**
 * Authenticate an admin and return a JWT token.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const login = async (req, res) => {
	try {
		const { login, password } = req.body;

		if (!login || !password) {
			return res
				.status(400)
				.json({ message: "Login and password are required" });
		}

		const admin = await prisma.admins.findUnique({
			where: { login },
		});

		if (!admin) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		if (admin.password === null) {
			return res
				.status(401)
				.json({ message: "Account not activated. Please check your email." });
		}

		const isMatch = await bcrypt.compare(password, admin.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const ipHash = crypto.createHash('sha256').update(req.ip).digest('hex');
		const token = jwt.sign(
			{ id: admin.id, login: admin.login, role: admin.role, ipHash },
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRES_IN },
		);

		res.status(200).json({ token });
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Invite a new admin.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const inviteAdmin = async (req, res) => {
	try {
		const { login } = req.body;

		if (!login) {
			return res.status(400).json({ message: "Login (email) is required" });
		}

		const result = await prisma.$transaction(async (tx) => {
			const admin = await tx.admins.create({
				data: {
					login,
					password: null,
					role: "admin",
				},
			});

			const tokenValue = crypto.randomUUID();
			await tx.tokens.create({
				data: {
					value: tokenValue,
					admin_id: admin.id,
					status: "pending",
				},
			});

			const inviteLink = `${FRONTEND_URL}/validate/${tokenValue}`;
			const htmlContent = await renderView('emails/inviteAdmin.html', { inviteLink });

			await sendEmail(login, "Invitation Admin MarsAI", htmlContent);

			return { adminId: admin.id };
		});

		res.status(201).json({
			message: "Invite sent successfully",
			adminId: result.adminId.toString(),
		});
	} catch (error) {
		if (error.code === 'P2002') {
			return res.status(409).json({ message: "Admin already exists" });
		}
		console.error("Invite Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Logout admin by blacklisting the token.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const logout = async (req, res) => {
	const token = req.token;
	await redis.set(`blacklist:${token}`, 'true', 'EX', req.user.exp - Math.floor(Date.now() / 1000));
	return res.status(200).json({ message: "Logged out successfully" });
};

/**
 * Validate an invite token and return the related admin and token row.
 * @param {string} token
 * @returns {Promise<{admin: Object, existingToken: Object}>}
 * @private
 */
const validateInviteTokenRaw = async (token) => {
	if (!token) {
		throw { status: 400, message: "No token provided" };
	}

	const existingToken = await prisma.tokens.findUnique({
		where: { value: token },
		include: { admins: true },
	});

	if (NODE_ENV !== 'production') {
		console.log("ValidateToken found:", existingToken);
	}

	if (!existingToken) {
		throw { status: 401, message: "Invalid token" };
	}

	if (existingToken.status !== "pending") {
		throw { status: 401, message: "Token already used or expired" };
	}

	const admin = existingToken.admins;
	if (!admin) {
		throw { status: 401, message: "Admin not found" };
	}

	return { admin, existingToken };
};

/**
 * Verify if an invite token is valid.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const verifyInvite = async (req, res) => {
	const token = req.params.token;
	try {
		await validateInviteTokenRaw(token);
		return res.status(200).json({ valid: true, message: "Token is valid" });
	} catch (error) {
		console.error("Verify Invite Error:", error);
		res
			.status(error.status || 500)
			.json({ valid: false, message: error.message || "Server error" });
	}
};

/**
 * Accept an invite and set the password.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const acceptInvite = async (req, res) => {
	const tokenValue = req.params.token;
	try {
		const { admin } = await validateInviteTokenRaw(tokenValue);

		if (!req.body.password) {
			return res
				.status(400)
				.json({ valid: false, message: "Password is required" });
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		await prisma.$transaction([
			prisma.admins.update({
				where: { id: admin.id },
				data: { password: hashedPassword },
			}),
			prisma.tokens.update({
				where: { value: tokenValue },
				data: { status: "used" },
			}),
		]);

		return res
			.status(200)
			.json({ valid: true, message: "Token validated and password set" });
	} catch (error) {
		console.error("Accept Invite Error:", error);
		res
			.status(error.status || 500)
			.json({ valid: false, message: error.message || "Server error" });
	}
};
