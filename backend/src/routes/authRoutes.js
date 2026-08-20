import express from "express";
import { register, login, logout, refresh, getProfile } from "../controllers/authController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

router.get('/me', authMiddleware, getProfile);

export default router;