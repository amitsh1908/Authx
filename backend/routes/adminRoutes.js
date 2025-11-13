import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController.js";
import { verifyToken, checkRole, verifyOtpAccess } from "../middleware/authMiddleware.js";
import { getUserActiveSessions, logoutSpecificSession } from "../controllers/adminController.js";

const router = express.Router();

// OTP routes
router.post("/send-otp", verifyToken, checkRole("admin"), sendOtp);
router.post("/verify-otp", verifyToken, checkRole("admin"), verifyOtp);

// Admin session routes (OTP protected)
router.get("/user-sessions/:email", verifyToken, checkRole("admin"), verifyOtpAccess, getUserActiveSessions);
router.post("/logout-session", verifyToken, checkRole("admin"), verifyOtpAccess, logoutSpecificSession);

export default router;