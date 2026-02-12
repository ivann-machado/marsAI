import express from "express";
import  {
    create,
    getAll,
    getById,
    remove
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", remove);

export default router;