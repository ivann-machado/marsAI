import express from 'express';
import { login, verifyInvite, acceptInvite, inviteAdmin } from '../controllers/auth.controller.js';
import { verifyToken, requireSuperAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/invite', verifyToken, requireSuperAdmin, inviteAdmin);

router.get('/validate', verifyInvite);
router.post('/validate', acceptInvite);

export default router;
