import express, { Router } from "express";
import { contact } from "#controllers";
import { validate } from "#middlewares";
import { ContactSchema } from "#schemas";

const router: Router = express.Router();

router.post("/", validate(ContactSchema), contact);

export default router;
