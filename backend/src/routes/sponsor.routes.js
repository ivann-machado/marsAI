import express from "express";
import {
	create,
	getAll,
	getById,
	update,
	remove,
} from "../controllers/sponsor.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
