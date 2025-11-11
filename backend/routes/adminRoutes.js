import express from "express";
import { getUserActiveSessions, logoutSpecificSession } from "../controllers/adminController.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/user-sessions/:email", verifyToken, checkRole("admin"), getUserActiveSessions);
router.post("/logout-session", verifyToken, checkRole("admin"), logoutSpecificSession);

export default router;