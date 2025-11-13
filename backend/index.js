import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import logoutRoutes from "./routes/logoutRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

connectDB();

const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/user", logoutRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
