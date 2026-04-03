import express, { Router } from "express";
import {
	getAllAdmins,
	getAdminById,
	setAdmin,
	removeAdmin,
} from "#controllers";
import {
	verifyToken,
	requireSuperAdmin,
	cache
} from "#middlewares";

const router: Router = express.Router();

/**
 * Admin routes (toutes protégées — super_admin uniquement)
 * - GET    /           → liste de tous les admins
 * - GET    /:id        → un admin par ID
 * - PUT    /:id        → modifier le rôle d'un admin
 * - DELETE /:id        → supprimer un admin
 */
router.get("/", verifyToken, requireSuperAdmin, cache({ etagOnly: true }), getAllAdmins);
router.get("/:id", verifyToken, requireSuperAdmin, cache({ etagOnly: true }), getAdminById);
router.put("/:id", verifyToken, requireSuperAdmin, setAdmin);
router.delete("/:id", verifyToken, requireSuperAdmin, removeAdmin);

export default router;
