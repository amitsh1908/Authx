import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController.js";
import { verifyToken, checkRole, verifyOtpAccess } from "../middleware/authMiddleware.js";
import { getUserActiveSessions, logoutSpecificSession } from "../controllers/adminController.js";
import { otpLimiter, otpVerifyLimiter } from "../middleware/rateLimiter.js";
import { validateSendOtp, validateVerifyOtp, validateEmailParam, validateLogoutSession } from "../middleware/validators.js";

const router = express.Router();

// OTP routes with rate limiting and validation
router.post("/send-otp", verifyToken, checkRole("admin"), otpLimiter, validateSendOtp, sendOtp);
router.post("/verify-otp", verifyToken, checkRole("admin"), otpVerifyLimiter, validateVerifyOtp, verifyOtp);

// Admin session routes (OTP protected) with validation
router.get("/user-sessions/:email", verifyToken, checkRole("admin"), verifyOtpAccess, validateEmailParam, getUserActiveSessions);
router.post("/logout-session", verifyToken, checkRole("admin"), verifyOtpAccess, validateLogoutSession, logoutSpecificSession);

export default router;