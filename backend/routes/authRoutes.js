import express from "express";
import { loginUser } from "../controllers/authController.js";
import { loginLimiter } from "../middleware/rateLimiter.js";
import { validateLogin } from "../middleware/validators.js";

const router = express.Router();

router.post("/login", loginLimiter, validateLogin, loginUser);

export default router;
