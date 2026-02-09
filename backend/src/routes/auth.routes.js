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

const router = express.Router();
/**
 * Auth routes
 * - POST `/login` : authenticate and get a JWT token.
 * - POST `/invite` : invite a new admin (super amdin only).
 * - GET `/validate/:token` : validate an invite token.
 * - POST `/validate/:token` : accept an invite and set password.
 * - POST `/logout` : log out.
 */

router.post("/login", requireGuest, login);
router.post("/invite", verifyToken, requireSuperAdmin, inviteAdmin);
router.post("/logout", verifyToken, logout);

router.get("/validate/:token", requireGuest, verifyInvite);
router.post("/validate/:token", requireGuest, acceptInvite);

export default router;
