import express from "express";
import {
  login,
  verifyInvite,
  acceptInvite,
  inviteAdmin,
} from "../controllers/auth.controller.js";
import {
  verifyToken,
  requireSuperAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();
/**
 * Auth routes
 * - POST `/login` : authenticate and get a JWT token.
 * - POST `/invite` : invite a new admin (super amdin only).
 * - GET `/validate` : validate an invite token.
 * - POST `/validate` : accept an invite and set password.
 */

router.post("/login", login);
router.post("/invite", verifyToken, requireSuperAdmin, inviteAdmin);

router.get("/validate", verifyInvite);
router.post("/validate", acceptInvite);

export default router;
