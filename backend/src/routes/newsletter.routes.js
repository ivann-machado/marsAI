import { Router } from "express";
import {
	subscribeNewsletter,
	getAllNewsletters,
	deleteNewsletter,
} from "../controllers/newsletter.controller.js";

const router = Router();

router.post("/subscribe", subscribeNewsletter);
router.get("/", getAllNewsletters);
router.delete("/:email", deleteNewsletter);

export default router;
