import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();

const users = [
  { 
    name: "Kanha",
    email: "kanha@example.com",
    password: "123456",
    role: "admin",
    mobile: "+919876543210"
  },
  { 
    name: "Amit",
    email: "amit@example.com",
    password: "123456",
    role: "user",
    mobile: "+919811111111"
  },
  { 
    name: "Ravi",
    email: "ravi@example.com",
    password: "123456",
    role: "user",
    mobile: "+919822222222"
  },
  { 
    name: "Sneha",
    email: "sneha@example.com",
    password: "123456",
    role: "user",
    mobile: "+919833333333"
  },
  { 
    name: "John",
    email: "john@example.com",
    password: "123456",
    role: "user",
    mobile: "+919844444444"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();
    console.log("🗑️ Old users cleared");

    const hashed = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10)
      }))
    );

    await User.insertMany(hashed);
    console.log("Users inserted successfully");

    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedData();