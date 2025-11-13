import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: String,
  role: { type: String, default: "user" },
  mobile: { type: String, required: true }  // admin mobile required
});

export default mongoose.model("User", userSchema);