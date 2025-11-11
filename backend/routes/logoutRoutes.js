// routes/logoutRoutes.js
import express from "express";
import { logoutUser } from "../controllers/logoutController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/logout", verifyToken, logoutUser);

export default router;