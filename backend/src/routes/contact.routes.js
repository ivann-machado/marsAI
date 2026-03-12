import express from "express";
import { contact } from "../controllers/contact.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { ContactSchema } from "../schemas/contact.schema.js";

const router = express.Router();

router.post("/", validate(ContactSchema), contact);

export default router;
