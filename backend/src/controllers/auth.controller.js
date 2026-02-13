import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
	createAdmin,
	findAdminByLogin,
	findAdminById,
	addPasswordAdmin,
} from "../models/admin.model.js";
import {
	createToken,
	findToken,
	updateTokenStatus,
} from "../models/token.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN, DEV_MODE, FRONTEND_URL } from "../config/index.js";
import { getConnection } from "../config/db.js";
import { renderView } from "../utils/view.util.js";
import { sendEmail } from "../services/brevo.service.js";


/**
 * Authenticate an admin and return a JWT token.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
	try {
		const { login, password } = req.body;

		if (!login || !password) {
			return res
				.status(400)
				.json({ message: "Login and password are required" });
		}

		const admin = await findAdminByLogin(login);
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

		const token = jwt.sign(
			{ id: admin.id, login: admin.login, role: admin.role },
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRES_IN },
		);

		res.status(200).json({ token });
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const inviteAdmin = async (req, res) => {
	let conn;
	try {
		const { login } = req.body;

		if (!login) {
			return res.status(400).json({ message: "Login (email) is required" });
		}

		const existingAdmin = await findAdminByLogin(login);
		if (existingAdmin) {
			return res.status(409).json({ message: "Admin already exists" });
		}

		conn = await getConnection();
		await conn.beginTransaction();

		const adminId = await createAdmin(login, null, "admin", conn);

		const token = crypto.randomUUID();
		await createToken(token, adminId, conn);
		const inviteLink = `${FRONTEND_URL}/validate/${token}`;

		const htmlContent = await renderView('emails/inviteAdmin.html', { inviteLink });

		await sendEmail(login, "Invitation Admin MarsAI", htmlContent);

		await conn.commit();

		res
			.status(201)
			.json({
				message: "Invite sent successfully",
				adminId: adminId.toString(),
			});
	} catch (error) {
		if (conn) {
			await conn.rollback();
		}
		console.error("Invite Error:", error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const logout = async (req, res) => {
	// Placeholder for future implementation
	return res.status(200).json({ message: "Logged out successfully" });
};

/**
 * Validate an invite token and return the related admin and token row.
 * @param {string} token
 * @returns {Promise<{admin: Object, existingToken: Object}>}
 * @throws Will throw an object with `status` and `message` if invalid.
 * @private
 */
const validateInviteToken = async (token) => {
	if (!token) {
		throw { status: 400, message: "No token provided" };
	}

	const existingToken = await findToken(token);
	if (DEV_MODE) {
		console.log("ValidateToken found:", existingToken);
	}

	if (!existingToken) {
		throw { status: 401, message: "Invalid token" };
	}

	if (existingToken.status !== "pending") {
		throw { status: 401, message: "Token already used or expired" };
	}

	const admin = await findAdminById(existingToken.admin_id);
	if (!admin) {
		throw { status: 401, message: "Admin not found" };
	}

	return { admin, existingToken };
};

export const verifyInvite = async (req, res) => {
	const token = req.params.token;
	try {
		await validateInviteToken(token);
		return res.status(200).json({ valid: true, message: "Token is valid" });
	} catch (error) {
		console.error("Verify Invite Error:", error);
		res
			.status(error.status || 500)
			.json({ valid: false, message: error.message || "Server error" });
	}
};

export const acceptInvite = async (req, res) => {
	const token = req.params.token;
	let conn;
	try {
		const { admin } = await validateInviteToken(token);

		if (!req.body.password) {
			return res
				.status(400)
				.json({ valid: false, message: "Password is required" });
		}

		conn = await getConnection();
		await conn.beginTransaction();

		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await addPasswordAdmin(admin.id, hashedPassword, conn);
		await updateTokenStatus(token, "used", conn);

		await conn.commit();

		return res
			.status(200)
			.json({ valid: true, message: "Token validated and password set" });
	} catch (error) {
		if (conn) {
			await conn.rollback();
		}
		console.error("Accept Invite Error:", error);
		res
			.status(error.status || 500)
			.json({ valid: false, message: error.message || "Server error" });
	} finally {
		if (conn) {
			conn.release();
		}
	}
};
