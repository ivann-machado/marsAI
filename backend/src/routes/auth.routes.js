import express from "express";
import {
	login,
	logout,
	verifyInvite,
	acceptInvite,
	inviteAdmin,
} from "../controllers/auth.controller.js";
import {
	verifyToken,
	requireSuperAdmin,
	requireGuest,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { LoginSchema, InviteAdminSchema, InviteTokenSchema, AcceptInviteSchema } from "../schemas/admin.schema.ts";

const router = express.Router();
/**
 * Auth routes
 * - POST `/login` : authenticate and get a JWT token.
 * - POST `/invite` : invite a new admin (super amdin only).
 * - GET `/validate/:token` : validate an invite token.
 * - POST `/validate/:token` : accept an invite and set password.
 * - POST `/logout` : log out.
 */

router.post("/login", requireGuest, validate(LoginSchema), login);
router.post("/invite", verifyToken, requireSuperAdmin, validate(InviteAdminSchema), inviteAdmin);
router.post("/logout", verifyToken, logout);

router.get("/validate/:token", requireGuest, validate(InviteTokenSchema), verifyInvite);
router.post("/validate/:token", requireGuest, validate(AcceptInviteSchema), acceptInvite);

export default router;
