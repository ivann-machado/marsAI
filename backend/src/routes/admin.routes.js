import express from "express";
import {
	getAllAdmins,
	getAdminById,
	setAdmin,
	removeAdmin,
} from "../controllers/admin.controller.js";
import {
	verifyToken,
	requireSuperAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Admin routes (toutes protégées — super_admin uniquement)
 * - GET    /           → liste de tous les admins
 * - GET    /:id        → un admin par ID
 * - PUT    /:id        → modifier le rôle d'un admin
 * - DELETE /:id        → supprimer un admin
 */
router.get("/", verifyToken, requireSuperAdmin, getAllAdmins);
router.get("/:id", verifyToken, requireSuperAdmin, getAdminById);
router.put("/:id", verifyToken, requireSuperAdmin, setAdmin);
router.delete("/:id", verifyToken, requireSuperAdmin, removeAdmin);

export default router;
