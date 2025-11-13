// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Save login token & admin info
      localStorage.setItem("token", token);
      localStorage.setItem("adminEmail", user.email);
      localStorage.setItem("adminMobile", user.mobile || "");
      localStorage.removeItem("otpToken"); // clear previous otpToken
      localStorage.removeItem("otpVerified");

      if (user.role !== "admin") {
        alert("Access denied — you are not admin.");
        setLoading(false);
        return;
      }

      alert("Login successful");
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="admin@example.com"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="password"
        />
        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}